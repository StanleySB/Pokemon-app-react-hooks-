import React from 'react';
import Cards from './components/cards';
import Select from './components/select';

const Main = (props) => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="select col-md-4">
          <Select url="types" label="Types" />
          <Select url="subtypes" label="SubTypes" />
        </div>
        <div className="col-md-8">
          <Cards match={props.match} location={props.location} />
        </div>
      </div>
    </div>
  );
};

export default Main;
