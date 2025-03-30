// import React, { useEffect, useState } from "react";
// import styles from "../../pages/CSS/product/allProduct.module.css";
// import { makeApi } from "../../api/callApi";
// import { Link, useLocation } from "react-router-dom";
// import LoginPopup from "../LoginPopup/LoginPopup.jsx";
// import { fetchCart, addToCart, removeFromCart } from "../../utils/productFunction.js";
// import SkeletonLoader from "./SkeletonLoader.jsx";

// function Allproduct({ search, category, minPrice, maxPrice, categoryName, subcategory }) {
// 	const [products, setProducts] = useState([]);
// 	const [cartItems, setCartItems] = useState([]);
// 	const [ResultPerPage, setResultPerPage] = useState(50000000);
// 	const [currentPage, setCurrentPage] = useState(1);
// 	const [totalPages, setTotalPages] = useState(0);
// 	const [toalProduct, setToalProduct] = useState(0);
// 	const [AllProductLoader, setAllProductLoader] = useState(true);
// 	const [IsLogin, setIsLogin] = useState(false);
// 	const [showPopup, setShowPopup] = useState(false);
// 	const [quantityLoading, setQuantityLoading] = useState({});
// 	const [isInitialLoad, setIsInitialLoad] = useState(true);
// 	const [productLoaders, setProductLoaders] = useState({})
// 	const [completeCart, setCompleteCart] = useState([]);
// 	const [AddTocartLoader, setAddTocartLoader] = useState({})
// 	const [displayedProducts, setDisplayedProducts] = useState([]);
// 	const [visibleProducts, setVisibleProducts] = useState(20);
// 	const [sortBy, setSortBy] = useState("");

// 	useEffect(() => {
// 		if (isInitialLoad) {
// 			window.scrollTo(0, 0);
// 			setIsInitialLoad(false);
// 		}
// 	}, [isInitialLoad]);

// 	const location = useLocation();

// 	useEffect(() => {
// 		const token = localStorage.getItem("token");
// 		setIsLogin(!!token);
// 	}, []);

// 	const fetchProduct = async (page, cat, searchTerm, min, max, subcategory) => {
// 		try {
// 			setAllProductLoader(true);
// 			const response = await makeApi(
// 				`/api/get-all-products?name=${searchTerm}&category=${cat}&subcategory=${subcategory}&minPrice=${min}&maxPrice=${max}&page=${page}&perPage=${ResultPerPage}&IsOutOfStock=false`,
// 				"GET"
// 			);

// 			// Sort to ensure first product is first (modify sorting logic as needed)
// 			const sortedProducts = response.data.products.sort((a, b) => a.name.localeCompare(b.name));

// 			setProducts(sortedProducts);
// 			setDisplayedProducts(sortedProducts.slice(0, visibleProducts));
// 			setToalProduct(response.data.totalProducts);
// 			setTotalPages(Math.ceil(response.data.totalProducts / 10));
// 		} catch (error) {
// 			console.error("Error fetching products:", error);
// 		} finally {
// 			setAllProductLoader(false);
// 		}
// 	};

// 	useEffect(() => {
// 		const queryParams = new URLSearchParams(location.search);
// 		const categoryFromUrl = queryParams.get("category") || "";
// 		const searchFromUrl = queryParams.get("search") || "";
// 		const minPriceFromUrl = queryParams.get("minPrice") || "0";
// 		const maxPriceFromUrl = queryParams.get("maxPrice") || "1000000";

// 		fetchProduct(1, categoryFromUrl, searchFromUrl, minPriceFromUrl, maxPriceFromUrl, subcategory);
// 	}, [location.search]);

// 	useEffect(() => {
// 		fetchProduct(1, category, search, minPrice, maxPrice, subcategory);
// 		setCurrentPage(1);
// 		fetchCartItems();
// 		window.scrollTo(0, 0);
// 	}, [search, category, minPrice, maxPrice, subcategory]);

// 	useEffect(() => {
// 		fetchCart(setCartItems);
// 	}, []);

