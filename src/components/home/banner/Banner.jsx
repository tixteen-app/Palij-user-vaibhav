// //

// import React, { useState, useEffect, useContext } from "react"
// import "./banner.css"
// import { assets } from "../../../assets/assets"

// import { Link, useNavigate } from "react-router-dom"
// import LoginPopup from "../../LoginPopup/LoginPopup"
// import AddIcon from "../../../assets/add_icon_green.png"
// import RemoveIcon from "../../../assets/remove_icon_red.png"
// import HorizotalLoader from "../../loaders/horizotalLoader.jsx"
// import Primaryloader from "../../loaders/primaryloader.jsx"
// import { makeApi } from "../../../api/callApi"

// const Banner = () => {
// 	// /api/get-all-products-by-category/6612e7e4e7c1d7bf5589ec0c
// 	const [currentSlide, setCurrentSlide] = useState(0)
// 	const [backgroundColor, setBackgroundColor] = useState(null)
// 	const [backgroundCart, setBackgroundCart] = useState(null)
// 	const [animationDirection, setAnimationDirection] = useState(null)

// 	const navigate = useNavigate()

// 	// const [showPopup, setShowPopup] = useState(false)

// 	const [slidesPerView, setSlidesPerView] = useState(3)
// 	const [sliderGap, setSliderGap] = useState(20)
// 	const [products, setProducts] = useState([])
// 	const [loading, setLoading] = useState(false)
// 	const [cartItems, setCartItems] = useState([])
// 	const [AllProductLoader, setAllProductLoader] = useState(false)
// 	const [AddTocartLoader, setAddTocartLoader] = useState(false)
// 	const [IsLogin, setIsLogin] = useState(false)
// 	const [showPopup, setShowPopup] = useState(false)

// 	// get data
// 	const fetchProduct = async () => {
// 		try {
// 			setAllProductLoader(true)
// 			const response = await makeApi(
// 				`/api/get-all-products-by-category/6637a692b72188936f74f09c`,
// 				"GET"
// 			)
// 			setProducts(response.data.products)
// 		} catch (error) {
// 			console.log(error)
// 		} finally {
// 			setAllProductLoader(false)
// 		}
// 	}

// 	useEffect(() => {
// 		const token = localStorage.getItem("token")

// 		if (token) {
// 			setIsLogin(true)
// 		} else {
// 			setIsLogin(false)
// 		}
// 	}, [localStorage.getItem("token")])
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
// 	const isInCart = (productId) => {
// 		return cartItems.some((item) => item.productId === productId)
// 	}

// 	const getProductQuantity = (productId) => {
// 		const cartItem = cartItems.find((item) => item.productId === productId)
// 		return cartItem ? cartItem.quantity : 0
// 	}

// 	// action

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
// 	const closePopup = () => {
// 		setShowPopup(false)
// 	}

// 	useEffect(() => {
// 		fetchProduct()
// 		fetchCart()
// 	}, [])

// 	// const { cartItems, addToCart, removeFromCart } = useContext(ShopContext)

