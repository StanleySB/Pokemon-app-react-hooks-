import React, { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import CardItem from './pages/cardItem';
import Authentication from './pages/authentication';
import Main from './pages/main';
import { CurrentUserContext } from './context/currentUserContext';

export default () => {
  const [currentUserState] = useContext(CurrentUserContext);
  return (
    <Switch>
      {!currentUserState.isLoggedIn && (
        <>
          <Route path="/login" component={Authentication} />
          <Redirect to="/login" />
        </>
      )}
      <Route path="/" exact component={Main} />
      <Route path="/login" component={Authentication} />
      <Route path="/cards/:id" exact component={CardItem} />
      <Route path="/cards/types/:id" component={Main} />
      <Route path="/cards/subtypes/:id" component={Main} />
    </Switch>
  );
};

// Убрать ворнинг в роутах
