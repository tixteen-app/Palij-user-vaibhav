import React, { useCallback, useEffect, useState } from "react"
import styles from "../../pages/CSS/product/allProduct.module.css"
import { IoIosHeart } from "react-icons/io"
import AddIcon from "../../assets/add_icon_green.png"
import RemoveIcon from "../../assets/remove_icon_red.png"
import Primaryloader from "../loaders/primaryloader.jsx"
import Heartloader from "../loaders/hearloader.jsx"
import HorizotalLoader from "../loaders/horizotalLoader.jsx"
import { Link, useLocation, useNavigate } from "react-router-dom"
import LoginPopup from "../LoginPopup/LoginPopup.jsx"
import Cookies from 'js-cookie';

import { makeApi } from "../../api/callApi"
import {
	addToCart,
	removeFromCart,
	fetchCart,
	fetchWishlist,
} from "../../utils/productFunction.js"
import { LazyLoadImage } from "react-lazy-load-image-component"
import { toast } from "react-toastify"

function Allproduct({ search, category, minPrice, maxPrice, categoryName, subcategory }) {
	const [products, setProducts] = useState([])
	const [loading, setLoading] = useState(false)
	const [wishlistItems, setWishlistItems] = useState([])
	const [cartItems, setCartItems] = useState([])
	const [ResultPerPage, setResultPerPage] = useState(120)
	const [currentPage, setCurrentPage] = useState(1)
	const [totalPages, setTotalPages] = useState(0)
	const [toalProduct, setToalProduct] = useState(0)
	const [AllProductLoader, setAllProductLoader] = useState(false)
	const [AddTocartLoader, setAddTocartLoader] = useState({})
	const [AddToWishlistLoader, setAddToWishlistLoader] = useState({})
	const [IsLogin, setIsLogin] = useState(false)
	const [showPopup, setShowPopup] = useState(false)
	const [productLoaders, setProductLoaders] = useState({})
	const [completeCart, setCompleteCart] = useState([]);
	const [quantityLoading, setQuantityLoading] = useState({});

	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem("token")
		setIsLogin(!!token)
	}, [localStorage.getItem("token")])
	useEffect(() => {
		const queryParams = new URLSearchParams(location.search);
		const categoryFromUrl = queryParams.get("category") || "";
		const searchFromUrl = queryParams.get("search") || "";
		const minPriceFromUrl = queryParams.get("minPrice") || "0";
		const maxPriceFromUrl = queryParams.get("maxPrice") || "1000000";

		setCurrentPage(1);
		fetchProduct(1, categoryFromUrl, searchFromUrl, minPriceFromUrl, maxPriceFromUrl);
	}, [location.search]);

	
	// const fetchProduct = async (page, cat, searchTerm, min, max) => {
	// 	try {
	// 		setAllProductLoader(true);
	// 		const response = await makeApi(
	// 			`/api/get-all-products?name=${searchTerm}&category=${cat}&subcategory=${subcategory}&minPrice=${min}&maxPrice=${max}&page=${page}&perPage=${ResultPerPage}&IsOutOfStock=false`,
	// 			"GET"
	// 		);
	// 		console.log("Fetched products:", response.data.products);
	// 		setProducts(response.data.products);
	// 		setToalProduct(response.data.totalProducts);
	// 		const totalPages = Math.ceil(response.data.totalProducts / ResultPerPage);
	// 		setTotalPages(totalPages);
	// 	} catch (error) {
	// 		console.error("Error fetching products:", error);
	// 	} finally {
	// 		setAllProductLoader(false);
	// 	}
	// };

	const fetchProduct = async (page, cat, searchTerm, min, max) => {
		try {
			setAllProductLoader(true);
			const response = await makeApi(
				`/api/get-all-products?name=${searchTerm}&category=${cat}&subcategory=${subcategory}&minPrice=${min}&maxPrice=${max}&page=${page}&perPage=${ResultPerPage}&IsOutOfStock=false`,
				"GET"
			);
			console.log("Fetched products:", response.data.products);
	
			// Store products in cookies (30-second expiration)
			Cookies.set("fetchedProducts", JSON.stringify(response.data.products), { expires: 1 / 48 });
	
			setProducts(response.data.products);
			setToalProduct(response.data.totalProducts);
			const totalPages = Math.ceil(response.data.totalProducts / ResultPerPage);
			setTotalPages(totalPages);
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

		setCurrentPage(1);
		fetchProduct(1, categoryFromUrl, searchFromUrl, minPriceFromUrl, maxPriceFromUrl);
	}, [location.search]);



	useEffect(() => {
		fetchProduct(1) // Reset to the first page when filters change
		setCurrentPage(1) // Reset the current page to 1
		fetchCart(setCartItems)
		fetchCartItems()
	}, [search, category, minPrice, maxPrice, ResultPerPage])

	useEffect(() => {
		fetchProduct() // Fetch products whenever the current page changes
	}, [currentPage])

	useEffect(() => {
		fetchProduct(1) // Reset to the first page when filters change
		setCurrentPage(1) // Reset the current page to 1
		fetchCart(setCartItems)
		fetchCartItems()
	}, [search, category, subcategory, minPrice, maxPrice, ResultPerPage])

	useEffect(() => {
		fetchProduct() // Fetch products whenever the current page changes
	}, [currentPage])

	const fetchCartItems = async () => {
		try {
			await fetchCart(setCartItems, setCompleteCart, setAddTocartLoader);
		} catch (error) {
			console.error("Error fetching cart items:", error);
		}
	};

	const handleIncreaseQuantity = async (productId, size) => {
		if (!IsLogin) {
			setShowPopup(true);
			return;
		}
		const cartItem = cartItems.find(item => item.productId === productId && item.size === size._id);
		if (size.quantity === cartItem?.quantity) {
			toast('Cannot add more than available quantity.', { type: 'error' });
			return;
		}
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
				await removeFromCart(productId, setProductLoaders, setCartItems, fetchCartItems, size._id);
			} catch (error) {
				console.error("Error decreasing quantity:", error);
			}
		}
	};




	useEffect(() => {
		console.log("Category prop changed:", category);
	}, [category]);


	const closePopup = () => {
		setShowPopup(false);
	};

	return (
		<div className={styles.mainContainer}>
			{showPopup && <LoginPopup onClose={closePopup} />}
			{AllProductLoader ? (

				<div className={styles.AllProductLoader}>
					<div>
						<Primaryloader />
					</div>
				</div>

			) : (


				<div className={styles.container}>
					{products.length === 0 ? (
						<div className={styles.NoProductsFound}>No Products Found</div>
					) : (
						<div>
							<div className={styles.productsContainer}>
								<h2>{categoryName}</h2>
								<div className={styles.allProductsList}>
									{products.map(item => (
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
														<p className={styles.productPrice}>
															₹{item.size[0].FinalPrice} {/* Assuming you want to show the price of the first size */}
															{item.size[0].discountPercentage > 0 && (
																<span> ₹{item.size[0].price}</span>
															)}
														</p>
													}
													<div className={styles.cartActions}>
														{cartItems.some(cartItem => cartItem.productId === item._id && cartItem.size === item.size[0]._id) ? (
															<div className={styles.cartIncDec}>
																<img
																	src={RemoveIcon}
																	alt=""
																	onClick={() => handleDecreaseQuantity(item._id, item.size[0])}
																/>
																{quantityLoading[item._id] ? (
																	<div className={styles.loader}>
																	</div>
																) : (
																	<p>{cartItems.find(cartItem => cartItem.productId === item._id && cartItem.size === item.size[0]._id)?.quantity || 0}</p>
																)}
																<img
																	src={AddIcon}
																	alt=""
																	onClick={() => handleIncreaseQuantity(item._id, item.size[0])}
																/>
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
							<div className={styles.pagination}>
								{Array.from({ length: totalPages }, (_, index) => index + 1).map(
									(pageNumber) => (
										<button
											key={pageNumber}
											className={`${styles.paginationButton} ${pageNumber === currentPage ? styles.active : ""}`}
											onClick={() => handlePageClick(pageNumber)}
										>
											{pageNumber}
										</button>
									)
								)}
								
							</div>
						</div>
					)}
				</div>
			)}

		</div>
	)
}

export default Allproduct