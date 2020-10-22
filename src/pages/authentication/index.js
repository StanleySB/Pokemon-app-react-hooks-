import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { CurrentUserContext } from '../../context/currentUserContext';

const Authentication = () => {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [, setIsSuccessfulSubmit] = useState(false);
  const [currentUserState, setCurrentUserState] = useContext(
    CurrentUserContext
  );
  const [error, setError] = useState('');

  const onHandleSubmit = (e) => {
    e.preventDefault();
    if (username === 'kode@kode.ru' && password === 'Enk0deng') {
      localStorage.setItem('token', Math.random()); // token из response
      setCurrentUserState((state) => ({
        ...state,
        isLoggedIn: true,
        isLoading: false,
        currentUser: 'Kode', //
      }));
      setIsSuccessfulSubmit(true);
    } else {
      setError(() => <p className="error">Incorrect data</p>);
    }
  };

  if (currentUserState.isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 mx-auto" style={{ marginTop: '25vh' }}>
          <h1>Auth</h1>
          <form onSubmit={onHandleSubmit}>
            <div className="form-group">
              <label htmlFor="loginInput">Login</label>
              <input
                type="text"
                className="form-control"
                id="loginInput"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="passwordInput">Password</label>
              <input
                type="password"
                className="form-control"
                id="passwordInput"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && error}
            <button type="submit" className="btn btn-primary">
              Log in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
