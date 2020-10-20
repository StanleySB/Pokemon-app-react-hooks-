import React from 'react';
import { Link } from 'react-router-dom';
import { range } from '../utils';
import './style.css';

const PaginationItem = ({ page, currentPage, url }) => {
  const liClasses = {
    pageItem: currentPage === page ? 'active page-item' : 'page-item',
  };
  return (
    <li className={liClasses.pageItem}>
      <Link to={`${url}?page=${page}`}>{page}</Link>
    </li>
  );
};

const Pagination = ({ total, limit, url, currentPage }) => {
  const pagesCount = Math.ceil(total / limit);
  const pages = range(1, pagesCount);
  const arrayOfRenderedPages = [];
  const conditionForRender = () => {
    if (currentPage + 5 >= pages.length) return pages.length - 10;
    if (currentPage - 5 > 0) return currentPage - 5;
    return currentPage;
  };
  const paginationRender = () => {
    for (let page = conditionForRender(); page < pages.length; page++) {
      arrayOfRenderedPages.push(page);
      if (arrayOfRenderedPages.length >= 10) {
        return [1, ...arrayOfRenderedPages, pages.length];
      }
    }
  };

  //Сделать что-то с единицей при рендере
  return (
    <ul className="pagination">
      {paginationRender().map((page) => (
        <PaginationItem
          page={page}
          currentPage={currentPage}
          url={url}
          key={page}
        />
      ))}
    </ul>
  );
};

export default Pagination;