// 	const handleIncreaseQuantity = async (productId, size) => {
// 		if (!IsLogin) {
// 			setShowPopup(true);
// 			return;
// 		}
// 		const cartItem = cartItems.find(item => item.productId === productId && item.size === size._id);
// 		try {
// 			setQuantityLoading(prev => ({ ...prev, [productId]: true }));
// 			await addToCart(productId, setIsLogin, setShowPopup, fetchCartItems, setCartItems, setProductLoaders, size._id);
// 		} catch (error) {
// 			console.error("Error increasing quantity:", error);
// 		} finally {
// 			setQuantityLoading(prev => ({ ...prev, [productId]: false }));
// 		}
// 	};

// 	const handleDecreaseQuantity = async (productId, size) => {
// 		const cartItem = cartItems.find(item => item.productId === productId && item.size === size._id);
// 		if (cartItem && cartItem.quantity > 0) {
// 			try {
// 				setQuantityLoading(prev => ({ ...prev, [productId]: true }));
// 				await removeFromCart(productId, setProductLoaders, setCartItems, fetchCartItems, size._id);
// 			} catch (error) {
// 				console.error("Error decreasing quantity:", error);
// 			} finally {
// 				setQuantityLoading(prev => ({ ...prev, [productId]: false }));
// 			}
// 		}
// 	};

// 	const closePopup = () => {
// 		setShowPopup(false);
// 	};

// 	const fetchCartItems = async () => {
// 		try {
// 			await fetchCart(setCartItems, setCompleteCart, setAddTocartLoader);
// 		} catch (error) {
// 			console.error("Error fetching cart items:", error);
// 		}
// 	};

// 	const handleLoadMore = () => {
// 		const nextVisibleProducts = visibleProducts + 10;
// 		setVisibleProducts(nextVisibleProducts);
// 		setDisplayedProducts(products.slice(0, nextVisibleProducts));
// 	};

// 	const handleSort = (sortType) => {
// 		let sortedProducts = [...products];  // Make a copy of the products array to avoid mutating the original state
// 		if (sortType === "hight") {
// 			// Sort by Price Low to High
// 			sortedProducts.sort((a, b) => a.size[0].FinalPrice - b.size[0].FinalPrice);
// 		} else if (sortType === "low") {
// 			// Sort by Price High to Low
// 			sortedProducts.sort((a, b) => b.size[0].FinalPrice - a.size[0].FinalPrice);
// 		}
// 		setDisplayedProducts(sortedProducts.slice(0, visibleProducts)); 
// 	};
// 	return (
// 		<div className={styles.mainContainer}>
// 			{showPopup && <LoginPopup onClose={closePopup} />}
// 			{AllProductLoader ? (
// 				<SkeletonLoader items={12} />
// 			) : (
// 				<div className={styles.container}>
// 					{displayedProducts.length === 0 ? (
// 						<div className={styles.NoProductsFound}>No Products Found</div>
// 					) : (
// 						<div>
// 							<div className={styles.sortContainer} >
// 								<div className={styles.sortBy} > <span className={styles.sortLabel} > Sort By : </span>
// 									<select
// 										className={styles.sortSelect}
// 										value={sortBy}
// 										onChange={(e) => {
// 											const selectedSort = e.target.value;
// 											setSortBy(selectedSort);
// 											handleSort(selectedSort);
// 										}}
// 									>
// 										<option value="hight" className={styles.sortOption} >Price Low to High</option>
// 										<option value="low" className={styles.sortOption}>Price High to Low</option>
// 									</select>
// 								</div>
// 							</div>
// 							<div className={styles.productsContainer}>
// 								<h2>{categoryName}</h2>
// 								<div className={styles.allProductsList}>
// 									{displayedProducts.map(item => (
// 										<div key={item._id} className={styles.products}>
// 											<Link to={`/product/product-details/${item._id}`}>
// 												<div className={styles.productImg}>
// 													<img src={item.thumbnail} alt={item.name} />
// 												</div>
// 											</Link>
// 											<div className={styles.productContent}>
// 												<p className={styles.name}>{item.name}</p>
// 												<div className={styles.pricecart}>
// 													{item.size.length > 0 &&
// 														<div className={styles.productPrice}>
// 															₹{item.size[0].FinalPrice} {/* Assuming you want to show the price of the first size */}
// 															{item.size[0].discountPercentage > 0 && (
// 																<span> ₹{item.size[0].price}</span>
// 															)}
// 														</div>
// 													}
// 													<div className={styles.cartActions}>
// 														{cartItems.some(cartItem => cartItem.productId === item._id && cartItem.size === item.size[0]._id) ? (
// 															<div className={styles.cartIncDec}>
// 																<svg xmlns="http://www.w3.org/2000/svg" onClick={() => handleDecreaseQuantity(item._id, item.size[0])} width="30" height="30" fill="currentColor" class="bi bi-dash text-black" style={{ cursor: "pointer" }} viewBox="0 0 16 16">
// 																	<path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
// 																</svg>
// 																{quantityLoading[item._id] ? (
// 																	<div className={styles.loader}>
// 																	</div>
// 																) : (
// 																	<p>{cartItems.find(cartItem => cartItem.productId === item._id && cartItem.size === item.size[0]._id)?.quantity || 0}</p>
// 																)}
// 																<svg xmlns="http://www.w3.org/2000/svg" onClick={() => handleIncreaseQuantity(item._id, item.size[0])} width="30" height="30" fill="currentColor" class="bi bi-plus text-black" style={{ cursor: "pointer" }} viewBox="0 0 16 16">
// 																	<path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
// 																</svg>
// 															</div>
// 														) : (
// 															<>
// 																{quantityLoading[item._id] ?
// 																	<div className={styles.loader} style={{ margin: "auto" }}>
// 																	</div> :
// 																	<button
// 																		onClick={() => handleIncreaseQuantity(item._id, item.size[0])}
// 																	>
// 																		Add to Cart
// 																	</button>
// 																}
// 															</>
// 														)}
// 													</div>
// 												</div>
// 											</div>
// 										</div>
// 									))}
// 								</div>
// 							</div>
// 							{visibleProducts < products.length && (
// 								<div className={styles.loadMoreContainer}>
// 									<button className={styles.loadMoreButton} onClick={handleLoadMore} style={{ color: "black" }} >
// 										Load More
// 									</button>
// 								</div>
// 							)}
// 						</div>
// 					)}
// 				</div>
// 			)}
// 		</div>
// 	)
// }

