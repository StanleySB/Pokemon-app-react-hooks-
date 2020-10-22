//Core
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
//Hooks
import useFetch from '../../../hooks/useFetch';

const Select = (props) => {
  //hooks
  const [{ isLoading, response, error }, doFetch] = useFetch(`/${props.url}`);
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState();

  //useHooks
  useEffect(() => {
    doFetch();
  }, [doFetch]);

  const toggleIsOpen = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
      setFilter(response.data[props.url]);
    }
  };

  //setFilter вынести из открытия, появляются ошибки
  //filter

  const inputFilter = (arr, event) => {
    let result = [];
    arr.forEach((value) => {
      if (value.toLowerCase().indexOf(event.target.value) === 0) {
        result.push(value);
      }
      return value;
    });
    setFilter(result);
    return result;
  };

  // !! отрефакторить компонент
  //render
  return (
    <div className="card">
      <button onClick={() => toggleIsOpen()}>
        {<div className="card-header">{props.label}</div> || 'Loading..'}
      </button>
      {isOpen && !response && isLoading && <span>Loading...</span>}
      {isOpen && !response && error && <span>error...</span>}
      {isOpen && response.data[props.url] && (
        <ul className="list-group list-group-flush">
          <input
            type="text"
            onInput={(e) => {
              inputFilter(response.data[props.url], e);
            }}
          />
          {filter.map((value) => (
            <li className="list-group-item" key={value}>
              <NavLink to={`/cards/${props.url}/${value}`}>{value}</NavLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;

// Додумать реализацию фильтра по типу + подтипу
