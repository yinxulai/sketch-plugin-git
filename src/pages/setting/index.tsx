import * as React from 'react'
import autobind from 'autobind-decorator'
import Input from '../../components/input'
import * as styles from './style.less'

export default class Setting extends React.Component {

  @autobind
  handleTitleInputChange(title: string) {
    this.setState({
      ...this.state,
      title
    })
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.fromItem}>
          <Input type="text" placeholder="请输入用户名" onChange={this.handleTitleInputChange} />
        </div>
        <div className={styles.fromItem}>
          <Input type="text" placeholder="请输密码" onChange={this.handleTitleInputChange} />
        </div>
        <div className={styles.fromItem}>
          <Input type="text" placeholder="请输密码" onChange={this.handleTitleInputChange} />
        </div>
      </div>
    )
  }
}
