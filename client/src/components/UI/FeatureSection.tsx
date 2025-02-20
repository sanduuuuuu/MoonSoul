import styles from "../../styles/Feature.module.css";
import { FaShippingFast } from "react-icons/fa";
import { BiSolidSelectMultiple } from "react-icons/bi";
import { RiSecurePaymentFill } from "react-icons/ri";

const FeaturesSection = () => {
  return (
    <div className={styles.featuresContainer}>
      <div className={styles.featureItem}>
        <FaShippingFast className={styles.featureIcon} />
        <div>
          <h4>Shipping</h4>
          <p>Islandwide delivery</p>
        </div>
      </div>

      <div className={styles.featureItem}>
        < BiSolidSelectMultiple className={styles.featureIcon} />
        <div>
          <h4>Multiple designs</h4>
          <p>to choose from</p>
        </div>
      </div>

      <div className={styles.featureItem}>
        <RiSecurePaymentFill className={styles.featureIcon} />
        <div>
          <h4>Flexible Payment</h4>
          <p>COD, Card</p>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;