// import React, { useContext, useEffect, useState } from "react"
// import { makeApi } from "../../api/callApi"
// import "./myWatchlist.css"
// import { IoIosHeart } from "react-icons/io"
// import { Link } from "react-router-dom"
// import { ShopContext } from "../../context/ShopContext"
// import { assets } from "../../assets/assets"

// import Primaryloader from "../loaders/primaryloader.jsx"

// import Heartloader from "../loaders/hearloader.jsx"
// import HorizotalLoader from "../loaders/horizotalLoader.jsx"

// // import UserProfileSidebar from "./sidebar.jsx"

// const MyWatchlist = ({ search, category, minPrice, maxPrice }) => {
// 	const [wishlistItems, setWishlistItems] = useState([])
// 	const [loading, setLoading] = useState(false)
// 	// const { all_product, cartItems, addToCart, removeFromCart } =
// 	// 	useContext(ShopContext)
// 	const [products, setProducts] = useState([])
// 	const [cartItems, setCartItems] = useState([])
// 	const [ResultPerPage, setResultPerPage] = useState(20)
// 	const [currentPage, setCurrentPage] = useState(1)
// 	const [totalPages, setTotalPages] = useState(0)
// 	const [toalProduct, setToalProduct] = useState(0)
// 	const [AllProductLoader, setAllProductLoader] = useState(false)
// 	const [AddTocartLoader, setAddTocartLoader] = useState(false)
// 	const [AddToWishlistLoader, setAddToWishlistLoader] = useState(false)
// 	const [IsLogin, setIsLogin] = useState(false)
// 	const [showPopup, setShowPopup] = useState(false)

// 	useEffect(() => {
// 		const token = localStorage.getItem("token")

// 		if (token) {
// 			setIsLogin(true)
// 		} else {
// 			setIsLogin(false)
// 		}
// 	}, [localStorage.getItem("token")])

// 	const fetchProduct = async () => {
// 		try {
// 			setAllProductLoader(true)
// 			const response = await makeApi(`/api/get-all-products`, "GET")
// 			setProducts(response.data.products)
// 			setToalProduct(response.data.totalProducts)
// 		} catch (error) {
// 			console.log(error)
// 		} finally {
// 			setAllProductLoader(false)
// 		}
// 	}
// 	useEffect(() => {
// 		const a = Math.ceil(toalProduct / ResultPerPage)
// 		setTotalPages(a)
// 	}, [products, ResultPerPage])
// 	const fetchCart = async () => {
// 		try {
// 			const response = await makeApi("/api/my-cart", "GET")
// 			setCartItems(
// 				response.data.orderItems.map((item) => ({
// 					productId: item.productId._id,
// 					quantity: item.quantity,
// 				}))
// 			)
// 		} catch (error) {
// 			console.log(error)
// 		}
// 	}

// 	useEffect(() => {
// 		const fetchWishlist = async () => {
// 			try {
// 				const response = await makeApi(`/api/get-my-wishlist`, "GET")
// 				setWishlistItems(response.data.wishlist)
// 			} catch (error) {
// 				console.log(error)
// 			}
// 		}
// 		fetchWishlist()
// 	}, [])

// 	useEffect(() => {
// 		fetchProduct()
// 		fetchCart()
// 	}, [search, category, minPrice, maxPrice, currentPage, ResultPerPage])

// 	const isInCart = (productId) => {
// 		return cartItems.some((item) => item.productId === productId)
// 	}
// 	const closePopup = () => {
// 		setShowPopup(false)
// 	}

// 	const toggleWishlist = async (productId) => {
// 		try {
// 			const method = "POST"
// 			const endpoint = `/api/create-wishlist/${productId}`
// 			const data = await makeApi(endpoint, method)
// 			console.log(data.data)
// 			setWishlistItems(
// 				wishlistItems.filter((item) => item.products._id !== productId)
// 			)
// 		} catch (error) {
// 			console.log(error)
// 		}
// 	}

