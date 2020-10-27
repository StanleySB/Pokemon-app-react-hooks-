//Core
import { useContext, useEffect } from 'react';
import { CurrentUserContext } from '../context/currentUserContext';
import authImitation from '../hooks/useAuthImitation';

import useLocalStorage from '../hooks/useLocalStorage';

//Context
const CurrentUserChecker = ({ children }) => {
  const [{ response }, doFetch] = authImitation();
  const [, setCurrentUserState] = useContext(CurrentUserContext);
  const [token] = useLocalStorage('token');

  useEffect(() => {
    if (!token) {
      setCurrentUserState((state) => ({
        ...state,
        isLoggedIn: false,
      }));
      return;
    }

    doFetch(); // отправка запроса на сервер для проверки токена из localstorage

    setCurrentUserState((state) => ({
      ...state,
      isLoading: true,
    }));
  }, [setCurrentUserState, token, doFetch]);

  useEffect(() => {
    if (!response) return;

    setCurrentUserState((state) => ({
      ...state,
      isLoading: false,
      isLoggedIn: true,
      currentUser: response.user,
    }));
  }, [response, setCurrentUserState]);

  return children;
};

export default CurrentUserChecker;
