import React, { useContext } from "react"
import "./gifts.css"
import { Link, useNavigate } from "react-router-dom"

import { assets } from "../../../../assets/assets"
// import { ShopContext } from "../../../../context/ShopContext"
const Gifts = ({ products, addToCart, removeFromCart, getProductQuantity }) => {
	// const { cartItems, addToCart, removeFromCart } = useContext(ShopContext)
	// const navigate = useNavigate()

	// const handleAddToCart = () => {
	// 	const token = localStorage.getItem("token")
	// 	if (!token) {
	// 		navigate("/login") // Redirect to login page if not logged in
	// 		return
	// 	}
	// 	addToCart(products._id)
	// }
	// // console.log(products._id)
	// console.log(!cartItems[products._id])

	const handleAddToCart = () => {
		const token = localStorage.getItem("token")
		if (!token) {
			// Redirect to login page if not logged in
			window.location.href = "/login"
			return
		}
		addToCart(products._id)
	}

	return (
		<div className="gifts">
			<div className="hampers">
				<div className="hampers-product">
					<div className="top-hamper">
						<div className="hamper-images">
							<img
								src={assets.rapper1}
								alt=""
							/>
							<img
								src={products.thumbnail}
								alt=""
							/>
							<img
								src={assets.rapper2}
								alt=""
							/>
						</div>
						<div className="hamper-info">
							<div className="price">
								<p>{products.price}/-</p>
								<p>{products.PriceAfterDiscount}/-</p>
							</div>
							<h2>{products.name}</h2>
						</div>
					</div>
					<div className="bottom-hampers">
						<div className="item-cart1">
							{/* {!cartItems[products._id] ? (
								<div
									className="item-addto-cart1"
									// onClick={() => addToCart(products._id)}
									onClick={handleAddToCart}
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
									<p className="cart-item-no1">{cartItems[products._id]}</p>
									<img
										onClick={() => addToCart(products._id)}
										src={assets.add_icon_green}
										alt=""
									/>
								</div>
							)} */}
							{!getProductQuantity(products._id) ? (
								<div
									className="item-addto-cart1"
									onClick={handleAddToCart}
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
										onClick={handleAddToCart}
										src={assets.add_icon_green}
										alt=""
									/>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Gifts
