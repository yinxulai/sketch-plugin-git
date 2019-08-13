import * as React from 'react'
import * as styles from './style.less'

export default class Select extends React.Component {
  constructor(props) {
    super(props)
    this.componentID = randomString(15)
  }

  render() {
    const { children, data, ...props } = this.props
    return (
      <div className={styles.select}>
        <select {...props} size="1" defaultValue="tip">
          <option value="tip" disabled hidden>{children}</option>
          {
            data.map(item => (<option key={item.value} value={item.value}>{item.text}</option>))
          }
        </select>
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
