// import React, { useEffect, useState } from "react"
// import styles from "../../pages/CSS/product/allProduct.module.css"
// import { IoIosHeart } from "react-icons/io"
// import AddIcon from "../../assets/add_icon_green.png"
// import RemoveIcon from "../../assets/remove_icon_red.png"
// import Primaryloader from "../loaders/primaryloader.jsx"
// import Heartloader from "../loaders/hearloader.jsx"
// import HorizotalLoader from "../loaders/horizotalLoader.jsx"
// import { Link } from "react-router-dom"
// import LoginPopup from "../LoginPopup/LoginPopup.jsx"
// import { makeApi } from "../../api/callApi"
// import {
// 	addToCart,
// 	removeFromCart,
// 	fetchCart,
// 	fetchWishlist,
// } from "../../utils/productFunction.js"
// import { LazyLoadImage } from "react-lazy-load-image-component"
// import { toast } from "react-toastify"

// function Allproduct({ search, category, minPrice, maxPrice, categoryName }) {
// 	const [products, setProducts] = useState([])
// 	const [loading, setLoading] = useState(false)
// 	const [wishlistItems, setWishlistItems] = useState([])
// 	const [cartItems, setCartItems] = useState([])
// 	const [ResultPerPage, setResultPerPage] = useState(120)
// 	const [currentPage, setCurrentPage] = useState(1)
// 	const [totalPages, setTotalPages] = useState(0)
// 	const [toalProduct, setToalProduct] = useState(0)
// 	const [AllProductLoader, setAllProductLoader] = useState(false)
// 	const [AddTocartLoader, setAddTocartLoader] = useState({})
// 	const [AddToWishlistLoader, setAddToWishlistLoader] = useState({})
// 	const [IsLogin, setIsLogin] = useState(false)
// 	const [showPopup, setShowPopup] = useState(false)
// 	const [productLoaders, setProductLoaders] = useState({})

// 	useEffect(() => {
// 		const token = localStorage.getItem("token")
// 		setIsLogin(!!token)
// 	}, [localStorage.getItem("token")])

// 	const fetchProduct = async (page = currentPage) => {
// 		try {
// 			setAllProductLoader(true)
// 			const response = await makeApi(
// 				`/api/get-all-products?name=${search}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}&page=${page}&perPage=${ResultPerPage}&IsOutOfStock=false`,
// 				// `get-all-products-for-admin`,
// 				"GET"
// 			)
// 			console.log("all products ", response.data.product);

// 			setProducts(response.data.products)
// 			setToalProduct(response.data.totalProducts)
// 			const a = Math.ceil(response.data.totalProducts / ResultPerPage)
// 			setTotalPages(a)
// 		} catch (error) {
// 			console.log(error)
// 		} finally {
// 			setAllProductLoader(false)
// 		}
// 	}

// 	useEffect(() => {
// 		fetchProduct(1) // Reset to the first page when filters change
// 		setCurrentPage(1) // Reset the current page to 1
// 		fetchCart(setCartItems)
// 	}, [search, category, minPrice, maxPrice, ResultPerPage])

// 	useEffect(() => {
// 		fetchProduct() // Fetch products whenever the current page changes
// 	}, [currentPage])

// 	useEffect(() => {
// 		const fetchWishlist = async () => {
// 			try {
// 				setAddToWishlistLoader(true)
// 				const response = await makeApi("/api/get-my-wishlist", "GET")
// 				const wishlistIds = response.data.wishlist
// 					.filter((item) => item.products !== null)
// 					.map((item) => item.products._id)
// 				setWishlistItems(wishlistIds)
// 			} catch (error) {
// 				console.log(error)
// 			} finally {
// 				setAddToWishlistLoader(false)
// 			}
// 		}

// 		fetchWishlist()
// 	}, [])

// 	const isInCart = (productId) => {
// 		return cartItems.some((item) => item.productId === productId)
// 	}

// 	const closePopup = () => {
// 		setShowPopup(false)
// 	}

