import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { CurrentUserContext } from '../context/currentUserContext';

const TopBar = () => {
  const [currentUserState] = useContext(CurrentUserContext);
  return (
    <>
      {currentUserState.isLoggedIn ? (
        <nav className="navbar navbar-dark bg-dark d-flex justify-content-between">
          <div className="container">
            <NavLink className="btn btn-primary" to="/">
              Back
            </NavLink>
            <a className="" href="/">
              Logout
            </a>
          </div>
        </nav>
      ) : null}
    </>
  );
};

export default TopBar;
