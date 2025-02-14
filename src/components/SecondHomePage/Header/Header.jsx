import React, { useState, useEffect } from 'react';
import styles from './Slider.module.css';
import { assets } from '../../../assets/assets';

const slides = [
  {
    id: 1,
    image: assets.homeBanner4, // replace with actual image path
    title: 'Butter Garlic Rusk',
    description: 'Deliciously Baked & Crispy',
  },
  {
    id: 2,
    image: assets.homeBanner2, // replace with actual image path
    title: 'Butter Garlic Rusk',
    description: 'Deliciously Baked & Crispy',
  },
  {
    id: 3,
    image: assets.homeBanner3, // replace with actual image path
    title: 'Butter Garlic Rusk',
    description: 'Deliciously Baked & Crispy',
  },
  // Add more slides if needed
];

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Debugging: Check if slides array and currentIndex are set

    // Auto-slide every 2 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex(currentIndex === slides.length - 1 ? 0 : currentIndex + 1);
  };

  const prevSlide = () => {
    setCurrentIndex(currentIndex === 0 ? slides.length - 1 : currentIndex - 1);
  };

  if (slides.length === 0) return <p>No slides available</p>;

  return (
    <div className={styles.slider}>
      <div className={styles.slideContainer}>
        <img src={slides[currentIndex].image} alt={slides[currentIndex].title} className={styles.image} />
        {/* <div className={styles.textOverlay}>
          <h2 className={styles.title}>{slides[currentIndex].title}</h2>
          <p className={styles.description}>{slides[currentIndex].description}</p>
        </div> */}
      </div>
      <button className={styles.prevButton} onClick={prevSlide}>❮</button>
      <button className={styles.nextButton} onClick={nextSlide}>❯</button>
      <div className={styles.indicators}>
        {slides.map((_, index) => (
          <span
            key={index}
            className={`${styles.indicator} ${index === currentIndex ? styles.active : ''}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Slider;