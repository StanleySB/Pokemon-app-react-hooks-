import React, { useEffect } from 'react';
import useFetch from '../../hooks/useFetch';

const CardItem = (props) => {
  const [{ isLoading, response, error }, doFetch] = useFetch(
    `/cards/${props.match.params.id}`
  );
  useEffect(() => {
    doFetch();
  }, [doFetch]);

  console.log(props);

  return (
    <div className="container">
      <div className="card card-item my-3">
        <div className="row no-gutters">
          {!response && isLoading && <h1>Loading...</h1>}
          {!response && error && <h1>error...</h1>}
          {response && (
            <>
              <div className="col-md-6">
                {response.data.card.imageUrlHiRes && (
                  <img
                    src={response.data.card.imageUrlHiRes}
                    alt={`${response.data.card.name} img`}
                    style={{ maxWidth: '100%' }}
                    className="card-img"
                  />
                )}

                {(response.data.card.ability && (
                  <div className="card-item__description m-4">
                    {response.data.card.ability.text}{' '}
                  </div>
                )) ||
                  (response.data.card.text && (
                    <div className="card-item__description m-4">
                      {response.data.card.text.map((textItem) => textItem)}{' '}
                    </div>
                  )) ||
                  null}
              </div>
              <div className="col-md-5 ml-5">
                <div className="card-body">
                  <h1 className="card-title">
                    {response.data.card.name
                      ? response.data.card.name
                      : "Doesn't have name???"}
                  </h1>
                  {response.data.card.types && (
                    <div className="card-text card__type">
                      Types: {response.data.card.types}
                    </div>
                  )}
                  {response.data.card.subtype && (
                    <div className="card-text card__subtype">
                      SubType: {response.data.card.subtype}
                    </div>
                  )}
                  <hr />
                  <div className="card-text card__attacks">
                    <strong>Attacks:</strong>
                    {response.data.card.attacks
                      ? response.data.card.attacks.map((item) => (
                          <div key={item.name}>
                            <div>Attack Name: {item.name}</div>
                            {item.text && <div>Description: </div> && item.text}
                            <div>
                              Cost:{' '}
                              {item.cost.map((cost, index) => (
                                <span key={index}>{`${cost}`}, </span>
                              ))}
                            </div>
                          </div>
                        ))
                      : ' N/A'}
                    <hr />
                  </div>
                  <div className="card-text card__resistance">
                    <strong>Resistance:</strong>
                    {response.data.card.resistances
                      ? response.data.card.resistances.map((item, index) => (
                          <p key={index}>
                            Type: {item.type}
                            <br />
                            Value: {item.value}
                          </p>
                        ))
                      : ' N/A'}
                  </div>
                  <hr />
                  <div className="card-text card__evolves-from">
                    <strong>Evolves From: </strong>
                    {response.data.card.evolvesFrom ? (
                      <span>{response.data.card.evolvesFrom}</span>
                    ) : (
                      ' N/A'
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardItem;

// Почти хорошо, еще раз посмотреть перед отправкой
