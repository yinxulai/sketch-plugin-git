import fs from "@skpm/fs";


class Export {
  export(options) {

    if (!options.savePath) {
      return false;
    }

    if (options.selectionArtboards || options.selectionArtboards.length <= 0) {
      return false;
    }

    // TODO: 加载模版文件
    const template = ""
    // NSString.stringWithContentsOfFile_encoding_error("/template.html", 4, nil);

    // 状态
    const State = {
      index: 0,
      layerIndex: 0,
      layerCount: 0,
      exporting: false,
      artboardIndex: 0,
    }

    const Data = {
      artboards: [],
      slices: [],
      colors: []
    }

    const Cache = {
      slices: [],
      maskCache: [],
      sliceCache: {},
      wantsStop: false
    }

    // 循环执行
    coscript.scheduleWithRepeatingInterval_jsFunction(0, interval => {
      State.index++

      // 清理数据
      if (!Data.artboards[State.artboardIndex]) {
        Data.artboards.push({ layers: [], notes: [] });
        Cache.maskCache = [];
      }

      if (!State.exporting) {
        State.exporting = true;
        const artboard = options.selectionArtboards[State.artboardIndex]
        const layer = artboard.children()[State.layerIndex]
        // const  page = artboard.parentGroup()

        try {
          this.getLayer(
            layer, // Sketch layer element
            artboard, // Sketch artboard element
            Data.artboards[State.artboardIndex] // Save to data
          );
          State.layerIndex++;
          State.layerCount++;
          State.exporting = false;
        } catch (e) {
          // 可以通知一下状态
          Cache.wantsStop = true;
        }

        if (State.layerIndex >= artboard.children().length) {

          const page = artboard.parentGroup()
          const objectID = artboard.objectID()
          const artboardRect = this.getRect(artboard)
          const slug = this.toSlug(page.name() + ' ' + artboard.name())

          Data.artboards[State.artboardIndex].pageName = this.toHTMLEncode(this.emojiToEntities(page.name()));
          Data.artboards[State.artboardIndex].pageObjectID = this.toJSString(page.objectID());
          Data.artboards[State.artboardIndex].name = this.toHTMLEncode(this.emojiToEntities(artboard.name()));
          Data.artboards[State.artboardIndex].slug = slug;
          Data.artboards[State.artboardIndex].objectID = this.toJSString(artboard.objectID());
          Data.artboards[State.artboardIndex].width = artboardRect.width;
          Data.artboards[State.artboardIndex].height = artboardRect.height;

          const image = this.exportImage({ layer: artboard, scale: 2, name: objectID })
          const imageURL = NSURL.fileURLWithPath(image),
            imageData = NSData.dataWithContentsOfURL(imageURL),
            imageBase64 = imageData.base64EncodedStringWithOptions(0);
          Data.artboards[State.artboardIndex].imageBase64 = 'data:image/png;base64,' + imageBase64;

          const newData = JSON.parse(JSON.stringify(Data));
          newData.artboards = [Data.artboards[State.artboardIndex]];
          this.writeFile({
            fileName: slug + ".html",
            path: this.toJSString(options.savePath),
            content: this.template(template, { lang: language, data: JSON.stringify(newData) }),
          });
        }

        State.layerIndex = 0;
        State.artboardIndex++;
      }

      if (State.artboardIndex >= options.selectionArtboards.length) {
        if (Cache.slices.length > 0) {
          Data.slices = Cache.slices;
        }

        this.writeFile({
          content: this.template(template, { lang: language, data: JSON.stringify(Data) }),
          path: this.toJSString(options.savePath),
          fileName: "index.html"
        });
      }

      NSWorkspace.sharedWorkspace().activateFileViewerSelectingURLs([NSURL.fileURLWithPath(`${options.savePath}/index.html`)]);
      Cache.wantsStop = true;
      if (Cache.wantsStop === true) {
        return interval.cancel();
      }
    }
    )
  }

  is(layer, theClass) {
    if (!layer) return false;
    const klass = layer.class();
    return klass === theClass;
  }

