import React from 'react';
import { Link } from 'react-router-dom';
import { range } from '../utils';

const PaginationItem = ({ page, currentPage, url }) => {
  const liClasses = {
    pageItem: currentPage === page ? 'active page-item' : 'page-item',
  };
  return (
    <li className={liClasses.pageItem}>
      <Link className="page-link" to={`${url}?page=${page}`}>
        {page}
      </Link>
    </li>
  );
};

const Pagination = ({ total, limit, url, currentPage }) => {
  const pagesCount = Math.ceil(total / limit); // подсчет количества страниц
  const pages = range(1, pagesCount); // массив по количеству страниц
  const paginationOffset = 3; // отступы справа и слева для страниц при пагинации
  //Например для страницы 5 при отступе 3 будет [first page, prev page, 5,6,7 nextpage, lastpage]
  const arrayOfRenderedPages = []; // Массив в который будут записываться числа для пагинации

  if (pages.length === 0) return null;

  const conditionForRender = () => {
    // Условия отсупов при пагинации
    if (pages.length < paginationOffset * 2) return 1; // для рендера пагинации с маленьким количеством страниц
    if (currentPage + paginationOffset >= pages.length)
      // для рендера последних страниц
      return pages.length - paginationOffset * 2 + 1; // +1 для корректного рендера последней страницы
    if (currentPage - paginationOffset > 0)
      // для рендера страниц по центру массива
      return currentPage - paginationOffset;
    if (currentPage - paginationOffset <= 0) return 1; // для рендера первых страниц
  };
  const paginationRender = () => {
    //Рендер пагинации
    for (let page = conditionForRender(); page - 1 < pages.length; page++) {
      arrayOfRenderedPages.push(page);
      if (pages.length === page) {
        // если страницы закончились
        return [...arrayOfRenderedPages];
      }
      if (arrayOfRenderedPages.length >= paginationOffset * 2) {
        // если массив заполнился
        return [...arrayOfRenderedPages];
      }
    }
  };
  return (
    <ul className="pagination justify-content-center my-5">
      {currentPage > paginationOffset + 1 ? (
        <li className="page-item">
          <Link className="page-link" to={`${url}?page=1`}>
            First page
          </Link>
        </li>
      ) : null}
      {currentPage > 1 ? (
        <li className="">
          <Link className="page-link" to={`${url}?page=${currentPage - 1}`}>
            Prev page
          </Link>
        </li>
      ) : null}
      {paginationRender().map((page) => (
        <PaginationItem
          page={page}
          currentPage={currentPage}
          url={url}
          key={page}
        />
      ))}
      {currentPage + 1 <= pages.length ? (
        <li className="">
          <Link className="page-link" to={`${url}?page=${currentPage + 1}`}>
            Next page
          </Link>
        </li>
      ) : null}
      {currentPage + paginationOffset + 1 < pages.length ? (
        <li className="">
          <Link className="page-link" to={`${url}?page=${pages.length}`}>
            Last page
          </Link>
        </li>
      ) : null}
    </ul>
  );
};

export default Pagination;
