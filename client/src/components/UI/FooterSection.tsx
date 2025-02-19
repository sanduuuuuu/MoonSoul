import { useState, useEffect } from "react";
import styles from "../../styles/Footer.module.css";
import { FaFacebook, FaInstagram, FaPinterest } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa6";
import logo from "../../assets/logo.png";

const Footer = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    shop: false,
    customerService: false,
    company: false,
  });

  // Detect screen size to toggle accordion effect only in mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Toggle accordion sections
  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        {/* Logo and Social Section */}
        <div className={styles.footerSection}>
          <div className={styles.brandContainer}>
            <img src={logo} alt="Logo" className={styles.logoimg} />
            <div className={styles.logo}>MOON SOUL</div>
          </div>
          <p className={styles.tagline}>Crafting Timeless Elegance</p>
          <div className={styles.socialIcons}>
            <a href="#" aria-label="Facebook">
              <FaFacebook />
            </a>
            <a href="#" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="#" aria-label="Pinterest">
              <FaPinterest />
            </a>
          </div>
        </div>

        {/* Footer Sections with Conditional Accordion */}
        {[
          { id: "shop", title: "Shop", links: ["All Jewelry", "New Arrivals", "Best Sellers", "Sale"] },
          {
            id: "customerService",
            title: "Customer Service",
            links: ["Contact Us", "Shipping Policy", "Returns & Exchanges", "FAQs"],
          },
          { id: "company", title: "Company", links: ["About Us", "Blog", "Careers", "Wholesale"] },
        ].map((section) => (
          <div key={section.id} className={styles.footerSection}>
            {isMobile ? (
              <>
                <button className={styles.accordion} onClick={() => toggleSection(section.id)}>
                  {section.title}
                  <FaChevronDown className={`${styles.icon} ${openSections[section.id] ? styles.open : ""}`} />
                </button>
                <ul className={`${styles.menuItems} ${openSections[section.id] ? styles.show : ""}`}>
                  {section.links.map((link, index) => (
                    <li key={index}>
                      <a href="#">{link}</a>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <>
                <h4>{section.title}</h4>
                <ul>
                  {section.links.map((link, index) => (
                    <li key={index}>
                      <a href="#">{link}</a>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Copyright Section */}
      <div className={styles.copyright}>
        <p>© {new Date().getFullYear()} Moon Soul. All rights reserved.</p>
        <div className={styles.legalLinks}>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;