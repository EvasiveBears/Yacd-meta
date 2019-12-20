import React, { Suspense } from 'react';
import { Provider } from '../misc/store';
import StateProvider from './StateProvider';
import { HashRouter as Router, Route } from 'react-router-dom';
import Loading2 from 'c/Loading2';
import ErrorBoundary from 'c/ErrorBoundary';
import SideBar from 'c/SideBar';
import Home from 'c/Home';
import Logs from 'c/Logs';
import Config from 'c/Config';
import Connections from 'c/Connections';
import APIDiscovery from 'c/APIDiscovery';
import { store } from '../store/configureStore';
import './Root.css';
import s0 from './Root.module.css';

const Proxies = React.lazy(() =>
  import(
    /* webpackChunkName: "proxies" */
    /* webpackPrefetch: true */
    /* webpackPreload: true */
    './Proxies'
  )
);
const Rules = React.lazy(() =>
  import(
    /* webpackChunkName: "rules" */
    /* webpackPrefetch: true */
    /* webpackPreload: true */
    './Rules'
  )
);

// testing...
// import StyleGuide from 'c/StyleGuide';

window.store = store;

const initialState = {
  proxies: {
    proxies: {},
    delay: {},
    groupNames: []
  }
};

const Root = () => (
  <ErrorBoundary>
    <StateProvider initialState={initialState}>
      <Provider store={store}>
        <Router>
          <div className={s0.app}>
            <APIDiscovery />
            <Route path="/" render={props => <SideBar {...props} />} />
            <div className={s0.content}>
              <Suspense fallback={<Loading2 />}>
                <Route exact path="/" render={() => <Home />} />
                <Route exact path="/connections" component={Connections} />
                <Route exact path="/overview" render={() => <Home />} />
                <Route exact path="/configs" component={Config} />
                <Route exact path="/logs" component={Logs} />
                <Route exact path="/proxies" render={() => <Proxies />} />
                <Route exact path="/rules" render={() => <Rules />} />
              </Suspense>
            </div>
          </div>
        </Router>
      </Provider>
    </StateProvider>
  </ErrorBoundary>
);

export default Root;
