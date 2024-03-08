import React from 'react';
import './MoviesPagination.css';

import { Pagination } from 'antd';

const MoviesPagination = ({ current, total, onChange }) => (
  <Pagination
    defaultCurrent={current}
    total={total}
    onChange={onChange}
    pageSize={1}
    showSizeChanger={false}
    className="movies-pagination"
    hideOnSinglePage
  />
);
export default MoviesPagination;