// export default Allproduct;

// import React, { useEffect, useState } from "react";
// import styles from "../../pages/CSS/product/allProduct.module.css";
// import { makeApi } from "../../api/callApi";
// import { Link, useLocation } from "react-router-dom";
// import LoginPopup from "../LoginPopup/LoginPopup.jsx";
// import { fetchCart, addToCart, removeFromCart } from "../../utils/productFunction.js";
// import SkeletonLoader from "./SkeletonLoader.jsx";

// function Allproduct({ search, category, minPrice, maxPrice, categoryName, subcategory }) {
//     const [products, setProducts] = useState([]);
//     const [cartItems, setCartItems] = useState([]);
//     const [ResultPerPage, setResultPerPage] = useState(50000000);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(0);
//     const [toalProduct, setToalProduct] = useState(0);
//     const [AllProductLoader, setAllProductLoader] = useState(true); // Initialize as true
//     const [IsLogin, setIsLogin] = useState(false);
//     const [showPopup, setShowPopup] = useState(false);
//     const [quantityLoading, setQuantityLoading] = useState({});
//     const [isInitialLoad, setIsInitialLoad] = useState(true);
//     const [productLoaders, setProductLoaders] = useState({})
//     const [completeCart, setCompleteCart] = useState([]);
//     const [AddTocartLoader, setAddTocartLoader] = useState({})
//     const [displayedProducts, setDisplayedProducts] = useState([]);
//     const [visibleProducts, setVisibleProducts] = useState(20);
//     const [sortBy, setSortBy] = useState("");
//     const [hasFetched, setHasFetched] = useState(false); // New state to track if we've completed first fetch

//     const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (isDropdownOpen && !event.target.closest(`.${styles.customDropdown}`)) {
//                 setIsDropdownOpen(false);
//             }
//         };

//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, [isDropdownOpen]);

//     useEffect(() => {
//         if (isInitialLoad) {
//             window.scrollTo(0, 0);
//             setIsInitialLoad(false);
//         }
//     }, [isInitialLoad]);

//     const location = useLocation();

//     useEffect(() => {
//         const token = localStorage.getItem("token");
//         setIsLogin(!!token);
//     }, []);

