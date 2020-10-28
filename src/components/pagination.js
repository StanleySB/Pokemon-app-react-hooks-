import React from 'react';
import { Link } from 'react-router-dom';
import { range } from '../utils';

// Отдельный item пагинации, вся логика ниже
const PaginationItem = ({ page, currentPage, url }) => {
  const liClasses = {
    pageItem: currentPage === page ? 'active page-item' : 'page-item',
  };
  return (
    <li className={liClasses.pageItem}>
      <Link
        style={{ height: '38px' }}
        className="page-link"
        to={`${url}?page=${page}`}
      >
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

  //Если нет страниц, не рендерить компонент
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
    <ul className="pagination justify-content-center align-items-center my-3 row">
      {currentPage > paginationOffset + 1 ? (
        <li className="page-item">
          <Link
            className="page-link"
            to={`${url}?page=1`}
            style={{ height: '38px' }}
          >
            1
          </Link>
        </li>
      ) : null}
      {currentPage > 1 ? (
        <li className="page-item">
          <Link
            className="page-link"
            style={{ height: '38px' }}
            to={`${url}?page=${currentPage - 1}`}
          >
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              className="bi bi-arrow-left"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
              />
            </svg>
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
        <li className="page-item">
          <Link
            className="page-link"
            to={`${url}?page=${currentPage + 1}`}
            style={{ height: '38px' }}
          >
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              className="bi bi-arrow-right"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
              />
            </svg>
          </Link>
        </li>
      ) : null}
      {currentPage + paginationOffset + 1 < pages.length ? (
        <li className="page-item">
          <Link
            style={{ height: '38px' }}
            className="page-link"
            to={`${url}?page=${pages.length}`}
          >
            {pages.length}
          </Link>
        </li>
      ) : null}
    </ul>
  );
};

export default Pagination;
