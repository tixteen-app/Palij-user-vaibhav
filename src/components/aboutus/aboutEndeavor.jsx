import React from 'react'
import Flavor from "../../Images/contactUs/Endeavor/Flavor.png"
import Authenticity from "../../Images/contactUs/Endeavor/Authenticity.png"
import Excellence from "../../Images/contactUs/Endeavor/Excellence.png"
import Quality from "../../Images/contactUs/Endeavor/Quality.png"
import "../../styles/aboutUs/aboutEndeavor.css"
function AboutEndeavor() {
    return (
        <>
            <div className='endeavor_main_div' >
                <div className='Main_Home_heading'>Our Endeavor</div>
                <div className='endeavor_images_div' >
                    <div><img src={Quality} alt="Quality" className='endeavor_images' /></div>
                    <div><img src={Authenticity} alt="Authenticity" className='endeavor_images' /></div>
                    <div><img src={Flavor} alt="Flavor" className='endeavor_images' /></div>
                    <div><img src={Excellence} alt="Excellence" className='endeavor_images' /></div>
                </div>
                <div className='endeavor_text' >
                    SK Foods is dedicated to providing the highest quality spices and rice varieties, sourced with care and curated for exceptional flavor. We aim to enrich culinary experiences worldwide, fostering a love for authentic ingredients and a passion for delicious cooking.
                </div>

            </div>

        </>
    )
}

export default AboutEndeavor