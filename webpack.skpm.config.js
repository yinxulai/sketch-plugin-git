module.exports = config => {
  config.resolve.extensions = ['.js', '.jsx', '.ts', '.tsx'];

  config.module.rules.push({
    test: /\.tsx?$/,
    loaders: ['ts-loader']
  })

  config.module.rules.push({
    test: /\.ts?$/,
    loaders: ['ts-loader']
  })

  config.module.rules.push({
    test: /\.(html)$/,
    use: [{
      loader: "@skpm/extract-loader",
    },
    {
      loader: "html-loader",
      options: {
        attrs: [
          'img:src',
          'link:href'
        ],
        interpolate: true,
      },
    },
    ]
  })

  config.module.rules.push({
    test: /\.(css)$/,
    use: ["css-loader"]
  })

  config.module.rules.push({
    test: /\.scss$/,
    use: ["style-loader", { loader: 'css-loader', options: { modules: true } }, "sass-loader"]
  })

  config.module.rules.push({
    test: /\.less$/,
    use: ["style-loader", { loader: 'css-loader', options: { modules: true } }, "less-loader"]
  })
};
