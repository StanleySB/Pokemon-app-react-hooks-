import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import TopBar from './components/topBar';
import Routes from './routes';

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<TopBar />
			<Routes />
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
);
