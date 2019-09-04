import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { HashRouter, Route } from 'react-router-dom'
import { isRepositorie } from './controller/repositorie'

import Header from './components/header'

import About from './pages/about'
import Commit from './pages/commit'
import History from './pages/history'
import Toolbar from './pages/toolbar'
import Setting from './pages/setting'

import * as styles from './style.less'


type CheckNotRepositorieState = {
  isRepositorie: boolean
}

class CheckNotRepositorie extends React.Component<any, CheckNotRepositorieState> {

  constructor(props: any) {
    super(props)
    this.state = {
      isRepositorie: false
    }
  }

  async componentDidMount() {
    this.setState({
      isRepositorie: await isRepositorie()
    })
  }

  render() {
    const { isRepositorie } = this.state
    return (
      <div className={styles.maskRoot} data-app-region="drag">
        {
          isRepositorie
            ? (
              <div className={styles.children} >
                {this.props.children}
              </div>
            )
            : (
              <div className={styles.tip}>
                当前项目未开启 GIT 版本管理
              </div>
            )
        }
      </div >
    )
  }
}

export default class App extends React.Component {
  render() {
    return (
      <div
        data-app-region="drag"
        className={styles.root}
      >
        <Header />
        <CheckNotRepositorie>
          <HashRouter>
            <Route exact path="/">
              <Route path="/about" component={About} />
              <Route path="/commit" component={Commit} />
              <Route path="/history" component={History} />
              <Route path="/toolbar" component={Toolbar} />
              <Route path="/setting" component={Setting} />
            </Route>
          </HashRouter>
        </CheckNotRepositorie>
      </div>
    )
  }
}

window.addEventListener('load', () => {
  ReactDOM.render(<App />, document.getElementById('app'))
})


