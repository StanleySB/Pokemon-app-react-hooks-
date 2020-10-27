import React from 'react';
import errImg from '../images/404.png';

const Error404 = () => {
  return (
    <div className="error404">
      <h1 style={{ textAlign: 'center' }}>
        This is not the pokemon you looking for <hr />
        Error 404
      </h1>
      <div className="img col-md-12 justify-content-center d-flex">
        <img className="w-75" src={errImg} alt="404" />
      </div>
    </div>
  );
};

export default Error404;
