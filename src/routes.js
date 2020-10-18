import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Article from './pages/article';
import Authentication from './pages/authentication';
import Main from './pages/main';

export default () => {
	return (
		<Switch>
			<Route path="/" exact component={Main} />
			<Route path="/login" component={Authentication} />
			<Route path="/articles/:slug" component={Article} />
		</Switch>
	);
};
