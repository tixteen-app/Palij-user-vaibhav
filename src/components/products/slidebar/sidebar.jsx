import React, { useEffect, useState } from "react";
import "../../../pages/CSS/product/sidebar.css";
import Allproduct from "../allproduct";
import styles from "../../../pages/CSS/product/sidebar.module.css";
import { makeApi } from "../../../api/callApi";
import { IoSearch } from "react-icons/io5";
import FilterDropdown from "./FilterPopup";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiArrowRightSLine } from "react-icons/ri";
import {  FiShoppingBag } from "react-icons/fi";

import { useLocation, useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

const ProductSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(queryParams.get("category") || "");
  const [categoryName, setCategoryName] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState({ min: 0, max: 1000000 });
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [catloader, setCatloader] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState({});

  useEffect(() => {
    if (isInitialLoad) {
      window.scrollTo(0, 0);
      setIsInitialLoad(false);
    }
  }, [isInitialLoad]);

  useEffect(() => {
    const categoryOrder = [
      "PREMIUM COOKIES",
      "Savouries",  
      "Cakes",
      "DRY CAKE",
      "GIFT HAMPERS",
    ];
  
    function sortCategoriesByOrder(categories) {
      return categories.sort((a, b) => {
        const indexA = categoryOrder.findIndex(
          (name) => name.toLowerCase() === a.name.toLowerCase()
        );
        const indexB = categoryOrder.findIndex(
          (name) => name.toLowerCase() === b.name.toLowerCase()
        );
    
        const safeIndexA = indexA === -1 ? categoryOrder.length : indexA;
        const safeIndexB = indexB === -1 ? categoryOrder.length : indexB;
    
        return safeIndexA - safeIndexB;
      });
    }
    
    async function fetchCategories() {
      try {
        setCatloader(true);
  
        // Check if categories exist in localStorage and are not expired
        const cachedCategories = localStorage.getItem('cachedCategories');
        const cachedTimestamp = localStorage.getItem('categoriesTimestamp');
        const currentTime = new Date().getTime();
        const twoMinutes = 2 * 60 * 1000; // 2 minutes in milliseconds
  
        if (cachedCategories && cachedTimestamp && (currentTime - cachedTimestamp < twoMinutes)) {
          // Use cached categories if they exist and are fresh
          const parsedCategories = JSON.parse(cachedCategories);
          const sortedCategories = sortCategoriesByOrder(parsedCategories);
          setCategories(sortedCategories);
  
          // Sync with URL using cached categories
          const urlCategoryId = queryParams.get("category");
          if (urlCategoryId) {
            const matchedCategory = sortedCategories.find(
              (category) => category._id === urlCategoryId
            );
            if (matchedCategory) {
              setCategoryName(matchedCategory.name);
              // Expand the category if it's selected
              setExpandedCategories(prev => ({ ...prev, [urlCategoryId]: true }));
            }
          }
        } else {
          // Fetch fresh data from API
          const response = await makeApi("/api/get-all-categories", "GET");
          if (response.status === 200) {
            const freshCategories = response.data.categories;
            const sortedCategories = sortCategoriesByOrder(freshCategories);
            setCategories(sortedCategories);
  
            // Cache the fresh data with current timestamp
            localStorage.setItem('cachedCategories', JSON.stringify(freshCategories));
            localStorage.setItem('categoriesTimestamp', currentTime.toString());
  
            // Sync with URL using fresh categories
            const urlCategoryId = queryParams.get("category");
            if (urlCategoryId) {
              const matchedCategory = sortedCategories.find(
                (category) => category._id === urlCategoryId
              );
              if (matchedCategory) {
                setCategoryName(matchedCategory.name);
                // Expand the category if it's selected
                setExpandedCategories(prev => ({ ...prev, [urlCategoryId]: true }));
              }
            }
          }
        }
      } catch (error) {
        console.log("Error fetching categories:", error);
        // If API fails but we have cached data, use that as fallback
        const cachedCategories = localStorage.getItem('cachedCategories');
        if (cachedCategories) {
          const parsedCategories = JSON.parse(cachedCategories);
          const sortedCategories = sortCategoriesByOrder(parsedCategories);
          setCategories(sortedCategories);
        }
      } finally {
        setCatloader(false);
      }
    }
  
    fetchCategories();
  }, []);
  

  // useEffect(() => {
  //   // This effect syncs the selected category with URL changes
  //   const categoryId = queryParams.get("category");
  //   setSelectedCategory(categoryId || "");

  //   if (categoryId && categories.length > 0) {
  //     const matchedCategory = categories.find(
  //       (category) => category._id === categoryId
  //     );
  //     if (matchedCategory) {
  //       setCategoryName(matchedCategory.name);
  //     }
  //   } else {
  //     setCategoryName("");
  //   }
  // }, [location.search, categories]);
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoryId = queryParams.get("category") || "";
    
    // Only update if category actually changed
    if (categoryId !== selectedCategory) {
      setSelectedCategory(categoryId);
      
      // Find and set the category name
      if (categoryId && categories.length > 0) {
        const matchedCategory = categories.find(
          (category) => category._id === categoryId
        );
        if (matchedCategory) {
          setCategoryName(matchedCategory.name);
          // Expand the category if it's selected
          setExpandedCategories(prev => ({ ...prev, [categoryId]: true }));
        }
      } else {
        setCategoryName("");
      }
      
      // Reset other filters when category changes
      setSelectedSubcategory("");
      setSelectedPriceRange({ min: 0, max: 1000000 });
    }
  }, [location.search, categories]);

  const handleCategoryChange = (categoryId, name) => {
    const newQueryParams = new URLSearchParams(location.search);
    
    // Toggle category expansion
    const isCurrentlyExpanded = expandedCategories[categoryId];
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !isCurrentlyExpanded
    }));

    if (categoryId === "") {
      newQueryParams.delete("category");
    } else {
      newQueryParams.set("category", categoryId);
      // Clear other filters when changing category
      newQueryParams.delete("subcategory");
      newQueryParams.delete("minPrice");
      newQueryParams.delete("maxPrice");
    }

    navigate(`?${newQueryParams.toString()}`);
    setSelectedCategory(categoryId);
    setSelectedSubcategory("");
    setCategoryName(name);
    setSelectedPriceRange({ min: 0, max: 1000000 }); // Reset price filter
  };

  const handleSubcategoryChange = (subcategoryId) => {
    setSelectedSubcategory(subcategoryId);
    const newQueryParams = new URLSearchParams(location.search);
    newQueryParams.set("subcategory", subcategoryId);
    navigate(`?${newQueryParams.toString()}`);
  };

  // Update the handleFilterApply function
