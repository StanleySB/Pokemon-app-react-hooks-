import React from 'react';
import { NavLink } from 'react-router-dom';

const TopBar = () => {
  return (
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
  );
};

export default TopBar;