// 	const toggleWishlist = async (id) => {
// 		if (!IsLogin) {
// 			setShowPopup(true)
// 		} else {
// 			try {
// 				setAddToWishlistLoader((prevState) => ({
// 					...prevState,
// 					[id]: true,
// 				}))
// 				const method = "POST"
// 				const endpoint = `/api/create-wishlist/${id}`
// 				const data = await makeApi(endpoint, method)
// 				setWishlistItems((prevState) => {
// 					if (prevState.includes(id)) {
// 						return prevState.filter((itemId) => itemId !== id)
// 					} else {
// 						return [...prevState, id]
// 					}
// 				})
// 			} catch (error) {
// 				console.log(error)
// 			} finally {
// 				setAddToWishlistLoader((prevState) => ({
// 					...prevState,
// 					[id]: false,
// 				}))
// 			}
// 		}
// 	}

// 	const handlePageClick = (pageNumber) => {
// 		setCurrentPage(pageNumber)
// 		window.scrollTo(0, 0) // Scrolls to the top of the page
// 	}

// 	const getProductQuantity = (productId) => {
// 		const cartItem = cartItems.find((item) => item.productId === productId)
// 		return cartItem ? cartItem.quantity : 0
// 	}

// 	const handleAddToCart = (productId, quantity, availableQuantity) => {
// 		if (quantity < availableQuantity) {
// 			addToCart(
// 				productId,
// 				setIsLogin,
// 				setShowPopup,
// 				fetchCart,
// 				setCartItems,
// 				setProductLoaders
// 			)
// 		} else {
// 			toast("Cannot add more than available quantity.", { type: "error" })
// 		}
// 	}

// 	return (
// 		<div className={styles.mainContainer}>
// 			{showPopup && <LoginPopup onClose={closePopup} />}
// 			{AllProductLoader ? (

// 				<div className={styles.AllProductLoader}>
// 					<div>
// 						<Primaryloader />
// 					</div>
// 				</div>

// 			) : (


// 				<div className={styles.container}>
// 					{products.length === 0 ? (
// 						<div className={styles.NoProductsFound}>No Products Found</div>
// 					) : (
// 						<div>
// 							<div className={styles.productsContainer}>
// 								<h2>{categoryName}</h2>
// 								<div className={styles.allProductsList}>
// 									{products.map(item => (
// 										<div key={item._id} className={styles.products}>
// 											<Link to={`/product/product-details/${item._id}`}>
// 												<div className={styles.productImg}>
// 													<img src={item.thumbnail} alt={item.name} />
// 												</div>
// 											</Link>
// 											<div className={styles.productContent}>
// 												<p className={styles.name}>{item.name}</p>
// 												{item.size.length > 0 ? (
// 													<p className={styles.productPrice}>
// 														₹{item.size[0].FinalPrice} {/* Assuming you want to show the price of the first size */}
// 														{item.size[0].discountPercentage > 0 && (
// 															<span> ₹{item.size[0].price}</span>
// 														)}
// 													</p>
// 												) : (
// 													<p className={styles.productPrice}>Price not available</p>
// 												)}
// 											</div>
// 										</div>
// 									))}
// 								</div>
// 							</div>
// 							<div className={styles.pagination}>
// 								{Array.from({ length: totalPages }, (_, index) => index + 1).map(
// 									(pageNumber) => (
// 										<button
// 											key={pageNumber}
// 											className={`${styles.paginationButton} ${pageNumber === currentPage ? styles.active : ""}`}
// 											onClick={() => handlePageClick(pageNumber)}
// 										>
// 											{pageNumber}
// 										</button>
// 									)
// 								)}
// 								{/* {totalPages > 1 && (
// 									<div className={styles.pagination}>
// 										{Array.from({ length: totalPages }, (_, index) => index + 1).map(
// 											(pageNumber) => (
// 												<button
// 													key={pageNumber}
// 													className={`${styles.paginationButton} ${pageNumber === currentPage ? styles.active : ""
// 														}`}
// 													onClick={() => handlePageClick(pageNumber)}
// 												>
// 													{pageNumber}
// 												</button>
// 											)
// 										)}
// 									</div>
// 								)} */}
// 							</div>
// 						</div>
// 					)}
// 				</div>
// 			)}

// 		</div>
// 	)
// }

// export default Allproduct


