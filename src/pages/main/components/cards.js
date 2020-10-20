import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Pagination from '../../../components/pagination';
import useFetch from '../../../hooks/useFetch';
import { cardLimit } from '../../../utils';

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
      pageSize: cardLimit,
      page: parseInt(props.location.search.replace(/[^\d]/g, '')),
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
        pageSize: cardLimit,
        page: parseInt(props.location.search.replace(/[^\d]/g, '')),
      },
    });
  }, [props.match.params.id, props.match.path, props.location.search]);

  // console.log(parseInt(props.location.search.replace(/[^\d]/g, '')));
  // console.log(response);
  //сделать что-то с повторением кода выше !!!!!!

  useEffect(() => {
    doFetch(params);
  }, [doFetch, params]);

  if (isLoading || !response) {
    return <div className="loading">Loading</div>;
  }
  if (error) {
    return <div className="error">Error</div>;
  }

  return (
    <div className="cards">
      {response.data.cards.map((card) => (
        <NavLink to={`/cards/${card.id}`} key={card.id} className="card">
          <img src={card.imageUrl} alt={`${card.name} img`} />
          <div className="name">{card.name}</div>
          <div className="artist">{card.artist}</div>
        </NavLink>
      ))}
      <Pagination
        total={response.headers['total-count']}
        limit={cardLimit}
        currentPage={parseInt(props.location.search.replace(/[^\d]/g, '')) || 1}
        url={`${props.match.url}`}
      />
    </div>
  );
};

export default Cards;
