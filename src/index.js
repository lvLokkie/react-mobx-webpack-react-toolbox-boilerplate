import React from 'react';
import ReactDOM from 'react-dom';
import { configure } from 'mobx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import App from './App';
import './styles.less';
import stores from './stores';

configure({
  // use strict
  enforceActions: 'strict',
  isolateGlobalState: true,
});

/**
 * @author Ryazanov I.A
 * AppRouter root
 */
const AppContainer = () => (
  <BrowserRouter>
    <Provider {...stores}>
      <App />
    </Provider>
  </BrowserRouter>
);

ReactDOM.render((<AppContainer />), document.getElementById('#app'));