// import React, { useEffect, useState } from "react"
// import styles from "../../pages/CSS/product/allProduct.module.css"
// import { IoIosHeart } from "react-icons/io"
// import AddIcon from "../../assets/add_icon_green.png"
// import RemoveIcon from "../../assets/remove_icon_red.png"
// import Primaryloader from "../loaders/primaryloader.jsx"
// import Heartloader from "../loaders/hearloader.jsx"
// import HorizotalLoader from "../loaders/horizotalLoader.jsx"
// import { Link } from "react-router-dom"
// import LoginPopup from "../LoginPopup/LoginPopup.jsx"
// import { makeApi } from "../../api/callApi"
// import {
// 	addToCart,
// 	removeFromCart,
// 	fetchCart,
// 	fetchWishlist,
// } from "../../utils/productFunction.js"
// import { LazyLoadImage } from "react-lazy-load-image-component"
// import { toast } from "react-toastify"

// function Allproduct({ search, category, minPrice, maxPrice, categoryName }) {
// 	const [products, setProducts] = useState([])
// 	const [loading, setLoading] = useState(false)
// 	const [wishlistItems, setWishlistItems] = useState([])
// 	const [cartItems, setCartItems] = useState([])
// 	const [ResultPerPage, setResultPerPage] = useState(120)
// 	const [currentPage, setCurrentPage] = useState(1)
// 	const [totalPages, setTotalPages] = useState(0)
// 	const [toalProduct, setToalProduct] = useState(0)
// 	const [AllProductLoader, setAllProductLoader] = useState(false)
// 	const [AddTocartLoader, setAddTocartLoader] = useState({})
// 	const [AddToWishlistLoader, setAddToWishlistLoader] = useState({})
// 	const [IsLogin, setIsLogin] = useState(false)
// 	const [showPopup, setShowPopup] = useState(false)
// 	const [productLoaders, setProductLoaders] = useState({})
// 	const [completeCart, setCompleteCart] = useState([]);
// 	const [quantityLoading, setQuantityLoading] = useState({});


// 	useEffect(() => {
// 		const token = localStorage.getItem("token")
// 		setIsLogin(!!token)
// 	}, [localStorage.getItem("token")])

// 	const fetchProduct = async (page = currentPage) => {
// 		try {
// 			setAllProductLoader(true)
// 			const response = await makeApi(
// 				`/api/get-all-products?name=${search}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}&page=${page}&perPage=${ResultPerPage}&IsOutOfStock=false`,
// 				// `get-all-products-for-admin`,
// 				"GET"
// 			)
// 			console.log("all products ", response.data.product);

// 			setProducts(response.data.products)
// 			setToalProduct(response.data.totalProducts)
// 			const a = Math.ceil(response.data.totalProducts / ResultPerPage)
// 			setTotalPages(a)
// 		} catch (error) {
// 			console.log(error)
// 		} finally {
// 			setAllProductLoader(false)
// 		}
// 	}

// 	useEffect(() => {
// 		fetchProduct(1) // Reset to the first page when filters change
// 		setCurrentPage(1) // Reset the current page to 1
// 		fetchCart(setCartItems)
// 		fetchCartItems()
// 	}, [search, category, minPrice, maxPrice, ResultPerPage])

// 	useEffect(() => {
// 		fetchProduct() // Fetch products whenever the current page changes
// 	}, [currentPage])

// 	const fetchCartItems = async () => {
// 		try {
// 			await fetchCart(setCartItems, setCompleteCart, setAddTocartLoader);
// 		} catch (error) {
// 			console.error("Error fetching cart items:", error);
// 		}
// 	};

// 	const handleIncreaseQuantity = async (productId, size) => {
// 		if (!IsLogin) {
// 			setShowPopup(true);
// 			return;
// 		}
// 		const cartItem = cartItems.find(item => item.productId === productId && item.size === size._id);
// 		if (size.quantity === cartItem?.quantity) {
// 			toast('Cannot add more than available quantity.', { type: 'error' });
// 			return;
// 		}
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
// 				await removeFromCart(productId, setProductLoaders, setCartItems, fetchCartItems, size._id);
// 			} catch (error) {
// 				console.error("Error decreasing quantity:", error);
// 			}
// 		}
// 	};


// 	const handlePageClick = (pageNumber) => {
// 		setCurrentPage(pageNumber)
// 		window.scrollTo(0, 0) // Scrolls to the top of the page
// 	}


