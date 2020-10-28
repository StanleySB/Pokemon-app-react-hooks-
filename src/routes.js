//core
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
//components
import CardItem from './pages/cardItem';
import Authentication from './pages/authentication';
import Main from './pages/main';
import PrivateRoute from './components/privateRoute';

export default () => {
  return (
    <Switch>
      <Route path="/login" component={Authentication} />
      <PrivateRoute path="/" exact component={Main} />
      <PrivateRoute path="/cards/:id" exact component={CardItem} />
      <PrivateRoute path="/cards/type/:typeId" exact component={Main} />
      <PrivateRoute path="/cards/subtype/:subtypeId" component={Main} />
      <PrivateRoute
        path="/cards/type/:typeId/subtype/:subtypeId"
        component={Main}
      />
      <Redirect to="/" />
    </Switch>
  );
};
