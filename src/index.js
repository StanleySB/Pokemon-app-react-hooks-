import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import CurrentUserChecker from './components/currentUserChecker';
import TopBar from './components/topBar';
import { CurrentUserProvider } from './context/currentUserContext';
import Routes from './routes';

ReactDOM.render(
  <CurrentUserProvider>
    <CurrentUserChecker>
      <React.StrictMode>
        <BrowserRouter>
          <TopBar />
          <Routes />
        </BrowserRouter>
      </React.StrictMode>
    </CurrentUserChecker>
  </CurrentUserProvider>,
  document.getElementById('root')
);