// 	const banner = [
// 		{
// 			// id: products.length > 0 ? products[0]._id : "",
// 			// title: products.length > 0 ? products[0].name : "",
// 			// subTitle: "Premium Cookies",
// 			// content: products.length > 0 ? products[0].description : "",
// 			// banner_Image: products.length > 0 ? products[0].thumbnail : "",
// 			backgroundColor:
// 				"linear-gradient(180deg, rgba(255,102,92,1) 0%, rgba(254,165,159,1) 100%)",
// 			backgroundCart: "#E31E24",
// 		},
// 		{
// 			// id: products.length > 0 ? products[1]._id : "",
// 			// title: products.length > 0 ? products[1].name : "",
// 			// subTitle: "Premium Cookies",
// 			// content: products.length > 0 ? products[1].description : "",
// 			// banner_Image: products.length > 0 ? products[1].thumbnail : "",
// 			backgroundCart: "#007897",
// 			backgroundColor: "linear-gradient(180deg, #00B7FF 0%, #BEDAE4 100%)",
// 		},
// 		{
// 			// id: products.length > 0 ? products[2]._id : "",
// 			// title: products.length > 0 ? products[2].name : "",
// 			// subTitle: "Premium Cookies",
// 			// content: products.length > 0 ? products[2].description : "",
// 			// banner_Image: products.length > 0 ? products[2].thumbnail : "",
// 			backgroundColor:
// 				"linear-gradient(180deg, rgba(211,126,55,1) 0%, rgba(218,180,149,1) 100%)",
// 			backgroundCart: "#65321C",
// 		},
// 		{
// 			// id: products.length > 0 ? products[3]._id : "",
// 			// title: products.length > 0 ? products[3].name : "",
// 			// subTitle: "Premium Cookies",
// 			// content: products.length > 0 ? products[3].description : "",
// 			// banner_Image: products.length > 0 ? products[3].thumbnail : "",
// 			backgroundColor:
// 				"linear-gradient(180deg, rgba(255,158,60,1) 0%, rgba(226,208,189,1) 100%)",
// 			backgroundCart: "#BB8248",
// 		},
// 		{
// 			// id: products.length > 0 ? products[4]._id : "",
// 			// title: products.length > 0 ? products[4].name : "",
// 			// subTitle: "Premium Cookies",
// 			// content: products.length > 0 ? products[4].description : "",
// 			// banner_Image: products.length > 0 ? products[4].thumbnail : "",
// 			backgroundColor:
// 				"linear-gradient(180deg, rgba(130,201,90,1) 0%, rgba(172,205,153,1) 50%, rgba(193,204,187,1) 100%)",
// 			backgroundCart: "#519B29",
// 		},
// 	]
// 	console.log("bannerrrr", banner[1].id)
// 	const handlePrevSlide = () => {
// 		setCurrentSlide((prevSlide) =>
// 			prevSlide === 0 ? banner.length - 1 : prevSlide - 1
// 		)
// 		setAnimationDirection("prev")
// 	}

// 	const handleNextSlide = () => {
// 		setCurrentSlide((prevSlide) =>
// 			prevSlide === banner.length - 1 ? 0 : prevSlide + 1
// 		)
// 		setAnimationDirection("next")
// 	}

// 	useEffect(() => {
// 		// JavaScript code to handle arrow clicks
// 		const arrowLeft = document.querySelector(".arrow-btn img:first-child")
// 		const arrowRight = document.querySelector(".arrow-btn img:last-child")
// 		const bannerSlides = document.querySelectorAll(".slide")
// 		let currentSlideIndex = 0

// 		// Function to handle click on left arrow
// 		arrowLeft.addEventListener("click", () => {
// 			goToSlide(currentSlideIndex - 1)
// 		})

// 		// Function to handle click on right arrow
// 		arrowRight.addEventListener("click", () => {
// 			goToSlide(currentSlideIndex + 1)
// 		})

// 		// Function to navigate to a specific slide
// 		function goToSlide(index) {
// 			const totalSlides = bannerSlides.length
// 			currentSlideIndex = (index + totalSlides) % totalSlides // Ensure index wraps around for infinite loop
// 			bannerSlides.forEach((slide, i) => {
// 				slide.classList.toggle("active", i === currentSlideIndex)
// 			})
// 		}

// 		return () => {
// 			// Cleanup event listeners
// 			arrowLeft.removeEventListener("click", () => {})
// 			arrowRight.removeEventListener("click", () => {})
// 		}
// 	}, []) // Empty dependency array ensures this effect runs only once after initial render

// 	useEffect(() => {
// 		setBackgroundColor(banner[currentSlide].backgroundColor)
// 		setBackgroundCart(banner[currentSlide].backgroundCart)
// 	}, [currentSlide])

// 	return (
// 		<>
// 			{showPopup && (
// 				<div className="a_bg-black">
// 					<LoginPopup onClose={closePopup} />
// 				</div>
// 			)}

