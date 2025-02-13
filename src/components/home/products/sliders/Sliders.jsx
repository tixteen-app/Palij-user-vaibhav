// import React, { useContext } from "react"
import { assets } from "../../../../assets/assets"
import "./slides.css"
import { Link, useNavigate } from "react-router-dom"
import React, { useContext, useEffect, useState } from "react"
import productInfo from "../Products"
import { ShopContext } from "../../../../context/ShopContext"
import LoginPopup from "../../../LoginPopup/LoginPopup.jsx"
// import { ShopContext } from "../../../../context/ShopContext"
import { makeApi } from "../../../../api/callApi.tsx"
const Sliders = ({ products, addToCart, removeFromCart, cartItemsProp }) => {
	// const { cartItems, addToCart, removeFromCart } = useContext(ShopContext)
	// const navigate = useNavigate()
	// const handleAddToCart = () => {
	// 	const token = localStorage.getItem("token")
	// 	if (!token) {
	// 		navigate("/login") // Redirect to login page if not logged in
	// 		return
	// 	}
	// 	addToCart(productInfo.id)
	// }
	const formatPrice = (price) => {
		// Parse price to ensure it's a number
		const parsedPrice = parseFloat(price)
		if (!isNaN(parsedPrice)) {
			return parsedPrice.toFixed(2)
		} else {
			// Handle invalid price gracefully
			return "Invalid Price"
		}
	}
	const [wishlistItems, setWishlistItems] = useState([])
	const [cartItems, setCartItems] = useState([])
	const [ResultPerPage, setResultPerPage] = useState(26)
	const [currentPage, setCurrentPage] = useState(1)
	const [totalPages, setTotalPages] = useState(0)
	const [toalProduct, setToalProduct] = useState(0)
	const [AllProductLoader, setAllProductLoader] = useState(false)
	const [IsLogin, setIsLogin] = useState(false)
	const [showPopup, setShowPopup] = useState(false)

	// useEffect(() => {
	// 	const token = localStorage.getItem("token")
	// 	if (token) {
	// 		setIsLogin(true)
	// 	} else {
	// 		setIsLogin(false)
	// 	}
	// }, [localStorage.getItem("token")])

	// const fetchCart = async () => {
	// 	try {
	// 		const token = localStorage.getItem("token")
	// 		if (token) {
	// 			const response = await makeApi("/api/my-cart", "GET", null, {
	// 				Authorization: `Bearer ${token}`,
	// 			})
	// 			setCartItems(
	// 				response.data.orderItems.map((item) => ({
	// 					productId: item.productId._id,
	// 					quantity: item.quantity,
	// 				}))
	// 			)
	// 		}
	// 	} catch (error) {
	// 		console.log(error)
	// 	}
	// }

	// useEffect(() => {
	// 	fetchCart()
	// }, [])

	// const isInCart = (productId) => {
	// 	return cartItems.some((item) => item.productId === productId)
	// }

	// const closePopup = () => {
	// 	setShowPopup(false)
	// }

	// const addToCart = async (productId) => {
	// 	try {
	// 		// Make API request to add product to cart
	// 		const response = await makeApi("/api/add-to-cart", "POST", {
	// 			productId,
	// 			quantity: 1, // You can adjust quantity as needed
	// 			shippingPrice: 0, // Adjust shipping price if applicable
	// 		})
	// 		// If API call is successful, update cartItems state
	// 		if (response.status === 200) {
	// 			setCartItems((prevCartItems) => [
	// 				...prevCartItems,
	// 				{ productId, quantity: 1 },
	// 			])
	// 		}
	// 	} catch (error) {
	// 		console.log("Error adding product to cart:", error)
	// 	}
	// }

	// const removeFromCart = async (productId) => {
	// 	try {
	// 		// Make API request to remove product from cart
	// 		const response = await makeApi("/api/remove-from-cart", "POST", {
	// 			productId,
	// 		})
	// 		// If API call is successful, update cartItems state
	// 		if (response.status === 200) {
	// 			setCartItems((prevCartItems) =>
	// 				prevCartItems.filter((item) => item.productId !== productId)
	// 			)
	// 		}
	// 	} catch (error) {
	// 		console.log("Error removing product from cart:", error)
	// 	}
	// }

	const getProductQuantity = (productId) => {
		const cartItem = cartItems.find((item) => item.productId === productId)
		return cartItem ? cartItem.quantity : 0
	}

	return (
		<div className="container">
			<div className="sliders">
				<div className="top-slider">
					<div className="cookies-images">
						<img
							src={products.cookieImage}
							alt=""
						/>
						<img
							src={products.cookieBgImage}
							alt=""
						/>
					</div>
					<div className="cookies-info">
						<div className="price">
							<p>{products.discountedPrice}/-</p>
							<p> {formatPrice(products.originalPrice)}/-</p>
						</div>
						<h2>{products.productName}</h2>
					</div>
				</div>
				<div className="bottom-slider">
					<div className="item-cart1">
						{/* {!cartItems[products.id] ? (
							<div
								className="item-addto-cart1"
								// onClick={() => addToCart(productInfo.id)}
								onClick={handleAddToCart}
							>
								ADD TO CART
							</div>
						) : (
							<div className="food-item-counter1">
								<img
									onClick={() => removeFromCart(products.id)}
									src={assets.add_icon_red}
									alt=""
								/>
								<p className="cart-item-no1">{cartItems[productInfo.id]}</p>
								<img
									onClick={() => addToCart(productInfo.id)}
									src={assets.add_icon_green}
									alt=""
								/>
							</div>
						)} */}
						{/* {!cartItemsProp.some((item) => item.productId === products.id) ? (
							<div
								className="item-addto-cart1"
								onClick={() => addToCart(products._id)}
							>
								ADD TO CART
							</div>
						) : (
							<div className="food-item-counter1">
								<img
									onClick={() => removeFromCart(products.id)}
									src={assets.add_icon_red}
									alt=""
								/>
								<p className="cart-item-no1">
									{getProductQuantity(products.id)}
								</p>
								<img
									onClick={() => addToCart(products.id)}
									src={assets.add_icon_green}
									alt=""
								/>
							</div>
						)} */}

						{cartItemsProp &&
						!cartItemsProp.some((item) => item.productId === products._id) ? (
							<div
								className="item-addto-cart1"
								onClick={() => addToCart(products._id)}
							>
								ADD TO CART
							</div>
						) : (
							<div className="food-item-counter1">
								<img
									onClick={() => removeFromCart(products._id)}
									src={assets.add_icon_red}
									alt=""
								/>
								<p className="cart-item-no1">
									{getProductQuantity(products._id)}
								</p>
								<img
									onClick={() => addToCart(products._id)}
									src={assets.add_icon_green}
									alt=""
								/>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Sliders