// 	return (
// 		<div className={styles.mainContainer}>
// 			{showPopup && <LoginPopup onClose={closePopup} />}
// 			{AllProductLoader ? (

// 				<div className={styles.AllProductLoader}>
// 					<div>
// 						<Primaryloader />
// 					</div>
// 				</div>

// 			) : (


// 				<div className={styles.container}>
// 					{products.length === 0 ? (
// 						<div className={styles.NoProductsFound}>No Products Found</div>
// 					) : (
// 						<div>
// 							<div className={styles.productsContainer}>
// 								<h2>{categoryName}</h2>
// 								<div className={styles.allProductsList}>
// 									{products.map(item => (
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
// 														<p className={styles.productPrice}>
// 															₹{item.size[0].FinalPrice} {/* Assuming you want to show the price of the first size */}
// 															{item.size[0].discountPercentage > 0 && (
// 																<span> ₹{item.size[0].price}</span>
// 															)}
// 														</p>
// 													}
// 													<div className={styles.cartActions}>
// 														{cartItems.some(cartItem => cartItem.productId === item._id && cartItem.size === item.size[0]._id) ? (
// 															<div className={styles.cartIncDec}>
// 																<img
// 																	src={RemoveIcon}
// 																	alt=""
// 																	onClick={() => handleDecreaseQuantity(item._id, item.size[0])}
// 																/>
// 																{quantityLoading[item._id] ? (
// 																	<div className={styles.loader}>
// 																	</div>
// 																) : (
// 																	<p>{cartItems.find(cartItem => cartItem.productId === item._id && cartItem.size === item.size[0]._id)?.quantity || 0}</p>
// 																)}
// 																<img
// 																	src={AddIcon}
// 																	alt=""
// 																	onClick={() => handleIncreaseQuantity(item._id, item.size[0])}
// 																/>
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
// 							<div className={styles.pagination}>
// 								{Array.from({ length: totalPages }, (_, index) => index + 1).map(
// 									(pageNumber) => (
// 										<button
// 											key={pageNumber}
// 											className={`${styles.paginationButton} ${pageNumber === currentPage ? styles.active : ""}`}
// 											onClick={() => handlePageClick(pageNumber)}
// 										>
// 											{pageNumber}
// 										</button>
// 									)
// 								)}
// 								{/* {totalPages > 1 && (
// 									<div className={styles.pagination}>
// 										{Array.from({ length: totalPages }, (_, index) => index + 1).map(
// 											(pageNumber) => (
// 												<button
// 													key={pageNumber}
// 													className={`${styles.paginationButton} ${pageNumber === currentPage ? styles.active : ""
// 														}`}
// 													onClick={() => handlePageClick(pageNumber)}
// 												>
// 													{pageNumber}
// 												</button>
// 											)
// 										)}
// 									</div>
// 								)} */}
// 							</div>
// 						</div>
// 					)}
// 				</div>
// 			)}

// 		</div>
// 	)
// }

// export default Allproduct





// import React, { useCallback, useEffect, useState } from "react"
// import styles from "../../pages/CSS/product/allProduct.module.css"
// import { IoIosHeart } from "react-icons/io"
// import AddIcon from "../../assets/add_icon_green.png"
// import RemoveIcon from "../../assets/remove_icon_red.png"
// import Primaryloader from "../loaders/primaryloader.jsx"
// import Heartloader from "../loaders/hearloader.jsx"
// import HorizotalLoader from "../loaders/horizotalLoader.jsx"
// import { Link, useLocation, useNavigate } from "react-router-dom"
// import LoginPopup from "../LoginPopup/LoginPopup.jsx"
// import { makeApi } from "../../api/callApi"
// import {
// 	addToCart,
// 	removeFromCart,
// 	fetchCart,
// 	fetchWishlist,
// } from "../../utils/productFunction.js"
// import { LazyLoadImage } from "react-lazy-load-image-component"
// import { toast } from "react-toastify"

