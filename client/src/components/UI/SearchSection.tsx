// components/Search/SearchSection.tsx
import { useEffect, useState } from 'react';
import { useSearchStore } from '../../store/searchStore';
import styles from '../../styles/Search.module.css';

const SearchSection = () => {
  const { isSearchOpen, toggleSearch} = useSearchStore();
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for search results (replace with your actual data)
  const mockProducts = [
    { id: '1', name: 'Product 1', price: 999, image: '/product1.jpg' },
    { id: '2', name: 'Product 2', price: 1499, image: '/product2.jpg' },
  ];

  // Filter products based on search query
  const filteredProducts = mockProducts.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isSearchOpen) return null;
  return (
    <div className={styles.searchOverlay} onClick={toggleSearch}>
      <div className={styles.searchContainer} onClick={(e) => e.stopPropagation()}>
        <div className={styles.searchHeader}>
          <div className={styles.searchInputContainer}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
              autoFocus
            />
            <button className={styles.searchButton}>🔍</button>
          </div>
          <button className={styles.closeButton} onClick={toggleSearch}>
            ×
          </button>
        </div>

        <div className={styles.searchResults}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <a key={product.id} href={`/products/${product.id}`} className={styles.resultItem}>
                <img src={product.image} alt={product.name} className={styles.resultImage} />
                <div className={styles.resultDetails}>
                  <h3>{product.name}</h3>
                  <p>LKR {product.price}</p>
                </div>
              </a>
            ))
          ) : (
            <div className={styles.noResults}>No products found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchSection;