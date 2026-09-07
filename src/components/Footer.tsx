import React from "react";
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import '../assets/styles/Footer.scss'

function Footer() {
  return (
    <footer>
      <div>
        <a href="https://www.facebook.com/007DoubleOShete" target="_blank" rel="noreferrer" aria-label="Facebook profile"><FacebookIcon/></a>
        <a href="https://www.linkedin.com/in/paul-taripe-baa16b3a0/" target="_blank" rel="noreferrer" aria-label="LinkedIn profile"><LinkedInIcon/></a>
      </div>
    </footer>
  );
}

export default Footer;