// 	const addToCart = async (productId) => {
// 		if (!IsLogin) {
// 			setShowPopup(true)
// 		} else {
// 			try {
// 				setAddTocartLoader(true)
// 				const method = "POST"
// 				const endpoint = "/api/add-to-cart"
// 				const data = await makeApi(endpoint, method, {
// 					productId,
// 					quantity: 1,
// 					shippingPrice: 0,
// 				})
// 				setCartItems((prevState) => {
// 					const existingItem = prevState.find(
// 						(item) => item.productId === productId
// 					)
// 					if (existingItem) {
// 						return prevState.map((item) => {
// 							if (item.productId === productId) {
// 								return { ...item, quantity: item.quantity + 1 }
// 							}
// 							return item
// 						})
// 					} else {
// 						return [...prevState, { productId, quantity: 1 }]
// 					}
// 				})
// 			} catch (error) {
// 				console.log(error.response.data)
// 			} finally {
// 				fetchCart()
// 				setAddTocartLoader(false)
// 			}
// 		}
// 	}

// 	const removeFromCart = async (productId) => {
// 		try {
// 			setAddTocartLoader(true)
// 			const method = "POST"
// 			const endpoint = "/api/remove-from-cart"
// 			const data = await makeApi(endpoint, method, { productId })
// 			setCartItems((prevState) =>
// 				prevState.filter((item) => item.productId !== productId)
// 			)
// 		} catch (error) {
// 			console.log(error)
// 		} finally {
// 			fetchCart()
// 			setAddTocartLoader(false)
// 		}
// 	}

// 	const getProductQuantity = (productId) => {
// 		const cartItem = cartItems.find((item) => item.productId === productId)
// 		return cartItem ? cartItem.quantity : 0
// 	}
// 	const handlePageClick = (pageNumber) => {
// 		setCurrentPage(pageNumber)
// 	}

// 	return (
// 		<div className="myWatchlist">
// 			<div className="userprofile-heading">
// 				<h1>MY WISHLIST</h1>
// 			</div>

// 			{wishlistItems.length === 0 ? (
// 				<div className="text-center">
// 					<h2>Your wishlist is empty</h2>
// 				</div>
// 			) : (
// 				<div className="userprofile-heading wishlist-items">
// 					{wishlistItems?.map((item, index) => {
// 						return (
// 							<div
// 								className="item wishlist-item-card"
// 								key={index}
// 							>
// 								<div className="item-card ">
// 									<IoIosHeart
// 										className={`watchlist-icon pointer-event wishlist-active`}
// 										onClick={() => toggleWishlist(item?.products?._id)}
// 									/>
// 									{/* <Link to={`/openproduct/${item?.products?._id}`}> */}
// 									<Link to={`/product/product-details/${item?.products?._id}`}>
// 										<img
// 											src={item?.products?.thumbnail}
// 											alt=""
// 										/>
// 									</Link>
// 									<div className="item-price-name">
// 										<p className="item-name">{item?.products?.name}</p>
// 										<div className="old-new-price">
// 											<p className="old-item-price">
// 												₹{item?.products?.PriceAfterDiscount}
// 											</p>
// 											<p className="new-item-price">₹{item?.products?.price}</p>
// 										</div>
// 									</div>

// 									{/* You need to handle cartItems and addToCart/removeFromCart */}

// 									<div className="item-cart">
// 										{/* {cartItems[item?.products?._id] ? (
// 											<div
// 												className="item-addto-cart "
// 												onClick={() => addToCart(item?.products._id)}
// 											>
// 												ADD TO CART
// 											</div>
// 										) : (
// 											<div className="food-item-counter">
// 												<img
// 													onClick={() => removeFromCart(item?.products?._id)}
// 													src={assets.add_icon_red}
// 													alt=""
// 												/>
// 												<p className="cart-item-no">
// 													{cartItems[item?.products?._id]}
// 												</p>
// 												<img
// 													onClick={() => addToCart(item?.products?._id)}
// 													src={assets.add_icon_green}
// 													alt=""
// 												/>
// 											</div>
// 										)} */}

// 										{isInCart(item._id) ? (
// 											<div className="Add_to_cart_and_watchlist_child">
// 												{AddTocartLoader ? (
// 													<div>
// 														{" "}
// 														<HorizotalLoader />{" "}
// 													</div>
// 												) : (
// 													<div className="cart-quantity food-item-counter">
// 														<img
// 															src={assets.add_icon_red}
// 															alt="AddIcon"
// 															className="Icon_add_to_cart"
// 															onClick={() => removeFromCart(item.products._id)}
// 														/>
// 														<span>{getProductQuantity(item.products._id)}</span>
// 														<img
// 															src={assets.add_icon_green}
// 															alt="AddIcon"
// 															className="Icon_add_to_cart"
// 															onClick={() => addToCart(item.products._id)}
// 														/>
// 													</div>
// 												)}
// 											</div>
// 										) : (
// 											<div>
// 												{AddTocartLoader ? (
// 													<div>
// 														{" "}
// 														<HorizotalLoader />{" "}
// 													</div>
// 												) : (
// 													<div
// 														className="Add_to_cart_button item-addto-cart"
// 														onClick={() => addToCart(item.products._id)}
// 													>
// 														Add to Cart
// 													</div>
// 												)}
// 											</div>
// 										)}
// 									</div>

