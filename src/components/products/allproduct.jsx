import React, { useEffect, useState } from "react";
import styles from "../../pages/CSS/product/allProduct.module.css";
import { makeApi } from "../../api/callApi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LoginPopup from "../LoginPopup/LoginPopup.jsx";
import { fetchCart, addToCart, removeFromCart } from "../../utils/productFunction.js";
import SkeletonLoader from "./SkeletonLoader.jsx";
import sortimage from "../../assets/sort.svg"

function Allproduct({ search, category, minPrice, maxPrice, categoryName, subcategory }) {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [ResultPerPage, setResultPerPage] = useState(50000000);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [toalProduct, setToalProduct] = useState(0);
    const [AllProductLoader, setAllProductLoader] = useState(true);
    const [IsLogin, setIsLogin] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [quantityLoading, setQuantityLoading] = useState({});
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [productLoaders, setProductLoaders] = useState({});
    const [completeCart, setCompleteCart] = useState([]);
    const [AddTocartLoader, setAddTocartLoader] = useState({});
    const [displayedProducts, setDisplayedProducts] = useState([]);
    const [displayedProductslength, setDisplayedProductslength] = useState([]);
    const [visibleProducts, setVisibleProducts] = useState(20);
    const [sortBy, setSortBy] = useState("");
    const [hasFetched, setHasFetched] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [minLoadTimePassed, setMinLoadTimePassed] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isDropdownOpen && !event.target.closest(`.${styles.customDropdown}`)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]);

    useEffect(() => {
        if (isInitialLoad) {
            window.scrollTo(0, 0);
            setIsInitialLoad(false);
        }
    }, [isInitialLoad]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setMinLoadTimePassed(true);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLogin(!!token);
    }, []);

    const fetchProduct = async (page, cat, searchTerm, min, max, subcategory) => {
        try {
            setAllProductLoader(true);
            const response = await makeApi(
                `/api/get-all-products?name=${searchTerm}&category=${cat}&subcategory=${subcategory}&minPrice=${min}&maxPrice=${max}&page=${page}&perPage=${ResultPerPage}&IsOutOfStock=false`,
                "GET"
            );

            const sortedProducts = await response.data.products.sort((a, b) => a.name.localeCompare(b.name));

            await setProducts(sortedProducts);
            await setDisplayedProducts(sortedProducts.slice(0, visibleProducts));
            await setDisplayedProductslength(sortedProducts.length);
            await setToalProduct(response.data.totalProducts);
            await setTotalPages(Math.ceil(response.data.totalProducts / 10));
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setAllProductLoader(false);
            setHasFetched(true);
        }
    };

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const categoryFromUrl = queryParams.get("category") || "";
        const searchFromUrl = queryParams.get("search") || "";
        const minPriceFromUrl = queryParams.get("minPrice") || "0";
        const maxPriceFromUrl = queryParams.get("maxPrice") || "1000000";

        fetchProduct(1, categoryFromUrl, searchFromUrl, minPriceFromUrl, maxPriceFromUrl, subcategory);
    }, [location.search]);

    useEffect(() => {
        fetchProduct(1, category, search, minPrice, maxPrice, subcategory);
        setCurrentPage(1);
        fetchCartItems();
        window.scrollTo(0, 0);
    }, [search, category, minPrice, maxPrice, subcategory]);

    useEffect(() => {
        fetchCart(setCartItems);
    }, []);

    const handleIncreaseQuantity = async (productId, size) => {
        if (!IsLogin) {
            setShowPopup(true);
            return;
        }
        const cartItem = cartItems.find(item => item.productId === productId && item.size === size._id);
        try {
            setQuantityLoading(prev => ({ ...prev, [productId]: true }));
            await addToCart(productId, setIsLogin, setShowPopup, fetchCartItems, setCartItems, setProductLoaders, size._id);
        } catch (error) {
            console.error("Error increasing quantity:", error);
        } finally {
            setQuantityLoading(prev => ({ ...prev, [productId]: false }));
        }
    };

    const handleDecreaseQuantity = async (productId, size) => {
        const cartItem = cartItems.find(item => item.productId === productId && item.size === size._id);
        if (cartItem && cartItem.quantity > 0) {
            try {
                setQuantityLoading(prev => ({ ...prev, [productId]: true }));
                await removeFromCart(productId, setProductLoaders, setCartItems, fetchCartItems, size._id);
            } catch (error) {
                console.error("Error decreasing quantity:", error);
            } finally {
                setQuantityLoading(prev => ({ ...prev, [productId]: false }));
            }
        }
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    const fetchCartItems = async () => {
        try {
            await fetchCart(setCartItems, setCompleteCart, setAddTocartLoader);
        } catch (error) {
            console.error("Error fetching cart items:", error);
        }
    };
    function handleNavigate(id) {
        navigate(`/product/product-details/${id}`);
    }


    const handleLoadMore = () => {
        const nextVisibleProducts = visibleProducts + 10;
        setVisibleProducts(nextVisibleProducts);
        setDisplayedProducts(products.slice(0, nextVisibleProducts));
    };

    const handleSort = async (sortType) => {
        if (sortType === "popularity") {
            try {
                setAllProductLoader(true);
                const response = await makeApi(
                    `/api/get-all-top-saller-products`,
                    "GET"
                );
                const sortedProducts = response.data.products;
                setProducts(sortedProducts);
                setDisplayedProducts(sortedProducts.slice(0, visibleProducts));
            } catch (error) {
                console.error("Error fetching popular products:", error);
            } finally {
                setAllProductLoader(false);
            }
        }
        else {
            // For price sorting, fetch fresh data with applied filters
            try {
                setAllProductLoader(true);

                // Use props filters if they exist, otherwise fall back to URL params
                const activeCategory = category || new URLSearchParams(location.search).get("category") || "";
                const activeSearch = search || new URLSearchParams(location.search).get("search") || "";
                const activeMinPrice = minPrice !== undefined ? minPrice : new URLSearchParams(location.search).get("minPrice") || "0";
                const activeMaxPrice = maxPrice !== undefined ? maxPrice : new URLSearchParams(location.search).get("maxPrice") || "1000000";
                const activeSubcategory = subcategory || "";

                const response = await makeApi(
                    `/api/get-all-products?name=${activeSearch}&category=${activeCategory}&subcategory=${activeSubcategory}&minPrice=${activeMinPrice}&maxPrice=${activeMaxPrice}&page=1&perPage=${ResultPerPage}&IsOutOfStock=false`,
                    "GET"
                );

                let sortedProducts = response.data.products;

                // Apply sorting
                if (sortType === "hight") {
                    sortedProducts.sort((a, b) => a.size[0].FinalPrice - b.size[0].FinalPrice);
                }
                else if (sortType === "low") {
                    sortedProducts.sort((a, b) => b.size[0].FinalPrice - a.size[0].FinalPrice);
                }

                setProducts(sortedProducts);
                setDisplayedProducts(sortedProducts.slice(0, visibleProducts));
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setAllProductLoader(false);
            }
        }

        setSortBy(sortType);
    };

    useEffect(() => {
        if (search) {
            // When search is active (popup is open)
            document.body.style.overflow = 'hidden';
        } else {
            // When search is not active (popup is closed)
            document.body.style.overflow = 'auto';
        }

        // Cleanup function to reset overflow when component unmounts
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [search]);

    return (
        <div className={styles.mainContainer}>
            {showPopup && <LoginPopup onClose={closePopup} />}

            {AllProductLoader ? (
                <SkeletonLoader items={12} />
            ) : (
                <div className={styles.container}>
                    {search ? (
                        <div className="main_search_div_for_mobile_cart">
                            <div className={`search_bar_card_for_mobile ${search ? styles.searchPopupActive : ''}`}>
                                {displayedProducts.map((result, id) => (
                                    <div className="searched_product_details_div" key={id}>
                                        <div className="searched_product_details_div_img">
                                            <img src={result.thumbnail} alt={result.name} className="searched_product_details_img" />
                                        </div>
                                        <div className="searched_product_details_div_info">
                                            <div className="searched_product_details_div_info_name">
                                                <div>{result.name}</div>
                                                <div>
                                                    {result.size.length > 0 && (
                                                        <>₹{result.size[0].FinalPrice}</>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="searched_product_details_div_info_btn">
                                                <div className="searched_product_details_div_info_btn_view" onClick={() => handleNavigate(result._id)}>View</div>
                                                <div className="searched_product_details_div_info_btn_cart">
                                                    {cartItems.some(cartItem => cartItem.productId === result._id && cartItem.size === result.size[0]._id) ? (
                                                        <div className="homeproduct_addtocart_and_quantity_div homeproduct_addtocart_and_quantity_div_for_Search">
                                                            <div>
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    onClick={() => handleDecreaseQuantity(result._id, result.size[0])}
                                                                    width="30"
                                                                    height="30"
                                                                    fill="currentColor"
                                                                    className="bi bi-dash text-white"
                                                                    style={{ cursor: "pointer" }}
                                                                    viewBox="0 0 16 16"
                                                                >
                                                                    <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
                                                                </svg>
                                                            </div>
                                                            <div style={{ minWidth: "20px", textAlign: "center" }}>
                                                                {quantityLoading[result._id] ? (
                                                                    <div style={{ paddingTop: "4px" }}>
                                                                        <div className="loader_for_home_page"></div>
                                                                    </div>
                                                                ) : (
                                                                    <div>
                                                                        {cartItems.find(cartItem => cartItem.productId === result._id && cartItem.size === result.size[0]._id)?.quantity || 0}
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div>
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    onClick={() => handleIncreaseQuantity(result._id, result.size[0])}
                                                                    width="30"
                                                                    height="30"
                                                                    fill="currentColor"
                                                                    className="bi bi-plus text-white"
                                                                    style={{ cursor: "pointer" }}
                                                                    viewBox="0 0 16 16"
                                                                >
                                                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div
                                                            className="searched_product_details_div_info_btn_cart"
                                                            onClick={() => handleIncreaseQuantity(result._id, result.size[0])}
                                                        >
                                                            {quantityLoading[result._id] ? (
                                                                <div className="loader_for_home_page"></div>
                                                            ) : (
                                                                "ADD"
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <>
                            {displayedProductslength === 0 ? (
                                <div className={styles.NoProductsFound}>No Products Found</div>
                            ) : (
                                <div>
                                    {/* {displayedProductslength > 0 && (
                                        <div className={styles.sortContainer}>
                                            <div className={styles.customDropdown}>
                                                <div className={styles.dropdownHeader} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>

                                                    <svg xmlns="http://www.w3.org/2000/svg" className="all_product_filter_icons" fill="currentColor" class="bi bi-arrow-up" viewBox="0 0 16 16">
                                                        <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5" />
                                                    </svg>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="all_product_filter_icons" fill="currentColor" class="bi bi-arrow-down" viewBox="0 0 16 16">
                                                        <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1" />
                                                    </svg>
                                                </div>
                                                {isDropdownOpen && (
                                                    <div className={styles.dropdownOptions}>
                                                        <div
                                                            className={styles.dropdownOption}
                                                            onClick={() => {
                                                                handleSort("popularity");
                                                                setIsDropdownOpen(false);
                                                            }}
                                                        >
                                                            popularity
                                                        </div>
                                                        <div
                                                            className={styles.dropdownOption}
                                                            onClick={() => {
                                                                setSortBy("hight");
                                                                handleSort("hight");
                                                                setIsDropdownOpen(false);
                                                            }}
                                                        >
                                                            Price Low to High
                                                        </div>
                                                        <div
                                                            className={styles.dropdownOption}
                                                            onClick={() => {
                                                                setSortBy("low");
                                                                handleSort("low");
                                                                setIsDropdownOpen(false);
                                                            }}
                                                        >
                                                            Price High to Low
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )} */}
                                    {displayedProductslength > 0 && (
  <div className={styles.sortContainer}>
    <div className={styles.customDropdown}>
      <div className={styles.dropdownHeader} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        {/* Custom arrow indicators */}
        <div className={styles.arrowContainer}>
            <div>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`${styles.sortArrow} ${sortBy === "hight" ? styles.activeArrow : ""}`}
            fill="currentColor" 
            viewBox="0 0 16 16"
          >
            <path fillRule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5" />
          </svg>
          </div>
          <div>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`${styles.sortArrow} ${sortBy === "low" ? styles.activeArrow : ""}`}
            fill="currentColor" 
            viewBox="0 0 16 16"
          >
            <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1" />
          </svg>
          </div>
        </div>
      </div>
      {isDropdownOpen && (
        <div className={styles.dropdownOptions}>
          <div
            className={styles.dropdownOption}
            onClick={() => {
              handleSort("popularity");
              setIsDropdownOpen(false);
            }}
          >
            popularity
          </div>
          <div
            className={styles.dropdownOption}
            onClick={() => {
              setSortBy("hight");
              handleSort("hight");
              setIsDropdownOpen(false);
            }}
          >
            Price Low to High
          </div>
          <div
            className={styles.dropdownOption}
            onClick={() => {
              setSortBy("low");
              handleSort("low");
              setIsDropdownOpen(false);
            }}
          >
            Price High to Low
          </div>
        </div>
      )}
    </div>
  </div>
)}

                                    <div className={styles.productsContainer}>
                                        {displayedProducts.length > 0 && <div className={styles.home_page_selcte_cat_name}>{categoryName}</div>}
                                        <div className={styles.allProductsList}>
                                            {displayedProducts.map(product => (
                                                <div key={product.id} className="homeproduct_product_sub_div_for_all_prodcut">
                                                    <div className="homeproduct_product_div_image">
                                                        <img src={product.thumbnail} alt={product.name} onClick={() => handleNavigate(product._id)} />
                                                    </div>
                                                    <div className="homeproduct_product_div_details">
                                                        <div>
                                                            <div className="bold_details_homeproduct">
                                                                {product.name}
                                                            </div>
                                                            <div className="homeproduct_product_div_details_category">{product.category.name}</div>
                                                        </div>
                                                        <div className="bold_details_homeproduct">
                                                            {product.size.length > 0 &&
                                                                product.size[0].sizetype !== "Pack" &&
                                                                product.size[0].size !== "null" &&
                                                                product.size[0].sizetype !== "null" && (
                                                                    <>
                                                                        {/* <span className="pe-1">{product.size[0].size}</span>{product.size[0].sizetype} */}
                                                                        <>
                                                                            <span className="">{product.size[0].size}</span>
                                                                            {product.size[0].sizetype.toLowerCase() === "gram" ? " g" :
                                                                                product.size[0].sizetype.toUpperCase() === "KG" ? " Kg" :
                                                                                    product.size[0].sizetype}
                                                                        </>
                                                                    </>
                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="homeproduct_product_div_addtocart">
                                                        <div>
                                                            {product.size && product.size.length > 0 && (
                                                                <>
                                                                    <span className="Rs_text_homeproduct"> ₹ </span>
                                                                    <span className="price_text_homeproduct">{product.size[0].FinalPrice}</span>
                                                                    {product.size[0].price - product.size[0].FinalPrice > 1 && (
                                                                        <>
                                                                            <span className="original_text_homeproduct">₹ {product.size[0].price}</span>
                                                                            <span className="discount_text_homeproduct">
                                                                                -{Math.round(((product.size[0].price - product.size[0].FinalPrice) / product.size[0].price) * 100)}%
                                                                            </span>
                                                                        </>
                                                                    )}
                                                                </>
                                                            )}
                                                        </div>
                                                        <div>
                                                            {cartItems.some(cartItem => cartItem.productId === product._id && cartItem.size === product.size[0]._id) ? (
                                                                <div className="homeproduct_addtocart_and_quantity_div">
                                                                    <div>
                                                                        <svg
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            onClick={() => handleDecreaseQuantity(product._id, product.size[0])}
                                                                            width="30"
                                                                            height="30"
                                                                            fill="currentColor"
                                                                            className="bi bi-dash text-black"
                                                                            style={{ cursor: "pointer" }}
                                                                            viewBox="0 0 16 16"
                                                                        >
                                                                            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
                                                                        </svg>
                                                                    </div>
                                                                    <div style={{ minWidth: "20px", textAlign: "center" }}>
                                                                        {quantityLoading[product._id] ? (
                                                                            <div className="loader_for_home_page"></div>
                                                                        ) : (
                                                                            <div>
                                                                                {cartItems.find(cartItem => cartItem.productId === product._id && cartItem.size === product.size[0]._id)?.quantity || 0}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                    <div>
                                                                        <svg
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            onClick={() => handleIncreaseQuantity(product._id, product.size[0])}
                                                                            width="30"
                                                                            height="30"
                                                                            fill="currentColor"
                                                                            className="bi bi-plus text-black"
                                                                            style={{ cursor: "pointer" }}
                                                                            viewBox="0 0 16 16"
                                                                        >
                                                                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                                                                        </svg>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <div
                                                                    className="homeproduct_product_div_addtocart_Add_button"
                                                                    onClick={() => handleIncreaseQuantity(product._id, product.size[0])}
                                                                >
                                                                    {quantityLoading[product._id] ? (
                                                                        <div className="loader_for_home_page"></div>
                                                                    ) : (
                                                                        "ADD"
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    {visibleProducts < products.length && (
                                        <div className={styles.loadMoreContainer}>
                                            <button className={styles.loadMoreButton} onClick={handleLoadMore} style={{ color: "black" }}>
                                                Load More
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}
        </div>
    );

    // return (
    //     <div className={styles.mainContainer}>
    //         {showPopup && <LoginPopup onClose={closePopup} />}

    //         {(!AllProductLoader) ? (
    //             <div className={styles.container}>
    //                 <>
    //                     {search ? <div className="main_search_div_for_mobile_cart">
    //                         <div className={`search_bar_card_for_mobile ${search ? styles.searchPopupActive : ''}`}>
    //                             {displayedProducts.map((result, id) => (
    //                                 <div className="searched_product_details_div " >
    //                                     <div className="searched_product_details_div_img" >
    //                                         <img src={result.thumbnail} alt={result.name} className="searched_product_details_img" />
    //                                     </div>
    //                                     <div className="searched_product_details_div_info" >
    //                                         <div className="searched_product_details_div_info_name" >
    //                                             {/* <div>{result.name}</div> */}
    //                                             <div>{result.name}</div>

    //                                             <div>
    //                                                 {result.size.length > 0 &&
    //                                                     <>
    //                                                         ₹{result.size[0].FinalPrice}
    //                                                     </>
    //                                                 }
    //                                             </div>
    //                                         </div>
    //                                         <div className="searched_product_details_div_info_btn" >
    //                                             <div className="searched_product_details_div_info_btn_view" onClick={() => handleNavigate(result._id)} >View</div>
    //                                             {/* <div className="searched_product_details_div_info_btn_cart" >Add to Cart</div> */}
    //                                             <div className="searched_product_details_div_info_btn_cart">
    //                                                 {cartItems.some(cartItem => cartItem.productId === result._id && cartItem.size === result.size[0]._id) ? (
    //                                                     <div className="homeproduct_addtocart_and_quantity_div homeproduct_addtocart_and_quantity_div_for_Search ">
    //                                                         <div>
    //                                                             <svg
    //                                                                 xmlns="http://www.w3.org/2000/svg"
    //                                                                 onClick={() => handleDecreaseQuantity(result._id, result.size[0])}
    //                                                                 width="30"
    //                                                                 height="30"
    //                                                                 fill="currentColor"
    //                                                                 className="bi bi-dash text-white"
    //                                                                 style={{ cursor: "pointer" }}
    //                                                                 viewBox="0 0 16 16"
    //                                                             >
    //                                                                 <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
    //                                                             </svg>
    //                                                         </div>

    //                                                         <div style={{ minWidth: "20px", textAlign: "center" }}>
    //                                                             {quantityLoading[result._id] ? (
    //                                                                 <div style={{ paddingTop: "4px" }}>
    //                                                                     <div className="loader_for_home_page "></div>
    //                                                                 </div>
    //                                                             ) : (
    //                                                                 <div  >
    //                                                                     {cartItems.find(cartItem => cartItem.productId === result._id && cartItem.size === result.size[0]._id)?.quantity || 0}
    //                                                                 </div>
    //                                                             )}
    //                                                         </div>

    //                                                         <div>
    //                                                             <svg
    //                                                                 xmlns="http://www.w3.org/2000/svg"
    //                                                                 onClick={() => handleIncreaseQuantity(result._id, result.size[0])}
    //                                                                 width="30"
    //                                                                 height="30"
    //                                                                 fill="currentColor"
    //                                                                 className="bi bi-plus text-white"
    //                                                                 style={{ cursor: "pointer" }}
    //                                                                 viewBox="0 0 16 16"
    //                                                             >
    //                                                                 <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
    //                                                             </svg>
    //                                                         </div>
    //                                                     </div>
    //                                                 ) : (
    //                                                     <div
    //                                                         className="searched_product_details_div_info_btn_cart"
    //                                                         onClick={() => handleIncreaseQuantity(result._id, result.size[0])}
    //                                                     >
    //                                                         {quantityLoading[result._id] ? (
    //                                                             <div className="loader_for_home_page"></div>
    //                                                         ) : (
    //                                                             "ADD"
    //                                                         )}
    //                                                     </div>
    //                                                 )}
    //                                             </div>
    //                                         </div>
    //                                     </div>
    //                                 </div>
    //                             ))}
    //                         </div>
    //                     </div>
    //                         : <>

    //                             {hasFetched && (
    //                                 <>
    //                                     {displayedProducts.length === 0 ? (
    //                                         <div className={styles.NoProductsFound}>No Products Found</div>
    //                                     ) : (
    //                                         <div>
    //                                             {displayedProducts.length > 0 && (
    //                                                 <div className={styles.sortContainer}>
    //                                                     <div className={styles.customDropdown}>
    //                                                         {/* <div className={styles.sortLabel}>Sort By:</div> */}
    //                                                         <div className={styles.dropdownHeader} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
    //                                                             {/* {sortBy === "hight" ? "Price: Low to High" : "Price: High to Low"}
    //                                             <span className={`${styles.arrow} ${isDropdownOpen ? styles.open : ""}`}>
    //                                                 ▼
    //                                             </span> */}
    //                                                             <img src={sortimage} className={styles.sort_image_all_product} />
    //                                                         </div>
    //                                                         {isDropdownOpen && (
    //                                                             <div className={styles.dropdownOptions}>
    //                                                                 <div
    //                                                                     className={styles.dropdownOption}
    //                                                                     onClick={() => {
    //                                                                         // setSortBy("hight");
    //                                                                         // handleSort("hight");
    //                                                                         // setIsDropdownOpen(false);

    //                                                                         handleSort("popularity");
    //                                                                         setIsDropdownOpen(false);
    //                                                                     }}
    //                                                                 >
    //                                                                     popularity
    //                                                                 </div>
    //                                                                 <div
    //                                                                     className={styles.dropdownOption}
    //                                                                     onClick={() => {
    //                                                                         setSortBy("hight");
    //                                                                         handleSort("hight");
    //                                                                         setIsDropdownOpen(false);
    //                                                                     }}
    //                                                                 >
    //                                                                     Price Low to High
    //                                                                 </div>
    //                                                                 <div
    //                                                                     className={styles.dropdownOption}
    //                                                                     onClick={() => {
    //                                                                         setSortBy("low");
    //                                                                         handleSort("low");
    //                                                                         setIsDropdownOpen(false);
    //                                                                     }}
    //                                                                 >
    //                                                                     Price High to Low
    //                                                                 </div>
    //                                                             </div>
    //                                                         )}
    //                                                     </div>
    //                                                 </div>
    //                                             )}

    //                                             <div className={styles.productsContainer}>
    //                                                 {displayedProducts.length > 0 && <div className={styles.home_page_selcte_cat_name} >{categoryName}</div>}
    //                                                 <div className={styles.allProductsList}>
    //                                                     {displayedProducts.map(product => (
    //                                                         <div key={product.id} className="homeproduct_product_sub_div_for_all_prodcut" >
    //                                                             {/* image */}
    //                                                             <div className="homeproduct_product_div_image" >
    //                                                                 <img src={product.thumbnail} alt={product.name} onClick={() => handleNavigate(product._id)} />
    //                                                             </div>
    //                                                             {/* details */}
    //                                                             <div className="homeproduct_product_div_details" >
    //                                                                 <div>
    //                                                                     <div className="bold_details_homeproduct">
    //                                                                         {product.name}
    //                                                                     </div>

    //                                                                     <div className="homeproduct_product_div_details_category" >{product.category.name}</div>
    //                                                                 </div>
    //                                                                 <div className="bold_details_homeproduct">
    //                                                                     {product.size.length > 0 &&
    //                                                                         product.size[0].sizetype !== "Pack" &&
    //                                                                         product.size[0].size !== "null" &&
    //                                                                         product.size[0].sizetype !== "null" && (
    //                                                                             <>
    //                                                                                 <span className="pe-1">{product.size[0].size}</span>{product.size[0].sizetype}
    //                                                                             </>
    //                                                                         )
    //                                                                     }
    //                                                                 </div>
    //                                                             </div>
    //                                                             {/* add to cart options */}
    //                                                             <div className="homeproduct_product_div_addtocart" >
    //                                                                 <div>

    //                                                                     {product.size && product.size.length > 0 && (
    //                                                                         <>
    //                                                                             <span className="Rs_text_homeproduct">Rs.</span>
    //                                                                             <span className="price_text_homeproduct">{product.size[0].FinalPrice}</span>

    //                                                                             {product.size[0].price - product.size[0].FinalPrice > 1 && (
    //                                                                                 <>
    //                                                                                     <span className="original_text_homeproduct">Rs.{product.size[0].price}</span>
    //                                                                                     <span className="discount_text_homeproduct">
    //                                                                                         -{Math.round(((product.size[0].price - product.size[0].FinalPrice) / product.size[0].price) * 100)}%
    //                                                                                     </span>
    //                                                                                 </>
    //                                                                             )}
    //                                                                         </>
    //                                                                     )}
    //                                                                 </div>
    //                                                                 <div>
    //                                                                     {cartItems.some(cartItem => cartItem.productId === product._id && cartItem.size === product.size[0]._id) ? (
    //                                                                         <div className="homeproduct_addtocart_and_quantity_div">
    //                                                                             <div>
    //                                                                                 <svg
    //                                                                                     xmlns="http://www.w3.org/2000/svg"
    //                                                                                     onClick={() => handleDecreaseQuantity(product._id, product.size[0])}
    //                                                                                     width="30"
    //                                                                                     height="30"
    //                                                                                     fill="currentColor"
    //                                                                                     className="bi bi-dash text-black"
    //                                                                                     style={{ cursor: "pointer" }}
    //                                                                                     viewBox="0 0 16 16"
    //                                                                                 >
    //                                                                                     <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
    //                                                                                 </svg>
    //                                                                             </div>

    //                                                                             <div style={{ minWidth: "20px", textAlign: "center" }}>
    //                                                                                 {quantityLoading[product._id] ? (
    //                                                                                     <div className="loader_for_home_page"></div>
    //                                                                                 ) : (
    //                                                                                     <div>
    //                                                                                         {cartItems.find(cartItem => cartItem.productId === product._id && cartItem.size === product.size[0]._id)?.quantity || 0}
    //                                                                                     </div>
    //                                                                                 )}
    //                                                                             </div>

    //                                                                             <div>
    //                                                                                 <svg
    //                                                                                     xmlns="http://www.w3.org/2000/svg"
    //                                                                                     onClick={() => handleIncreaseQuantity(product._id, product.size[0])}
    //                                                                                     width="30"
    //                                                                                     height="30"
    //                                                                                     fill="currentColor"
    //                                                                                     className="bi bi-plus text-black"
    //                                                                                     style={{ cursor: "pointer" }}
    //                                                                                     viewBox="0 0 16 16"
    //                                                                                 >
    //                                                                                     <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
    //                                                                                 </svg>
    //                                                                             </div>
    //                                                                         </div>
    //                                                                     ) : (
    //                                                                         <div
    //                                                                             className="homeproduct_product_div_addtocart_Add_button"
    //                                                                             onClick={() => handleIncreaseQuantity(product._id, product.size[0])}
    //                                                                         >
    //                                                                             {quantityLoading[product._id] ? (
    //                                                                                 <div className="loader_for_home_page"></div>
    //                                                                             ) : (
    //                                                                                 "ADD"
    //                                                                             )}
    //                                                                         </div>
    //                                                                     )}
    //                                                                 </div>

    //                                                             </div>
    //                                                         </div>
    //                                                     ))}
    //                                                 </div>
    //                                             </div>
    //                                             {visibleProducts < products.length && (
    //                                                 <div className={styles.loadMoreContainer}>
    //                                                     <button className={styles.loadMoreButton} onClick={handleLoadMore} style={{ color: "black" }}>
    //                                                         Load More
    //                                                     </button>
    //                                                 </div>
    //                                             )}
    //                                         </div>
    //                                     )}
    //                                 </>
    //                             )}
    //                         </>
    //                     }
    //                 </>


    //             </div>
    //         ) : (
    //             <SkeletonLoader items={12} />

    //         )}
    //     </div>
    // );
}

export default Allproduct;