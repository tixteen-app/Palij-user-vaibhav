// import React, { useEffect, useState } from "react"
// import "./homeGifts.css"
// import { Swiper, SwiperSlide } from "swiper/react"
// import "swiper/css"
// import "swiper/css/navigation"
// import "swiper/css/pagination"
// import { Navigation, Pagination, Scrollbar } from "swiper/modules"

// import { Link } from "react-router-dom"
// import LoginPopup from "../../LoginPopup/LoginPopup.jsx"
// import AddIcon from "../../../assets/add_icon_green.png"
// import RemoveIcon from "../../../assets/remove_icon_red.png"
// import HorizotalLoader from "../../loaders/horizotalLoader.jsx"
// import Primaryloader from "../../loaders/primaryloader.jsx"
// import { makeApi } from "../../../api/callApi"

// const HomeGifts = () => {
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
// 				`/api/get-all-products-by-category/65f3c6cf7fd052885f56d584`,
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
// 	return (
// 		<div className="homeGifts">
// 			{" "}
// 			{showPopup && (
// 				<div className="a_bg-black">
// 					<LoginPopup onClose={closePopup} />
// 				</div>
// 			)}
// 			<div className="a_Our_collection_main_div  ">
// 				{/* Main Heading */}
// 				<div className="a_Main_Home_heading text-center b_homegift_heading">
// 					<h1 className="exiting_range_hampers">EXCITING RANGE OF HAMPERS </h1>
// 					<p>Discover our Signature Selection</p>
// 				</div>

// 				{/* Swiper */}
// 				<div>
// 					{AllProductLoader ? (
// 						<div className="a_All_Product_loader">
// 							<div className="a_">
// 								<Primaryloader />
// 							</div>
// 						</div>
// 					) : (
// 						<Swiper
// 							slidesPerView={slidesPerView}
// 							spaceBetween={sliderGap}
// 							slidesPerGroup={1}
// 							loop={true}
// 							loopFillGroupWithBlank={true}
// 							navigation={true}
// 							className="mySwiper main_Best_Saller_swiper"
// 							modules={[Navigation]}
// 							// slidesPerView={1}
// 							// spaceBetween={10}
// 							pagination={{
// 								clickable: true,
// 							}}
// 							breakpoints={{
// 								250: {
// 									slidesPerView: 1,
// 									spaceBetween: 30,
// 								},
// 								1000: {
// 									slidesPerView: 2,
// 									spaceBetween: 40,
// 								},
// 								1251: {
// 									slidesPerView: 3,
// 									spaceBetween: 50,
// 								},
// 							}}
// 						>
// 							{products.map((product, index) => (
// 								<SwiperSlide
// 									key={index}
// 									className="a_main_swiper_slide_our_collection"
// 								>
// 									<div className="a_main_our_collection_swiper_options b_box-sq">
// 										<img
// 											src={product.image[1]}
// 											alt={`ImageNumber ${index + 1}`}
// 											className="a_Best_saller_slider_images b_gift_image"
// 										/>
// 										<div className="a_bestSaller_details">
// 											<div className="b_bestSaller_details_content">
// 												<div>{product.name}</div>
// 												<div>₹{product.PriceAfterDiscount}</div>
// 											</div>
// 											{/* <div className='a_Add_to_cart_button' >Add to Cart</div> */}
// 											<div className="a_Add_to_cart_and_watchlist_button">
// 												<>
// 													{isInCart(product._id) ? (
// 														<div className="a_Add_to_cart_and_watchlist_child ">
// 															{AddTocartLoader ? (
// 																<div>
// 																	{" "}
// 																	<HorizotalLoader />{" "}
// 																</div>
// 															) : (
// 																<div className="a_cart_quantity">
// 																	<img
// 																		src={RemoveIcon}
// 																		alt="AddIcon"
// 																		className="a_Icon_add_to_cart"
// 																		onClick={() => removeFromCart(product._id)}
// 																	/>
// 																	<span>{getProductQuantity(product._id)}</span>
// 																	<img
// 																		src={AddIcon}
// 																		alt="AddIcon"
// 																		className="a_Icon_add_to_cart"
// 																		onClick={() => addToCart(product._id)}
// 																	/>
// 																</div>
// 															)}
// 														</div>
// 													) : (
// 														<div>
// 															{AddTocartLoader ? (
// 																<div>
// 																	{" "}
// 																	<HorizotalLoader />{" "}
// 																</div>
// 															) : (
// 																<div
// 																	className="a_Add_to_cart_button"
// 																	onClick={() => addToCart(product._id)}
// 																>
// 																	Add to Cart
// 																</div>
// 															)}
// 														</div>
// 													)}
// 												</>
// 											</div>
// 										</div>
// 									</div>
// 								</SwiperSlide>
// 							))}
// 						</Swiper>
// 					)}
// 				</div>
// 				<div className="a_view_more_button_div">
// 					<Link
// 						to={"/product/all-products"}
// 						className="a_css-for-link-tag"
// 					>
// 						<div className="a_click_buttons view_more_button_home_page">
// 							All Products{" "}
// 						</div>
// 					</Link>
// 				</div>
// 			</div>
// 		</div>
// 	)
// }