//     const fetchProduct = async (page, cat, searchTerm, min, max, subcategory) => {
//         try {
//             setAllProductLoader(true);
//             const response = await makeApi(
//                 `/api/get-all-products?name=${searchTerm}&category=${cat}&subcategory=${subcategory}&minPrice=${min}&maxPrice=${max}&page=${page}&perPage=${ResultPerPage}&IsOutOfStock=false`,
//                 "GET"
//             );

//             const sortedProducts = response.data.products.sort((a, b) => a.name.localeCompare(b.name));

//             setProducts(sortedProducts);
//             setDisplayedProducts(sortedProducts.slice(0, visibleProducts));
//             setToalProduct(response.data.totalProducts);
//             setTotalPages(Math.ceil(response.data.totalProducts / 10));
//             setHasFetched(true); // Mark that we've completed the first fetch
//         } catch (error) {
//             console.error("Error fetching products:", error);
//             setHasFetched(true); // Even if error, we've completed the attempt
//         } finally {
//             setAllProductLoader(false);
//         }
//     };

//     useEffect(() => {
//         const queryParams = new URLSearchParams(location.search);
//         const categoryFromUrl = queryParams.get("category") || "";
//         const searchFromUrl = queryParams.get("search") || "";
//         const minPriceFromUrl = queryParams.get("minPrice") || "0";
//         const maxPriceFromUrl = queryParams.get("maxPrice") || "1000000";

//         fetchProduct(1, categoryFromUrl, searchFromUrl, minPriceFromUrl, maxPriceFromUrl, subcategory);
//     }, [location.search]);

//     useEffect(() => {
//         fetchProduct(1, category, search, minPrice, maxPrice, subcategory);
//         setCurrentPage(1);
//         fetchCartItems();
//         window.scrollTo(0, 0);
//     }, [search, category, minPrice, maxPrice, subcategory]);

//     useEffect(() => {
//         fetchCart(setCartItems);
//     }, []);

//     const handleIncreaseQuantity = async (productId, size) => {
//         if (!IsLogin) {
//             setShowPopup(true);
//             return;
//         }
//         const cartItem = cartItems.find(item => item.productId === productId && item.size === size._id);
//         try {
//             setQuantityLoading(prev => ({ ...prev, [productId]: true }));
//             await addToCart(productId, setIsLogin, setShowPopup, fetchCartItems, setCartItems, setProductLoaders, size._id);
//         } catch (error) {
//             console.error("Error increasing quantity:", error);
//         } finally {
//             setQuantityLoading(prev => ({ ...prev, [productId]: false }));
//         }
//     };

//     const handleDecreaseQuantity = async (productId, size) => {
//         const cartItem = cartItems.find(item => item.productId === productId && item.size === size._id);
//         if (cartItem && cartItem.quantity > 0) {
//             try {
//                 setQuantityLoading(prev => ({ ...prev, [productId]: true }));
//                 await removeFromCart(productId, setProductLoaders, setCartItems, fetchCartItems, size._id);
//             } catch (error) {
//                 console.error("Error decreasing quantity:", error);
//             } finally {
//                 setQuantityLoading(prev => ({ ...prev, [productId]: false }));
//             }
//         }
//     };

//     const closePopup = () => {
//         setShowPopup(false);
//     };

//     const fetchCartItems = async () => {
//         try {
//             await fetchCart(setCartItems, setCompleteCart, setAddTocartLoader);
//         } catch (error) {
//             console.error("Error fetching cart items:", error);
//         }
//     };

//     const handleLoadMore = () => {
//         const nextVisibleProducts = visibleProducts + 10;
//         setVisibleProducts(nextVisibleProducts);
//         setDisplayedProducts(products.slice(0, nextVisibleProducts));
//     };

//     const handleSort = (sortType) => {
//         let sortedProducts = [...products];
//         if (sortType === "hight") {
//             sortedProducts.sort((a, b) => a.size[0].FinalPrice - b.size[0].FinalPrice);
//         } else if (sortType === "low") {
//             sortedProducts.sort((a, b) => b.size[0].FinalPrice - a.size[0].FinalPrice);
//         }
//         setDisplayedProducts(sortedProducts.slice(0, visibleProducts));
//     };

