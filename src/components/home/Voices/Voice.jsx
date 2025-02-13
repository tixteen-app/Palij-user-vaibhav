import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react'
import "swiper/css";
import "swiper/css/navigation";
import "../../../styles/Home/Voice.css"

import User from "../../../Images/Home/Voice/ReviewUser.png"

function Voices() {

    const [slidesPerView, setSlidesPerView] = useState(2.7);
    const [sliderGap, setSliderGap] = useState(100);

    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;
            if (screenWidth <= 500) {
                setSlidesPerView(1.1);
                setSliderGap(20)

            }else if (screenWidth <= 900) {
                setSlidesPerView(1.8);
                setSliderGap(50)

            } else if (screenWidth <= 1039) {
                setSlidesPerView(2.3);
                setSliderGap(80)
            } 
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [])

    const OurCollectionImages = [
        {
            image: User,
            Heading: "Spice Heaven!",
            message: "SK Foods spices are a game-changer! My dishes went from bland to brilliant with just a sprinkle of their magic. Thank you, SK Foods, for turning my kitchen into a flavor paradise!",
            name: "Vaibhav",
        },
        {
            image: User,
            Heading: "Spice Heaven!",
            message: "SK Foods spices are a game-changer! My dishes went from bland to brilliant with just a sprinkle of their magic. Thank you, SK Foods, for turning my kitchen into a flavor paradise!",
            name: "Vaibhav",
        }, {
            image: User,
            Heading: "Spice Heaven!",
            message: "SK Foods spices are a game-changer! My dishes went from bland to brilliant with just a sprinkle of their magic. Thank you, SK Foods, for turning my kitchen into a flavor paradise!",
            name: "Pinku",
        },
    ]

    return (
        <>
            <div className='main_Voice_parent_div' >
                {/* Main Heading */}
                <div className='Main_Home_heading text-center' >Voices of Approval</div>

                {/* Swiper */}
                <div>
                    <Swiper
                        slidesPerView={slidesPerView}
                        spaceBetween={sliderGap}
                        slidesPerGroup={1}
                        defaultValue={1.7}
                        loop={true}
                        loopFillGroupWithBlank={true}
                        className="mySwiper voices_Swiper_main_div "
                    >
                        {OurCollectionImages.map((image, index) => (
                            <SwiperSlide key={index} className='Voice_slider_option_SwiperSlide' >

                                <div className='Voice_slider_Image_div' >
                                    <img src={image.image} alt={`ImageNumber ${index + 1}`} className='Voice_slider_images' />
                                </div>
                                <div className='Voice_slider_details_div ' >
                                    <div className='Voice_slider_Heading' >{image.Heading}</div>
                                    <div className='Voice_slider_stars'>★★★★★</div>
                                    <div className='Voice_slider_Message' >{image.message}</div>
                                    <div className='Voice_slider_Name' >{image.name}</div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
 
                </div>

            </div>
        </>
    )
}

export default Voices