// export default HomeGifts

// import React, { useEffect, useState } from "react"
// import "./homeGifts.css"
// import { Swiper, SwiperSlide } from "swiper/react"
// import "swiper/css"
// import "swiper/css/navigation"
// import "swiper/css/pagination"
// import { Navigation, Pagination, Scrollbar } from "swiper/modules"

// import { Link } from "react-router-dom"
// import LoginPopup from "../../LoginPopup/LoginPopup.jsx"
// import AddIcon from "../../../assets/add_icon_green.png"
// import RemoveIcon from "../../../assets/remove_icon_red.png"
// import HorizotalLoader from "../../loaders/horizotalLoader.jsx"
// import Primaryloader from "../../loaders/primaryloader.jsx"
// import { makeApi } from "../../../api/callApi"

// const HomeGifts = () => {
// 	const [slidesPerView, setSlidesPerView] = useState(3)
// 	const [sliderGap, setSliderGap] = useState(20)
// 	const [products, setProducts] = useState([])
// 	const [loading, setLoading] = useState(false)
// 	const [cartItems, setCartItems] = useState([])
// 	const [AllProductLoader, setAllProductLoader] = useState(false)
// 	const [loadingProductIds, setLoadingProductIds] = useState(new Set())
// 	const [IsLogin, setIsLogin] = useState(false)
// 	const [showPopup, setShowPopup] = useState(false)

// 	// get data
// 	const fetchProduct = async () => {
// 		try {
// 			setAllProductLoader(true)
// 			const response = await makeApi(
// 				`/api/get-all-products-by-category/65f3c6cf7fd052885f56d584`,
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
// 				setLoadingProductIds((prevState) => new Set(prevState).add(productId))
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
// 				setLoadingProductIds((prevState) => {
// 					const newSet = new Set(prevState)
// 					newSet.delete(productId)
// 					return newSet
// 				})
// 			}
// 		}
// 	}

// 	const removeFromCart = async (productId) => {
// 		try {
// 			setLoadingProductIds((prevState) => new Set(prevState).add(productId))
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
// 			setLoadingProductIds((prevState) => {
// 				const newSet = new Set(prevState)
// 				newSet.delete(productId)
// 				return newSet
// 			})
// 		}
// 	}
// 	const closePopup = () => {
// 		setShowPopup(false)
// 	}

// 	useEffect(() => {
// 		fetchProduct()
// 		fetchCart()
// 	}, [])
// 	return (
// 		<div className="homeGifts">
// 			{" "}
// 			{showPopup && (
// 				<div className="a_bg-black">
// 					<LoginPopup onClose={closePopup} />
// 				</div>
// 			)}
// 			<div className="a_Our_collection_main_div  ">
// 				{/* Main Heading */}
// 				<div className="a_Main_Home_heading text-center b_homegift_heading">
// 					<h1 className="exiting_range_hampers">EXCITING RANGE OF HAMPERS </h1>
// 					<p>Discover our Signature Selection</p>
// 				</div>

