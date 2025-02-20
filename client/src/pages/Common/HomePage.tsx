import React, {  } from 'react';
import Navbar from '../../components/UI/Navbar';
import HeroSection from '../../components/UI/HeroSection';
import ProductSection from '../../components/UI/ProductSection';
import styles from '../../styles/PageStyles/Home.module.css'; // Adjust the path as necessary
import CartSection from '../../components/UI/CartSection';
import Footer from '../../components/UI/FooterSection';
import SearchSection from '../../components/UI/SearchSection';
import FeaturesSection from '../../components/UI/FeatureSection';
const HomePage: React.FC = () => {
  
  return (
    <div className={styles.container}>
      <Navbar/>
      <HeroSection />
      
      <CartSection />
      <SearchSection />
      <FeaturesSection />
      <ProductSection />
      <Footer />
    </div>
  );
};

export default HomePage;