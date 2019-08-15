import * as React from 'react'
import * as styles from './style.less'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
}

export default class Input extends React.Component<InputProps> {
  render() {
    return (
      <input className={styles.input} {...this.props}></input>
    )
  }
}


export interface TextareaProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
}

export class Textarea extends React.Component<TextareaProps> {
  render() {
    return (
      <textarea className={styles.textarea} {...this.props}></textarea>
    )
  }
}