// 			<div
// 				className="banner"
// 				style={{ background: backgroundColor }}
// 			>
// 				{AllProductLoader ? (
// 					<div className="a_All_Product_loader">
// 						<div className="a_">
// 							<Primaryloader />
// 						</div>
// 					</div>
// 				) : (
// 					<div
// 						className={`palji-banners ${animationDirection}`}
// 						style={{ transform: `translateX(-${currentSlide * 100}%)` }}
// 					>
// 						{products.map((item, index) => (
// 							<div
// 								key={index}
// 								className="slide banner-flex"
// 								style={{ backgroundColor: item.backgroundColor }}
// 							>
// 								<div className="left-banner">
// 									<div className="banner-info">
// 										<div
// 											className={`title ${
// 												currentSlide === index ? "show" : ""
// 											}`}
// 										>
// 											<h2>{item.name}</h2>
// 											<p>Premium Cookies</p>
// 										</div>
// 										<p className="contents">{item.description}</p>
// 									</div>
// 									<div
// 										className="cart5"
// 										style={{ backgroundColor: backgroundCart }}
// 									>
// 										{/* <div className="banner-item-cart">
// 											{!cartItems[item.id] ? (
// 												<div
// 													className="banner-item-addto-cart"
// 													style={{ backgroundColor: backgroundCart }}
// 													onClick={() => handleAddToCart(item.id)}
// 												>
// 													ADD TO CART
// 												</div>
// 											) : (
// 												<div className="banner-food-item-counter">
// 													<img
// 														src={assets.add_icon_red}
// 														alt=""
// 													/>
// 													<p className="banner-cart-item-no">{cartItemCount}</p>
// 													<img
// 														onClick={() => handleAddToCart(item.id)}
// 														src={assets.add_icon_green}
// 														alt=""
// 													/>
// 												</div>
// 											)}
// 										</div> */}
// 										{isInCart(item._id) ? (
// 											<div className="a_Add_to_cart_and_watchlist_child">
// 												{AddTocartLoader ? (
// 													<div>
// 														{" "}
// 														<HorizotalLoader />{" "}
// 													</div>
// 												) : (
// 													<div className="a_cart_quantity b_cart_quantity">
// 														<img
// 															src={RemoveIcon}
// 															alt="AddIcon"
// 															className="a_Icon_add_to_cart"
// 															onClick={() => removeFromCart(item._id)}
// 														/>
// 														<span>{getProductQuantity(item._id)}</span>
// 														<img
// 															src={AddIcon}
// 															alt="AddIcon"
// 															className="a_Icon_add_to_cart"
// 															onClick={() => addToCart(item._id)}
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
// 														className="a_Add_to_cart_button b_addtocart"
// 														onClick={() => addToCart(item._id)}
// 													>
// 														Add to Cart
// 													</div>
// 												)}
// 											</div>
// 										)}
// 									</div>
// 								</div>
// 								<div className="right-banner">
// 									<img
// 										src={item.thumbnail}
// 										alt=""
// 									/>
// 								</div>
// 							</div>
// 						))}
// 					</div>
// 				)}

// 				<div className="arrow-btn">
// 					<img
// 						src={assets.left_arrow}
// 						alt=""
// 						onClick={handlePrevSlide}
// 					/>
// 					<img
// 						src={assets.right_arrow}
// 						alt=""
// 						onClick={handleNextSlide}
// 					/>
// 				</div>
// 			</div>
// 		</>
// 	)
// }

// export default Banner

//

// import React, { useState, useEffect, useContext } from "react"
// import "./banner.css"
// import { assets } from "../../../assets/assets"

// import { Link, useNavigate } from "react-router-dom"
// import LoginPopup from "../../LoginPopup/LoginPopup"
// import AddIcon from "../../../assets/add_icon_green.png"
// import RemoveIcon from "../../../assets/remove_icon_red.png"
// import HorizotalLoader from "../../loaders/horizotalLoader.jsx"
// import Primaryloader from "../../loaders/primaryloader.jsx"
// import { makeApi } from "../../../api/callApi"
// import { LazyLoadImage } from "react-lazy-load-image-component"
// import {
// 	addToCart,
// 	removeFromCart,
// 	fetchCart,
// 	fetchWishlist,
// } from "../../../utils/productFunction.js"

// const Banner = () => {
// 	// /api/get-all-products-by-category/6612e7e4e7c1d7bf5589ec0c
// 	const [currentSlide, setCurrentSlide] = useState(0)
// 	const [backgroundColor, setBackgroundColor] = useState(null)
// 	const [backgroundCart, setBackgroundCart] = useState(null)
// 	const [animationDirection, setAnimationDirection] = useState(null)

// 	const navigate = useNavigate()

// 	// const [showPopup, setShowPopup] = useState(false)

// 	const [slidesPerView, setSlidesPerView] = useState(3)
// 	const [sliderGap, setSliderGap] = useState(20)
// 	const [products, setProducts] = useState([])
// 	const [loading, setLoading] = useState(false)
// 	const [cartItems, setCartItems] = useState([])
// 	const [AllProductLoader, setAllProductLoader] = useState(false)
// 	const [AddTocartLoader, setAddTocartLoader] = useState(false)
// 	const [IsLogin, setIsLogin] = useState(false)
// 	const [showPopup, setShowPopup] = useState(false)
// 	const [productLoaders, setProductLoaders] = useState({})

