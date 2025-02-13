import React from 'react'
import "../../../styles/Home/OurProdutsImages/upperImages.css"
import MasalaImg from "../../../Images/Home/ourprodutImages/masale_images.png"
import OilImg from "../../../Images/Home/ourprodutImages/Oil_images.png"
import RiceImg from "../../../Images/Home/ourprodutImages/Rice_Banner.png"
import Suger from "../../../Images/Home/ourprodutImages/Sugar_Banner.png"

function UpperImages() {
    return (
        <>
            <div className='upper_images_main_div' >
                <div>
                    <img src={MasalaImg} alt="Masala" className='upper_images' />
                </div>
                <div>
                    <img src={OilImg} alt="Oil" className='upper_images' />
                </div>


            </div>
            <div className='upper_images_main_div' >
                <div>
                    <img src={Suger} alt="Suger" className='upper_images' />
                </div>
                <div>
                    <img src={RiceImg} alt="Rice" className='upper_images' />
                </div>


            </div>
        </>
    )
}

export default UpperImages