// 									{/* You need to handle cartItems and addToCart/removeFromCart */}
// 								</div>
// 							</div>
// 						)
// 					})}
// 				</div>
// 			)}
// 		</div>
// 	)
// }

// export default MyWatchlist

// import React, { useContext, useEffect, useState } from "react"
// import { makeApi } from "../../api/callApi"
// import "./myWatchlist.css"
// import { IoIosHeart } from "react-icons/io"
// import { Link } from "react-router-dom"
// import { ShopContext } from "../../context/ShopContext"
// import { assets } from "../../assets/assets"

// import Primaryloader from "../loaders/primaryloader.jsx"
// import Heartloader from "../loaders/hearloader.jsx"
// import HorizotalLoader from "../loaders/horizotalLoader.jsx"

// const MyWatchlist = ({ search, category, minPrice, maxPrice }) => {
// 	const [wishlistItems, setWishlistItems] = useState([])
// 	const [loading, setLoading] = useState(false)
// 	const [products, setProducts] = useState([])
// 	const [cartItems, setCartItems] = useState([])
// 	const [ResultPerPage, setResultPerPage] = useState(20)
// 	const [currentPage, setCurrentPage] = useState(1)
// 	const [totalPages, setTotalPages] = useState(0)
// 	const [totalProduct, setTotalProduct] = useState(0)
// 	const [AllProductLoader, setAllProductLoader] = useState(false)
// 	const [AddToCartLoader, setAddToCartLoader] = useState(false)
// 	const [IsLogin, setIsLogin] = useState(false)
// 	const [showPopup, setShowPopup] = useState(false)

// 	useEffect(() => {
// 		const token = localStorage.getItem("token")
// 		setIsLogin(!!token)
// 	}, [localStorage.getItem("token")])

// 	const fetchProduct = async () => {
// 		try {
// 			setAllProductLoader(true)
// 			const response = await makeApi(`/api/get-all-products`, "GET")
// 			setProducts(response.data.products)
// 			setTotalProduct(response.data.totalProducts)
// 		} catch (error) {
// 			console.log(error)
// 		} finally {
// 			setAllProductLoader(false)
// 		}
// 	}

// 	useEffect(() => {
// 		const a = Math.ceil(totalProduct / ResultPerPage)
// 		setTotalPages(a)
// 	}, [products, ResultPerPage])

// 	const fetchCart = async () => {
// 		try {
// 			const response = await makeApi("/api/my-cart", "GET")
// 			setCartItems(
// 				response.data.orderItems.map((item) => ({
// 					productId: item.productId._id,
// 					quantity: item.quantity,
// 				}))
// 			)
// 		} catch (error) {
// 			console.log(error)
// 		}
// 	}

// 	useEffect(() => {
// 		const fetchWishlist = async () => {
// 			try {
// 				const response = await makeApi(`/api/get-my-wishlist`, "GET")
// 				setWishlistItems(response.data.wishlist)
// 			} catch (error) {
// 				console.log(error)
// 			}
// 		}
// 		fetchWishlist()
// 	}, [])

// 	useEffect(() => {
// 		fetchProduct()
// 		fetchCart()
// 	}, [search, category, minPrice, maxPrice, currentPage, ResultPerPage])

// 	const isInCart = (productId) => {
// 		return cartItems.some((item) => item.productId === productId)
// 	}

// 	const closePopup = () => {
// 		setShowPopup(false)
// 	}

// 	const toggleWishlist = async (productId) => {
// 		try {
// 			const method = "POST"
// 			const endpoint = `/api/create-wishlist/${productId}`
// 			const data = await makeApi(endpoint, method)
// 			console.log(data.data)
// 			setWishlistItems(
// 				wishlistItems.filter((item) => item.products._id !== productId)
// 			)
// 		} catch (error) {
// 			console.log(error)
// 		}
// 	}

