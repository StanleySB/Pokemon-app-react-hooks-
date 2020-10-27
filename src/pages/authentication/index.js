import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { CurrentUserContext } from '../../context/currentUserContext';
import authImitation from '../../hooks/authImitation';
import useLocalStorage from '../../hooks/useLocalStorage';
import { validateEmail, validatePassword } from '../../utils';

const Authentication = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isSuccessfullSubmit, setIsSuccessfullSubmit] = useState(false);
  const [, setToken] = useLocalStorage('token');
  const [{ isLoading, response, error, otp }, doFetch] = authImitation();
  const [currentUserState, setCurrentUserState] = useContext(
    CurrentUserContext
  );
  const [backError, setError] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [isDataValid, setIsDataValid] = useState(false);
  const [isValidInputs, setIsValidInputs] = useState({
    email: true,
    password: true,
  });

  const onHandleSubmit = (e) => {
    e.preventDefault();
    setIsValidInputs({
      email: validateEmail(email),
      password: validatePassword(password),
    });
    if (!isValidInputs.email || !isValidInputs.email) return;
    const user = { email, password };
    doFetch({
      method: 'post',
      data: {
        user,
      },
    });
  };

  useEffect(() => {
    if (error && setError(() => <p>Invalid data</p>));
    if (!response) return;
    console.log('OTP:', otp);
    setIsDataValid(true);
  }, [response, error, otp]);

  const onOtpConfirm = (e) => {
    e.preventDefault();
    if (otp === +otpInput) {
      setToken(response.user.token);
      setCurrentUserState((state) => ({
        ...state,
        isLoading: false,
        isLoggedIn: true,
        currentUser: response.user,
      }));
      setIsSuccessfullSubmit(true);
    }
  };

  if (isSuccessfullSubmit) {
    return <Redirect to="/" />;
  }

  return (
    <>
      {!currentUserState.isLoggedIn ? (
        <div className="container">
          <div className="row">
            <div className="col-md-4 mx-auto" style={{ marginTop: '25vh' }}>
              <h1>Auth</h1>
              {!isDataValid && (
                <form onSubmit={onHandleSubmit}>
                  <div className="form-group">
                    <label htmlFor="loginInput">Login</label>
                    <input
                      type="email"
                      className="form-control"
                      id="loginInput"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {!isValidInputs.email ? <p>Некорректный email</p> : null}
                  </div>
                  <div className="form-group">
                    <label htmlFor="passwordInput">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="passwordInput"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {!isValidInputs.password ? (
                      <p>Некорректный password</p>
                    ) : null}
                  </div>
                  {backError && backError}
                  <button
                    disabled={isLoading}
                    type="submit"
                    className="btn btn-primary"
                  >
                    Log in
                  </button>
                </form>
              )}
              {isDataValid && (
                <form onSubmit={onOtpConfirm}>
                  <div className="form-group">
                    <label htmlFor="otpInput">Otp</label>
                    <input
                      type="text"
                      className="form-control"
                      id="otpInput"
                      onChange={(e) => setOtpInput(e.target.value)}
                    />
                  </div>
                  {backError && backError}
                  <button
                    disabled={isLoading}
                    type="submit"
                    className="btn btn-primary"
                  >
                    Confirm
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};

export default Authentication;
