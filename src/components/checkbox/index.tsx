import * as React from 'react'
import * as styles from './style.less'

export interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
}

export default class Checkbox extends React.Component<Props> {
  constructor(props: Props) {
    super(props)
  }

  render() {
    const { children, ...props } = this.props
    const componentID = randomString(15)
    return (
      <div className={styles.checkbox}>
        <input className={styles.input} id={componentID} type="checkbox" {...props} hidden />
        <label className={styles.advice} htmlFor={componentID} ></label>
        <label className={styles.title} htmlFor={componentID} >{children}</label>
      </div>
    )
  }
}

function randomString(len: number): string {
  len = len || 32;
  var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  var maxPos = $chars.length;
  var pwd = '';
  for (let i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
}