// 	const addToCart = async (productId) => {
// 		if (!IsLogin) {
// 			setShowPopup(true)
// 		} else {
// 			try {
// 				setAddToCartLoader(true)
// 				const method = "POST"
// 				const endpoint = "/api/add-to-cart"
// 				const data = await makeApi(endpoint, method, {
// 					productId,
// 					quantity: 1,
// 					shippingPrice: 0,
// 				})
// 				setCartItems((prevState) => {
// 					const existingItem = prevState.find(
// 						(item) => item.productId === productId
// 					)
// 					if (existingItem) {
// 						return prevState.map((item) => {
// 							if (item.productId === productId) {
// 								return { ...item, quantity: item.quantity + 1 }
// 							}
// 							return item
// 						})
// 					} else {
// 						return [...prevState, { productId, quantity: 1 }]
// 					}
// 				})
// 			} catch (error) {
// 				console.log(error.response.data)
// 			} finally {
// 				fetchCart()
// 				setAddToCartLoader(false)
// 			}
// 		}
// 	}

// 	const removeFromCart = async (productId) => {
// 		try {
// 			setAddToCartLoader(true)
// 			const method = "POST"
// 			const endpoint = "/api/remove-from-cart"
// 			const data = await makeApi(endpoint, method, { productId })
// 			setCartItems((prevState) =>
// 				prevState.filter((item) => item.productId !== productId)
// 			)
// 		} catch (error) {
// 			console.log(error)
// 		} finally {
// 			fetchCart()
// 			setAddToCartLoader(false)
// 		}
// 	}

// 	const getProductQuantity = (productId) => {
// 		const cartItem = cartItems.find((item) => item.productId === productId)
// 		return cartItem ? cartItem.quantity : 0
// 	}

// 	const handlePageClick = (pageNumber) => {
// 		setCurrentPage(pageNumber)
// 	}

// 	return (
// 		<div className="myWatchlist">
// 			<div className="userprofile-heading">
// 				<h1>MY WISHLIST</h1>
// 			</div>

// 			{wishlistItems.length === 0 ? (
// 				<div className="text-center">
// 					<h2>Your wishlist is empty</h2>
// 				</div>
// 			) : (
// 				<div className="userprofile-heading wishlist-items">
// 					{wishlistItems?.map((item, index) => (
// 						<div
// 							className="item wishlist-item-card"
// 							key={index}
// 						>
// 							<div className="item-card">
// 								<IoIosHeart
// 									className={`watchlist-icon pointer-event wishlist-active`}
// 									onClick={() => toggleWishlist(item?.products?._id)}
// 								/>
// 								<Link to={`/product/product-details/${item?.products?._id}`}>
// 									<img
// 										src={item?.products?.thumbnail}
// 										alt=""
// 									/>
// 								</Link>
// 								<div className="item-price-name">
// 									<p className="item-name">{item?.products?.name}</p>
// 									<div className="old-new-price">
// 										<p className="old-item-price">
// 											₹{item?.products?.PriceAfterDiscount}
// 										</p>
// 										<p className="new-item-price">₹{item?.products?.price}</p>
// 									</div>
// 								</div>

// 								<div className="item-cart">
// 									{isInCart(item.products._id) ? (
// 										<div className="wishlistAddToCart">
// 											{AddToCartLoader ? (
// 												<div className="wishListAddToCart">
// 													<HorizotalLoader />
// 												</div>
// 											) : (
// 												<>
// 													<img
// 														src={assets.add_icon_red}
// 														alt="Remove"
// 														className="icon-remove"
// 														onClick={() => removeFromCart(item.products._id)}
// 													/>
// 													<span>{getProductQuantity(item.products._id)}</span>
// 													<img
// 														src={assets.add_icon_green}
// 														alt="Add"
// 														className="icon-add"
// 														onClick={() => addToCart(item.products._id)}
// 													/>
// 												</>
// 											)}
// 										</div>
// 									) : (
// 										<div
// 											className="add-to-cart-button item-addto-cart"
// 											onClick={() => addToCart(item.products._id)}
// 										>
// 											{AddToCartLoader ? <HorizotalLoader /> : "Add to Cart"}
// 										</div>
// 									)}
// 								</div>
// 							</div>
// 						</div>
// 					))}
// 				</div>
// 			)}
// 		</div>
// 	)
// }

// export default MyWatchlist

