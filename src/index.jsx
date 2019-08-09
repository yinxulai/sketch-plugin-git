import * as React from 'react';
import * as ReactDOM from 'react-dom'
import { HashRouter, Route, Link } from 'react-router-dom'

class About extends React.Component {
  render() {
    return <h3>About</h3>
  }
}

class Inbox extends React.Component {
  render() {
    return (
      <div onClick={() => {
        const req = window.alert('pwddsdad', 'tesasdasd1')
        req.catch(console.log)
        req.then(console.log)
      }}>
        <h2>Inbox</h2>
      </div>
    )
  }
}

class Message extends React.Component {
  render() {
    return <h3>Message</h3>
  }
}

export default class App extends React.Component {
  render() {
    return (
      <div>
        <HashRouter>
          <Link to="/about">about</Link>
          <Link to="/inbox">inbox</Link>
          <Link to="/messages/test">messages</Link>
          <Route exact path="/">
            <Route path="/commit" component={About} />
            <Route path="/inbox" component={Inbox} />
            <Route path="/messages/:id" component={Message} />
          </Route>
        </HashRouter>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))


