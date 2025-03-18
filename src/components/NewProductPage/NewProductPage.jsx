import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './NewProductPage.module.css';
import { makeApi } from '../../api/callApi';

const NewProductPage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); // For pagination
  const [totalPages, setTotalPages] = useState(1); // Total pages for pagination
  const ResultPerPage = 10; // Number of results per page


  const priceRanges = [
    '₹0 to ₹499',
    '₹500 to ₹999',
    '₹1000 to ₹1499',
    '₹1500 to ₹1999',
    '₹2000 to ₹2499',
    '₹2500 to ₹2999',
    '₹3000 and ABOVE',
  ];

  const location = useLocation();

  // Fetch categories
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await makeApi("/api/get-all-categories", "GET");
        if (response.status === 200) {
          setCategories(response.data.categories);
        }
      } catch (error) {
        console.log("Error fetching categories:", error);
      }
    }
    fetchCategories();
  }, []);

  // Set selected category from URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const categoryFromURL = searchParams.get('category');
    if (categoryFromURL) {
      console.log("Category from URL:", categoryFromURL);
      setSelectedCategory(categoryFromURL);
    }
  }, [location]);



  // Fetch products based on selected category, price, and page
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        let query = `/api/get-all-products?page=${page}&perPage=${ResultPerPage}&IsOutOfStock=false`;

        if (selectedCategory) {
          // Find the category object that matches the selected category name
          const categoryObj = categories.find(cat => cat.name === selectedCategory);
          if (categoryObj) {
            query += `&category=${categoryObj._id}`;
          } else {
            console.warn(`Category not found: ${selectedCategory}`);
          }
        }

        if (selectedPrice) {
          const [minPrice, maxPrice] = selectedPrice
            .replace(/[₹,]/g, '')
            .split(' to ')
            .map(Number);

          query += `&minPrice=${minPrice}`;
          if (maxPrice) query += `&maxPrice=${maxPrice}`;
        }

        console.log("API Query:", query);

        const response = await makeApi(query, "GET");
        if (response.status === 200) {
          setProducts(response.data.products);
          setTotalPages(response.data.totalPages);
        }
      } catch (error) {
        console.log("Error fetching products:", error);
      }
      setLoading(false);
    }
    fetchProducts();
  }, [selectedCategory, selectedPrice, page, categories]);

  // Handle category change without navigation
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setPage(1); // Reset to the first page when category changes
  };

  // Handle price range change
  const handleCheckboxChange = (range) => {
    setSelectedPrice(range);
    setPage(1); // Reset to the first page when price range changes
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div className={styles.categories}>
          <h2>Product Categories</h2>
          <div>
            {categories.map((category) => (
              <p
                key={category.id}
                onClick={() => handleCategoryChange(category.name)}
                className={selectedCategory === category.name ? styles.active : ''}
              >
                {category.name}
              </p>
            ))}
          </div>
        </div>
        <div className={styles.filterPrice}>
          <h3 className={styles.title}>Filter By Price:</h3>
          <div className={styles.checkboxGroup}>
            {priceRanges.map((range, index) => (
              <label key={index} className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={selectedPrice === range}
                  onChange={() => handleCheckboxChange(range)}
                  className={styles.checkbox}
                />
                {range}
              </label>
            ))}
          </div>
        </div>
      </div>
      <hr />
      <div className={styles.productsContainer}>
        <h2>{selectedCategory ? selectedCategory.toUpperCase() : 'All Products'}</h2>
        {loading ? (
          <div className={styles.loader}>Loading...</div> // Show loader during data fetching
        ) : (
          <div className={styles.allProductsList}>
            {products.length > 0 ? (
              products.map((item) => (
                <div key={item.id} className={styles.products}>
                  <div className={styles.productImg}>
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className={styles.productContent}>
                    <p className={styles.productName}>{item.name}</p>
                    <p className={styles.productPrice}>
                      ₹{item.new_price} <span>₹{item.old_price}</span>
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>No products found</p>
            )}
          </div>
        )}

        {/* Pagination Controls */}
        <div className={styles.pagination}>
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewProductPage;



