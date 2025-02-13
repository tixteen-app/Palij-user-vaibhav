import React from "react";
import "../../styles/contactUs/contact-us-location.css";

function Mylocation() {
  return (
    <>
      <div className="location-contact-us" >
      <div className="Main_Home_heading" >spot us</div>
        
        <div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58391.465927151905!2d78.70742685270042!3d23.83755873525929!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3978d14a2cf591af%3A0xf446eaa2b5281370!2sSagar%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1706882874642!5m2!1sen!2sin"
            //   width="600"
            //   height="450"
            //   style="border:0;"
            allowfullscreen="true"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            className="location-iframe"
            title="our_location"
          ></iframe>
        </div>

      </div>
    </>
  );
}

export default Mylocation;
