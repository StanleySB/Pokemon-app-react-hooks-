import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import TopBar from './components/topBar';
import { CurrentUserProvider } from './context/currentUserContext';
import Routes from './routes';

ReactDOM.render(
  <CurrentUserProvider>
    <React.StrictMode>
      <BrowserRouter>
        <TopBar />
        <Routes />
      </BrowserRouter>
    </React.StrictMode>
  </CurrentUserProvider>,
  document.getElementById('root')
);
