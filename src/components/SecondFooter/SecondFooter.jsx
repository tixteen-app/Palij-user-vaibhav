import { Link } from 'react-router-dom'
import { assets } from '../../assets/assets'
import { homeImg } from '../../assets/home/home'
import { PiInstagramLogo } from "react-icons/pi";
import { RiTwitterXLine } from "react-icons/ri";
import { BiLogoFacebookSquare } from "react-icons/bi";

import styles from './SecondFooter.module.css'

const SecondFooter = () => {
  return (
    <div className={styles.container} style={{margin:"0px"}} >
      <div className={styles.footer}>
        <div className={styles.left}>
          <div className={styles.logos}>
            <img src={assets.logo2} alt="" />
          </div>
          <div className={styles.social}>
            <Link to={"https://www.instagram.com/paljibakeryldh?igsh=eXV2bW12cmttdTg%3D"} target="_blank" >
              <PiInstagramLogo />

            </Link>
            <Link to={'https://twitter.com/paljibakery?lang=en'} target="_blank">
              <RiTwitterXLine />
            </Link>
            <Link to={'https://m.facebook.com/paljibakery'} target="_blank">
              <BiLogoFacebookSquare />
            </Link>
          </div>
        </div>
        <div className={styles.middle}>
          <h2>QUICK LINKS</h2>
          <nav>
            <Link to="/">Home</Link>
            <Link to={'/product/all-products'}>Products</Link>
            <Link to="/aboutus">About Us</Link>
            <Link to="/contact">Contact Us</Link>
            <Link to='/shipping-policy'>Shipping Policy</Link>
            <Link to="/terms-conditions">Terms & Conditions</Link>
          </nav>
        </div>
        <div className={styles.right}>
          <div className={styles.address}>
            <h2>OUR LOCATION</h2>
            <p>  4GV, Main Hambran Rd. Mayur Vihar, Dev Nagar, Ludhiana</p>
            <p>1236, Kailash Cinema Rd. Kailash Chowk, Civil Lines, Ludhiana</p>
            <p>5A, Sat Paul Mittal Rd. A - Block, Sarabha Nagar, Ludhiana</p>
          </div>
          <div className={styles.contact}>
            <h2>CONTACT US</h2>
            <div>
              <a href="tel:7901706000">+91 7901706000</a>
              <a href="tel:9814367260">+91 9814367260</a>
            </div>
            <a href="mail:paljibakery.shop@gmail.com">paljibakery.shop@gmail.com</a>
          </div>
        </div>
      </div>
      <div className={styles.copyRight}>
        <p>Copyright @ 2024 <strong>Palji Bakery</strong>, All rights reserved</p>
        <p>Designed & developed by <Link to={'https://www.pitamaas.com'}><strong>Pitamaas</strong></Link></p>
      </div>
    </div>
  )
}

export default SecondFooter
