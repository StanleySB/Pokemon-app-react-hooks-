import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [token] = useLocalStorage('token');
  //Идет проверка токена, на практике этот токен нужно отправлять на сервер для проверки его валидности
  return (
    <Route
      {...rest}
      render={(props) =>
        token ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  );
};
export default PrivateRoute;
