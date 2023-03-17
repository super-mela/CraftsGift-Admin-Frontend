import React, { Component } from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom'
import Login from './login';
import Register from './register';
export default class Main extends Component {
  render() {
    const { match } = this.props;

    return (
      <main>
        <HashRouter>
          <Switch>
            <Route exact path={[`${match.path}/login`, `${match.path}`]} component={Login} />
            <Route exact path={[`${match.path}/register`, `${match.path}`]} component={Register} />
          </Switch>
        </HashRouter>
      </main>
    );
  }
}