  getLayerType(layer) {
    if (this.is(layer, MSTextLayer)) {
      return "text"
    }
    if (this.is(layer, MSSymbolInstance)) {
      return "symbol"
    }
    if (this.is(layer, MSSliceLayer) || this.hasExportSizes(layer)) {
      return "slice"
    }

    return "shape"
  }

  getLayerState(layer) {
    let isVisible = true,
      isLocked = false,
      hasSlice = false,
      isEmpty = false,
      isMaskChildLayer = false,
      isMeasure = false,
      isShapeGroup = false;

    while (!(this.is(layer, MSArtboardGroup) || this.is(layer, MSSymbolMaster))) {
      const group = layer.parentGroup();

      if (this.regexNames.exec(group.name())) {
        isMeasure = true;
      }

      if (this.is(group, MSShapeGroup)) {
        isShapeGroup = true;
      }

      if (!layer.isVisible()) {
        isVisible = false;
      }

      if (layer.isLocked()) {
        isLocked = true;
      }

      if (this.is(group, MSLayerGroup) && this.hasExportSizes(group)) {
        hasSlice = true
      }

      if (
        this.maskObjectID &&
        group.objectID() == this.maskObjectID &&
        !layer.shouldBreakMaskChain()
      ) {
        isMaskChildLayer = true
      }

      if (
        this.is(layer, MSTextLayer) &&
        layer.isEmpty()
      ) {
        isEmpty = true
      }

      layer = group;
    }
    return {
      isVisible: isVisible,
      isLocked: isLocked,
      hasSlice: hasSlice,
      isMaskChildLayer: isMaskChildLayer,
      isMeasure: isMeasure,
      isEmpty: isEmpty,
      isShapeGroup: isShapeGroup
    }
  }

  hasExportSizes(layer) {
    return layer.exportOptions().exportFormats().count() > 0;
  }

  getLayer(artboard, layer, data, symbolLayer) {
    let exportLayerRect
    const group = layer.parentGroup()
    const layerType = this.getLayerType(layer)
    const artboardRect = artboard.absoluteRect()
    const layerStates = this.getLayerState(layer)

    // NODE 开头的 layer 为插件生成的特殊 layer
    // 暂不处理
    if (layer && this.is(layer, MSLayerGroup) && /NOTE\#/.exec(layer.name())) {
      // var textLayer = layer.children()[2];
      // data.notes.push({
      //   rect: this.rectToJSON(textLayer.absoluteRect(), artboardRect),
      //   note: this.toHTMLEncode(this.emojiToEntities(textLayer.stringValue())).replace(/\n/g, "<br>")
      // });
      // layer.setIsVisible(false);
    }

    // 区分不需要处理的情况
    if (
      !this.isExportable(layer) ||
      !layerStates.isVisible ||
      (layerStates.isLocked && !this.is(layer, MSSliceLayer)) ||
      layerStates.isEmpty ||
      layerStates.hasSlice ||
      layerStates.isMeasure ||
      layerStates.isShapeGroup
    ) {
      return;
    }

    // Fix bug ??
    if (symbolLayer && layerType === "text" && layer.textBehaviour() == 0) { // fixed for v40
      layer.setTextBehaviour(1); // fixed for v40
      layer.setTextBehaviour(0); // fixed for v40
    } // fixed for v40


    // 导出影响边距（图形的宽高是否包含阴影？）
    if (this.configs.exportInfluenceRect == true && layerType != "text") {
      const influenceCGRect = layer.absoluteInfluenceRect();

      exportLayerRect = {
        x: function () { return influenceCGRect.origin.x; },
        y: function () { return influenceCGRect.origin.y; },
        width: function () { return influenceCGRect.size.width; },
        height: function () { return influenceCGRect.size.height; }
      }
    } else {
      exportLayerRect = layer.absoluteRect();
    }

    // 图层数据
    const layerData = {
      type: layerType,
      objectID: this.toJSString(layer.objectID()),
      rect: this.rectToJSON(exportLayerRect, artboardRect),
      name: this.toHTMLEncode(this.emojiToEntities(layer.name())),
    };

    if (symbolLayer) {
      layerData.objectID = this.toJSString(symbolLayer.objectID())
    }

    if (layerType != "slice") {
      var layerStyle = layer.style();
      layerData.rotation = layer.rotation();
      layerData.radius = this.getRadius(layer);
      layerData.borders = this.getBorders(layerStyle);
      layerData.fills = this.getFills(layerStyle);
      layerData.shadows = this.getShadows(layerStyle);
      layerData.opacity = this.getOpacity(layerStyle);
      layerData.styleName = this.getStyleName(layer);
    }

    if (layerType == "text") {
      layerData.content = this.toHTMLEncode(this.emojiToEntities(layer.stringValue()));
      layerData.color = this.colorToJSON(layer.textColor());
      layerData.fontSize = layer.fontSize();
      layerData.fontFace = this.toJSString(layer.fontPostscriptName());
      layerData.textAlign = TextAligns[layer.textAlignment()];
      layerData.letterSpacing = this.toJSNumber(layer.characterSpacing()) || 0;
      layerData.lineHeight = layer.lineHeight() || layer.font().defaultLineHeightForFont();
    }

    // 处理 styles
    const cssStyles = []
    const layerCSSAttributes = layer.CSSAttributes()
    for (var i = 0; i < layerCSSAttributes.count(); i++) {
      var cssStyle = layerCSSAttributes[i]
      if (! /\/\*/.exec(c)) cssStyles.push(this.toJSString(cssStyle));
    }

    // 处理圆角
    if (cssStyles.length > 0) {
      layerData.css = cssStyles;
      if (this.is(layer, MSRectangleShape) && !!layer.fixedRadius()) {
        // 圆角
        layerData.css.push('border-radius: ' + layer.cornerRadiusString().replace(/;/g, 'px ') + 'px;');
      }
    }

    this.getSlice(layer, layerData, symbolLayer);
    this.getText(artboard, layer, layerData, data);
    this.getSymbol(artboard, layer, layerData, data);
    this.getMask(group, layer, layerData, layerStates);
    data.layers.push(layerData);
  }

