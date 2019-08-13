import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { HashRouter, Route } from 'react-router-dom'

import Header from './components/header'

import About from './pages/about'
import Commit from './pages/commit'
import History from './pages/history'

import * as styles from './style.less'

export default class App extends React.Component {
  render() {
    return (
      <div
        data-app-region="drag"
        className={styles.root}
      >
        <Header />
        <div className={styles.container}>
          <HashRouter>
            <Route exact path="/">
              <Route path="/about" component={About} />
              <Route path="/commit" component={Commit} />
              <Route path="/history" component={History} />
            </Route>
          </HashRouter>
        </div>
      </div>
    )
  }
}

window.addEventListener('load', () => {
  ReactDOM.render(<App />, document.getElementById('app'))
})