//     return (
//         <div className={styles.mainContainer}>
//             {showPopup && <LoginPopup onClose={closePopup} />}

//             {/* Show loader only when loading and no products are available yet */}
//             {AllProductLoader && !hasFetched ? (
//                 <SkeletonLoader items={12} />
//             ) : (
//                 <div className={styles.container}>
//                     {/* Only show "No Products Found" after loading is complete and there are truly no products */}
//                     {hasFetched && displayedProducts.length === 0 ? (
//                         <div className={styles.NoProductsFound}>No Products Found</div>
//                     ) : (
//                         <div>
//                             {displayedProducts.length > 0 && (
//                                 // <div className={styles.sortContainer}>
//                                 //     <div className={styles.sortBy}>
//                                 //         <span className={styles.sortLabel}>Sort By : </span>
//                                 //         <select
//                                 //             className={styles.sortSelect}
//                                 //             value={sortBy}
//                                 //             onChange={(e) => {
//                                 //                 const selectedSort = e.target.value;
//                                 //                 setSortBy(selectedSort);
//                                 //                 handleSort(selectedSort);
//                                 //             }}
//                                 //         >
//                                 //             <option value="hight" className={styles.sortOption}>Price Low to High</option>
//                                 //             <option value="low" className={styles.sortOption}>Price High to Low</option>
//                                 //         </select>
//                                 //     </div>
//                                 // </div>
//                                 <div className={styles.sortContainer}>
//                                     <div className={styles.customDropdown}>
//                                         <div className={styles.sortLabel}>Sort By:</div>
//                                         <div className={styles.dropdownHeader} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
//                                             {sortBy === "hight" ? "Price Low to High" : "Price High to Low"}
//                                             <span className={`${styles.arrow} ${isDropdownOpen ? styles.open : ""}`}>
//                                                 ▼
//                                             </span>
//                                         </div>
//                                         {isDropdownOpen && (
//                                             <div className={styles.dropdownOptions}>
//                                                 <div
//                                                     className={styles.dropdownOption}
//                                                     onClick={() => {
//                                                         setSortBy("hight");
//                                                         handleSort("hight");
//                                                         setIsDropdownOpen(false);
//                                                     }}
//                                                 >
//                                                     Price Low to High
//                                                 </div>
//                                                 <div
//                                                     className={styles.dropdownOption}
//                                                     onClick={() => {
//                                                         setSortBy("low");
//                                                         handleSort("low");
//                                                         setIsDropdownOpen(false);
//                                                     }}
//                                                 >
//                                                     Price High to Low
//                                                 </div>
//                                             </div>
//                                         )}
//                                     </div>
//                                 </div>
//                             )}

