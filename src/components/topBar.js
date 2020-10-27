import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { CurrentUserContext } from '../context/currentUserContext';

const TopBar = () => {
  const [, setCurrentUserState] = useContext(CurrentUserContext);

  const logoutHanlder = () => {
    setCurrentUserState((state) => ({
      ...state,
      isLoading: false,
      isLoggedIn: null,
      currentUser: null,
    }));
    localStorage.removeItem('token');
  };
  return (
    <>
      <nav className="navbar navbar-dark bg-dark d-flex justify-content-between">
        <div className="container">
          <NavLink className="btn btn-primary" to="/">
            Back
          </NavLink>
          <NavLink onClick={() => logoutHanlder()} className="" to="/login">
            Logout
          </NavLink>
        </div>
      </nav>
    </>
  );
};

export default TopBar;
