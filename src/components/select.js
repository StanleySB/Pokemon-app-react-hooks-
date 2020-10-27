import React, { useState } from 'react';

const Select = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleIsOpen = () => {
    if (isOpen) setIsOpen(false);
    if (!isOpen) setIsOpen(true);
  };

  return (
    <div className="card">
      <button onClick={() => toggleIsOpen()}>
        {<div className="card-header">{props.label}</div> || 'Loading..'}
      </button>
      {isOpen && (
        <ul className="list-group list-group-flush">
          {props.error && <li className="list-group-item">Error</li>}
          {props.isLoading && <li className="list-group-item">Loading...</li>}
          {props.children}
        </ul>
      )}
    </div>
  );
};

export default Select;
