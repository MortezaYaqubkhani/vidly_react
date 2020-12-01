import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';


const Pagination = (props) => {
  const {itemsCount, pageSize, currentPage, onPageChange} = props;

  const page = Math.ceil(itemsCount / pageSize);
  if (page === 1) return null;
  const pages = _.range(1, page + 1);
  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li
            style={{cursor: 'pointer'}}
            key={page}
            className={page === currentPage ? 'page-item active' : 'page-item'}
          >
            <a onClick={() => onPageChange(page)} className="page-link">
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

//to check the types of prop values
Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
