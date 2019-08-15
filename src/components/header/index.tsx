import * as React from 'react'
import { getWindowTitle, closeWindow } from '../../controller/window'
import * as styles from './style.less'

export default class Header extends React.Component {
  render() {
    return (
      <div className={styles.header} data-app-region="drag">
        <span className={styles.close} onClick={closeWindow} />
        <div className={styles.title}>{getWindowTitle()}</div>
      </div>
    )
  }
}
