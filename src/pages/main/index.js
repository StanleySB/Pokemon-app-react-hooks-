import React from 'react';
import Cards from './components/cards';
import Pagination from './components/pagination';
import Select from './components/select';

const Main = (props) => {
  return (
    <div className="container">
      <div className="select">
        <Select url="types" label="Types" />
        <Select url="subtypes" label="SubType" />
      </div>
      <div className="cards">
        <Cards match={props.match} />
      </div>
      <Pagination />
    </div>
  );
};

export default Main;
