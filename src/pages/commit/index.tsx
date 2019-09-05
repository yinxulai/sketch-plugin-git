import * as React from 'react'
import autobind from 'autobind-decorator'
import { cupSuffix } from '../../utils/string'
import { handleCatch } from '../../utils/decoration'
import { alert } from '../../controller/window'
import { TBranch, push, createCommit, isModified } from '../../controller/repositorie'
import { documentPath, exportArtboards, documentDirectoryPath, exportJSON, documentName } from '../../controller/document'
import Button from '../../components/button'
import Checkbox from '../../components/checkbox'
import { BranchSelect } from '../../components/select'
import Input, { Textarea } from '../../components/input'

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
      title: "",
      context: "",
      isExportPreview: false,
      isExportMarked: false
    }
  }

  @autobind
  clearState() {
    this.setState({
      branch: null,
      title: "",
      context: ""
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
  @handleCatch
  async handleSubmit() {
    const files = [] // 需要提交的文件
    const name = await documentName()
    const pureName = cupSuffix(name)
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
      return
    }

    files.push(await exportJSON(`${directory}/.${pureName}`))
    // const previews = await exportPreview(`${directory}/.${name}/preview`) // 导出 preview(文档最后编辑处的 png 预览) 到文档所在 preview 目录
    files.push(await exportArtboards(`${directory}/.${pureName}/artboards`)) // 导出 artboards 到文档所在 artboards 目录

    const option = {
      files, // 包含的文件
      title: this.state.title, // 标题
      message: this.state.context, // 信息
    }

    await createCommit(option)
    await push()
    this.clearState()
    alert('保存成功')
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.fromItem}>
          <BranchSelect onChange={this.handleBranchSelectChange}>选择环境</BranchSelect>
        </div>
        <div className={styles.fromItem}>
          <Input value={this.state.title} type="text" placeholder="请输入标题" onChange={this.handleTitleInputChange} />
        </div>
        <div className={styles.fromItem}>
          <Textarea value={this.state.context} onChange={this.handleContextInputChange} placeholder="请输入调整主要内容" />
        </div>
        <div className={styles.fromItem}>
          <Checkbox checked={this.state.isExportPreview} onChange={this.handleExportPreviewChange}>更新预览图</Checkbox>
          <Checkbox checked={this.state.isExportMarked} onChange={this.handleExportMarkedChange}>更新标注说明</Checkbox>
        </div>
        <div className={styles.fromItem}>
          <Button onClick={this.handleSubmit}>保存</Button>
        </div>
      </div>
    )
  }
}
