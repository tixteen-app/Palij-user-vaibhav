import React from 'react'
import "../styles/homenew/satisfation.css";
import firstimage from "../assets/h-1.png"
import secondimage from "../assets/h-2.png"
import thirdimage from "../assets/h-3.png"
import fourthimage from "../assets/h-4.png"
import fifthimage from "../assets/h-5.png"

function Satisfation() {
    return (
        <>
            <div className='main_satisfaction_top_div' >
                <div className="background_shapes">
                    <div className="background_shapes_1_outer">
                        <div className="background_shapes_1"></div>
                    </div>

                    <div className="background_shapes_2_outer">
                        <div className="background_shapes_2"></div>
                    </div>

                    <div className="background_shapes_3_outer">
                        <div className="background_shapes_3"></div>
                    </div>

                </div>
                {/* image */}
                <div className='satisfaction_image_main_div' >
                    {/* left */}
                    <div className='satisfaction_image_left_div' >
                        <div className='satisfaction_image_left_div1'>
                            <img src={firstimage} alt="" className='satisfaction_image' />
                        </div>
                        <div className='satisfaction_image_left_div1'>
                            <img src={secondimage} alt="" className='satisfaction_image' />
                        </div>
                    </div>
                    <div>
                        <div className='satisfaction_image_center_div'>
                            <img src={thirdimage} alt="" className='satisfaction_image' />
                        </div>
                    </div>
                    <div className='satisfaction_image_left_div' >
                        <div className='satisfaction_image_left_div1'>
                            <img src={fourthimage} alt="" className='satisfaction_image' />
                        </div>
                        <div className='satisfaction_image_left_div1'>
                            <img src={fifthimage} alt="" className='satisfaction_image' />
                        </div>

                    </div>
                </div>

            </div>

        </>
    )
}

export default Satisfation