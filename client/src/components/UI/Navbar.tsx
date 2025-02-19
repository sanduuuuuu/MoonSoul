import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaUser, FaShoppingBag, FaTimes, FaBars } from "react-icons/fa";
import { useCartStore } from '../../store/cartStore';
import { useAuthStore } from '../../store/authStore';
import { useSearchStore } from "../../store/searchStore";
import logo from '../../assets/logo.png'; // Adjust the path as necessary
import styles from "../../styles/Navbar.module.css";
import AuthModal from "../../api/AuthModal";



const Navbar: React.FC= () => {
  const navigate = useNavigate();
  const { user, isAuthModalOpen, openAuthModal, closeAuthModal } = useAuthStore();
  const { toggleCart, cartItems } = useCartStore();
  const { toggleSearch } = useSearchStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleUserAction = () => {
    if (user) {
      navigate('/profile');
    } else {
      openAuthModal();
    }
  };

  return (
    <>
      <div className={styles.announcementBar}>
        Free shipping on domestic orders above LKR 2000 →
      </div>
      
      <nav className={styles.navbar}>

        <div className={styles.brandContainer}>
            <img src={logo} alt="Logo" className={styles.logo} />
            <div className={styles.brandName}>
              <div className={styles.brandName}>Moon Soul</div>
            </div>
        </div>
        {/* Hamburger Menu Icon */}
        <div className={styles.mobileMenuIcon} onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Desktop Navigation */}
        <div className={styles.navbarContainer}>
          <ul className={styles.navLinks}>
            <li><a href="/" className={styles.link}>Home</a></li>
            <li><a href="/shop" className={styles.link}>Shop Jewelry</a></li>
            <li><a href="#" className={styles.link}>New Arrivals</a></li>
            <li><a href="#" className={styles.link}>About Us</a></li>
          </ul>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.active : ''}`}>
          <ul className={styles.mobileNavLinks}>
            <li><a href="/" className={styles.link} onClick={closeMenu}>Home</a></li>
            <li><a href="/shop" className={styles.link} onClick={closeMenu}>Shop Jewelry</a></li>
            <li><a href="#" className={styles.link} onClick={closeMenu}>New Arrivals</a></li>
            <li><a href="#" className={styles.link} onClick={closeMenu}>About Us</a></li>
            <li><button className={styles.link} onClick={handleUserAction}>
                {user ? 'Profile' : 'Login'}
              </button></li>
          </ul>
        </div>
        
        {/* Icons */}
        <div className={styles.iconContainer}>
          <div onClick={toggleSearch}>
            <FaSearch className={styles.icon} />
          </div>
          <FaUser className={styles.icon} onClick={handleUserAction} /> 
          {user && <span className={styles.userName}>{user.firstName}</span>}
          <div className={styles.cartIcon} onClick={toggleCart}>
            <FaShoppingBag className={styles.icon} />
            {cartItems.length > 0 && (
            <span className={styles.cartCount}>{cartItems.length}</span>
            )}
          </div>
        </div>

        {/* Icon mobile view */}
        <div className={`${styles.mobileicon} ${isMenuOpen ? styles.active : ''}`}>
        <div className={styles.cartIcon} onClick={toggleCart}>
            <FaShoppingBag className={styles.icon} />
            {cartItems.length > 0 && (
            <span className={styles.cartCount}>{cartItems.length}</span>
            )}
          </div>
        </div>
        {isAuthModalOpen && <AuthModal onClose={closeAuthModal} />}
      </nav>
    </>
  );
};

export default Navbar;