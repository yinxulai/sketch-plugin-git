import * as React from 'react'
import { currentVersions, isRepositorie, repositoriePath, branchs } from '../../controller/git'

export default class History extends React.Component {
  componentDidMount() {
    isRepositorie().then(console.log, console.log)
    repositoriePath().then(console.log, console.log)
    currentVersions().then(console.log, console.log)
    branchs().then(console.log, console.log)
  }

  render() {
    return (
      <div>
        History
      </div>
    )
  }
}