import React, { useContext, useEffect, useState } from "react"
import { makeApi } from "../../api/callApi"
import "./myWatchlist.css"
import { IoIosHeart } from "react-icons/io"
import { Link } from "react-router-dom"
import { ShopContext } from "../../context/ShopContext"
import { assets } from "../../assets/assets"

import Primaryloader from "../loaders/primaryloader.jsx"
import Heartloader from "../loaders/hearloader.jsx"
import HorizotalLoader from "../loaders/horizotalLoader.jsx"
import {
	addToCart,
	removeFromCart,
	fetchCart,
	fetchWishlist,
} from "../../utils/productFunction.js"
import { LazyLoadImage } from "react-lazy-load-image-component"

const MyWatchlist = ({ search, category, minPrice, maxPrice }) => {
	const [wishlistItems, setWishlistItems] = useState([])
	const [loading, setLoading] = useState(false)
	const [products, setProducts] = useState([])
	const [cartItems, setCartItems] = useState([])
	const [ResultPerPage, setResultPerPage] = useState(20)
	const [currentPage, setCurrentPage] = useState(1)
	const [totalPages, setTotalPages] = useState(0)
	const [totalProduct, setTotalProduct] = useState(0)
	const [AllProductLoader, setAllProductLoader] = useState(false)
	const [AddToCartLoader, setAddToCartLoader] = useState(false)
	const [IsLogin, setIsLogin] = useState(false)
	const [showPopup, setShowPopup] = useState(false)
	const [productLoaders, setProductLoaders] = useState({})

	useEffect(() => {
		const token = localStorage.getItem("token")
		setIsLogin(!!token)
	}, [localStorage.getItem("token")])

	const fetchProduct = async () => {
		try {
			setAllProductLoader(true)
			const response = await makeApi(`/api/get-all-products`, "GET")
			setProducts(response.data.products)
			setTotalProduct(response.data.totalProducts)
		} catch (error) {
			console.log(error)
		} finally {
			setAllProductLoader(false)
		}
	}

	useEffect(() => {
		const a = Math.ceil(totalProduct / ResultPerPage)
		setTotalPages(a)
	}, [products, ResultPerPage])

	// const fetchCart = async () => {
	// 	try {
	// 		const response = await makeApi("/api/my-cart", "GET")
	// 		setCartItems(
	// 			response.data.orderItems.map((item) => ({
	// 				productId: item.productId._id,
	// 				quantity: item.quantity,
	// 			}))
	// 		)
	// 	} catch (error) {
	// 		console.log(error)
	// 	}
	// }

	useEffect(() => {
		const fetchWishlist = async () => {
			try {
				const response = await makeApi(`/api/get-my-wishlist`, "GET")
				setWishlistItems(response.data.wishlist)
			} catch (error) {
				console.log(error)
			}
		}
		fetchWishlist()
	}, [])

	useEffect(() => {
		fetchProduct()
		fetchCart(setCartItems)
	}, [search, category, minPrice, maxPrice, currentPage, ResultPerPage])

	const isInCart = (productId) => {
		return cartItems.some((item) => item.productId === productId)
	}

	const closePopup = () => {
		setShowPopup(false)
	}

	const toggleWishlist = async (productId) => {
		try {
			const method = "POST"
			const endpoint = `/api/create-wishlist/${productId}`
			const data = await makeApi(endpoint, method)
			console.log(data.data)
			setWishlistItems(
				wishlistItems.filter((item) => item.products._id !== productId)
			)
		} catch (error) {
			console.log(error)
		}
	}

	// const addToCart = async (productId) => {
	// 	if (!IsLogin) {
	// 		setShowPopup(true)
	// 	} else {
	// 		try {
	// 			setAddToCartLoader(true)
	// 			const method = "POST"
	// 			const endpoint = "/api/add-to-cart"
	// 			const data = await makeApi(endpoint, method, {
	// 				productId,
	// 				quantity: 1,
	// 				shippingPrice: 0,
	// 			})
	// 			setCartItems((prevState) => {
	// 				const existingItem = prevState.find(
	// 					(item) => item.productId === productId
	// 				)
	// 				if (existingItem) {
	// 					return prevState.map((item) => {
	// 						if (item.productId === productId) {
	// 							return { ...item, quantity: item.quantity + 1 }
	// 						}
	// 						return item
	// 					})
	// 				} else {
	// 					return [...prevState, { productId, quantity: 1 }]
	// 				}
	// 			})
	// 		} catch (error) {
	// 			console.log(error.response.data)
	// 		} finally {
	// 			fetchCart()
	// 			setAddToCartLoader(false)
	// 		}
	// 	}
	// }

	// const removeFromCart = async (productId) => {
	// 	try {
	// 		setAddToCartLoader(true)
	// 		const method = "POST"
	// 		const endpoint = "/api/remove-from-cart"
	// 		const data = await makeApi(endpoint, method, { productId })
	// 		setCartItems((prevState) =>
	// 			prevState.filter((item) => item.productId !== productId)
	// 		)
	// 	} catch (error) {
	// 		console.log(error)
	// 	} finally {
	// 		fetchCart()
	// 		setAddToCartLoader(false)
	// 	}
	// }

	// const getProductQuantity = (productId) => {
	// 	const cartItem = cartItems.find((item) => item.productId === productId)
	// 	return cartItem ? cartItem.quantity : 0
	// }

	const handlePageClick = (pageNumber) => {
		setCurrentPage(pageNumber)
	}

	const handleAddToCart = (productId, quantity, availableQuantity) => {
		if (quantity < availableQuantity) {
			addToCart(
				productId,
				setIsLogin,
				setShowPopup,
				fetchCart,
				setCartItems,
				setProductLoaders
			)
		} else {
			toast("Cannot add more than available quantity.", { type: "error" })
		}
	}

	const getProductQuantity = (productId) => {
		const cartItem = cartItems.find((item) => item.productId === productId)
		return cartItem ? cartItem.quantity : 0
	}

	return (
		<div className="myWatchlist">
			<div className="userprofile-heading">
				<h1>MY WISHLIST</h1>
			</div>

			{wishlistItems.length === 0 ? (
				<div className="text-center">
					<h2>Your wishlist is empty</h2>
				</div>
			) : (
				<div className="userprofile-heading wishlist-items">
					{wishlistItems?.map((item, index) => (
						<div
							className="item wishlist-item-card"
							key={index}
						>
							<div className="item-card">
								<IoIosHeart
									className={`watchlist-icon pointer-event wishlist-active`}
									onClick={() => toggleWishlist(item?.products?._id)}
								/>
								<Link to={`/product/product-details/${item?.products?._id}`}>
									<img
										src={item?.products?.thumbnail}
										alt=""
									/>
								</Link>
								<div className="item-price-name">
									<p className="item-name">{item?.products?.name}</p>
									<div className="old-new-price">
										<p className="old-item-price">
											₹{item?.products?.PriceAfterDiscount}
										</p>
										<p className="new-item-price">₹{item?.products?.price}</p>
									</div>
								</div>

								<div className="item-cart item-cartb">
									{isInCart(item.products._id) ? (
										<div className="wishlistAddToCart">
											{productLoaders[item.products._id] ? (
												<div className="wishListAddToCart">
													<HorizotalLoader />
												</div>
											) : (
												<>
													<LazyLoadImage
														effect="blur"
														loading="lazy"
														src={assets.add_icon_red}
														alt="RemoveIcon"
														className="Icon_add_to_cart"
														onClick={() =>
															removeFromCart(
																item.products._id,
																setProductLoaders,
																setCartItems,
																fetchCart
															)
														}
													/>
													<span>{getProductQuantity(item.products._id)}</span>
													<LazyLoadImage
														effect="blur"
														loading="lazy"
														src={assets.add_icon_green}
														alt="AddIcon"
														className="Icon_add_to_cart"
														onClick={() =>
															handleAddToCart(
																item.products._id,
																getProductQuantity(item.products._id),
																item.products.quantity
															)
														}
													/>
												</>
											)}
										</div>
									) : (
										<div>
											{productLoaders[item.products._id] ? (
												<div className="watchilist_add_to_cart_Loader">
													<HorizotalLoader />
												</div>
											) : (
												<div
													className="add_to_cart_button2"
													onClick={() =>
														handleAddToCart(
															item.products._id,
															getProductQuantity(item.products._id),
															item.products.quantity
														)
													}
												>
													Add to Cart
												</div>
											)}
										</div>
									)}
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	)
}

export default MyWatchlist

{
	/* <div
											className="add-to-cart-button item-addto-cart"
											onClick={() => addToCart(item.products._id)}
										>
											{AddToCartLoader ? <HorizotalLoader /> : "Add to Cart"}
										</div> */
}
