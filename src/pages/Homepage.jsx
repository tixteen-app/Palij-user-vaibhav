import React from 'react'
import MarqueeComponent from '../components/SecondHomePage/Marquee/Marquee'
import Newtopbanner from '../component/newtopbnner'
import Slider from '../components/SecondHomePage/Header/Header'
import Category from '../components/SecondHomePage/Category/Category'
import Explore from '../components/SecondHomePage/Explore/Explore'
import TestimonialSlider from '../component/newtopbnner'
import Homeproduct from '../component/Homeproduct'

function Homepage() {
  return (
    <div style={{ marginTop: "50px"   , background: "#f1f0f5", paddingBottom: "80px"  }} >
      <MarqueeComponent />
      <Slider />
      <Category />
      <Explore />
      <Homeproduct/>
        <TestimonialSlider/>
      


    </div>
  )
}

export default Homepage