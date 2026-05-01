import React from 'react';
import './Skeleton.css';

const Skeleton = ({ width, height, borderRadius, className = '' }) => {
  const style = {
    width: width || '100%',
    height: height || '20px',
    borderRadius: borderRadius || '4px'
  };

  return <div className={`skeleton-base ${className}`} style={style} />;
};

export const ProductSkeleton = () => {
  return (
    <div className="product-skeleton-card">
      <Skeleton height="250px" borderRadius="12px" />
      <div className="skeleton-content">
        <Skeleton width="40%" height="14px" />
        <Skeleton width="80%" height="24px" />
        <Skeleton width="100%" height="40px" borderRadius="8px" />
      </div>
    </div>
  );
};

export default Skeleton;
