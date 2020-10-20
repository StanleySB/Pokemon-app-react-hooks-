//Core
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
//Hooks
import useFetch from '../../../hooks/useFetch';

const Select = (props) => {
  //hooks
  const [{ isLoading, response, error }, doFetch] = useFetch(`/${props.url}`);
  const [isOpen, setIsOpen] = useState(false);

  //useHooks
  useEffect(() => {
    doFetch();
  }, [doFetch]);

  const toggleIsOpen = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  //render
  if (isLoading || !response) {
    return <p>Loading</p>;
  }
  if (error) {
    return <h1>Some Error</h1>;
  }
  return (
    <div className="select">
      <button onClick={() => toggleIsOpen()}>
        {props.label || 'Loading..'}
      </button>
      {isOpen &&
        response.data[props.url] &&
        response.data[props.url].map((value) => (
          <NavLink to={`/cards/${props.url}/${value}`} key={value}>
            {value}
          </NavLink>
        ))}
    </div>
  );
};

export default Select;
