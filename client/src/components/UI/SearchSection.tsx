// components/Search/SearchSection.tsx
import { useState } from 'react';
import { useSearchStore } from '../../store/searchStore';
import styles from '../../styles/Search.module.css';
import { IoSearchOutline } from "react-icons/io5";


const SearchSection = () => {
  const { isSearchOpen, toggleSearch} = useSearchStore();
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for search results (replace with your actual data)
  const mockProducts = [
    { id: '1', name: 'Dr. Rashel Vitamin C Brightening', price: 2350, image: '/product1.jpg', oldPrice: 2495.74 },
    { id: '2', name: 'La’Fresh Gold Face & Body Scrub 500ml', price: 1850, image: '/product2.jpg' },
    { id: '3', name: 'Jovees Tea Tree Oil Balance Face Wash', price: 1765, image: '/product3.jpg' },
  ];
  const mockSuggestions = ['face wash', 'face moisturizer', 'face mask'];

  // Filter products based on search query
  const filteredProducts = mockProducts.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
  };

  const closeSearch = () => {
    setSearchQuery('');
    toggleSearch();
  };


  const showResults = searchQuery.length > 0;
  
  if (!isSearchOpen) return null;
  return (
    <div className={styles.searchOverlay} onClick={toggleSearch}>
      <div className={styles.searchContainer} onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className={styles.closeButton} onClick={closeSearch}>×</button>
        {/* Search Bar */}
        <div className={styles.searchHeader}>
         
          <div className={styles.searchInputContainer}>
            <IoSearchOutline className={styles.searchIcon}/>
            <input
              type="text"
              placeholder={"Search products..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
              autoFocus
            />
            {searchQuery && (
              <button className={styles.clearButton} onClick={() => setSearchQuery('')}>
                Clear
              </button>
            )}
          </div>
          <button className={styles.closeButton} onClick={toggleSearch}>
            ×
          </button>
        </div>
        {/* Search Suggestions */}
        {searchQuery && (
          <div className={styles.searchSuggestions}>
            <h3>Search suggestions</h3>
            {mockSuggestions.map((suggestion, index) => (
              <p key={index} className={styles.suggestionItem} onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion}
              </p>
            ))}
          </div>
        )}


        {/* Search Results */}
        {showResults && filteredProducts.length > 0 && (
        <div className={styles.searchResults}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <a key={product.id} href={`/products/${product.id}`} className={styles.resultItem}>
                <img src={product.image} alt={product.name} className={styles.resultImage} />
                <div className={styles.resultDetails}>
                  <h3>{product.name}</h3>
                  {product.oldPrice ? (
                    <p className={styles.discountPrice}>
                      <span className={styles.oldPrice}>Rs {product.oldPrice.toFixed(2)}</span> Rs {product.price}
                    </p>
                  ) : (
                    <p>Rs {product.price}</p>
                  )}
                </div>
              </a>
            ))
          ) : (
            <div className={styles.noResults}>No products found</div>
          )}
        </div>
        )}
        <div className={styles.searchFooter}>
        {/* View all results button */}
        {showResults && (
          <div className={styles.viewAll}>
            <button className={styles.viewAllButton}>View all results</button>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default SearchSection;