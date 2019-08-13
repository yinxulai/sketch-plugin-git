import * as React from 'react'
import * as styles from './style.less'

export default class Input extends React.Component {
  render() {
    return (
      <input className={styles.input} {...this.props}></input>
    )
  }
}

export class Textarea extends React.Component {
  render() {
    return (
      <textarea className={styles.textarea} {...this.props}></textarea>
    )
  }
}



