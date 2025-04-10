import React from 'react'
import MarqueeComponent from '../components/SecondHomePage/Marquee/Marquee'
import Slider from '../components/SecondHomePage/Header/Header'
import Category from '../components/SecondHomePage/Category/Category'
import Explore from '../components/SecondHomePage/Explore/Explore'
import TestimonialSlider from '../component/newtopbnner'
import Homeproduct from '../component/Homeproduct'
import Homesavery from '../component/homesavery'
import Satisfation from '../component/satisfation'
import Pcookies from '../component/pcookies'
import Gifthamper from '../component/giftham'

function Homepage() {
  return (
    <div style={{ marginTop: "70px", background: "#f1f0f5", paddingBottom: "80px" }} >
      {/* <MarqueeComponent /> */}
      <Slider />
      <Category />
      <Satisfation />
      <Homeproduct />
      <Homesavery />
      <Pcookies />
      <Gifthamper />
      <Explore />
      <TestimonialSlider />

    </div>
  )
}

export default Homepage