// 				{/* Swiper */}
// 				<div>
// 					{AllProductLoader ? (
// 						<div className="a_All_Product_loader">
// 							<div className="a_">
// 								<Primaryloader />
// 							</div>
// 						</div>
// 					) : (
// 						<Swiper
// 							slidesPerView={slidesPerView}
// 							spaceBetween={sliderGap}
// 							slidesPerGroup={1}
// 							loop={true}
// 							loopFillGroupWithBlank={true}
// 							navigation={true}
// 							className="mySwiper main_Best_Saller_swiper"
// 							modules={[Navigation]}
// 							// slidesPerView={1}
// 							// spaceBetween={10}
// 							pagination={{
// 								clickable: true,
// 							}}
// 							breakpoints={{
// 								250: {
// 									slidesPerView: 1,
// 									spaceBetween: 30,
// 								},
// 								1000: {
// 									slidesPerView: 2,
// 									spaceBetween: 40,
// 								},
// 								1251: {
// 									slidesPerView: 3,
// 									spaceBetween: 50,
// 								},
// 							}}
// 						>
// 							{products.map((product, index) => (
// 								<SwiperSlide
// 									key={index}
// 									className="a_main_swiper_slide_our_collection"
// 								>
// 									<div className="a_main_our_collection_swiper_options b_box-sq">
// 										<img
// 											src={product.image[1]}
// 											alt={`ImageNumber ${index + 1}`}
// 											className="a_Best_saller_slider_images b_gift_image"
// 										/>
// 										<div className="a_bestSaller_details">
// 											<div className="b_bestSaller_details_content">
// 												<div>{product.name}</div>
// 												<div>₹{product.PriceAfterDiscount}</div>
// 											</div>
// 											{/* <div className='a_Add_to_cart_button' >Add to Cart</div> */}
// 											<div className="a_Add_to_cart_and_watchlist_button">
// 												<>
// 													{isInCart(product._id) ? (
// 														<div className="a_Add_to_cart_and_watchlist_child ">
// 															{loadingProductIds.has(product._id) ? (
// 																<div>
// 																	{" "}
// 																	<HorizotalLoader />{" "}
// 																</div>
// 															) : (
// 																<div className="a_cart_quantity">
// 																	<img
// 																		src={RemoveIcon}
// 																		alt="AddIcon"
// 																		className="a_Icon_add_to_cart"
// 																		onClick={() => removeFromCart(product._id)}
// 																	/>
// 																	<span>{getProductQuantity(product._id)}</span>
// 																	<img
// 																		src={AddIcon}
// 																		alt="AddIcon"
// 																		className="a_Icon_add_to_cart"
// 																		onClick={() => addToCart(product._id)}
// 																	/>
// 																</div>
// 															)}
// 														</div>
// 													) : (
// 														<div>
// 															{loadingProductIds.has(product._id) ? (
// 																<div>
// 																	{" "}
// 																	<HorizotalLoader />{" "}
// 																</div>
// 															) : (
// 																<div
// 																	className="a_Add_to_cart_button"
// 																	onClick={() => addToCart(product._id)}
// 																>
// 																	Add to Cart
// 																</div>
// 															)}
// 														</div>
// 													)}
// 												</>
// 											</div>
// 										</div>
// 									</div>
// 								</SwiperSlide>
// 							))}
// 						</Swiper>
// 					)}
// 				</div>
// 				<div className="a_view_more_button_div">
// 					<Link
// 						to={"/product/all-products"}
// 						className="a_css-for-link-tag"
// 					>
// 						<div className="a_click_buttons view_more_button_home_page">
// 							All Products{" "}
// 						</div>
// 					</Link>
// 				</div>
// 			</div>
// 		</div>
// 	)
// }

// export default HomeGifts

//
//
//
//
//
//
//
//
//
//
//
//
//
//

import React, { useEffect, useState } from "react"
import "./homeGifts.css"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { Navigation, Pagination, Scrollbar } from "swiper/modules"

import { Link } from "react-router-dom"
import LoginPopup from "../../LoginPopup/LoginPopup.jsx"
import AddIcon from "../../../assets/add_icon_green.png"
import RemoveIcon from "../../../assets/remove_icon_red.png"
import HorizotalLoader from "../../loaders/horizotalLoader.jsx"
import Primaryloader from "../../loaders/primaryloader.jsx"
import { makeApi } from "../../../api/callApi"
import {
	addToCart,
	removeFromCart,
	fetchCart,
	fetchWishlist,
} from "../../../utils/productFunction.js"
import { LazyLoadImage } from "react-lazy-load-image-component"

