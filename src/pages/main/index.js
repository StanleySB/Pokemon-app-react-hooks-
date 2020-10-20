import React from 'react';
import Cards from './components/cards';
import Select from './components/select';

const Main = (props) => {
  return (
    <div className="container">
      <div className="select">
        <Select url="types" label="Types" />
        <Select url="subtypes" label="SubTypes" />
      </div>
      <div className="cards">
        <Cards match={props.match} location={props.location} />
      </div>
    </div>
  );
};

export default Main;
