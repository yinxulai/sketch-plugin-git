import * as React from 'react'
import * as styles from './style.less'

export default class About extends React.Component {
  render() {
    return (
      <div className={styles.header} data-app-region="drag">
        <span className={styles.close} onClick={() => window.closeWindow()} />
      </div>
    )
  }
}
