import React from 'react';
import { Link } from 'react-router-dom';

const Pagination = ({ dataPerPage, totalData, paginate, currentPage }) => {
  const pageNumber = [];
  let excracted = [];
  for (let i = 1; i <= Math.ceil(totalData / dataPerPage); i++) {
    pageNumber.push(i);
  }
 

  if (pageNumber.length > 10) {
    excracted = pageNumber.slice(currentPage - 1, currentPage + 4);
  } else {
    excracted = [...pageNumber];
  }

  return (
    <div className='pagination'>
      <Link to='#' onClick={() => paginate(1)} key={`${currentPage - 1}th`}>
        <i className='fa fa-angle-double-left' style={{ color: 'black' }}></i>
      </Link>
      <Link
        to='#'
        onClick={() => paginate(currentPage === 1 ? 1 : currentPage - 1)}
        key={`${currentPage - 1}tr`}
      >
        <i className='fa fa-angle-left' style={{ color: 'black' }}></i>
      </Link>
      {excracted.map((nmbr) =>
        currentPage && currentPage === nmbr ? (
          <Link
            to='#'
            className='active'
            onClick={() => paginate(nmbr)}
            key={nmbr}
          >
            {nmbr}
          </Link>
        ) : (
          <Link to='#' onClick={() => paginate(nmbr)} key={nmbr}>
            {nmbr}
          </Link>
        )
      )}
      <Link
        to='#'
        onClick={() =>
          paginate(
            currentPage === pageNumber.length
              ? pageNumber.length
              : currentPage + 1
          )
        }
        key={`${currentPage + 1}tr`}
      >
        <i className='fa fa-angle-right' style={{ color: 'black' }}></i>
      </Link>
      <Link
        to='#'
        onClick={() => paginate(pageNumber.length)}
        key={`${currentPage + 1}th`}
      >
        <i className='fa fa-angle-double-right' style={{ color: 'black' }}></i>
      </Link>
    </div>
  );
};

export default Pagination;
