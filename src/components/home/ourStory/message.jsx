import React from 'react'
import "../../../styles/Home/ourStory/message.css"
import OurStoryMessageImage from "../../../Images/Home/OurStory/our_Story_message.png"

function OurStoryMessage() {
    return (
        <div className='main_our_story_div' >
            <div className='Main_Home_heading' >Our story</div>
            <div className='our_story_message_main_div' >
                {/* left text */}
                <div className='our_story_text_div' >
                    SF Foods: Where passion meets spice. From sourcing the finest ingredients to crafting exquisite blends, we're dedicated to bringing global flavors to your kitchen. Welcome to a world of culinary adventure.
                </div>
                {/* right image */}
                <div className='our_story_image_div' >
                    <img src={OurStoryMessageImage} alt="Our Story Message" className='our_story_image' />
                </div>

            </div>
        </div>
    )
}

export default OurStoryMessage