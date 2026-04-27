import React from 'react';
import './Skeleton.css';

const Skeleton = ({ type }) => {
  if (type === 'card') {
    return (
      <div className="skeleton-card">
        <div className="skeleton-img"></div>
        <div className="skeleton-details">
          <div className="skeleton-title"></div>
          <div className="skeleton-text"></div>
          <div className="skeleton-btn"></div>
        </div>
      </div>
    );
  }

  if (type === 'table-row') {
    return (
      <tr className="skeleton-row">
        <td><div className="skeleton-cell"></div></td>
        <td><div className="skeleton-cell"></div></td>
        <td><div className="skeleton-cell"></div></td>
        <td><div className="skeleton-cell"></div></td>
      </tr>
    );
  }

  return <div className="skeleton-basic"></div>;
};

export default Skeleton;