// 	// get data
// 	const fetchProduct = async () => {
// 		try {
// 			setAllProductLoader(true)
// 			// const response = await makeApi(
// 			// 	`/api/get-all-products-by-category/6637a692b72188936f74f09c`,
// 			// 	"GET"
// 			// )
// 			const response = await makeApi(
// 				`/api/get-all-products-by-category/$[4]`,
// 				"GET"
// 			)
// 			setProducts(response.data.products)
// 		} catch (error) {
// 			console.log(error)
// 		} finally {
// 			setAllProductLoader(false)
// 		}
// 	}

// 	useEffect(() => {
// 		const token = localStorage.getItem("token")

// 		if (token) {
// 			setIsLogin(true)
// 		} else {
// 			setIsLogin(false)
// 		}
// 	}, [localStorage.getItem("token")])
// 	// const fetchCart = async () => {
// 	// 	try {
// 	// 		const response = await makeApi("/api/my-cart", "GET")
// 	// 		setCartItems(
// 	// 			response.data.orderItems.map((item) => ({
// 	// 				productId: item.productId._id,
// 	// 				quantity: item.quantity,
// 	// 			}))
// 	// 		)
// 	// 	} catch (error) {
// 	// 		console.log(error)
// 	// 	}
// 	// }
// 	// const isInCart = (productId) => {
// 	// 	return cartItems.some((item) => item.productId === productId)
// 	// }

// 	// const getProductQuantity = (productId) => {
// 	// 	const cartItem = cartItems.find((item) => item.productId === productId)
// 	// 	return cartItem ? cartItem.quantity : 0
// 	// }

// 	// // action

// 	// const addToCart = async (productId) => {
// 	// 	if (!IsLogin) {
// 	// 		setShowPopup(true)
// 	// 	} else {
// 	// 		try {
// 	// 			setAddTocartLoader(true)
// 	// 			const method = "POST"
// 	// 			const endpoint = "/api/add-to-cart"
// 	// 			const data = await makeApi(endpoint, method, {
// 	// 				productId,
// 	// 				quantity: 1,
// 	// 				shippingPrice: 0,
// 	// 			})
// 	// 			setCartItems((prevState) => {
// 	// 				const existingItem = prevState.find(
// 	// 					(item) => item.productId === productId
// 	// 				)
// 	// 				if (existingItem) {
// 	// 					return prevState.map((item) => {
// 	// 						if (item.productId === productId) {
// 	// 							return { ...item, quantity: item.quantity + 1 }
// 	// 						}
// 	// 						return item
// 	// 					})
// 	// 				} else {
// 	// 					return [...prevState, { productId, quantity: 1 }]
// 	// 				}
// 	// 			})
// 	// 		} catch (error) {
// 	// 			console.log(error.response.data)
// 	// 		} finally {
// 	// 			fetchCart()
// 	// 			setAddTocartLoader(false)
// 	// 		}
// 	// 	}
// 	// }

// 	// const removeFromCart = async (productId) => {
// 	// 	try {
// 	// 		setAddTocartLoader(true)
// 	// 		const method = "POST"
// 	// 		const endpoint = "/api/remove-from-cart"
// 	// 		const data = await makeApi(endpoint, method, { productId })
// 	// 		setCartItems((prevState) =>
// 	// 			prevState.filter((item) => item.productId !== productId)
// 	// 		)
// 	// 	} catch (error) {
// 	// 		console.log(error)
// 	// 	} finally {
// 	// 		fetchCart()
// 	// 		setAddTocartLoader(false)
// 	// 	}
// 	// }
// 	const closePopup = () => {
// 		setShowPopup(false)
// 	}

// 	useEffect(() => {
// 		fetchProduct()
// 		fetchCart(setCartItems)
// 	}, [])

// 	const isInCart = (productId) => {
// 		return cartItems.some((item) => item.productId === productId)
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

// 	// const { cartItems, addToCart, removeFromCart } = useContext(ShopContext)

