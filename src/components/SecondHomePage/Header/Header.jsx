import React, { useState, useEffect } from 'react';
import styles from './Slider.module.css';
import { assets } from '../../../assets/assets';
import { motion, AnimatePresence } from 'framer-motion';

const slidesDesktop = [
  {
    id: 2,
    image: assets.homeBanner2,
    title: 'Butter Garlic Rusk',
    description: 'Deliciously Baked & Crispy',
  },
  {
    id: 3,
    image: assets.homeBanner3,
    title: 'Butter Garlic Rusk',
    description: 'Deliciously Baked & Crispy',
  },
  {
    id: 4,
    image: assets.homeBanner7,
    title: 'Butter Garlic Rusk',
    description: 'Deliciously Baked & Crispy',
  },
];

const slidesMobile = [
  {
    id: 1,
    image: assets.homeBannerMobile1,
    title: 'Tasty Snacks for You',
    description: 'Delicious and Crunchy',
  },
  {
    id: 2,
    image: assets.homeBannerMobile4,
    title: 'Crispy Treats',
    description: 'Perfect for Your Snack Time',
  },
  {
    id: 4,
    image: assets.homeBannerMobile5,
    title: 'Butter Garlic Rusk',
    description: 'Deliciously Baked & Crispy',
  },
];

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 500);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const slides = isMobile ? slidesMobile : slidesDesktop;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex, slides.length]);

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
        <AnimatePresence mode='wait'>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={styles.slide}
          >
            <img
              src={slides[currentIndex].image}
              alt={slides[currentIndex].title}
              className={styles.image}
            />
          </motion.div>
        </AnimatePresence>
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