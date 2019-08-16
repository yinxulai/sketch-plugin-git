import * as React from 'react'
import * as styles from './style.less'

import { TVersion } from 'controller/repositorie'

export default class Version extends React.Component<TVersion> {
  render() {
    const { author, authorEmail, title, message, updateTime } = this.props
    return (
      <div className={styles.version}>
        <div className={styles.title}>{title}</div>
        <div className={styles.message}>{message}</div>
        <div className={styles.author}>
          <div className={styles.name}>{author}</div>
          <div className={styles.authorEmail}>{authorEmail}</div>
        </div>
        <div className={styles.updateTime}>{updateTime}</div>
      </div>
    )
  }
}
