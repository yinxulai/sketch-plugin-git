import * as React from 'react'
import classNames from 'classnames'
import * as styles from './style.less'

export const ButtonType = {
  default: "default",
  primary: "primary",
  success: "success",
  warning: "warning",
  danger: "danger",
}

export default class Button extends React.Component {
  render() {
    return (
      <button
        {...this.props}
        className={classNames(styles.button, styles[this.props.type])}
      >
        {this.props.children}
      </button>
    )
  }
}

Button.defaultProps = {
  type: 'default'
}
