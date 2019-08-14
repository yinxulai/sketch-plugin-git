import * as React from 'react'
import { currentVersions, isRepositorie, repositoriePath } from '../../controller/git'

export default class History extends React.Component {
  componentDidMount(){
    isRepositorie()
    repositoriePath()
    currentVersions()
  }

  render() {
    return (
      <div>
        History
      </div>
    )
  }
}
