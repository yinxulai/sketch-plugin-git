import * as React from 'react'
import { Textarea } from '../../components/input'
import { getSSHKey } from '../../controller/sshkey'

import * as styles from './style.less'

interface SettingState {
  sshkey: string
}

export default class Setting extends React.Component<{}, SettingState> {
  constructor(props: any) {
    super(props)
    this.state = {
      sshkey: ''
    }
  }

  async componentDidMount() {
    this.setState({
      sshkey: await getSSHKey()
    })
  }

  render() {
    const { sshkey } = this.state
    return (
      <div className={styles.container}>
        <div className={styles.title}>
          本机 key
        </div>
        <div className={styles.textframe}>{sshkey || ''}</div>
      </div>
    )
  }
}
