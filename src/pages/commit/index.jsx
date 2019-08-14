import * as React from 'react'
import Button from '../../components/button'
import Checkbox from '../../components/checkbox'
import { BranchSelect } from '../../components/select'
import Input, { Textarea } from '../../components/input'

import * as styles from './style.less'

export default class Commit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      branch: null,
      title: null,
      context: null,
      isPreview: false,
      isMarked: false
    }
  }

  render() {
    return (
      <div className={styles.containerFluid}>
        <div className={styles.fromItem}>
          <BranchSelect>选择环境</BranchSelect>
        </div>
        <div className={styles.fromItem}>
          <Input type="text" placeholder="请输入标题" />
        </div>
        <div className={styles.fromItem}>
          <Textarea placeholder="请输入调整主要内容" />
        </div>
        <div className={styles.fromItem}>
          <Checkbox>更新预览图</Checkbox>
          <Checkbox>更新标注说明</Checkbox>
        </div>
        <div className={styles.fromItem}>
          <Button>提交</Button>
        </div>
      </div>
    )
  }
}
