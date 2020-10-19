import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';

const Cards = (props) => {
  const [{ isLoading, response, error }, doFetch] = useFetch('/cards');
  const [params, setParams] = useState({
    method: 'get',
    params: {
      types:
        props.match.path === '/cards/types/:id' ? props.match.params.id : null,
      subtype:
        props.match.path === '/cards/subtypes/:id'
          ? props.match.params.id
          : null,
      pageSize: 10,
      page: 6,
    },
  });
  useEffect(() => {
    setParams({
      method: 'get',
      params: {
        types:
          props.match.path === '/cards/types/:id'
            ? props.match.params.id
            : null,
        subtype:
          props.match.path === '/cards/subtypes/:id'
            ? props.match.params.id
            : null,
        pageSize: 10,
        page: 1,
      },
    });
  }, [props.match.params.id, props.match.path]);

  //сделать что-то с повторением кода выше !!!!!!

  useEffect(() => {
    doFetch(params);
  }, [doFetch, params]);

  if (isLoading || !response) {
    return <div className="loading">loading</div>;
  }
  if (error) {
    return <div className="error">Error</div>;
  }

  return (
    <div className="cards">
      {response.cards.map((card) => (
        <NavLink to={`/cards/${card.id}`} key={card.id} className="card">
          <img src={card.imageUrl} alt={`${card.name} img`} />
          <div className="name">{card.name}</div>
          <div className="artist">{card.artist}</div>
        </NavLink>
      ))}
    </div>
  );
};

export default Cards;
