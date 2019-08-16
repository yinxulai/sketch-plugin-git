import * as React from 'react'
import * as styles from './style.less'
import autobind from 'autobind-decorator'
import { branchs, TBranch } from '../../controller/repositorie'

export interface Props<T> extends Omit<React.InputHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  items: T[]
  render?: (data: T) => HTMLOptionElement
  onChange?: (data: T) => void
}

export default class Select<T extends { id: string }> extends React.Component<Props<T>> {
  constructor(props: Props<T>) {
    super(props)
  }

  @autobind
  handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const { items, onChange } = this.props
    const item = items.find(item => item.id === event.currentTarget.value)
    onChange && item && onChange(item)
  }

  render() {
    const { children, items, render, onChange, ...props } = this.props
    return (
      <div className={styles.select}>
        <select {...props} size={1} defaultValue="tip" onChange={this.handleChange}>
          <option value="tip" disabled hidden>{children}</option>
          {
            items.map(item =>
              render
                ? render(item)
                : (<option key={item.id} value={item.id}>{item}</option>)
            )
          }
        </select>
      </div>
    )
  }
}

export interface BranchSelectProps extends Props<TBranch> {

}

type BranchSelectState = {
  branchs: TBranch[]
}

export class BranchSelect extends React.Component<Omit<BranchSelectProps, 'items'>, BranchSelectState> {
  constructor(props: any) {
    super(props)
    this.state = {
      branchs: []
    }
  }

  componentDidMount() {
    branchs().then(branchs => {
      this.setState({ ...this.state, branchs })
    })
  }

  render() {
    const { branchs } = this.state
    const { onChange } = this.props

    return (
      <Select
        items={branchs}
        onChange={onChange}
        render={item => (<option key={item.id} value={item.id}>{item.name}</option>) as any}
      >
        选择分支
      </Select>
    )
  }
}
