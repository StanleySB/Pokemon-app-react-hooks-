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
      page: parseInt(props.location.search.replace(/[^\d]/g, '')) || 1,
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
        page: parseInt(props.location.search.replace(/[^\d]/g, '')) || 1,
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
    <>
      <div className="row">
        {response.data.cards.map((card) => (
          <div className="col-md-4 rounded" key={card.id}>
            <div className="card mt-3">
              <img
                className="card-img-top"
                src={card.imageUrl}
                alt={`${card.name} img`}
              />
              <div className="card-body">
                <h3 className="card-title">{card.name}</h3>
                <div className="card-text">Artist: {card.artist}</div>
              </div>
              <NavLink className="btn btn-primary" to={`/cards/${card.id}`}>
                Подробнее
              </NavLink>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        total={response.headers['total-count']}
        limit={cardLimit}
        currentPage={parseInt(props.location.search.replace(/[^\d]/g, '')) || 1}
        url={`${props.match.url}`}
      />
    </>
  );
};

export default Cards;
