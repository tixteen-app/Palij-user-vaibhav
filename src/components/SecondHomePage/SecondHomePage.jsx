import Slider from './Header/Header'
import MarqueeComponent from './Marquee/Marquee'
import Cookies from './Cookies/Cookies'
import styles from './SecondHomePage.module.css'
import Banner from './Banner/Banner'
import Category from './Category/Category'
import Explore from './Explore/Explore'
import Savory from './Savory/Savory'
import SweetPraise from './SweetPraise/SweetPraise'
import NSavory from './Savory/newsav'

const SecondHomePage = () => {
  return (
    <div style={{ background: "#f1f0f5", paddingBottom: "80px" }}>
      <Slider />
      <MarqueeComponent />
      <Cookies />
      <Banner />
      <Category />
      <Savory />
      {/* <NSavory/> */}
      <Explore />
      <SweetPraise />
    </div>
  )
}

export default SecondHomePage
