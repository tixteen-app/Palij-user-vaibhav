import React from 'react'
import product_image from "../../Images/contactUs/Journey/product_image.png"
import masala_image from "../../Images/contactUs/Journey/masala_image.png"
import "../../styles/aboutUs/aboutJourney.css"
function AboutJourney() {
    return (
        <div className='main_contact_journey' >
            {/* left */}
            <div className='contact_journey_divs journy_left'>
                <div className='contact_journey_left_text' >Spice & Rice Specialists. Elevating your kitchen with premium flavors. Experience the difference with every dish.</div>
                <div>
                    <img src={product_image} alt="product_image" className='jounry_images'/>
                </div>
            </div>
            {/* center */}
            <div className='contact_journey_divs journy_center'>
                <div className='journy_center_imaage_div' >
                    <img src={masala_image} alt="masala_image" className='jounry_images' />
                </div>
            </div>
            {/* right */}
            <div className='contact_journey_divs '>
                <div className='contact_journey_right_text' >
                    Elevate Your Culinary Journey
                </div>
            </div>
        </div>
    )
}

export default AboutJourney