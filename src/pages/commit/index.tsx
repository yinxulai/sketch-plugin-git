import * as React from 'react'
import autobind from 'autobind-decorator'
import Button from '../../components/button'
import Checkbox from '../../components/checkbox'
import { Branch } from 'controller/repositorie'
import { BranchSelect } from '../../components/select'
import Input, { Textarea } from '../../components/input'

import * as styles from './style.less'


type CommitState = {
  branch: Branch,
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
  handleBranchSelectChange(branch: Branch) {
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
  handleSubmit() {
    console.log(this.state)
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
          <Button onClick={this.handleSubmit}>提交</Button>
        </div>
      </div>
    )
  }
}