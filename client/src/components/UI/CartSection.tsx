// components/Cart/Cart.tsx
import { useCartStore } from '../../store/cartStore';
import styles from '../../styles/Cart.module.css';

const CartSection = () => {
  const { isCartOpen, cartItems, toggleCart, removeFromCart, updateQuantity, getSubtotal } = useCartStore();
  
  if (!isCartOpen) return null;

  return (
    <div className={styles.cartOverlay} onClick={toggleCart}>
      <div className={styles.cartContainer} onClick={(e) => e.stopPropagation()}>
        <div className={styles.cartHeader}>
          <h2>Shopping Cart ({cartItems.length})</h2>
          <button className={styles.closeButton} onClick={toggleCart}>×</button>
        </div>

        <div className={styles.cartItems}>
          {cartItems.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              <img src={item.image} alt={item.name} className={styles.itemImage} />
              <div className={styles.itemDetails}>
                <h3>{item.name}</h3>
                <p>LKR{item.price}</p>
                <div className={styles.quantityControl}>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity === 1}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                    +
                  </button>
                </div>
              </div>
              <button 
                className={styles.deleteButton}
                onClick={() => removeFromCart(item.id)}
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <div className={styles.cartFooter}>
          <div className={styles.subtotal}>
            <span>Subtotal:</span>
            <span>LKR{getSubtotal()}</span>
          </div>
          <div className={styles.actionButtons}>
            <button className={styles.viewCartButton}>View Cart</button>
            <button className={styles.checkoutButton}>Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSection;