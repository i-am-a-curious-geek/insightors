import React, {
  Component
}                               from 'react';
import {      
  Route,
  Switch
}                               from 'react-router-dom';
import { ConnectedRouter}       from 'react-router-redux';
import { Provider }             from 'react-redux';
import configureStore           from './redux/configureStore';
import { history }              from './redux/configureStore';
import { default as Layout }    from './containers/Layout';
import { default as Children } from './views/Children';
import { default as Elderly } from './views/Elderly';
import { default as PageNotFound } from './views/PageNotFound';
import { default as ScrollTop    } from './components/ScrollToTop';

type Props = any;
type State = any;

const store = configureStore();

class Root extends Component<Props, State> {
  render() {

    return (
      <Provider store={store}>
        <div>
          <ConnectedRouter history={history}>
            <ScrollTop>
              <Switch>
                <Route path="/" component={Layout} />                               
              </Switch>              
            </ScrollTop>
          </ConnectedRouter>
        </div>
      </Provider>
    );
  }
}

export default Root;