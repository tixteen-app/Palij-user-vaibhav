
import React from 'react';
import './SecondFooter.css'
import { assets } from '../../assets/assets';
import FloatingButton from '../../component/whatapp';
import  {motion} from 'framer-motion'


const Footer = () => {
  return (
    <>
      <FloatingButton />
      <footer className="new_footer">
        <div className="new_footer_container">
          <div className="new_footer_content">
            <div className="new_footer_brand">
              <a href="/" aria-label="Instagram">

                <motion.img
                initial={{ opacity: 0 , scale: 0.3} }
                whileInView={{ opacity: 1 , scale: 1} }
                transition={{ duration: 0.6 }}
                src={assets.newlogo} alt="Palji Bakery Logo" />
              </a>
              <p>Collection of Best Taste - Serving delicious baked goods in Ludhiana since 1993</p>
              <div className="new_footer_social_links">
                <motion.a
                 initial={{ opacity: 0 , scale: 0.3} }
                whileInView={{ opacity: 1 , scale: 1} }
                transition={{ duration: 0.1 , delay: 0.2 }}
                href="https://www.instagram.com/paljibakeryldh?igsh=eXV2bW12cmttdTg%3D" target='_blank' aria-label="Instagram">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </motion.a>
                <motion.a
                initial={{ opacity: 0 , scale: 0.3} }
                whileInView={{ opacity: 1 , scale: 1} }
                transition={{ duration: 0.1 , delay: 0.4 }}

                 href="https://twitter.com/paljibakery?lang=en" target='_blank' aria-label="Twitter">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-twitter-x" viewBox="0 0 16 16">
                    <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                  </svg>
                </motion.a>
                <motion.a
                initial={{ opacity: 0 , scale: 0} }
                whileInView={{ opacity: 1 , scale: 1} }
                transition={{ duration: 0.1 , delay: 0.4 }}

                href="https://m.facebook.com/paljibakery" target='_blank' aria-label="Facebook">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </motion.a>
              </div>
            </div>

            <div className="new_footer_links">
              <h4>Quick Links</h4>
              <motion.ul>
                <li><a href="/">Home</a></li>
                <li><a href="/product/all-products">Products</a></li>
                <li><a href="/shipping-policy">Shipping Policy</a></li>
                <li><a href="/terms-conditions">Terms & Conditions</a></li>
              </motion.ul>
            </div>

            <div className="new_footer_outlets">
              <h4 className='new_footer_outlets_titile'>Our Branches</h4>
              <a target='_blank' href='https://maps.app.goo.gl/4v65ycBGUQ69K8K39'>
                <div className="new_footer_outlet">
                  <p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: "8px"}}>
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    4GV, Main Hambran Rd. Mayur Vihar, Dev Nagar, Ludhiana
                  </p>
                </div>
              </a>
              <a target='_blank' href='https://maps.app.goo.gl/mofqnkXxYpWoHtFF9'>
                <div className="new_footer_outlet">
                  <p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: "8px"}}>
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    1236, Kailash Cinema Rd. Kailash Chowk, Civil Lines, Ludhiana
                  </p>
                </div>
              </a>
              <a target='_blank' href='https://maps.app.goo.gl/hNe3ud3MgXJruX619'>
                <div className="new_footer_outlet">
                  <p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: "8px"}}>
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    5A, Sat Paul Mittal Rd. A - Block, Sarabha Nagar, Ludhiana
                  </p>
                </div>
              </a>
            </div>

            <div className="new_footer_contact">
              <h4 className='new_footer_contact_title' >Contact Us</h4>
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
            <div className='' >
              <p>&copy; {new Date().getFullYear()} Palji Bakery. All rights reserved.</p>
            </div>
            <div>
              <p>
                Created by : <a href="https://www.pitamaas.com/" target="_blank">Pitamaas Pvt. Ltd. </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;