const handleFilterApply = (categoryId, minPrice, maxPrice, subcategoryId, selectedCategoryname) => {
  const newQueryParams = new URLSearchParams(location.search);

  // Handle category filter
  if (categoryId) {
    newQueryParams.set("category", categoryId);
    setSelectedCategory(categoryId);
    setCategoryName(selectedCategoryname);
    setExpandedCategories(prev => ({ ...prev, [categoryId]: true }));
  } else {
    // Clear category when "All" is selected
    newQueryParams.delete("category");
    setSelectedCategory("");
    setCategoryName("All Products");
  }

  // Handle subcategory
  if (subcategoryId) {
    newQueryParams.set("subcategory", subcategoryId);
    setSelectedSubcategory(subcategoryId);
  } else {
    newQueryParams.delete("subcategory");
    setSelectedSubcategory("");
  }

  // Handle price range
  if (minPrice !== undefined && maxPrice !== undefined) {
    newQueryParams.set("minPrice", minPrice);
    newQueryParams.set("maxPrice", maxPrice);
    setSelectedPriceRange({ min: minPrice, max: maxPrice });
  } else {
    newQueryParams.delete("minPrice");
    newQueryParams.delete("maxPrice");
    setSelectedPriceRange({ min: 0, max: 1000000 });
  }

  navigate(`?${newQueryParams.toString()}`);
};

// Update the FilterDropdown component usage
<FilterDropdown
  show={showDropdown}
  onClose={() => setShowDropdown(false)}
  onApply={(catId, min, max, subId, name) => {
    handleFilterApply(catId, min, max, subId, name);
    setShowDropdown(false);
  }}
  categories={categories}