// 	const banner = [
// 		{
// 			// id: products.length > 0 ? products[0]._id : "",
// 			// title: products.length > 0 ? products[0].name : "",
// 			// subTitle: "Premium Cookies",
// 			// content: products.length > 0 ? products[0].description : "",
// 			// banner_Image: products.length > 0 ? products[0].thumbnail : "",
// 			backgroundColor:
// 				"linear-gradient(180deg, rgba(255,102,92,1) 0%, rgba(254,165,159,1) 100%)",
// 			backgroundCart: "#E31E24",
// 		},
// 		{
// 			// id: products.length > 0 ? products[1]._id : "",
// 			// title: products.length > 0 ? products[1].name : "",
// 			// subTitle: "Premium Cookies",
// 			// content: products.length > 0 ? products[1].description : "",
// 			// banner_Image: products.length > 0 ? products[1].thumbnail : "",
// 			backgroundCart: "#007897",
// 			backgroundColor: "linear-gradient(180deg, #00B7FF 0%, #BEDAE4 100%)",
// 		},
// 		{
// 			// id: products.length > 0 ? products[2]._id : "",
// 			// title: products.length > 0 ? products[2].name : "",
// 			// subTitle: "Premium Cookies",
// 			// content: products.length > 0 ? products[2].description : "",
// 			// banner_Image: products.length > 0 ? products[2].thumbnail : "",
// 			backgroundColor:
// 				"linear-gradient(180deg, rgba(211,126,55,1) 0%, rgba(218,180,149,1) 100%)",
// 			backgroundCart: "#65321C",
// 		},
// 		{
// 			// id: products.length > 0 ? products[3]._id : "",
// 			// title: products.length > 0 ? products[3].name : "",
// 			// subTitle: "Premium Cookies",
// 			// content: products.length > 0 ? products[3].description : "",
// 			// banner_Image: products.length > 0 ? products[3].thumbnail : "",
// 			backgroundColor:
// 				"linear-gradient(180deg, rgba(255,158,60,1) 0%, rgba(226,208,189,1) 100%)",
// 			backgroundCart: "#BB8248",
// 		},
// 		{
// 			// id: products.length > 0 ? products[4]._id : "",
// 			// title: products.length > 0 ? products[4].name : "",
// 			// subTitle: "Premium Cookies",
// 			// content: products.length > 0 ? products[4].description : "",
// 			// banner_Image: products.length > 0 ? products[4].thumbnail : "",
// 			backgroundColor:
// 				"linear-gradient(180deg, rgba(130,201,90,1) 0%, rgba(172,205,153,1) 50%, rgba(193,204,187,1) 100%)",
// 			backgroundCart: "#519B29",
// 		},
// 	]
// 	console.log("bannerrrr", banner[1].id)
// 	const handlePrevSlide = () => {
// 		setCurrentSlide((prevSlide) =>
// 			prevSlide === 0 ? banner.length - 1 : prevSlide - 1
// 		)
// 		setAnimationDirection("prev")
// 	}

// 	const handleNextSlide = () => {
// 		setCurrentSlide((prevSlide) =>
// 			prevSlide === banner.length - 1 ? 0 : prevSlide + 1
// 		)
// 		setAnimationDirection("next")
// 	}

// 	useEffect(() => {
// 		// JavaScript code to handle arrow clicks
// 		const arrowLeft = document.querySelector(".arrow-btn img:first-child")
// 		const arrowRight = document.querySelector(".arrow-btn img:last-child")
// 		const bannerSlides = document.querySelectorAll(".slide")
// 		let currentSlideIndex = 0

// 		// Function to handle click on left arrow
// 		arrowLeft.addEventListener("click", () => {
// 			goToSlide(currentSlideIndex - 1)
// 		})

// 		// Function to handle click on right arrow
// 		arrowRight.addEventListener("click", () => {
// 			goToSlide(currentSlideIndex + 1)
// 		})

// 		// Function to navigate to a specific slide
// 		function goToSlide(index) {
// 			const totalSlides = bannerSlides.length
// 			currentSlideIndex = (index + totalSlides) % totalSlides // Ensure index wraps around for infinite loop
// 			bannerSlides.forEach((slide, i) => {
// 				slide.classList.toggle("active", i === currentSlideIndex)
// 			})
// 		}

// 		return () => {
// 			// Cleanup event listeners
// 			arrowLeft.removeEventListener("click", () => {})
// 			arrowRight.removeEventListener("click", () => {})
// 		}
// 	}, []) // Empty dependency array ensures this effect runs only once after initial render

