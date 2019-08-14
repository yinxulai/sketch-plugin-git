import * as React from 'react'
import * as styles from './style.less'
import autobind from 'autobind-decorator'
import { branchs } from '../../controller/git'

export default class Select extends React.Component {
  constructor(props) {
    super(props)
    this.componentID = randomString(15)
  }

  @autobind
  handleChange(event) {
    const { onChange } = this.props
    onChange && onChange(event.currentTarget.value)
  }

  render() {
    const { children, items, render, ...props } = this.props
    return (
      <div className={styles.select}>
        <select {...props} size="1" defaultValue="tip" onChange={this.handleChange}>
          <option value="tip" disabled hidden>{children}</option>
          {
            items.map(item =>
              render
                ? render(item)
                : (<option key={item} value={item}>{item}</option>)
            )
          }
        </select>
      </div>
    )
  }
}


export class BranchSelect extends React.Component {
  constructor(props) {
    super(props)
    this.state = { branchs: [] }
    this.componentID = randomString(15)
  }

  componentDidMount() {
    branchs().then(branchs => {
      this.setState({ ...this.state, branchs })
    })
  }

  @autobind
  handleChange(event) {
    const { onChange } = this.props
    onChange(event.currentTarget.value)
  }

  render() {
    const { branchs } = this.state

    return (
      <Select
        items={branchs}
        render={item => <option key={item.key} value={item.key}>{item.name}</option>}
      >
        选择分支
      </Select>
    )
  }
}

function randomString(len) {
  len = len || 32;
  var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  var maxPos = $chars.length;
  var pwd = '';
  for (let i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
}
