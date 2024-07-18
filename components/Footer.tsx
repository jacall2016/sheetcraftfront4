import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-primary text-light p-4 text-center">
      <p className="font-bold">Contact Us</p>
      <div className="flex flex-col items-center mt-4 space-y-2">
        <div className="flex items-center">
          <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
          <span>Email:</span>
          <span className="ml-2">info@biotechdata.com</span>
        </div>
        <div className="flex items-center">
          <FontAwesomeIcon icon={faPhone} className="mr-2" />
          <span>Phone:</span>
          <span className="ml-2">(123) 456-7890</span>
        </div>
        <div className="flex items-center">
          <FontAwesomeIcon icon={faTwitter} className="mr-2" />
          <span>X Account:</span>
          <a href="https://x.com/biotechdata" className="ml-2 text-accent hover:underline">biotechdata</a>
        </div>
        <div className="flex items-center">
          <FontAwesomeIcon icon={faYoutube} className="mr-2" />
          <span>YouTube Channel:</span>
          <a href="https://youtube.com/biotechdata" className="ml-2 text-accent hover:underline">biotechdata</a>
        </div>
        <div className="flex items-center">
          <FontAwesomeIcon icon={faTwitter} className="mr-2" />
          <span>Twitter:</span>
          <a href="https://twitter.com/biotechdata" className="ml-2 text-accent hover:underline">biotechdata</a>
        </div>
      </div>
      <p className="mt-4">&copy; 2024 SheetCraft</p>
    </footer>
  );
};

export default Footer;