// 	useEffect(() => {
// 		setBackgroundColor(banner[currentSlide].backgroundColor)
// 		setBackgroundCart(banner[currentSlide].backgroundCart)
// 	}, [currentSlide])

// 	return (
// 		<>
// 			{showPopup && (
// 				<div className="a_bg-black">
// 					<LoginPopup onClose={closePopup} />
// 				</div>
// 			)}

// 			<div
// 				className="banner"
// 				style={{ background: backgroundColor }}
// 			>
// 				{AllProductLoader ? (
// 					<div className="a_All_Product_loader">
// 						<div className="a_">
// 							<Primaryloader />
// 						</div>
// 					</div>
// 				) : (
// 					<div
// 						className={`palji-banners ${animationDirection}`}
// 						style={{ transform: `translateX(-${currentSlide * 100}%)` }}
// 					>
// 						{products.map((item, index) => (
// 							<div
// 								key={index}
// 								className="slide banner-flex"
// 								style={{ backgroundColor: item.backgroundColor }}
// 							>
// 								<div className="left-banner">
// 									<div className="banner-info">
// 										<div
// 											className={`title ${
// 												currentSlide === index ? "show" : ""
// 											}`}
// 										>
// 											<h2>{item.name}</h2>
// 											<p>Premium Cookies</p>
// 										</div>
// 										<p className="contents">{item.description}</p>
// 									</div>
// 									<div
// 										className="cart5"
// 										style={{ backgroundColor: backgroundCart }}
// 									>
// 										{/* <div className="banner-item-cart">
// 											{!cartItems[item.id] ? (
// 												<div
// 													className="banner-item-addto-cart"
// 													style={{ backgroundColor: backgroundCart }}
// 													onClick={() => handleAddToCart(item.id)}
// 												>
// 													ADD TO CART
// 												</div>
// 											) : (
// 												<div className="banner-food-item-counter">
// 													<img
// 														src={assets.add_icon_red}
// 														alt=""
// 													/>
// 													<p className="banner-cart-item-no">{cartItemCount}</p>
// 													<img
// 														onClick={() => handleAddToCart(item.id)}
// 														src={assets.add_icon_green}
// 														alt=""
// 													/>
// 												</div>
// 											)}
// 										</div> */}
// 										{isInCart(item?._id) ? (
// 											<div className="a_Add_to_cart_and_watchlist_child">
// 												{productLoaders[item?._id] ? (
// 													<HorizotalLoader />
// 												) : (
// 													<div className="a_cart_quantity b_cart_quantity">
// 														<LazyLoadImage
// 															effect="blur"
// 															loading="lazy"
// 															src={RemoveIcon}
// 															alt="AddIcon"
// 															className="a_Icon_add_to_cart"
// 															onClick={() =>
// 																removeFromCart(
// 																	item?._id,
// 																	setProductLoaders,
// 																	setCartItems,
// 																	fetchCart
// 																)
// 															}
// 														/>
// 														<span>{getProductQuantity(item?._id)}</span>
// 														<LazyLoadImage
// 															effect="blur"
// 															loading="lazy"
// 															src={AddIcon}
// 															alt="AddIcon"
// 															className="a_Icon_add_to_cart"
// 															onClick={() =>
// 																handleAddToCart(
// 																	item?._id,
// 																	getProductQuantity(item?._id),
// 																	item?.quantity
// 																)
// 															}
// 														/>
// 													</div>
// 												)}
// 											</div>
// 										) : (
// 											<div>
// 												{productLoaders[item?._id] ? (
// 													<HorizotalLoader />
// 												) : (
// 													<div
// 														className="a_Add_to_cart_button b_addtocart"
// 														onClick={() =>
// 															handleAddToCart(
// 																item?._id,
// 																getProductQuantity(item?._id),
// 																item?.quantity
// 															)
// 														}
// 													>
// 														Add to Cart
// 													</div>
// 												)}
// 											</div>
// 										)}
// 									</div>
// 								</div>
// 								<div className="right-banner">
// 									<img
// 										src={item.thumbnail}
// 										alt=""
// 									/>
// 								</div>
// 							</div>
// 						))}
// 					</div>
// 				)}

// 				<div className="arrow-btn">
// 					<img
// 						src={assets.left_arrow}
// 						alt=""
// 						onClick={handlePrevSlide}
// 					/>
// 					<img
// 						src={assets.right_arrow}
// 						alt=""
// 						onClick={handleNextSlide}
// 					/>
// 				</div>
// 			</div>
// 		</>
// 	)
// }