/>


  const handleResetPriceFilter = () => {
    setSelectedPriceRange({ min: 0, max: 1000000 });
    const newQueryParams = new URLSearchParams(location.search);
    newQueryParams.delete("minPrice");
    newQueryParams.delete("maxPrice");
    navigate(`?${newQueryParams.toString()}`);
  };

  const priceRanges = [
    { label: "₹0 to ₹499", min: 0, max: 499 },
    { label: "₹500 to ₹999", min: 500, max: 999 },
    { label: "₹1000 to ₹1499", min: 1000, max: 1499 },
    { label: "₹1500 to ₹1999", min: 1500, max: 1999 },
    { label: "₹2000 to ₹2499", min: 2000, max: 2499 },
    { label: "₹2500 to ₹2999", min: 2500, max: 2999 },
    { label: "₹3000 and ABOVE", min: 3000, max: 1000000 },
  ];

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  return (
    <>
      <div className="main_product_sidebar_top_parent_div">
        <div className="main_product_sidebar_div">
          {/* search */}
          <div className="product_sliderbar_options">
            <div className="proudct_sidebar_heading product-heading1">
              Product Search:
            </div>
            <div>
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input_for_search_sidebar"
              />
            </div>
          </div>

          {/* product category */}
          <div className="product_sliderbar_options a_product_sliderbar_options">
            <div className="proudct_sidebar_heading"> Product Category:</div>
            <div className={styles.categories}>
              {catloader ? (
                <Skeleton height={`200px`} width={`100%`} />
              ) : (
                <div>
                  <p
                    onClick={() => handleCategoryChange("", "All Products")}
                    className={!selectedCategory ? styles.activeCategory : ""}
                  >
                    All
                  </p>

                  {categories.map((category) => (
                    <div key={category._id}>
                      <p
                        onClick={() => handleCategoryChange(category._id, category.name)}
                        className={`${selectedCategory === category._id ? styles.activeCategory : ""} ${styles.categoryItem}`}
                      >
                        <span>{category.name}</span>
                        {category.subcategories && category.subcategories.length > 0 && (
                          <RiArrowRightSLine
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleCategory(category._id);
                            }}
                            className={`${styles.subcategoryIcon} ${expandedCategories[category._id] ? styles.rotateIcon : styles.normalIcon
                              }`}
                          />
                        )}
                      </p>
                      {category.subcategories &&
                        category.subcategories.length > 0 &&
                        expandedCategories[category._id] && (
                          <div className={styles.subcategories}>
                            {category.subcategories.map((subcategory) => (
                              <p
                                key={subcategory._id}
                                onClick={() => handleSubcategoryChange(subcategory._id)}
                                className={selectedSubcategory === subcategory._id ? styles.activeSubcategory : ""}
                              >
                                {subcategory.name}
                              </p>
                            ))}
                          </div>
                        )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* filter by price */}
          <div className="product_sliderbar_options price_filter_sidebar_pc_sidebar">
            <div className="proudct_sidebar_heading">Filter By Price:</div>
            <div className={styles.priceFilterOptions}>
              <div className={styles.priceFilterOption}>
                <input
                  type="radio"
                  id="no-filter"
                  name="price-range"
                  checked={selectedPriceRange.min === 0 && selectedPriceRange.max === 1000000}
                  onChange={handleResetPriceFilter}
                />
                <label htmlFor="no-filter">No Filter</label>
              </div>
              {priceRanges.map((range, index) => (
                <div key={index} className={styles.priceFilterOption}>
                  <input
                    type="radio"
                    id={`price-${index}`}
                    name="price-range"
                    checked={
                      selectedPriceRange.min === range.min &&
                      selectedPriceRange.max === range.max
                    }
                    onChange={() => setSelectedPriceRange({ min: range.min, max: range.max })}
                  />
                  <label htmlFor={`price-${index}`}>{range.label}</label>
                </div>
              ))}
            </div>
          </div>

          {/* more */}
          <div className="product_sliderbar_options more_icon_sidebar">
            <div className="proudct_sidebar_heading"> More:</div>
            <div
              className="more_icon_sidebar_div"
              onClick={() => setShowDropdown(!showDropdown)}
              style={{ cursor: "pointer" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-three-dots-vertical"
                viewBox="0 0 16 16"
              >
                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
              </svg>
            </div>
          </div>
        </div>

        {/* Mobile view elements */}
        <div className="media_product_sidebar">
          <div className="media_all_product_search">
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div>
              <IoSearch />
            </div>
          </div>
          <div className="media_filter" onClick={() => setShowDropdown(!showDropdown)}>
            Filter
                        <span>
              <RiArrowDropDownLine />
            </span>
          </div>
        </div>

        <hr className="line_btn_sidebar_products" />
        <div className={styles.allproducts} style={{ zIndex: 1 }}>
          <Allproduct
            search={search}
            category={selectedCategory}
            minPrice={selectedPriceRange.min}
            maxPrice={selectedPriceRange.max}
            categoryName={categoryName}
            subcategory={selectedSubcategory}
          />
        </div>
      </div>

      <FilterDropdown
        show={showDropdown}
        onClose={() => setShowDropdown(false)}
        onApply={handleFilterApply}
        categories={categories}
      />
    </>
  );
};

export default ProductSidebar;