  template(content, data) {
    return content.replace(new RegExp("\\<\\!\\-\\-\\s([^\\s\\-\\-\\>]+)\\s\\-\\-\\>", "gi"), ($0, $1) => {
      if ($1 in data) {
        return data[$1];
      } else {
        return $0;
      }
    })
  }
  toJSString(...options) { }
  getRect(...options) { }
  toSlug(...options) { }
  toHTMLEncode(...options) { }
  emojiToEntities(...options) { }
  exportImage(...options) { }


  // 读取文件
  readFile(file) {
    return fs.readFileSync(file, 'utf-8');
  }

  // 写入文件
  writeFile(path, fileName, content) {
    return fs.writeFileSync(`${path}/${fileName}`, NSString.stringWithString(content))
  }
}

// exportImage(options) {
//   var options = this.extend(options, {
//     layer: this.artboard,
//     path: this.toJSString(NSTemporaryDirectory()),
//     scale: 1,
//     name: "preview",
//     prefix: "",
//     suffix: "",
//     format: "png"
//   }),
//     document = this.document,
//     slice = MSExportRequest.exportRequestsFromExportableLayer(options.layer).firstObject(),
//     savePathName = [];

//   slice.scale = options.scale;
//   slice.format = options.format;

//   savePathName.push(
//     options.path,
//     "/",
//     options.prefix,
//     options.name,
//     options.suffix,
//     ".",
//     options.format
//   );
//   savePathName = savePathName.join("");

//   document.saveArtboardOrSlice_toFile(slice, savePathName);

//   return savePathName;
// }
// getLayer(artboard: any, layer: any, data: any, symbolLayer: any) {
//   var artboardRect = artboard.absoluteRect(),
//     group = layer.parentGroup(),
//     layerStates = this.getStates(layer);

//   if (layer && this.is(layer, MSLayerGroup) && /NOTE\#/.exec(layer.name())) {
//     var textLayer = layer.children()[2];

