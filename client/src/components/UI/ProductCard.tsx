// components/ProductCard/ProductCard.tsx
import React from 'react';
import styles from '../../styles/ProductCard.module.css';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className={styles.productCard}>
      <img src={product.image} alt={product.name} className={styles.productImage} />
      <div className={styles.productDetails}>
        <h3>{product.name}</h3>
        <p className={styles.productPrice}>₹{product.price}</p>
        <p className={styles.productDescription}>{product.description}</p>
        <button className={styles.addToCartButton}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;