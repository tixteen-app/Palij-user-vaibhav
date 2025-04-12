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
import Cake from '../component/cake'

function Homepage() {
  return (
    <div className='new_homepage_div' >
    {/* <div style={{ marginTop: "70px", background: "linear-gradient(218deg, #fbe2ef, #fff)", paddingBottom: "80px" }} > */}
      {/* <MarqueeComponent /> */}
      <Slider />
      <Category />
      <Satisfation />
      <Homeproduct />
      <Homesavery />
      <Pcookies />
      <Gifthamper />
      <Cake/>
      <Explore />
      <TestimonialSlider />

    </div>
  )
}

export default Homepage