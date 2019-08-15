import * as React from 'react'
import * as styles from './style.less'
import autobind from 'autobind-decorator'

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void
}

export default class Input extends React.Component<InputProps, null> {

  @autobind
  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { onChange } = this.props
    onChange && onChange(event.currentTarget.value, event)
  }

  render() {
    const { onChange, ...props } = this.props
    return (
      <input className={styles.input} {...props} onChange={this.handleChange}></input>
    )
  }
}


export interface TextareaProps extends Omit<React.InputHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  onChange?: (value: string, event: React.ChangeEvent<HTMLTextAreaElement>) => void
}


export class Textarea extends React.Component<TextareaProps> {

  @autobind
  handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const { onChange } = this.props
    onChange && onChange(event.currentTarget.value, event)
  }

  render() {
    const { onChange, ...props } = this.props

    return (
      <textarea className={styles.textarea} {...props} onChange={this.handleChange}></textarea>
    )
  }
}