// function Allproduct({ search, category, minPrice, maxPrice, categoryName, subcategory }) {
// 	const [products, setProducts] = useState([])
// 	const [loading, setLoading] = useState(false)
// 	const [wishlistItems, setWishlistItems] = useState([])
// 	const [cartItems, setCartItems] = useState([])
// 	const [ResultPerPage, setResultPerPage] = useState(120)
// 	const [currentPage, setCurrentPage] = useState(1)
// 	const [totalPages, setTotalPages] = useState(0)
// 	const [toalProduct, setToalProduct] = useState(0)
// 	const [AllProductLoader, setAllProductLoader] = useState(false)
// 	const [AddTocartLoader, setAddTocartLoader] = useState({})
// 	const [AddToWishlistLoader, setAddToWishlistLoader] = useState({})
// 	const [IsLogin, setIsLogin] = useState(false)
// 	const [showPopup, setShowPopup] = useState(false)
// 	const [productLoaders, setProductLoaders] = useState({})
// 	const [completeCart, setCompleteCart] = useState([]);
// 	const [quantityLoading, setQuantityLoading] = useState({});

// 	const location = useLocation();
// 	const navigate = useNavigate();

// 	useEffect(() => {
// 		const token = localStorage.getItem("token")
// 		setIsLogin(!!token)
// 	}, [localStorage.getItem("token")])
// 	useEffect(() => {
// 		const queryParams = new URLSearchParams(location.search);
// 		const categoryFromUrl = queryParams.get("category") || "";
// 		const searchFromUrl = queryParams.get("search") || "";
// 		const minPriceFromUrl = queryParams.get("minPrice") || "0";
// 		const maxPriceFromUrl = queryParams.get("maxPrice") || "1000000";
	
// 		fetchProduct(1, categoryFromUrl, searchFromUrl, minPriceFromUrl, maxPriceFromUrl);
// 	}, [location.search]);

// 	// const fetchProduct = async (page, cat, searchTerm, min, max) => {
// 	// 	try {
// 	// 		setAllProductLoader(true);
// 	// 		const response = await makeApi(
// 	// 			`/api/get-all-products?name=${search}&category=${category}&subcategory=${subcategory}&minPrice=${minPrice}&maxPrice=${maxPrice}&page=${page}&perPage=${ResultPerPage}&IsOutOfStock=false`,
// 	// 			// `get-all-products-for-admin`,
// 	// 			"GET"
// 	// 		);
// 	// 		console.log("Fetched products:", response.data.products);
// 	// 		setProducts(response.data.products);
// 	// 		setToalProduct(response.data.totalProducts);
// 	// 		const totalPages = Math.ceil(response.data.totalProducts / ResultPerPage);
// 	// 		setTotalPages(totalPages);
// 	// 	} catch (error) {
// 	// 		console.error("Error fetching products:", error);
// 	// 	} finally {
// 	// 		setAllProductLoader(false);
// 	// 	}
// 	// };


// 	const fetchProduct = async (page, cat, searchTerm, min, max) => {
// 		try {
// 			setAllProductLoader(true);
// 			const response = await makeApi(
// 				`/api/get-all-products?name=${searchTerm}&category=${cat}&subcategory=${subcategory}&minPrice=${min}&maxPrice=${max}&page=${page}&perPage=${ResultPerPage}&IsOutOfStock=false`,
// 				"GET"
// 			);
// 			setProducts(response.data.products);
// 			setToalProduct(response.data.totalProducts);
// 			const totalPages = Math.ceil(response.data.totalProducts / ResultPerPage);
// 			setTotalPages(totalPages);
// 		} catch (error) {
// 			console.error("Error fetching products:", error);
// 		} finally {
// 			setAllProductLoader(false);
// 		}
// 	};

// 	// useEffect(() => {
// 	// 	const queryParams = new URLSearchParams(location.search);
// 	// 	const categoryFromUrl = queryParams.get("category") || "";
// 	// 	const searchFromUrl = queryParams.get("search") || "";
// 	// 	const minPriceFromUrl = queryParams.get("minPrice") || "0";
// 	// 	const maxPriceFromUrl = queryParams.get("maxPrice") || "1000000";

// 	// 	setCurrentPage(1);
// 	// 	fetchProduct(1, categoryFromUrl, searchFromUrl, minPriceFromUrl, maxPriceFromUrl);
// 	// }, [location.search]);

// 	// useEffect(() => {
// 	// 	const queryParams = new URLSearchParams(location.search);
// 	// 	const categoryFromUrl = queryParams.get("category") || "";
// 	// 	const searchFromUrl = queryParams.get("search") || "";
// 	// 	const minPriceFromUrl = queryParams.get("minPrice") || "0";
// 	// 	const maxPriceFromUrl = queryParams.get("maxPrice") || "1000000";

