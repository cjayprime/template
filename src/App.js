import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
//import configureStore from './config/configureStore';
// import { Provider } from 'react-redux';
import ReduxProvider from './bundles/client/components/Redux/Provider';
import ApolloProvider from './bundles/client/components/Apollo/Provider';
import Routes from './Routes';
import ScrollToTop from './utils/ScrollToTop';
import './assets/base.scss';
import CssBaseline from '@material-ui/core/CssBaseline';

// const store = configureStore();

class App extends Component {
  render() {
    return (
      <ReduxProvider>
        <ApolloProvider>
          <BrowserRouter>
            <CssBaseline />
            <ScrollToTop>
              <Routes />
            </ScrollToTop>
          </BrowserRouter>
        </ApolloProvider>
      </ReduxProvider>
    );
  }
}

export default App;
