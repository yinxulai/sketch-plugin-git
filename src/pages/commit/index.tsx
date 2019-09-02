import * as React from 'react'
import autobind from 'autobind-decorator'
import Button from '../../components/button'
import Checkbox from '../../components/checkbox'
import { BranchSelect } from '../../components/select'
import Input, { Textarea } from '../../components/input'
import { alert } from '../../controller/window'
import { TBranch, createCommit, isModified } from '../../controller/repositorie'
import { documentPath, exportPreview, exportArtboards, documentMetadata, documentDirectoryPath } from '../../controller/document'
import * as styles from './style.less'


type CommitState = {
  branch: TBranch,
  title: string,
  context: string,
  isExportPreview: boolean,
  isExportMarked: boolean
}

export default class Commit extends React.Component<{}, CommitState> {
  constructor(props: any) {
    super(props)
    this.state = {
      branch: null,
      title: null,
      context: null,
      isExportPreview: false,
      isExportMarked: false
    }
  }

  @autobind
  clearState() {
    this.setState({
      branch: null,
      title: null,
      context: null
    })
  }

  @autobind
  validateInput() {
    if (!this.state.title) {
      alert('输入错误', "请输入本次修改的标题。")
      return false
    }
    if (!this.state.context) {
      alert('输入错误', "请输入本次修改的内容、正确友好的内容更讨人喜欢。")
      return false
    }
    return true
  }

  @autobind
  handleBranchSelectChange(branch: TBranch) {
    this.setState({
      ...this.state,
      branch
    })
  }

  @autobind
  handleTitleInputChange(title: string) {
    this.setState({
      ...this.state,
      title
    })
  }

  @autobind
  handleContextInputChange(context: string) {
    this.setState({
      ...this.state,
      context
    })
  }

  @autobind
  handleExportPreviewChange(isExportPreview: boolean) {
    this.setState({
      ...this.state,
      isExportPreview
    })
  }

  @autobind
  handleExportMarkedChange(isExportMarked: boolean) {
    this.setState({
      ...this.state,
      isExportMarked
    })
  }

  @autobind
  async handleSubmit() {
    const files = []
    const document = await documentPath()
    const directory = await documentDirectoryPath() // 获取文档所在目录

    // 输入检查没通过
    if (!this.validateInput()) {
      return
    }


    // 检查文件是否修改了
    if (await isModified(document)) {
      files.push(document)
    } else {
      alert('保存出错', "该文档没有进行过任何修改")
    }

    if (this.state.isExportMarked) {

    }

    if (this.state.isExportPreview) {
      const previews = await exportPreview(`${directory}/preview`) // 导出 preview 到文档所在 preview 目录
      const artboards = await exportArtboards(`${directory}/artboards`) // 导出 artboards 到文档所在 artboards 目录
      files.push(previews, artboards)
    }

    const option = {
      files, // 包含的文件
      title: this.state.title, // 标题
      message: this.state.context, // 信息
    }

    createCommit(option)
      .catch(err => alert(err))
      .then(() => { alert('保存成功'), this.clearState() })
  }

  render() {
    return (
      <div className={styles.containerFluid}>
        <div className={styles.fromItem}>
          <BranchSelect onChange={this.handleBranchSelectChange}>选择环境</BranchSelect>
        </div>
        <div className={styles.fromItem}>
          <Input type="text" placeholder="请输入标题" onChange={this.handleTitleInputChange} />
        </div>
        <div className={styles.fromItem}>
          <Textarea onChange={this.handleContextInputChange} placeholder="请输入调整主要内容" />
        </div>
        <div className={styles.fromItem}>
          <Checkbox onChange={this.handleExportPreviewChange}>更新预览图</Checkbox>
          <Checkbox onChange={this.handleExportMarkedChange}>更新标注说明</Checkbox>
        </div>
        <div className={styles.fromItem}>
          <Button onClick={this.handleSubmit}>保存</Button>
        </div>
      </div>
    )
  }
}
