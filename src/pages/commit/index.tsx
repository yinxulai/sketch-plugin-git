import * as React from 'react'
import autobind from 'autobind-decorator'
import Button from '../../components/button'
import Checkbox from '../../components/checkbox'
import { BranchSelect } from '../../components/select'
import Input, { Textarea } from '../../components/input'
import { documentPath, exportPreview, exportArtboards, documentJSON, documentMetadata, documentDirectoryPath } from '../../controller/document'
import { TBranch, createCommit, modifiedFiles, isModified } from '../../controller/repositorie'

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
    const document = await documentPath()
    // const jsondata = await documentJSON()
    const metadata = await documentMetadata()
    const directory = await documentDirectoryPath()
    const previews = await exportPreview(`${directory}/preview`)
    const artboards = await exportArtboards(`${directory}/artboards`)

    console.log(document, metadata, previews, artboards)

    const files = [document]

    if (!await isModified(...files)) {
      alert('文件未修改')
      return
    }

    const option = {
      files, // 包含的文件
      title: this.state.title, // 标题
      message: this.state.context // 信息
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