const HomeGifts = () => {
	const [slidesPerView, setSlidesPerView] = useState(3)
	const [sliderGap, setSliderGap] = useState(20)
	const [products, setProducts] = useState([])
	const [loading, setLoading] = useState(false)
	const [cartItems, setCartItems] = useState([])
	const [AllProductLoader, setAllProductLoader] = useState(false)
	const [loadingProductIds, setLoadingProductIds] = useState(new Set())
	const [IsLogin, setIsLogin] = useState(false)
	const [showPopup, setShowPopup] = useState(false)
	const [productLoaders, setProductLoaders] = useState({})

	// get data
	const fetchProduct = async () => {
		try {
			setAllProductLoader(true)
			const response = await makeApi(
				`/api/get-all-products-by-category/65f3c6cf7fd052885f56d584`,
				"GET"
			)
			setProducts(response.data.products)
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
	// const isInCart = (productId) => {
	// 	return cartItems.some((item) => item.productId === productId)
	// }

	// const getProductQuantity = (productId) => {
	// 	const cartItem = cartItems.find((item) => item.productId === productId)
	// 	return cartItem ? cartItem.quantity : 0
	// }

	// // action

	// const addToCart = async (productId) => {
	// 	if (!IsLogin) {
	// 		setShowPopup(true)
	// 	} else {
	// 		try {
	// 			setLoadingProductIds((prevState) => new Set(prevState).add(productId))
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
	// 			setLoadingProductIds((prevState) => {
	// 				const newSet = new Set(prevState)
	// 				newSet.delete(productId)
	// 				return newSet
	// 			})
	// 		}
	// 	}
	// }

	// const removeFromCart = async (productId) => {
	// 	try {
	// 		setLoadingProductIds((prevState) => new Set(prevState).add(productId))
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
	// 		setLoadingProductIds((prevState) => {
	// 			const newSet = new Set(prevState)
	// 			newSet.delete(productId)
	// 			return newSet
	// 		})
	// 	}
	// }

	const isInCart = (productId) => {
		return cartItems.some((item) => item.productId === productId)
	}

	const closePopup = () => {
		setShowPopup(false)
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

	useEffect(() => {
		fetchProduct()
		fetchCart(setCartItems)
	}, [])
	return (
		<div className="homeGifts">
			{" "}
			{showPopup && (
				<div className="a_bg-black">
					<LoginPopup onClose={closePopup} />
				</div>
			)}
			<div className="a_Our_collection_main_div  ">
				{/* Main Heading */}
				<div className="a_Main_Home_heading text-center b_homegift_heading">
					<h1 className="exiting_range_hampers">EXCITING RANGE OF HAMPERS </h1>
					<p>Discover our Signature Selection</p>
				</div>

				{/* Swiper */}
				<div>
					{AllProductLoader ? (
						<div className="a_All_Product_loader">
							<div className="a_">
								<Primaryloader />
							</div>
						</div>
					) : (
						<Swiper
							slidesPerView={slidesPerView}
							spaceBetween={sliderGap}
							slidesPerGroup={1}
							loop={true}
							loopFillGroupWithBlank={true}
							navigation={true}
							className="mySwiper main_Best_Saller_swiper"
							modules={[Navigation]}
							// slidesPerView={1}
							// spaceBetween={10}
							pagination={{
								clickable: true,
							}}
							breakpoints={{
								250: {
									slidesPerView: 1,
									spaceBetween: 30,
								},
								1000: {
									slidesPerView: 2,
									spaceBetween: 40,
								},
								1251: {
									slidesPerView: 3,
									spaceBetween: 50,
								},
							}}
						>
							{products.map((product, index) => (
								<SwiperSlide
									key={index}
									className="a_main_swiper_slide_our_collection"
								>
									<div className="a_main_our_collection_swiper_options b_box-sq">
										<img
											src={product.image[1]}
											alt={`ImageNumber ${index + 1}`}
											className="a_Best_saller_slider_images b_gift_image"
										/>
										<div className="a_bestSaller_details">
											<div className="b_bestSaller_details_content">
												<div>{product.name}</div>
												<div>₹{product.PriceAfterDiscount}</div>
											</div>
											{/* <div className='a_Add_to_cart_button' >Add to Cart</div> */}
											<div className="a_Add_to_cart_and_watchlist_button">
												<>
													{isInCart(product._id) ? (
														<div className="a_Add_to_cart_and_watchlist_child ">
															{productLoaders[product?._id] ? (
																<HorizotalLoader />
															) : (
																<div className="a_cart_quantity">
																	<LazyLoadImage
																		effect="blur"
																		loading="lazy"
																		src={RemoveIcon}
																		alt="AddIcon"
																		className="a_Icon_add_to_cart"
																		onClick={() =>
																			removeFromCart(
																				product?._id,
																				setProductLoaders,
																				setCartItems,
																				fetchCart
																			)
																		}
																	/>
																	<span>
																		{getProductQuantity(product?._id)}
																	</span>
																	<LazyLoadImage
																		effect="blur"
																		loading="lazy"
																		src={AddIcon}
																		alt="AddIcon"
																		className="a_Icon_add_to_cart"
																		onClick={() =>
																			handleAddToCart(
																				product?._id,
																				getProductQuantity(product?._id),
																				product?.quantity
																			)
																		}
																	/>
																</div>
															)}
														</div>
													) : (
														<div>
															{productLoaders[product?._id] ? (
																<HorizotalLoader />
															) : (
																<div
																	className="a_Add_to_cart_button"
																	onClick={() =>
																		handleAddToCart(
																			product?._id,
																			getProductQuantity(product?._id),
																			product?.quantity
																		)
																	}
																>
																	Add to Cart
																</div>
															)}
														</div>
													)}
												</>
											</div>
										</div>
									</div>
								</SwiperSlide>
							))}
						</Swiper>
					)}
				</div>
				<div className="a_view_more_button_div">
					<Link
						to={"/product/all-products"}
						className="a_css-for-link-tag"
					>
						<div className="a_click_buttons view_more_button_home_page">
							All Products{" "}
						</div>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default HomeGifts
