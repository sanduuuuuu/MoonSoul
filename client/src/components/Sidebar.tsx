import React, { useState } from "react";
import { FaBars, FaTimes, FaHome, FaShoppingBag, FaUser } from "react-icons/fa";
import styles from "../styles/Sidebar.module.css";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button className={styles.menuBtn} onClick={() => setIsOpen(true)}>
        <FaBars />
      </button>

      <div className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ""}`}>
        <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
          <FaTimes />
        </button>
        <h2>Menu</h2>
        <ul className={styles.menuList}>
          <li><FaHome /> Home</li>
          <li><FaShoppingBag /> Shop</li>
          <li><FaUser /> Profile</li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;