//                             <div className={styles.productsContainer}>
//                                 {displayedProducts.length > 0 && <h2>{categoryName}</h2>}
//                                 <div className={styles.allProductsList}>
//                                     {displayedProducts.map(item => (
//                                         <div key={item._id} className={styles.products}>
//                                             <Link to={`/product/product-details/${item._id}`}>
//                                                 <div className={styles.productImg}>
//                                                     <img src={item.thumbnail} alt={item.name} />
//                                                 </div>
//                                             </Link>
//                                             <div className={styles.productContent}>
//                                                 <div className={styles.name}>{item.name}</div>
//                                                 {/* cat name  */}
//                                                 {/* <div className={styles.catName}>{item.category.name}</div> */}
//                                                 <div className={styles.pricecart}>
//                                                     {item.size.length > 0 &&
//                                                         <div className={styles.productPrice}>
//                                                             ₹{item.size[0].FinalPrice}
//                                                             {item.size[0].discountPercentage > 0 && (
//                                                                 <span> ₹{item.size[0].price}</span>
//                                                             )}
//                                                         </div>
//                                                     }
//                                                     <div className={styles.cartActions}>
//                                                         {cartItems.some(cartItem => cartItem.productId === item._id && cartItem.size === item.size[0]._id) ? (
//                                                             <div className={styles.cartIncDec}>
//                                                                 <svg xmlns="http://www.w3.org/2000/svg" onClick={() => handleDecreaseQuantity(item._id, item.size[0])} width="30" height="30" fill="currentColor" class="bi bi-dash text-black" style={{ cursor: "pointer" }} viewBox="0 0 16 16">
//                                                                     <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
//                                                                 </svg>
//                                                                 {quantityLoading[item._id] ? (
//                                                                     <div className={styles.loader}>
//                                                                     </div>
//                                                                 ) : (
//                                                                     <p>{cartItems.find(cartItem => cartItem.productId === item._id && cartItem.size === item.size[0]._id)?.quantity || 0}</p>
//                                                                 )}
//                                                                 <svg xmlns="http://www.w3.org/2000/svg" onClick={() => handleIncreaseQuantity(item._id, item.size[0])} width="30" height="30" fill="currentColor" class="bi bi-plus text-black" style={{ cursor: "pointer" }} viewBox="0 0 16 16">
//                                                                     <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
//                                                                 </svg>
//                                                             </div>
//                                                         ) : (
//                                                             <>
//                                                                 {quantityLoading[item._id] ?
//                                                                     <div className={styles.loader} style={{ margin: "auto" }}>
//                                                                     </div> :
//                                                                     <button
//                                                                         onClick={() => handleIncreaseQuantity(item._id, item.size[0])}
//                                                                     >
//                                                                         Add to Cart
//                                                                     </button>
//                                                                 }
//                                                             </>
//                                                         )}
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                             {visibleProducts < products.length && (
//                                 <div className={styles.loadMoreContainer}>
//                                     <button className={styles.loadMoreButton} onClick={handleLoadMore} style={{ color: "black" }}>
//                                         Load More
//                                     </button>
//                                 </div>
//                             )}
//                         </div>
//                     )}
//                 </div>
//             )}
//         </div>
//     )
// }

// export default Allproduct;




import React, { useEffect, useState } from "react";
import styles from "../../pages/CSS/product/allProduct.module.css";
import { makeApi } from "../../api/callApi";
import { Link, useLocation } from "react-router-dom";
import LoginPopup from "../LoginPopup/LoginPopup.jsx";
import { fetchCart, addToCart, removeFromCart } from "../../utils/productFunction.js";
import SkeletonLoader from "./SkeletonLoader.jsx";

function Allproduct({ search, category, minPrice, maxPrice, categoryName, subcategory }) {
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
    const [visibleProducts, setVisibleProducts] = useState(20);
    const [sortBy, setSortBy] = useState("hight");
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

    const handleLoadMore = () => {
        const nextVisibleProducts = visibleProducts + 10;
        setVisibleProducts(nextVisibleProducts);
        setDisplayedProducts(products.slice(0, nextVisibleProducts));
    };

    const handleSort = (sortType) => {
        let sortedProducts = [...products];
        if (sortType === "hight") {
            sortedProducts.sort((a, b) => a.size[0].FinalPrice - b.size[0].FinalPrice);
        } else if (sortType === "low") {
            sortedProducts.sort((a, b) => b.size[0].FinalPrice - a.size[0].FinalPrice);
        }
        setDisplayedProducts(sortedProducts.slice(0, visibleProducts));
    };

    return (
        <div className={styles.mainContainer}>
            {showPopup && <LoginPopup onClose={closePopup} />}

            {(AllProductLoader || !minLoadTimePassed) ? (
                <SkeletonLoader items={12} />
            ) : (
                <div className={styles.container}>
                    {hasFetched && (
                        <>
                            {displayedProducts.length === 0 ? (
                                <div className={styles.NoProductsFound}>No Products Found</div>
                            ) : (
                                <div>
                                    {displayedProducts.length > 0 && (
                                        <div className={styles.sortContainer}>
                                            <div className={styles.customDropdown}>
                                                <div className={styles.sortLabel}>Sort By:</div>
                                                <div className={styles.dropdownHeader} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                                                    {sortBy === "hight" ? "Price: Low to High" : "Price: High to Low"}
                                                    <span className={`${styles.arrow} ${isDropdownOpen ? styles.open : ""}`}>
                                                        ▼
                                                    </span>
                                                </div>
                                                {isDropdownOpen && (
                                                    <div className={styles.dropdownOptions}>
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
                                        {displayedProducts.length > 0 && <div className={styles.home_page_selcte_cat_name} >{categoryName}</div>}
                                        <div className={styles.allProductsList}>
                                            {displayedProducts.map(product => (
                                                // <div key={item._id} className={styles.products}>
                                                //     <Link to={`/product/product-details/${item._id}`}>
                                                //         <div className={styles.productImg}>
                                                //             <img src={item.thumbnail} alt={item.name} />
                                                //         </div>
                                                //     </Link>
                                                //     <div className={styles.productContent}>
                                                //         <div className={styles.name}>{item.name}</div>
                                                //         <div className={styles.pricecart}>
                                                //             {item.size.length > 0 &&
                                                //                 <div className={styles.productPrice}>
                                                //                     ₹{item.size[0].FinalPrice}
                                                //                     {item.size[0].discountPercentage > 0 && (
                                                //                         <span> ₹{item.size[0].price}</span>
                                                //                     )}
                                                //                 </div>
                                                //             }
                                                //             <div className={styles.cartActions}>
                                                //                 {cartItems.some(cartItem => cartItem.productId === item._id && cartItem.size === item.size[0]._id) ? (
                                                //                     <div className={styles.cartIncDec}>
                                                //                         <svg xmlns="http://www.w3.org/2000/svg" onClick={() => handleDecreaseQuantity(item._id, item.size[0])} width="30" height="30" fill="currentColor" className="bi bi-dash text-black" style={{ cursor: "pointer" }} viewBox="0 0 16 16">
                                                //                             <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
                                                //                         </svg>
                                                //                         {quantityLoading[item._id] ? (
                                                //                             <div className={styles.loader}>
                                                //                             </div>
                                                //                         ) : (
                                                //                             <p>{cartItems.find(cartItem => cartItem.productId === item._id && cartItem.size === item.size[0]._id)?.quantity || 0}</p>
                                                //                         )}
                                                //                         <svg xmlns="http://www.w3.org/2000/svg" onClick={() => handleIncreaseQuantity(item._id, item.size[0])} width="30" height="30" fill="currentColor" className="bi bi-plus text-black" style={{ cursor: "pointer" }} viewBox="0 0 16 16">
                                                //                             <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                                                //                         </svg>
                                                //                     </div>
                                                //                 ) : (
                                                //                     <>
                                                //                         {quantityLoading[item._id] ?
                                                //                             <div className={styles.loader} style={{ margin: "auto" }}>
                                                //                             </div> :
                                                //                             <button
                                                //                                 onClick={() => handleIncreaseQuantity(item._id, item.size[0])}
                                                //                             >
                                                //                                 Add to Cart
                                                //                             </button>
                                                //                         }
                                                //                     </>
                                                //                 )}
                                                //             </div>
                                                //         </div>
                                                //     </div>
                                                // </div>
                                                <div key={product.id} className="homeproduct_product_sub_div_for_all_prodcut" >
                                                    {/* image */}
                                                    <div className="homeproduct_product_div_image" >
                                                        <img src={product.thumbnail} alt={product.name} onClick={() => handleNavigate(product._id)} />
                                                    </div>
                                                    {/* details */}
                                                    <div className="homeproduct_product_div_details" >
                                                        <div>
                                                            <div className="bold_details_homeproduct">
                                                                {product.name.split(' ').slice(0, 2).join(' ')}
                                                            </div>

                                                            <div className="homeproduct_product_div_details_category" >{product.category.name}</div>
                                                        </div>
                                                        <div className="bold_details_homeproduct">
                                                            {product.size.length > 0 &&
                                                                product.size[0].sizetype !== "Pack" &&
                                                                product.size[0].size !== "null" &&
                                                                product.size[0].sizetype !== "null" && (
                                                                    <>
                                                                        <span className="pe-1">{product.size[0].size}</span>{product.size[0].sizetype}
                                                                    </>
                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                                    {/* add to cart options */}
                                                    <div className="homeproduct_product_div_addtocart" >
                                                        <div>


                                                            {product.size && product.size.length > 0 && (
                                                                <>
                                                                    <span className="Rs_text_homeproduct">Rs.</span>
                                                                    <span className="price_text_homeproduct">{product.size[0].FinalPrice}</span>

                                                                    {product.size[0].price - product.size[0].FinalPrice > 1 && (
                                                                        <>
                                                                            <span className="original_text_homeproduct">Rs.{product.size[0].price}</span>
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
}

export default Allproduct;