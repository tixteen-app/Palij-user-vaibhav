import React from 'react';
import '../styles/footer/whatsapp.css'; // Import the external CSS

const FloatingButton = () => {
  return (
    <a
      href="https://api.whatsapp.com/send?phone=+91 9814367260&text=Hola%21%20Quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20Varela%202."
      className="whatsapp-floating-icon"
      target="_blank"
      rel="noopener noreferrer"
    >
      {/* Replace the FontAwesome icon with an image */}
      <img 
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
        alt="WhatsApp Icon" 
        className="whatsapp-floating-icon__my-float" 
      />
    </a>
  );
}

export default FloatingButton;