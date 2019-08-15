import * as React from 'react'
import * as styles from './style.less'
import autobind from 'autobind-decorator'

export interface Props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onChange?: (value: boolean, event: React.ChangeEvent<HTMLInputElement>) => void
}

export default class Checkbox extends React.Component<Props> {
  constructor(props: Props) {
    super(props)
  }

  @autobind
  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { onChange } = this.props
    onChange && onChange(event.currentTarget.checked, event)
  }


  render() {
    const componentID = randomString(15)
    const { children, onChange, ...props } = this.props

    return (
      <div className={styles.checkbox}>
        <input className={styles.input} onChange={this.handleChange} id={componentID} type="checkbox" {...props} hidden />
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
