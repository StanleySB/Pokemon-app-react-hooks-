import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import CurrentUserChecker from './components/currentUserChecker';
import { CurrentUserProvider } from './context/currentUserContext';
import Routes from './routes';

ReactDOM.render(
  <CurrentUserProvider>
    <CurrentUserChecker>
      <React.StrictMode>
        {/* <BrowserRouter basename={process.env.PUBLIC_URL}> */}
        <HashRouter>
          <Routes />
        </HashRouter>
        {/* </BrowserRouter> */}
      </React.StrictMode>
    </CurrentUserChecker>
  </CurrentUserProvider>,
  document.getElementById('root')
);