//     data.notes.push({
//       rect: this.rectToJSON(textLayer.absoluteRect(), artboardRect),
//       note: this.toHTMLEncode(this.emojiToEntities(textLayer.stringValue())).replace(/\n/g, "<br>")
//     });
//     layer.setIsVisible(false);
//   }

//   if (
//     !this.isExportable(layer) ||
//     !layerStates.isVisible ||
//     (layerStates.isLocked && !this.is(layer, MSSliceLayer)) ||
//     layerStates.isEmpty ||
//     layerStates.hasSlice ||
//     layerStates.isMeasure ||
//     layerStates.isShapeGroup
//   ) {
//     return this;
//   }

//   var layerType = this.is(layer, MSTextLayer) ? "text" :
//     this.is(layer, MSSymbolInstance) ? "symbol" :
//       this.is(layer, MSSliceLayer) || this.hasExportSizes(layer) ? "slice" :
//         "shape";

//   if (symbolLayer && layerType == "text" && layer.textBehaviour() == 0) { // fixed for v40
//     layer.setTextBehaviour(1); // fixed for v40
//     layer.setTextBehaviour(0); // fixed for v40
//   } // fixed for v40

//   var exportLayerRect;
//   if (this.configs.exportInfluenceRect == true && layerType != "text") {
//     // export the influence rect.(include the area of shadows and outside borders...)
//     var influenceCGRect = layer.absoluteInfluenceRect();
//     exportLayerRect = {
//       x: function () { return influenceCGRect.origin.x; },
//       y: function () { return influenceCGRect.origin.y; },
//       width: function () { return influenceCGRect.size.width; },
//       height: function () { return influenceCGRect.size.height; }
//     }
//   }
//   else {
//     // export the default rect.
//     exportLayerRect = layer.absoluteRect();
//   }

//   var layerData = {
//     objectID: this.toJSString(layer.objectID()),
//     type: layerType,
//     name: this.toHTMLEncode(this.emojiToEntities(layer.name())),
//     rect: this.rectToJSON(exportLayerRect, artboardRect)
//   };

//   if (symbolLayer) layerData.objectID = this.toJSString(symbolLayer.objectID());


//   if (layerType != "slice") {
//     var layerStyle = layer.style();
//     layerData.rotation = layer.rotation();
//     layerData.radius = this.getRadius(layer);
//     layerData.borders = this.getBorders(layerStyle);
//     layerData.fills = this.getFills(layerStyle);
//     layerData.shadows = this.getShadows(layerStyle);
//     layerData.opacity = this.getOpacity(layerStyle);
//     layerData.styleName = this.getStyleName(layer);
//   }

//   if (layerType == "text") {
//     layerData.content = this.toHTMLEncode(this.emojiToEntities(layer.stringValue()));
//     layerData.color = this.colorToJSON(layer.textColor());
//     layerData.fontSize = layer.fontSize();
//     layerData.fontFace = this.toJSString(layer.fontPostscriptName());
//     layerData.textAlign = TextAligns[layer.textAlignment()];
//     layerData.letterSpacing = this.toJSNumber(layer.characterSpacing()) || 0;
//     layerData.lineHeight = layer.lineHeight() || layer.font().defaultLineHeightForFont();
//   }

//   var layerCSSAttributes = layer.CSSAttributes(),
//     css = [];

//   for (var i = 0; i < layerCSSAttributes.count(); i++) {
//     var c = layerCSSAttributes[i]
//     if (! /\/\*/.exec(c)) css.push(this.toJSString(c));
//   }
//   if (css.length > 0) {
//     layerData.css = css;
//     if (this.is(layer, MSRectangleShape) && !!layer.fixedRadius()) {
//       layerData.css.push('border-radius: ' + layer.cornerRadiusString().replace(/;/g, 'px ') + 'px;');
//     }
//   }

//   this.getMask(group, layer, layerData, layerStates);
//   this.getSlice(layer, layerData, symbolLayer);
//   data.layers.push(layerData);
//   this.getSymbol(artboard, layer, layerData, data);
//   this.getText(artboard, layer, layerData, data);
// }
}
