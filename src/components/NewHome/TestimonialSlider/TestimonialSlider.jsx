import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import styles from './TestimonialSlider.module.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { homeImg } from '../../../assets/home/home';

const testimonials = [
  {
    name: 'Harpreet K.',
    quote: "We've been enjoying Palji Bakery’s treats for generations. Their commitment to quality and taste is unmatched. Every product, from biscuits to bread, is made with the finest ingredients, and it shows. We wouldn’t go anywhere else!",
    image: homeImg.review1 // Update this with the actual image path
  },
  {
    name: 'Harpreet K.',
    quote: "We've been enjoying Palji Bakery’s treats for generations. Their commitment to quality and taste is unmatched. Every product, from biscuits to bread, is made with the finest ingredients, and it shows. We wouldn’t go anywhere else!",
    image: homeImg.review1 // Update this with the actual image path
  },
  {
    name: 'Harpreet K.',
    quote: "We've been enjoying Palji Bakery’s treats for generations. Their commitment to quality and taste is unmatched. Every product, from biscuits to bread, is made with the finest ingredients, and it shows. We wouldn’t go anywhere else!",
    image: homeImg.review1 // Update this with the actual image path
  },
  // Add more testimonials as needed
];

const TestimonialSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // Adjust speed for auto-slide
    arrows: false,
    pauseOnHover: true,
  };

  return (
    <div className={styles.testimonialContainer}>
      <Slider {...settings}>
        {testimonials.map((testimonial, index) => (
          <div key={index} className={styles.testimonial}>
            <div className={styles.testimonialContent}>
              <div>
                <img src={testimonial.image} alt={testimonial.name} className={styles.testimonialImage} />
                <h2 className={styles.title}>A TRUE FAMILY <br /><span>FAVORITE</span></h2>
              </div>
              <div>
                <p className={styles.quote}>{testimonial.quote}</p>
                <p className={styles.author}>-{testimonial.name}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TestimonialSlider;
