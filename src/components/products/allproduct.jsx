import React, { useEffect, useState } from "react";
import styles from "../../pages/CSS/product/allProduct.module.css";
import { makeApi } from "../../api/callApi";
import { Link, useLocation } from "react-router-dom";
import LoginPopup from "../LoginPopup/LoginPopup.jsx";
import { toast } from "react-toastify";
import { fetchCart, addToCart, removeFromCart } from "../../utils/productFunction.js";

import SkeletonLoader from "./SkeletonLoader.jsx";

function Allproduct({ search, category, minPrice, maxPrice, categoryName, subcategory }) {
	const [products, setProducts] = useState([]);
	const [cartItems, setCartItems] = useState([]);
	const [ResultPerPage, setResultPerPage] = useState(50000000);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [toalProduct, setToalProduct] = useState(0);
	const [AllProductLoader, setAllProductLoader] = useState(false);
	const [IsLogin, setIsLogin] = useState(false);
	const [showPopup, setShowPopup] = useState(false);
	const [quantityLoading, setQuantityLoading] = useState({});
	const [isInitialLoad, setIsInitialLoad] = useState(true);
	const [productLoaders, setProductLoaders] = useState({})
	const [completeCart, setCompleteCart] = useState([]);
	const [AddTocartLoader, setAddTocartLoader] = useState({})
	const [displayedProducts, setDisplayedProducts] = useState([]);
	const [visibleProducts, setVisibleProducts] = useState(20);

	useEffect(() => {
		if (isInitialLoad) {
			window.scrollTo(0, 0);
			setIsInitialLoad(false);
		}
	}, [isInitialLoad]);

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

			// Sort to ensure first product is first (modify sorting logic as needed)
			const sortedProducts = response.data.products.sort((a, b) => a.name.localeCompare(b.name));

			setProducts(sortedProducts);
			setDisplayedProducts(sortedProducts.slice(0, visibleProducts));
			setToalProduct(response.data.totalProducts);
			setTotalPages(Math.ceil(response.data.totalProducts / 10));
		} catch (error) {
			console.error("Error fetching products:", error);
		} finally {
			setAllProductLoader(false);
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
		// if (size.quantity === cartItem?.quantity) {
		// 	toast('Cannot add more than available quantity.', { type: 'error' });
		// 	return;
		// }
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
console.log('displayedProducts',displayedProducts);
	return (
		<div className={styles.mainContainer}>
			{showPopup && <LoginPopup onClose={closePopup} />}
			{AllProductLoader ? (
				// <div className={styles.AllProductLoader}>
				// 	<div>
				// 		<Primaryloader />
				// 	</div>
				// </div>
				<SkeletonLoader items={12} />
			) : (
				<div className={styles.container}>
					{displayedProducts.length === 0 ? (
						<div className={styles.NoProductsFound}>No Products Found</div>
					) : (
						<div>
							<div className={styles.productsContainer}>
								<h2>{categoryName}</h2>
								<div className={styles.allProductsList}>
									{displayedProducts.map(item => (
										<div key={item._id} className={styles.products}>
											<Link to={`/product/product-details/${item._id}`}>
												<div className={styles.productImg}>
													<img src={item.thumbnail} alt={item.name} />
												</div>
											</Link>
											<div className={styles.productContent}>
												<p className={styles.name}>{item.name}</p>
												<div className={styles.pricecart}>
													{item.size.length > 0 &&
														<div className={styles.productPrice}>
															₹{item.size[0].FinalPrice} {/* Assuming you want to show the price of the first size */}
															{item.size[0].discountPercentage > 0 && (
																<span> ₹{item.size[0].price}</span>
															)}
														</div>
													}
													<div className={styles.cartActions}>
														{cartItems.some(cartItem => cartItem.productId === item._id && cartItem.size === item.size[0]._id) ? (
															<div className={styles.cartIncDec}>
																{/* <img
																	src={RemoveIcon}
																	alt=""
																	onClick={() => handleDecreaseQuantity(item._id, item.size[0])}
																/> */}
																<svg xmlns="http://www.w3.org/2000/svg" onClick={() => handleDecreaseQuantity(item._id, item.size[0])} width="30" height="30" fill="currentColor" class="bi bi-dash text-black" style={{ cursor: "pointer" }} viewBox="0 0 16 16">
																	<path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
																</svg>
																{quantityLoading[item._id] ? (
																	<div className={styles.loader}>
																	</div>
																) : (
																	<p>{cartItems.find(cartItem => cartItem.productId === item._id && cartItem.size === item.size[0]._id)?.quantity || 0}</p>
																)}
																{/* <img
																	src={AddIcon}
																	alt=""
																	onClick={() => handleIncreaseQuantity(item._id, item.size[0])}
																/> */}
																<svg xmlns="http://www.w3.org/2000/svg" onClick={() => handleIncreaseQuantity(item._id, item.size[0])} width="30" height="30" fill="currentColor" class="bi bi-plus text-black" style={{ cursor: "pointer" }} viewBox="0 0 16 16">
																	<path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
																</svg>
															</div>
														) : (
															<>
																{quantityLoading[item._id] ?
																	<div className={styles.loader} style={{ margin: "auto" }}>
																	</div> :
																	<button
																		onClick={() => handleIncreaseQuantity(item._id, item.size[0])}
																	>
																		Add to Cart
																	</button>
																}
															</>
														)}
													</div>
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
							{visibleProducts < products.length && (
								<div className={styles.loadMoreContainer}>
									<button className={styles.loadMoreButton} onClick={handleLoadMore} style={{ color: "black" }} >
										Load More
									</button>
								</div>
							)}
						</div>
					)}
				</div>
			)}
		</div>
	)
}

export default Allproduct;