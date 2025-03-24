import React, { useState, useEffect, useRef } from "react";
import "../styles/homenew/TestimonialSlider.css";

const testimonials = [
  { id: 1, image: "https://www.istockphoto.com/resources/images/HomePage/FourPack/C2-Photos-iStock-1356197695.jpg", text: "Amazing quality and taste! Perfect for every celebration.", name: "Kabir" },
  { id: 2, image: "https://www.istockphoto.com/resources/images/HomePage/FourPack/C2-Photos-iStock-1356197695.jpg", text: "Amazing quality and taste! Perfect for every celebration.", name: "Kabir" },
  { id: 3, image: "https://www.istockphoto.com/resources/images/HomePage/FourPack/C2-Photos-iStock-1356197695.jpg", text: "Amazing quality and taste! Perfect for every celebration.", name: "Kabir" },
  { id: 4, image: "https://www.istockphoto.com/resources/images/HomePage/FourPack/C2-Photos-iStock-1356197695.jpg", text: "Amazing quality and taste! Perfect for every celebration.", name: "Kabir" },
  { id: 5, image: "https://www.istockphoto.com/resources/images/HomePage/FourPack/C2-Photos-iStock-1356197695.jpg", text: "Amazing quality and taste! Perfect for every celebration.", name: "Kabir" },
  { id: 6, image: "https://www.istockphoto.com/resources/images/HomePage/FourPack/C2-Photos-iStock-1356197695.jpg", text: "Amazing quality and taste! Perfect for every celebration.", name: "Kabir" },
];

const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = testimonials.length;
  const visibleSlides = 4;
  const sliderRef = useRef(null);
  const autoSlideIntervalRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-slide function
  useEffect(() => {
    if (!isPaused) {
      autoSlideIntervalRef.current = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % totalSlides);
      }, 2000);
    }

    return () => {
      if (autoSlideIntervalRef.current) {
        clearInterval(autoSlideIntervalRef.current);
      }
    };
  }, [totalSlides, isPaused]);

  // Calculate the transform value for the slider track
  const getTransformValue = () => {
    return `translateX(-${currentIndex * (100 / visibleSlides)}%)`;
  };

  return (
    <div 
      className="new_home_slider_container"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <h2 className="new_home_slider_title">SWEET PRAISE</h2>
      
      <div className="new_home_slider_wrapper">
        <div className="new_home_slider" ref={sliderRef}>
          <div 
            className="new_home_slider_track" 
            style={{ 
              transform: getTransformValue(),
              width: `${(totalSlides * 100) / visibleSlides}%`
            }}
          >
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div key={`${testimonial.id}-${index}`} className="new_home_slider_card">
                <img src={testimonial.image} alt="testimonial" className="new_home_slider_image" />
                <p className="new_home_slider_text">{testimonial.text}</p>
                <p className="new_home_slider_name">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dots Navigation */}
      <div className="new_home_slider_dots">
        {testimonials.map((_, index) => (
          <span 
            key={index} 
            className={`new_home_slider_dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default TestimonialSlider;