import React, { useState, useEffect, useRef } from "react";
import "../styles/homenew/TestimonialSlider.css";

const testimonials = [
  { id: 1, image: "https://www.istockphoto.com/resources/images/HomePage/FourPack/C2-Photos-iStock-1356197695.jpg", text: "A wonderful experience! The product exceeded all expectations.", name: "Aarav" },
  { id: 2, image: "https://www.shutterstock.com/image-photo/bakery-happy-portrait-man-cafe-600nw-2466962447.jpg", text: "Delicious and fresh. I’ll definitely order again for my next event.", name: "Nisha" },
  { id: 3, image: "https://media.istockphoto.com/id/1194938286/photo/lovely-plus-sizewoman-workingg-at-her-bakery.jpg?s=612x612&w=0&k=20&c=UuKrkCR_hjriQKGNHbMI4Ot4yI5AFvcW3hxvvQ6-unQ=", text: "Quality is top-notch! My guests loved everything.", name: "Rehan" },
  { id: 4, image: "https://thumbs.dreamstime.com/b/business-owner-bakery-shop-background-female-81036247.jpg", text: "Highly recommended! The perfect treat for any occasion.", name: "Simran" },
  { id: 5, image: "https://www.istockphoto.com/resources/images/HomePage/FourPack/C2-Photos-iStock-1356197695.jpg", text: "Absolutely amazing! Great taste and perfect presentation.", name: "Vikram" },
  { id: 6, image: "https://media.istockphoto.com/id/1272984030/photo/nothing-invites-customers-to-your-store-like-a-welcoming-smile.jpg?s=612x612&w=0&k=20&c=ahpJKFOXlRkS0KAZr9FsX3tPjMZBOGScjI4iCu1GKjY=", text: "An unforgettable experience. The product was flawless!", name: "Priya" },
];

const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = testimonials.length;
  const visibleSlides = 3.8;
  const sliderRef = useRef(null);
  const autoSlideIntervalRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isPaused) {
      autoSlideIntervalRef.current = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % totalSlides);
      }, 1500);
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