import * as React from 'react'
import * as styles from './style.less'
export default class Checkbox extends React.Component {
  constructor(props) {
    super(props)
    this.componentID = randomString(15)
  }

  onChange(value) {
    console.log(value)
  }

  render() {
    const { children, ...props } = this.props

    return (
      <div className={styles.checkbox}>
        <input className={styles.input} id={this.componentID} type="checkbox" onChange={this.onChange} {...props} hidden/>
        <label className={styles.advice} htmlFor={this.componentID} ></label>
        <label className={styles.title} htmlFor={this.componentID} >{children}</label>
      </div>
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
