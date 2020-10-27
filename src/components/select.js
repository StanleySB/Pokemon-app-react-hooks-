import React, { useState } from 'react';

const Select = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleIsOpen = () => {
    if (isOpen) setIsOpen(false);
    if (!isOpen) setIsOpen(true);
  };

  return (
    <div className="card">
      <button className="btn btn-dark p-0" onClick={() => toggleIsOpen()}>
        {(
          <div className="card-header d-flex justify-content-between align-items-center">
            {props.label}
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              className="bi bi-arrow-down"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"
              />
            </svg>
          </div>
        ) || 'Loading..'}
      </button>
      {isOpen && (
        <ul className="list-group list-group-flush">
          {props.error && <li className="list-group-item text-dark">Error</li>}
          {props.isLoading && (
            <li className="list-group-item text-dark">Loading...</li>
          )}
          {props.children}
        </ul>
      )}
    </div>
  );
};

export default Select;