// 	// 	setCurrentPage(1);
// 	// 	fetchProduct(1, categoryFromUrl, searchFromUrl, minPriceFromUrl, maxPriceFromUrl);
// 	// }, [location.search]);



// 	useEffect(() => {
// 		fetchProduct(1) // Reset to the first page when filters change
// 		setCurrentPage(1) // Reset the current page to 1
// 		fetchCart(setCartItems)
// 		fetchCartItems()
// 	}, [search, category, minPrice, maxPrice, ResultPerPage])

// 	useEffect(() => {
// 		fetchProduct() // Fetch products whenever the current page changes
// 	}, [currentPage])

// 	useEffect(() => {
// 		fetchProduct(1) // Reset to the first page when filters change
// 		setCurrentPage(1) // Reset the current page to 1
// 		fetchCart(setCartItems)
// 		fetchCartItems()
// 	}, [search, category, subcategory, minPrice, maxPrice, ResultPerPage])

// 	useEffect(() => {
// 		fetchProduct() // Fetch products whenever the current page changes
// 	}, [currentPage])

// 	const fetchCartItems = async () => {
// 		try {
// 			await fetchCart(setCartItems, setCompleteCart, setAddTocartLoader);
// 		} catch (error) {
// 			console.error("Error fetching cart items:", error);
// 		}
// 	};

// 	const handleIncreaseQuantity = async (productId, size) => {
// 		if (!IsLogin) {
// 			setShowPopup(true);
// 			return;
// 		}
// 		const cartItem = cartItems.find(item => item.productId === productId && item.size === size._id);
// 		if (size.quantity === cartItem?.quantity) {
// 			toast('Cannot add more than available quantity.', { type: 'error' });
// 			return;
// 		}
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
// 				await removeFromCart(productId, setProductLoaders, setCartItems, fetchCartItems, size._id);
// 			} catch (error) {
// 				console.error("Error decreasing quantity:", error);
// 			}
// 		}
// 	};




// 	useEffect(() => {
// 		console.log("Category prop changed:", category);
// 	}, [category]);
// 	const handlePageChange = (pageNumber) => {
// 		setCurrentPage(pageNumber);
// 		fetchProduct(pageNumber, category, search, minPrice, maxPrice);
// 	};

// 	const closePopup = () => {
// 		setShowPopup(false);
// 	};

// 	return (
// 		<div className={styles.mainContainer}>
// 			{showPopup && <LoginPopup onClose={closePopup} />}
// 			{AllProductLoader ? (

// 				<div className={styles.AllProductLoader}>
// 					<div>
// 						<Primaryloader />
// 					</div>
// 				</div>

// 			) : (


// 				<div className={styles.container}>
// 					{products.length === 0 ? (
// 						<div className={styles.NoProductsFound}>No Products Found</div>
// 					) : (
// 						<div>
// 							<div className={styles.productsContainer}>
// 								<h2>{categoryName}</h2>
// 								<div className={styles.allProductsList}>
// 									{products.map(item => (
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
// 														<p className={styles.productPrice}>
// 															₹{item.size[0].FinalPrice} {/* Assuming you want to show the price of the first size */}
// 															{item.size[0].discountPercentage > 0 && (
// 																<span> ₹{item.size[0].price}</span>
// 															)}
// 														</p>
// 													}
// 													<div className={styles.cartActions}>
// 														{cartItems.some(cartItem => cartItem.productId === item._id && cartItem.size === item.size[0]._id) ? (
// 															<div className={styles.cartIncDec}>
// 																<img
// 																	src={RemoveIcon}
// 																	alt=""
// 																	onClick={() => handleDecreaseQuantity(item._id, item.size[0])}
// 																/>
// 																{quantityLoading[item._id] ? (
// 																	<div className={styles.loader}>
// 																	</div>
// 																) : (
// 																	<p>{cartItems.find(cartItem => cartItem.productId === item._id && cartItem.size === item.size[0]._id)?.quantity || 0}</p>
// 																)}
// 																<img
// 																	src={AddIcon}
// 																	alt=""
// 																	onClick={() => handleIncreaseQuantity(item._id, item.size[0])}
// 																/>
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
// 							<div className={styles.pagination}>
// 								{Array.from({ length: totalPages }, (_, index) => index + 1).map(
// 									(pageNumber) => (
// 										<button
// 											key={pageNumber}
// 											className={`${styles.paginationButton} ${pageNumber === currentPage ? styles.active : ""}`}
// 											onClick={() => handlePageClick(pageNumber)}
// 										>
// 											{pageNumber}
// 										</button>
// 									)
// 								)}
// 								{totalPages > 1 && (
// 									<div className={styles.pagination}>
// 										{Array.from({ length: totalPages }, (_, index) => index + 1).map(
// 											(pageNumber) => (
// 												<button
// 													key={pageNumber}
// 													className={`${styles.paginationButton} ${pageNumber === currentPage ? styles.active : ""
// 														}`}
// 													onClick={() => handlePageClick(pageNumber)}
// 												>
// 													{pageNumber}
// 												</button>
// 											)
// 										)}
// 									</div>
// 								)}
// 							</div>
// 						</div>
// 					)}
// 				</div>
// 			)}

