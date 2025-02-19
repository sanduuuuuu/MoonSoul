// pages/ShopPage.tsx
import { useEffect, useState } from 'react';
import { TfiLayoutGrid3Alt, TfiLayoutGrid4Alt } from "react-icons/tfi";
import { FaList } from 'react-icons/fa';
//import { useProductStore } from '../../store/productStore';
import Navbar from '../../components/UI/Navbar';
import ProductCard from '../../components/UI/ProductCard';
import styles from '../../styles/PageStyles/Shop.module.css';
import ring1 from '../../assets/ring1.jpg';
import ring2 from '../../assets/ring2.jpg';
import ring3 from '../../assets/ring3.jpg';
import earring1 from '../../assets/earings1.jpg';
import earring2 from '../../assets/earring2.jpg';
import p1 from '../../assets/P1.jpg';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

const ShopPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid-4' | 'grid-3' | 'list'>('grid-4');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const itemsPerPage = 12;

  // Mock data - replace with API call
  useEffect(() => {
    const mockProducts: { id: string; name: string; price: number; category: string; image: string; description: string }[] = [
      // Rings
    {
        id: "1",
        name: "Rose Gold Minimal Ring",
        price: 1200,
        category: "Rings",
        image: ring1, // Replace with real image URLs
        description: "A delicate rose gold ring with a minimal design."
      },
      {
        id: "2",
        name: "Bohemian Turquoise Ring",
        price: 1800,
        category: "Rings",
        image: ring2, // Replace with real image URLs
        description: "A handcrafted ring featuring a turquoise stone."
      },
      {
        id: "3",
        name: "Sterling Silver Infinity Ring",
        price: 1500,
        category: "Rings",
        image: ring3, // Replace with real image URLs
        description: "An elegant infinity ring made from sterling silver."
      },
  
      // Earrings
      {
        id: "4",
        name: "Crystal Drop Earrings",
        price: 2500,
        category: "Earrings",
        image: earring1,
        description: "Beautiful drop earrings with shimmering crystals."
      },
      {
        id: "5",
        name: "Geometric Wooden Earrings",
        price: 1400,
        category: "Earrings",
        image: earring2,
        description: "Unique handmade earrings with geometric wood accents."
      },
      {
        id: "6",
        name: "Pearl Hoop Earrings",
        price: 3000,
        category: "Earrings",
        image: earring1,
        description: "Classic hoop earrings with freshwater pearls."
      },
  
      // Necklaces
      {
        id: "7",
        name: "Charm Pendant Necklace",
        price: 2000,
        category: "Necklace",
        image: "https://via.placeholder.com/150",
        description: "A dainty necklace with a charm pendant."
      },
      {
        id: "8",
        name: "Layered Boho Necklace",
        price: 3200,
        category: "Necklace",
        image: "https://via.placeholder.com/150",
        description: "A layered necklace with a bohemian touch."
      },
      {
        id: "9",
        name: "Moonstone Pendant Necklace",
        price: 2800,
        category: "Necklace",
        image: "https://via.placeholder.com/150",
        description: "Handmade necklace with a glowing moonstone pendant."
      },
  
      // Bracelets
      {
        id: "10",
        name: "Macrame Friendship Bracelet",
        price: 800,
        category: "Bracelet",
        image: "https://via.placeholder.com/150",
        description: "A colorful macrame bracelet symbolizing friendship."
      },
      {
        id: "11",
        name: "Gold Bangle Bracelet",
        price: 2500,
        category: "Bracelet",
        image: "https://via.placeholder.com/150",
        description: "Elegant gold bangles for everyday wear."
      },
      {
        id: "12",
        name: "Beaded Charm Bracelet",
        price: 1600,
        category: "Bracelet",
        image: "https://via.placeholder.com/150",
        description: "A handmade bracelet with colorful beads and charms."
      },
        // Rings
    {

      id: "1",
      name: "Rose Gold Minimal Ring",
      price: 1200,
      category: "Rings",
      image: ring1, // Replace with real image URLs
      description: "A delicate rose gold ring with a minimal design."
    },
    {
      id: "2",
      name: "Bohemian Turquoise Ring",
      price: 1800,
      category: "Rings",
      image: ring2, // Replace with real image URLs
      description: "A handcrafted ring featuring a turquoise stone."
    },
    {
      id: "3",
      name: "Sterling Silver Infinity Ring",
      price: 1500,
      category: "Rings",
      image: ring3, // Replace with real image URLs
      description: "An elegant infinity ring made from sterling silver."
    },

    // Earrings
    {
      id: "4",
      name: "Crystal Drop Earrings",
      price: 2500,
      category: "Earrings",
      image: earring1,
      description: "Beautiful drop earrings with shimmering crystals."
    },
    {
      id: "5",
      name: "Geometric Wooden Earrings",
      price: 1400,
      category: "Earrings",
      image: earring2,
      description: "Unique handmade earrings with geometric wood accents."
    },
    {
      id: "6",
      name: "Pearl Hoop Earrings",
      price: 3000,
      category: "Earrings",
      image: earring1,
      description: "Classic hoop earrings with freshwater pearls."
    },

    // Necklaces
    {
      id: "7",
      name: "Charm Pendant Necklace",
      price: 2000,
      category: "Necklace",
      image: "https://via.placeholder.com/150",
      description: "A dainty necklace with a charm pendant."
    },
    {
      id: "8",
      name: "Layered Boho Necklace",
      price: 3200,
      category: "Necklace",
      image: "https://via.placeholder.com/150",
      description: "A layered necklace with a bohemian touch."
    },
    {
      id: "9",
      name: "Moonstone Pendant Necklace",
      price: 2800,
      category: "Necklace",
      image: "https://via.placeholder.com/150",
      description: "Handmade necklace with a glowing moonstone pendant."
    },

    // Bracelets
    {
      id: "10",
      name: "Macrame Friendship Bracelet",
      price: 800,
      category: "Bracelet",
      image: "https://via.placeholder.com/150",
      description: "A colorful macrame bracelet symbolizing friendship."
    },
    {
      id: "11",
      name: "Gold Bangle Bracelet",
      price: 2500,
      category: "Bracelet",
      image: "https://via.placeholder.com/150",
      description: "Elegant gold bangles for everyday wear."
    },
    {
      id: "12",
      name: "Beaded Charm Bracelet",
      price: 1600,
      category: "Bracelet",
      image: "https://via.placeholder.com/150",
      description: "A handmade bracelet with colorful beads and charms."
    }
    ];
    setProducts(mockProducts);
  }, []);

  // Filtering logic
  const filteredProducts = products.filter((product: Product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesCategory = selectedCategories.length === 0 || 
      selectedCategories.includes(product.category);
    return matchesSearch && matchesPrice && matchesCategory;
  });

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  return (
    <div className={styles.shopPage}>
      <Navbar/>
      
      {/* Banner Section */}
      <div className={styles.banner}>
        <img 
          src={p1}
          alt="Shop Banner" 
          className={styles.bannerImage}
        />
        <div className={styles.bannerContent}>
          <h1>Moon Soul Handmade Jewelry</h1>
        </div>
      </div>

      <div className={styles.shopContainer}>
        {/* Filters Sidebar */}
        <div className={styles.filters}>
          <h2>Filters</h2>

          {/* Search */}
          <div className={styles.filterSection}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          {/* Categories Filter */}
          <div className={styles.filterSection}>
            <h3>Categories</h3>
            {['Rings', 'Necklaces', 'Earrings', 'Bracelets'].map(category => (
              <label key={category} className={styles.categoryLabel}>
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                  className={styles.categoryCheckbox}
                />
                {category}
              </label>
            ))}
          </div>

          {/* Price Filter */}
          <div className={styles.filterSection}>
            <h3>Price Range</h3>
            <input
              type="range"
              min="0"
              max="10000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
              className={styles.priceSlider}
            />
            <div className={styles.priceRange}>
              LKR0 - LKR{priceRange[1]}
            </div>
          </div>
        </div>

        {/* Product List */}
        <div className={styles.productList}>
          {/* Header with view options */}
          <div className={styles.productListHeader}>
            <div className={styles.resultsCount}>
              Showing {paginatedProducts.length} of {filteredProducts.length} products
            </div>
            <div className={styles.viewOptions}>
              <button
                onClick={() => setViewMode('grid-4')}
                className={`${styles.viewButton} ${viewMode === 'grid-4' ? styles.active : ''}`}
              >
                <TfiLayoutGrid4Alt/>
              </button>
              <button
                onClick={() => setViewMode('grid-3')}
                className={`${styles.viewButton} ${viewMode === 'grid-3' ? styles.active : ''}`}
              >
                <TfiLayoutGrid3Alt/>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`${styles.viewButton} ${viewMode === 'list' ? styles.active : ''}`}
              >
                <FaList/>
              </button>
            </div>
          </div>

          {/* Product Grid */}
          <div className={`${styles.productsGrid} ${styles[viewMode]}`}>
            {paginatedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          <div className={styles.pagination}>
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={styles.paginationButton}
            >
              Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className={styles.paginationButton}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;