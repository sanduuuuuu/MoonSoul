// components/Products/Products.tsx
import React from 'react';
import styles from '../../styles/Products.module.css';
import ring1 from '../../assets/ring1.jpg';
import ring2 from '../../assets/ring2.jpg';
import ring3 from '../../assets/ring3.jpg';

interface Product {
  id: number;
  title: string;
  image: string;
  description: string;
  price: number;
}

const Products: React.FC = () => {
    
  const products: Product[] = [
    {
      id: 1,
      title: "Rose Gold Minimal Ring",
      price: 1200,
      image: ring1, // Replace with real image URLs
      description: "A delicate rose gold ring with a minimal design."
    },
    {
      id: 2,
      title: "Bohemian Turquoise Ring",
      price: 1800,
      image: ring2, // Replace with real image URLs
      description: "A handcrafted ring featuring a turquoise stone."
    },
    {
      id: 3,
      title: "Sterling Silver Infinity Ring",
      price: 1500,
      image: ring3, // Replace with real image URLs
      description: "An elegant infinity ring made from sterling silver."
    },
  ];

  return (
    <section className={styles.productsSection}>
      <h2>Our Featured Collections</h2>
      <div className={styles.productsGrid}>
        {products.map((product) => (
          <div key={product.id} className={styles.productCard}>
            <div className={styles.productImage}>
              <img src={product.image} alt={product.title} />
            </div>
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <span className={styles.price}>{product.price}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;