// 		</div>
// 	)
// }

// export default Allproduct


import React, { useCallback, useEffect, useState } from "react";
import styles from "../../pages/CSS/product/allProduct.module.css";
import { IoIosHeart } from "react-icons/io";
import AddIcon from "../../assets/add_icon_green.png";
import RemoveIcon from "../../assets/remove_icon_red.png";
import Primaryloader from "../loaders/primaryloader.jsx";
import { makeApi } from "../../api/callApi";
import { Link, useLocation } from "react-router-dom";
import LoginPopup from "../LoginPopup/LoginPopup.jsx";
import { toast } from "react-toastify";
import { fetchCart, fetchWishlist, addToCart, removeFromCart } from "../../utils/productFunction.js";

function Allproduct({ search, category, minPrice, maxPrice, categoryName, subcategory }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [ResultPerPage, setResultPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [toalProduct, setToalProduct] = useState(0);
  const [AllProductLoader, setAllProductLoader] = useState(false);
  const [IsLogin, setIsLogin] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [quantityLoading, setQuantityLoading] = useState({});
  const [isInitialLoad, setIsInitialLoad] = useState(true);

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
  }, [localStorage.getItem("token")]);

  const fetchProduct = async (page, cat, searchTerm, min, max) => {
    try {
      setAllProductLoader(true);
      const response = await makeApi(
        `/api/get-all-products?name=${searchTerm}&category=${cat}&subcategory=${subcategory}&minPrice=${min}&maxPrice=${max}&page=${page}&perPage=${ResultPerPage}&IsOutOfStock=false`,
        "GET"
      );
      setProducts(response.data.products);
      setToalProduct(response.data.totalProducts);
      const totalPages = Math.ceil(response.data.totalProducts / ResultPerPage);
	  console.log("[][]]",totalPages)
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

    fetchProduct(1, categoryFromUrl, searchFromUrl, minPriceFromUrl, maxPriceFromUrl);
  }, [location.search]);

  useEffect(() => {
    fetchProduct(1, category, search, minPrice, maxPrice);
    setCurrentPage(1); // Reset to the first page when filters change
  }, [search, category, minPrice, maxPrice]);

  useEffect(() => {
    fetchCart(setCartItems);
  }, []);

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
      await addToCart(productId, setIsLogin, setShowPopup, fetchCart, setCartItems, size._id);
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
        await removeFromCart(productId, setCartItems, fetchCart, size._id);
      } catch (error) {
        console.error("Error decreasing quantity:", error);
      }
    }
  };

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
							{totalPages > 1 && (
								<div className={styles.pagination}>
									{Array.from({ length: totalPages }, (_, index) => index + 1).map(
										(pageNumber) => (
											<button
												key={pageNumber}
												className={`${styles.paginationButton} ${pageNumber === currentPage ? styles.active : ""
													}`}
												onClick={() => handlePageClick(pageNumber)}
											>
												{pageNumber}
											</button>
										)
									)}
								</div>
							)}
						</div>
					</div>
				)}
			</div>
		)}

	</div>
)
}

export default Allproduct;
