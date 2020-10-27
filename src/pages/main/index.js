import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Error404 from '../../components/error404';
import Loading from '../../components/loading';
import Pagination from '../../components/pagination';
import Select from '../../components/select';
import TopBar from '../../components/topBar';
import useFetch from '../../hooks/useFetch';
import { cardLimit, inputFilter } from '../../utils';

const Main = (props) => {
  //hooks
  //types hooks
  const [
    { isLoading: isLoadingTypes, response: responseTypes, error: errorTypes },
    doFetchTypes,
  ] = useFetch(`/types`);
  const [
    {
      isLoading: isLoadingSubTypes,
      response: responseSubTypes,
      error: errorSubTypes,
    },
    doFetchSubTypes,
  ] = useFetch(`/subtypes`);
  const [currentSelect, setCurrentSelect] = useState({});
  const [subtypesFilter, setSubtypesFilter] = useState();
  const [typesFilter, setTypesFilter] = useState();
  const [inputsValues, setInputsValues] = useState({
    type: '',
    subtype: '',
  });
  //cards hooks
  const [
    { isLoading: isLoadingCards, response: responseCards, error: errorCards },
    doFetchCards,
  ] = useFetch('/cards');
  const [params, setParams] = useState('');

  //получение селектов
  useEffect(() => {
    doFetchTypes();
    doFetchSubTypes();
  }, [doFetchTypes, doFetchSubTypes]);

  // добавление типов и подтипов в state для фильта

  useEffect(() => {
    setSubtypesFilter(responseSubTypes && responseSubTypes.data.subtypes);
    setTypesFilter(responseTypes && responseTypes.data.types);
  }, [setSubtypesFilter, setTypesFilter, responseSubTypes, responseTypes]);

  // сетим параметры селектов, если они заданы в url
  useEffect(() => {
    if (!currentSelect.subtype && props.match.params.subtypeId) {
      setCurrentSelect({
        ...currentSelect,
        subtype: props.match.params.subtypeId,
      });
    }
    if (!currentSelect.type && props.match.params.typeId) {
      setCurrentSelect({
        ...currentSelect,
        type: props.match.params.typeId,
      });
    }
  }, [props.match.params.subtypeId, props.match.params.typeId, currentSelect]);

  //сетим параметры для fetch
  useEffect(() => {
    setParams({
      method: 'get',
      params: {
        types: currentSelect.type || props.match.params.typeId || null,
        subtype: currentSelect.subtype || props.match.params.subtypeId || null,
        pageSize: cardLimit,
        page: parseInt(props.location.search.replace(/[^\d]/g, '')) || 1,
      },
    });
  }, [props.match, props.location.search, currentSelect]);

  // запрос на сервер с указанными параметрами
  useEffect(() => {
    params && doFetchCards(params);
  }, [doFetchCards, params]);

  return (
    <>
      <TopBar />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4 selects">
            {/* рендер селектов происходит здесь для того чтобы просто сетить данные */}
            <Select
              error={errorTypes ? errorTypes : null}
              isLoading={isLoadingTypes ? isLoadingTypes : null}
              label={'Types'}
            >
              {responseTypes && (
                <input
                  className="form-control bg-secondary text-white"
                  type="text"
                  onChange={(e) => {
                    inputFilter(responseTypes.data.types, e, setTypesFilter);
                    setInputsValues({
                      ...inputsValues,
                      type: e.target.value,
                    });
                  }}
                  defaultValue={inputsValues.type || ''}
                />
              )}
              <li className="list-group-item">
                <Link
                  className="text-dark"
                  onClick={() =>
                    setCurrentSelect({
                      ...currentSelect,
                      type: null,
                    })
                  }
                  to={
                    currentSelect.subtype
                      ? `/cards/subtype/${currentSelect.subtype}`
                      : '/'
                  }
                >
                  All Types
                </Link>
              </li>
              {typesFilter &&
                typesFilter.map((type, index) => (
                  <li key={index} className="list-group-item">
                    <Link
                      className="text-dark"
                      onClick={() =>
                        setCurrentSelect({
                          ...currentSelect,
                          type: type,
                        })
                      }
                      to={
                        currentSelect.subtype
                          ? `/cards/type/${type}/subtype/${currentSelect.subtype}`
                          : `/cards/type/${type}`
                      }
                    >
                      {type}
                    </Link>
                  </li>
                ))}
            </Select>
            <Select
              error={errorSubTypes ? errorSubTypes : null}
              isLoading={isLoadingSubTypes ? isLoadingSubTypes : null}
              label="Subtypes"
            >
              {responseSubTypes && (
                <input
                  className="form-control bg-secondary text-white"
                  type="text"
                  onChange={(e) => {
                    inputFilter(
                      responseSubTypes.data.subtypes,
                      e,
                      setSubtypesFilter
                    );
                    setInputsValues({
                      ...inputsValues,
                      subtype: e.target.value,
                    });
                  }}
                  defaultValue={inputsValues.subtype || ''}
                />
              )}
              <li className="list-group-item ">
                <Link
                  className="text-dark"
                  onClick={() =>
                    setCurrentSelect({
                      ...currentSelect,
                      subtype: null,
                    })
                  }
                  to={
                    currentSelect.type
                      ? `/cards/type/${currentSelect.type}`
                      : '/'
                  }
                >
                  All Subtypes
                </Link>
              </li>
              {subtypesFilter &&
                subtypesFilter.map((subtype, index) => (
                  <li key={index} className="list-group-item">
                    <Link
                      className="text-dark"
                      onClick={() =>
                        setCurrentSelect({
                          ...currentSelect,
                          subtype: subtype,
                        })
                      }
                      to={
                        currentSelect.type
                          ? `/cards/type/${currentSelect.type}/subtype/${subtype}`
                          : `/cards/subtype/${subtype}`
                      }
                    >
                      {subtype}
                    </Link>
                  </li>
                ))}
            </Select>
          </div>
          <div className="col-md-8 cards">
            <div
              className="row justify-content-center"
              style={{ overflow: 'hidden' }}
            >
              {errorCards && <div className="error">Error</div>}
              {isLoadingCards && <Loading />}
              {!isLoadingCards &&
                responseCards &&
                (responseCards.data.cards.length === 0 ? <Error404 /> : null)}
              {!isLoadingCards &&
                responseCards &&
                responseCards.data.cards.map((card) => (
                  <div className="col-md-4 rounded" key={card.id}>
                    <div className="card mb-3 bg-light">
                      <img
                        className="card-img-top"
                        src={card.imageUrl}
                        alt={`${card.name} img`}
                      />
                      <div className="card-body">
                        <h3 className="card-title">{card.name}</h3>
                        <div className="card-text">Artist: {card.artist}</div>
                      </div>
                      <Link
                        className="btn btn-dark"
                        to={{
                          pathname: `/cards/${card.id}`,
                          state: { from: props.location },
                        }}
                      >
                        Подробнее
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
            {responseCards && (
              <Pagination
                total={responseCards.headers['total-count']}
                limit={cardLimit}
                currentPage={
                  parseInt(props.location.search.replace(/[^\d]/g, '')) || 1
                }
                url={`${props.match.url}`}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
