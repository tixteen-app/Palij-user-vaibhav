import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './SkeletonLoader.css';

const SkeletonLoader = ({ cards = 12 }) => {
  return (
    <div className="skeleton-grid">
      {[...Array(cards)].map((_, index) => (
        <div className="skeleton-card" key={index}>
          <div className="skeleton-img">
            <Skeleton height={`100%`} width={`100%`} />
          </div>

          <div className="skeleton-content">
            <div className="skeleton-title">
              <Skeleton width={`80%`} height={20} />
            </div>

            <div className="skeleton-subtitle">
              <Skeleton width={`60%`} height={15} />
            </div>

            <div className="skeleton-footer">
              <Skeleton width={80} height={30} className="skeleton-btn" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
