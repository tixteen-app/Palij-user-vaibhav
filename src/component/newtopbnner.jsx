import React, { useState, useRef, useEffect } from "react";
import "../styles/homenew/TestimonialSlider.css";

const testimonials = [
  { id: 1, image: "https://www.istockphoto.com/resources/images/HomePage/FourPack/C2-Photos-iStock-1356197695.jpg", text: "A wonderful experience! The product exceeded all expectations.", name: "Aarav" },
  { id: 2, image: "https://www.shutterstock.com/image-photo/bakery-happy-portrait-man-cafe-600nw-2466962447.jpg", text: "Delicious and fresh. I'll definitely order again for my next event.", name: "Nisha" },
  { id: 3, image: "https://media.istockphoto.com/id/1194938286/photo/lovely-plus-sizewoman-workingg-at-her-bakery.jpg?s=612x612&w=0&k=20&c=UuKrkCR_hjriQKGNHbMI4Ot4yI5AFvcW3hxvvQ6-unQ=", text: "Quality is top-notch! My guests loved everything.", name: "Rehan" },
  { id: 4, image: "https://thumbs.dreamstime.com/b/business-owner-bakery-shop-background-female-81036247.jpg", text: "Highly recommended! The perfect treat for any occasion.", name: "Simran" },
  { id: 5, image: "https://www.istockphoto.com/resources/images/HomePage/FourPack/C2-Photos-iStock-1356197695.jpg", text: "Absolutely amazing! Great taste and perfect presentation.", name: "Vikram" },
  { id: 6, image: "https://media.istockphoto.com/id/1272984030/photo/nothing-invites-customers-to-your-store-like-a-welcoming-smile.jpg?s=612x612&w=0&k=20&c=ahpJKFOXlRkS0KAZr9FsX3tPjMZBOGScjI4iCu1GKjY=", text: "An unforgettable experience. The product was flawless!", name: "Priya" },
  { id: 1, image: "https://www.istockphoto.com/resources/images/HomePage/FourPack/C2-Photos-iStock-1356197695.jpg", text: "A wonderful experience! The product exceeded all expectations.", name: "Aarav" },
  { id: 2, image: "https://www.shutterstock.com/image-photo/bakery-happy-portrait-man-cafe-600nw-2466962447.jpg", text: "Delicious and fresh. I'll definitely order again for my next event.", name: "Nisha" },
  { id: 3, image: "https://media.istockphoto.com/id/1194938286/photo/lovely-plus-sizewoman-workingg-at-her-bakery.jpg?s=612x612&w=0&k=20&c=UuKrkCR_hjriQKGNHbMI4Ot4yI5AFvcW3hxvvQ6-unQ=", text: "Quality is top-notch! My guests loved everything.", name: "Rehan" },
  { id: 4, image: "https://thumbs.dreamstime.com/b/business-owner-bakery-shop-background-female-81036247.jpg", text: "Highly recommended! The perfect treat for any occasion.", name: "Simran" },
  { id: 5, image: "https://www.istockphoto.com/resources/images/HomePage/FourPack/C2-Photos-iStock-1356197695.jpg", text: "Absolutely amazing! Great taste and perfect presentation.", name: "Vikram" },
  { id: 6, image: "https://media.istockphoto.com/id/1272984030/photo/nothing-invites-customers-to-your-store-like-a-welcoming-smile.jpg?s=612x612&w=0&k=20&c=ahpJKFOXlRkS0KAZr9FsX3tPjMZBOGScjI4iCu1GKjY=", text: "An unforgettable experience. The product was flawless!", name: "Priya" },
];

const TestimonialSlider = () => {
  const sliderRef = useRef(null);
  const trackRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [autoScroll, setAutoScroll] = useState(true);
  const animationRef = useRef(null);

  // Auto-scroll functionality
  const startAutoScroll = () => {
    if (!autoScroll || isDragging) return;
    
    const slider = sliderRef.current;
    const track = trackRef.current;
    const cardWidth = track.firstChild?.offsetWidth || 320;
    const margin = 20;

    const scrollAmount = cardWidth + margin;
    const maxScroll = track.scrollWidth - slider.clientWidth;

    if (slider.scrollLeft >= maxScroll - 10) {
      slider.scrollTo({ left: 0, behavior: 'instant' });
    } else {
      slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }

    animationRef.current = setTimeout(startAutoScroll, 3000); // Adjust timing as needed
  };

  useEffect(() => {
    if (autoScroll) {
      startAutoScroll();
    }
    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, [autoScroll, isDragging]);

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setAutoScroll(false);
    setStartX(e.touches[0].pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
    clearTimeout(animationRef.current);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.touches[0].pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    // Restart auto-scroll after a delay if user stops interacting
    setTimeout(() => setAutoScroll(true), 5000);
  };

  // For desktop hover
  const handleMouseEnter = () => {
    setAutoScroll(false);
    clearTimeout(animationRef.current);
  };

  const handleMouseLeave = () => {
    setAutoScroll(true);
  };

  return (
    <div className="new_home_slider_container">
      <h2 className="new_home_slider_title">SWEET PRAISE</h2>

      <div 
        className="new_home_slider_wrapper"
        ref={sliderRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="new_home_slider_track" ref={trackRef}>
          {testimonials.map((testimonial, index) => (
            <div key={`${testimonial.id}-${index}`} className="new_home_slider_card">
              <img src={testimonial.image} alt="testimonial" className="new_home_slider_image" />
              <p className="new_home_slider_text">{testimonial.text}</p>
              <p className="new_home_slider_name">- {testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialSlider;