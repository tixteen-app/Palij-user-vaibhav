import React from 'react'
import Shafe from "../../../Images/Home/OurStory/Our_Story_shape.png"
import "../../../styles/Home/ourStory/flavor.css"
function FlavorOurStory() {
    return (
        <>
            <div className='main_flavor_div' >
                <div className='our_story_shape_image' >
                    <img src={Shafe} alt="Shape" className='our_story_shape_image' />
                </div>
                <div className='our_story_flavor_text' >
                    <div>
                        "Enjoy
                    </div>
                    <div>
                        Superior
                    </div>
                    <div>
                        Flavor,
                    </div>
                    <div>
                        Rice by Rice"
                    </div>

                </div>
            </div>
        </>
    )
}

export default FlavorOurStory