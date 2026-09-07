import React from "react";
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import profileImg from '../assets/images/1x1.jpg';
import '../assets/styles/Main.scss';

const FACEBOOK_URL = 'https://www.facebook.com/007DoubleOShete';
const LINKEDIN_URL = 'https://www.linkedin.com/in/paul-taripe-baa16b3a0/';

function Main() {

  return (
    <div className="container">
      <div className="about-section">
        <div className="image-wrapper">
          <img src={profileImg} alt="Paul Gabriel Taripe" />
          <div className="image-overlay">
            <a href={FACEBOOK_URL} target="_blank" rel="noreferrer" aria-label="Facebook profile"><FacebookIcon/></a>
            <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" aria-label="LinkedIn profile"><LinkedInIcon/></a>
          </div>
        </div>
        <div className="content">
          <div className="social_icons">
            <a href={FACEBOOK_URL} target="_blank" rel="noreferrer" aria-label="Facebook profile"><FacebookIcon/></a>
            <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" aria-label="LinkedIn profile"><LinkedInIcon/></a>
          </div>
          <h1>Paul Gabriel Taripe</h1>
          <p>Cloud-Native &amp; Full-Stack Developer</p>

          <div className="mobile_social_icons">
            <a href={FACEBOOK_URL} target="_blank" rel="noreferrer" aria-label="Facebook profile"><FacebookIcon/></a>
            <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" aria-label="LinkedIn profile"><LinkedInIcon/></a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