// export default Banner

import React, { useState, useEffect, useContext } from "react"
import "./banner.css"
import { assets } from "../../../assets/assets"

import { Link, useNavigate } from "react-router-dom"
import LoginPopup from "../../LoginPopup/LoginPopup"
import AddIcon from "../../../assets/add_icon_green.png"
import RemoveIcon from "../../../assets/remove_icon_red.png"
import HorizotalLoader from "../../loaders/horizotalLoader.jsx"
import Primaryloader from "../../loaders/primaryloader.jsx"
import { makeApi } from "../../../api/callApi"
import { LazyLoadImage } from "react-lazy-load-image-component"
import {
	addToCart,
	removeFromCart,
	fetchCart,
	fetchWishlist,
} from "../../../utils/productFunction.js"

const Banner = () => {
	// /api/get-all-products-by-category/6612e7e4e7c1d7bf5589ec0c
	const [currentSlide, setCurrentSlide] = useState(0)
	const [backgroundColor, setBackgroundColor] = useState(null)
	const [backgroundCart, setBackgroundCart] = useState(null)
	const [animationDirection, setAnimationDirection] = useState(null)

	const navigate = useNavigate()

	// const [showPopup, setShowPopup] = useState(false)

	const [slidesPerView, setSlidesPerView] = useState(3)
	const [sliderGap, setSliderGap] = useState(20)
	const [products, setProducts] = useState([])
	const [loading, setLoading] = useState(false)
	const [cartItems, setCartItems] = useState([])
	const [AllProductLoader, setAllProductLoader] = useState(false)
	const [AddTocartLoader, setAddTocartLoader] = useState(false)
	const [IsLogin, setIsLogin] = useState(false)
	const [showPopup, setShowPopup] = useState(false)
	const [productLoaders, setProductLoaders] = useState({})

	// get data
	const fetchProduct = async () => {
		try {
			setAllProductLoader(true)
			// Fetch all categories
			const categoriesResponse = await makeApi(`/api/get-all-categories`, "GET")
			const categories = categoriesResponse.data.categories

			if (categories.length > 0) {
				// Use the 5th category (index 4)
				const categoryId = categories[4]._id
				// Fetch products by category
				const response = await makeApi(
					`/api/get-all-products-by-category/${categoryId}`,
					"GET"
				)
				setProducts(response.data.products)
			}
		} catch (error) {
			console.log(error)
		} finally {
			setAllProductLoader(false)
		}
	}

	useEffect(() => {
		const token = localStorage.getItem("token")

		if (token) {
			setIsLogin(true)
		} else {
			setIsLogin(false)
		}
	}, [localStorage.getItem("token")])

	const closePopup = () => {
		setShowPopup(false)
	}

	useEffect(() => {
		fetchProduct()
		fetchCart(setCartItems)
	}, [])

	const isInCart = (productId) => {
		return cartItems.some((item) => item.productId === productId)
	}

	const getProductQuantity = (productId) => {
		const cartItem = cartItems.find((item) => item.productId === productId)
		return cartItem ? cartItem.quantity : 0
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

	const banner = [
		{
			backgroundColor:
				"linear-gradient(180deg, rgba(255,102,92,1) 0%, rgba(254,165,159,1) 100%)",
			backgroundCart: "#E31E24",
		},
		{
			backgroundCart: "#007897",
			backgroundColor: "linear-gradient(180deg, #00B7FF 0%, #BEDAE4 100%)",
		},
		{
			backgroundColor:
				"linear-gradient(180deg, rgba(211,126,55,1) 0%, rgba(218,180,149,1) 100%)",
			backgroundCart: "#65321C",
		},
		{
			backgroundColor:
				"linear-gradient(180deg, rgba(255,158,60,1) 0%, rgba(226,208,189,1) 100%)",
			backgroundCart: "#BB8248",
		},
		{
			backgroundColor:
				"linear-gradient(180deg, rgba(130,201,90,1) 0%, rgba(172,205,153,1) 50%, rgba(193,204,187,1) 100%)",
			backgroundCart: "#519B29",
		},
	]
	const handlePrevSlide = () => {
		setCurrentSlide((prevSlide) =>
			prevSlide === 0 ? banner.length - 1 : prevSlide - 1
		)
		setAnimationDirection("prev")
	}

	const handleNextSlide = () => {
		setCurrentSlide((prevSlide) =>
			prevSlide === banner.length - 1 ? 0 : prevSlide + 1
		)
		setAnimationDirection("next")
	}

	useEffect(() => {
		// JavaScript code to handle arrow clicks
		const arrowLeft = document.querySelector(".arrow-btn img:first-child")
		const arrowRight = document.querySelector(".arrow-btn img:last-child")
		const bannerSlides = document.querySelectorAll(".slide")
		let currentSlideIndex = 0

		// Function to handle click on left arrow
		arrowLeft.addEventListener("click", () => {
			goToSlide(currentSlideIndex - 1)
		})

		// Function to handle click on right arrow
		arrowRight.addEventListener("click", () => {
			goToSlide(currentSlideIndex + 1)
		})

		// Function to navigate to a specific slide
		function goToSlide(index) {
			const totalSlides = bannerSlides.length
			currentSlideIndex = (index + totalSlides) % totalSlides // Ensure index wraps around for infinite loop
			bannerSlides.forEach((slide, i) => {
				slide.classList.toggle("active", i === currentSlideIndex)
			})
		}

		return () => {
			// Cleanup event listeners
			arrowLeft.removeEventListener("click", () => { })
			arrowRight.removeEventListener("click", () => { })
		}
	}, [])

	useEffect(() => {
		setBackgroundColor(banner[currentSlide].backgroundColor)
		setBackgroundCart(banner[currentSlide].backgroundCart)
	}, [currentSlide])

	return (
		<>
			{showPopup && (
				<div className="a_bg-black">
					<LoginPopup onClose={closePopup} />
				</div>
			)}

			<div
				className="banner"
				style={{ background: backgroundColor }}
			>
				{AllProductLoader ? (
					<div className="a_All_Product_loader">
						<div className="a_">
							<Primaryloader />
						</div>
					</div>
				) : (
					<div
						className={`palji-banners ${animationDirection}`}
						style={{ transform: `translateX(-${currentSlide * 100}%)` }}
					>
						{products.map((item, index) => (
							<div
								key={index}
								className="slide banner-flex"
								style={{ backgroundColor: item.backgroundColor }}
							>
								<div className="left-banner">
									<div className="banner-info">
										<div
											className={`title ${currentSlide === index ? "show" : ""
												}`}
										>
											<h2>{item.name}</h2>
											<p>Premium Cookies</p>
										</div>
										<p className="contents">{item.description}</p>
									</div>
									<div
										className="cart5"
										style={{ backgroundColor: backgroundCart }}
									>
										{isInCart(item?._id) ? (
											<div className="a_Add_to_cart_and_watchlist_child">
												{productLoaders[item?._id] ? (
													<HorizotalLoader />
												) : (
													<div className="a_cart_quantity b_cart_quantity">
														<LazyLoadImage
															effect="blur"
															loading="lazy"
															src={RemoveIcon}
															alt="AddIcon"
															className="a_Icon_add_to_cart"
															onClick={() =>
																removeFromCart(
																	item?._id,
																	setProductLoaders,
																	setCartItems,
																	fetchCart
																)
															}
														/>
														<span>{getProductQuantity(item?._id)}</span>
														<LazyLoadImage
															effect="blur"
															loading="lazy"
															src={AddIcon}
															alt="AddIcon"
															className="a_Icon_add_to_cart"
															onClick={() =>
																handleAddToCart(
																	item?._id,
																	getProductQuantity(item?._id),
																	item?.quantity
																)
															}
														/>
													</div>
												)}
											</div>
										) : (
											<div>
												{productLoaders[item?._id] ? (
													<HorizotalLoader />
												) : (
													<div
														className="a_Add_to_cart_button b_addtocart"
														onClick={() =>
															handleAddToCart(
																item?._id,
																getProductQuantity(item?._id),
																item?.quantity
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
								<div className="right-banner">
									<img
										src={item.thumbnail}
										alt=""
									/>
								</div>
							</div>
						))}
					</div>
				)}

				<div className="arrow-btn">
					<img
						src={assets.left_arrow}
						alt=""
						onClick={handlePrevSlide}
					/>
					<img
						src={assets.right_arrow}
						alt=""
						onClick={handleNextSlide}
					/>
				</div>
			</div>
		</>
	)
}

export default Banner
