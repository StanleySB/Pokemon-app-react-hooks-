import React, { useEffect } from 'react';
import useFetch from '../../hooks/useFetch';

const CardItem = (props) => {
  const [{ isLoading, response, error }, doFetch] = useFetch(
    `/cards/${props.match.params.id}`
  );
  useEffect(() => {
    doFetch();
  }, [doFetch]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>error...</h1>;
  }
  return (
    <div className="card">
      {response && (
        <>
          <h1>{response.card.name}</h1>
          <img src={response.card.imageUrlHiRes} alt="" />
        </>
      )}
    </div>
  );
};

export default CardItem;
