import React, { Component } from 'react';
import DevTools from 'mobx-react-devtools';
import { observer, inject } from 'mobx-react';
import {
  Route,
  Switch,
  NavLink,
  withRouter,
} from 'react-router-dom';
import {
  Layout,
  AppBar,
  Navigation,
  Panel,
} from 'react-toolbox';

// app pages
import Home from 'Scenes/Home';

/**
 * @author Ryazanov I.A
 * Application routing
 * TODO: remove devtools on prod
 */
@withRouter
@inject('appStore')
@observer
export default class App extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.appStore;
  }

  componentDidMount() {
    this.authenticate();
  }

  authenticate(e) {
    if (e) e.preventDefault();
    this.store.authenticate();
  }

  render() {
    return (
      <Layout className="layout">
        <AppBar>
          <Navigation type="horizontal">
            <NavLink to="/">Main</NavLink>
          </Navigation>
        </AppBar>
        <Panel className="layout__panel">
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </Panel>
        <DevTools />
      </Layout>
    );
  }
}

