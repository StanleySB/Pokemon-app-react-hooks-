import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../context/currentUserContext';
import logoImg from '../images/logo.png';

const TopBar = (props) => {
  const [, setCurrentUserState] = useContext(CurrentUserContext);
  //Проверка пропс (на детальной странице передаются, на общей нет)
  const [prevPage] = useState(
    props.location && props.location.state && props.location.state.from.pathname
  );
  //Логаут
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
          {props.detail ? (
            <Link
              className="btn btn-light"
              style={{ height: '40px' }}
              to={(prevPage && prevPage) || '/'}
            >
              Back
            </Link>
          ) : (
            <div className="logo" style={{ height: '40px', padding: '0' }}>
              <img src={logoImg} alt="logo" height="100%" />
            </div>
          )}

          <Link
            className="text-light"
            onClick={() => logoutHanlder()}
            to="/login"
          >
            Logout
          </Link>
        </div>
      </nav>
    </>
  );
};

export default TopBar;
