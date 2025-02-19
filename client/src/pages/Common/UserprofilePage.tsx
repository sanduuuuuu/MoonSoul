import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import styles from '../../styles/PageStyles/UserProfile.module.css'; // Adjust the path as necessary
import Navbar from '../../components/UI/Navbar';

const UserProfile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [orders] = React.useState([]); // Replace with actual order data

  let handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) {
    return <div className={styles.container}>Please log in to view this page</div>;
  }

  return (
    <>
    <Navbar/>
    <div className={styles.container}>
      
      <div className={styles.header}>
        <h1 className={styles.title}>My Account</h1>
        <div className={styles.subtext}>
          <p className={styles.greeting}>Welcome back, {user.firstName}!</p>
          <p className={styles.logoutText} onClick={handleLogout}>Log Out</p>
        </div>
      
      </div>

      <div className={styles.content}>
        {/* User Details Section */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Account Details</h2>
          <div className={styles.userDetails}>
            <p>{user.firstName} {user.lastName}</p>
            <p>{user.email}</p>
            <p className={styles.addAddress}>+ Add Address</p>
          </div>
        </div>

        {/* Order History Section */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Order History</h2>
          {orders.length === 0 ? (
            <div className={styles.noOrders}>
              <p>No past orders found</p>
              <a href="/shop" className={styles.shopLink}>
                Start Shopping
              </a>
            </div>
          ) : (
            <div className={styles.ordersList}>
              <div className={styles.orderItem}>
                <div className={styles.orderHeader}>
                  <span className={styles.orderNumber}>Order #12345</span>
                  <span className={styles.orderDate}>January 15, 2024</span>
                </div>
                <div className={styles.orderDetails}>
                  <div className={styles.orderProducts}>
                    2 items • Total: ₹12,999
                  </div>
                  <div className={styles.orderStatus}>Delivered</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default UserProfile;