// import { Link } from 'react-router-dom'
// import { assets } from '../../assets/assets'
// import { homeImg } from '../../assets/home/home'
// import { PiInstagramLogo } from "react-icons/pi";
// import { RiTwitterXLine } from "react-icons/ri";
// import { BiLogoFacebookSquare } from "react-icons/bi";

// import styles from './SecondFooter.module.css'

// const SecondFooter = () => {
//   const currentYear = new Date().getFullYear();
//   return (
//     <div className={styles.container} style={{margin:"0px"}} >
//       <div className={styles.footer}>
//         <div className={styles.left}>
//           <div className={styles.logos}>
//             <img src={assets.logo2} alt="" />
//           </div>
//           <div className={styles.social}>
//             <Link to={"https://www.instagram.com/paljibakeryldh?igsh=eXV2bW12cmttdTg%3D"} target="_blank" >
//               <PiInstagramLogo />

//             </Link>
//             <Link to={'https://twitter.com/paljibakery?lang=en'} target="_blank">
//               <RiTwitterXLine />
//             </Link>
//             <Link to={'https://m.facebook.com/paljibakery'} target="_blank">
//               <BiLogoFacebookSquare />
//             </Link>
//           </div>
//         </div>
//         <div className={styles.middle}>
//           <h2>QUICK LINKS</h2>
//           <nav>
//             <Link to="/">Home</Link>
//             <Link to={'/product/all-products'}>Products</Link>
//             <Link to="/aboutus">About Us</Link>
//             <Link to="/contact">Contact Us</Link>
//             <Link to='/shipping-policy'>Shipping Policy</Link>
//             <Link to="/terms-conditions">Terms & Conditions</Link>
//           </nav>
//         </div>
//         <div className={styles.right}>
//           <div className={styles.address}>
//             <h6>Outlet-1</h6>
//             <p>  4GV, Main Hambran Rd. Mayur Vihar, Dev Nagar, Ludhiana</p>
//             <h6>Outlet-2</h6>
//             <p>1236, Kailash Cinema Rd. Kailash Chowk, Civil Lines, Ludhiana</p>
//             <h6>Outlet-3</h6>
//             <p>5A, Sat Paul Mittal Rd. A - Block, Sarabha Nagar, Ludhiana</p>
//           </div>
//           <div className={styles.contact}>
//             <h6>CONTACT US</h6>
//             <div>
//               <a href="tel:7901706000">+91 79017-06000</a>
//               <a href="tel:9814367260">+91 98143-67260</a>
//             </div>
//             <a href="mail:paljibakery.shop@gmail.com">paljibakery.shop@gmail.com</a>
//           </div>
//         </div>
//       </div>
//       <div className={styles.copyRight}>
//         <p>Copyright @  {currentYear}  <strong>Palji Bakery</strong>, All rights reserved</p>
//         <p>Created by <Link to={'https://www.pitamaas.com'}><strong>Pitamaas Pvt Ltd</strong></Link></p>
//       </div>
//     </div>
//   )
// }

// export default SecondFooter

import React from 'react';
import './SecondFooter.css'
import { assets } from '../../assets/assets';


const Footer = () => {
  return (
    <footer className="new_footer">
      <div className="new_footer_container">
        <div className="new_footer_content">
          <div className="new_footer_brand">
            <img src={assets.newlogo} alt="Palji Bakery Logo" />
            <p>Collection of Best Taste - Serving delicious baked goods in Ludhiana since 2001</p>
            <div className="new_footer_social_links">
              <a href="#" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a href="#" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
            </div>
          </div>
          
          <div className="new_footer_links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">Products</a></li>
              <li><a href="#">Shipping Policy</a></li>
              <li><a href="#">Terms & Conditions</a></li>
            </ul>
          </div>
          
          <div className="new_footer_outlets">
            <div className='new_footer_outlets_titile' >Outlets - 1</div>
            <div className="new_footer_outlet">
              <p> <i className="fa-solid fa-shop"></i>  4GV, Main Hambran Rd. Mayur Vihar, Dev Nagar, Ludhiana</p>
            </div>
            <div className='new_footer_outlets_titile' >Outlets - 2</div>
            <div className="new_footer_outlet">
              <p> <i className="fa-solid fa-shop"></i>  1236, Kailash Cinema Rd. Kailash Chowk, Civil Lines, Ludhiana</p>
            </div>
            <div className='new_footer_outlets_titile' >Outlets - 3</div>

            <div className="new_footer_outlet">
              <p><i className="fa-solid fa-shop"></i>  5A, Sat Paul Mittal Rd. A - Block, Sarabha Nagar, Ludhiana</p>
            </div>
          </div>
          
          <div className="new_footer_contact">
            <h4>Contact Us</h4>
            <div className="new_footer_contact_info">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span>+91 79017-06000</span>
            </div>
            <div className="new_footer_contact_info">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span>+91 98143-67260</span>
            </div>
            <div className="new_footer_contact_info">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <span>paljibakery.shop@gmail.com</span>
            </div>
          </div>
        </div>
        
        <div className="new_footer_bottom">
          <p>&copy; {new Date().getFullYear()} Palji Bakery. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;