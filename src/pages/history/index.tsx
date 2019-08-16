import * as React from 'react'
import autobind from 'autobind-decorator'
import Button from '../../components/button'
import Version from '../../components/version'
import { currentVersions, TVersion } from '../../controller/repositorie'

import * as styles from './style.less'

type HistoryState = {
  versions: TVersion[]
}

export default class History extends React.Component<any, HistoryState> {
  constructor(props: any) {
    super(props)
    this.state = {
      versions: []
    }
  }

  @autobind
  async loadVersions() {
    this.setState({
      versions: await currentVersions()
    })
  }

  componentDidMount() {
    this.loadVersions()
  }

  render() {
    const { versions } = this.state

    return (
      <div className={styles.history}>
        <div className={styles.versions}>
          {
            versions.map(
              version => <Version key={version.hash} {...version} />
            )
          }
        </div>
        <Button onClick={this.loadVersions}>重新加载</Button>
      </div>
    )
  }
}
