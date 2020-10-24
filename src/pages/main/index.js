import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { CurrentUserContext } from '../../context/currentUserContext';
import Cards from './components/cards';
import Select from './components/select';

const Main = (props) => {
  const [currentUserState] = useContext(CurrentUserContext);
  console.log(currentUserState.isLoggedIn);
  return (
    <>
      {currentUserState.isLoggedIn ? (
        <div className="container mt-5">
          <div className="row">
            <div className="select col-md-4">
              <Select url="types" label="Types" match={props.match} />
              <Select url="subtypes" label="SubTypes" />
            </div>
            <div className="col-md-8">
              <Cards match={props.match} location={props.location} />
            </div>
          </div>
        </div>
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
};

export default Main;
