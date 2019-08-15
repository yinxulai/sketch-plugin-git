import * as React from 'react'
import classNames from 'classnames'
import * as styles from './style.less'

export type ButtonType = "default" | "primary" | "success" | "warning" | "danger"

export interface Props extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  type?: ButtonType
  htmltype?: React.ButtonHTMLAttributes<HTMLButtonElement>['type']
}

export default class Button extends React.Component<Props> {

  render() {
    const { htmltype, children, ...props } = this.props
    const type = this.props.type || 'default'

    return (
      <button
        {...props}
        type={htmltype}
        className={classNames(styles.button, styles[type])}
      >
        {children}
      </button>
    )
  }
}
