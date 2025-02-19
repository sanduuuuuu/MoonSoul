import React, {  } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiScrollToBottomLine } from "react-icons/ri";
import hero1 from '../../assets/P1.jpg'; 
import hero2 from '../../assets/P2.jpg';// Assuming you have an image in the assets folder
import styles from '../../styles/Hero.module.css'; // Assuming you have a CSS file for styling

const Hero: React.FC = () => {
  const navigate = useNavigate();

  const handleShopNow = () => {
    navigate("/shop");
  };

  const scroll = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div className={styles.heroContainer}>
      <div className={styles.imageContainer}>
        <img src={hero1} alt="Luxury Jewelry" className={styles.heroImage} />
        <img src={hero2} alt="Luxury Jewelry" className={styles.heroImage} />
      </div>
      <div className={styles.heroContent}>
      <h1>Eternal Elegance</h1>
      <p>Discover Our Exquisite Collections</p>
      <button className={styles.ctaButton} onClick={handleShopNow}>Shop Now</button>
      </div>
      <div >
        <RiScrollToBottomLine className={styles.scrollDown} onClick={scroll}/>
      </div>
    </div>
  );
};

export default Hero;