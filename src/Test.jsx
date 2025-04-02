import React, { useState } from 'react';
import './SortArrows.css'; // We'll create this CSS file next

const SortArrows = () => {
  const [isLowToHigh, setIsLowToHigh] = useState(true);

  const setLowToHigh = () => {
    setIsLowToHigh(true);
  };

  const setHighToLow = () => {
    setIsLowToHigh(false);
  };

  return (
    <div className="sort-container">
      {/* Left Arrow (Up) */}
      <div className="sort-arrow" id="leftArrow" onClick={setLowToHigh}>
        <svg className="arrow-svg" viewBox="0 0 60 200" xmlns="http://www.w3.org/2000/svg">
          <path
            id="upArrowHead"
            className={`arrow ${isLowToHigh ? 'active' : 'inactive'}`}
            d="M30,20 L10,50 L50,50 Z"
            fill="none"
            stroke="#000"
          />
          <line
            id="upArrowLine"
            className={`arrow ${isLowToHigh ? 'active' : 'inactive'}`}
            x1="30"
            y1="50"
            x2="30"
            y2="120"
            stroke="#000"
          />
          <circle className="dots" cx="30" cy="140" r="3" />
          <circle className="dots" cx="30" cy="155" r="3" />
        </svg>
        <div className="sort-label">Low to High</div>
      </div>

      <div className="divider"></div>

      {/* Right Arrow (Down) */}
      <div className="sort-arrow" id="rightArrow" onClick={setHighToLow}>
        <svg className="arrow-svg" viewBox="0 0 60 200" xmlns="http://www.w3.org/2000/svg">
          <circle className="dots" cx="30" cy="45" r="3" />
          <circle className="dots" cx="30" cy="60" r="3" />
          <line
            id="downArrowLine"
            className={`arrow ${isLowToHigh ? 'inactive' : 'active'}`}
            x1="30"
            y1="80"
            x2="30"
            y2="150"
            stroke="#000"
          />
          <path
            id="downArrowHead"
            className={`arrow ${isLowToHigh ? 'inactive' : 'active'}`}
            d="M30,180 L10,150 L50,150 Z"
            fill="none"
            stroke="#000"
          />
        </svg>
        <div className="sort-label">High to Low</div>
      </div>
    </div>
  );
};

export default SortArrows;