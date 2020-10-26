import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import CardItem from './pages/cardItem';
import Authentication from './pages/authentication';
import Main from './pages/main';

export default () => {
  return (
    <Switch>
      <Route path="/login" component={Authentication} />
      <Route path="/" exact component={Main} />
      <Route path="/login" component={Authentication} />
      <Route path="/cards/:id" exact component={CardItem} />
      <Route path="/cards/type/:typeId" exact component={Main} />
      <Route path="/cards/subtype/:subtypeId" component={Main} />
      <Route path="/cards/type/:typeId/subtype/:subtypeId" component={Main} />
      <Redirect to="/" />
    </Switch>
  );
};
