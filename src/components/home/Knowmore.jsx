import React from 'react'
import "../../styles/Home/knowmore.css"
import { Link } from 'react-router-dom'
function Knowmore() {
    return (
        <>
            <div className='knowmore_main_div' >
                <div className='knowmore_heading'  >"SF Foods: Where Every Dish tells a story"</div>
                <Link to={"/about-us"} className='css-for-link-tag' >
                <div className='click_buttons' >KNOW MORE </div>
                </Link>

            </div>
        </>
    )
}

export default Knowmore