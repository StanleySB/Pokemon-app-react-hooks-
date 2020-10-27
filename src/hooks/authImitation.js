import { useState, useEffect, useCallback } from 'react';
import useLocalStorage from './useLocalStorage';

export default () => {
  const [token] = useLocalStorage('token');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState({});
  const [otp, setOtp] = useState('');

  const doFetch = useCallback((options = {}) => {
    setOptions(options);
    setIsLoading(true);
  }, []);

  useEffect(() => {
    const requestOptions = {
      ...options,
      ...{
        headers: {
          authorization: token ? `Token ${token}` : '',
        },
      },
    };
    console.log(requestOptions);
    if (!isLoading) return;
    if (requestOptions.headers.authorization) {
      // В компоненте currentUserChecker идет запрос на указанный адрес с проверкой является
      // ли токен из localstorage реальным. В реалиях не серверной авторизации пока не придумал
      // как добиться такой проверки
      setIsLoading(false);
      setResponse({
        user: {
          name: 'KODEr',
          id: 1,
          token: requestOptions.headers.authorization,
        },
      });
    }
    if (
      requestOptions.data &&
      requestOptions.data.user.email === 'kode@kode.ru' &&
      requestOptions.data.user.password === 'Enk0deng'
    ) {
      setIsLoading(false);
      setOtp(Math.ceil(Math.random() * 10000));
      setResponse({
        user: {
          name: 'KODEr',
          id: 1,
          token: Math.random(),
        },
      });
    } else {
      setIsLoading(false);
      setError('Invalid data');
    }
  }, [isLoading, options, token]);
  return [
    {
      isLoading,
      response,
      error,
      otp,
    },
    doFetch,
  ];
};
