import { createContext, useEffect, useState } from "react"
import { makeApi } from "../api/callApi"

export const ShopContext = createContext(null)

const ShopContextProvider = (props) => {
	const [cartItems, setCartItems] = useState(
		JSON.parse(localStorage.getItem("cartItems")) || {}
	)

	const [all_products, setall_product] = useState([])
	// const [products, setProducts] = useState([])
	// const [showLoginPage, setShowLoginPage] = useState(false)

	useEffect(() => {
		const fetchData = async () => {
			try {
				// setLoading(true)
				const response = await makeApi(`/api/get-all-products`, "GET")
				setall_product(response.data.products)
			} catch (error) {
				console.error("Error fetching products:", error)
			}
		}
		fetchData()
	}, [])
	const all_product = all_products

	const addToCart = (itemId) => {
		// const token = localStorage.getItem("token")
		// if (!token) {
		// 	return
		// }

		if (!cartItems[itemId]) {
			setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
		} else {
			setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
		}
	}
	const removeFromCart = (itemId) => {
		setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
	}

	const getTotalCartAmount = () => {
		let totalAmount = 0
		for (const item in cartItems) {
			if (cartItems[item] > 0) {
				let itemInfo = all_product.find((product) => product._id === item)
				if (itemInfo && itemInfo.price) {
					totalAmount += itemInfo.price * cartItems[item]
				}
			}
		}
		return totalAmount
	}
	// const getTotalCartDiscountAmount = () => {
	// 	let totalAmount = 0
	// 	if (all_product.length === 0) {
	// 		return totalAmount
	// 	}
	// 	for (const item in cartItems) {
	// 		if (cartItems[item] > 0) {
	// 			let itemInfo = all_product.find((product) => product._id === item)

	// 			totalAmount += itemInfo.price * cartItems[item]
	// 		}
	// 	}
	// 	return totalAmount
	// }

	const getTotalCartDiscountAmount = () => {
		let totalAmount = 0
		for (const item in cartItems) {
			if (cartItems[item] > 0) {
				let itemInfo = all_product.find((product) => product._id === item)
				if (itemInfo && itemInfo.PriceAfterDiscount) {
					totalAmount += itemInfo.PriceAfterDiscount * cartItems[item]
				}
			}
		}
		totalAmount = parseFloat(totalAmount.toFixed(2))
		return totalAmount
	}
	const getTotalCartItems = () => {
		let totalItem = 0
		for (const item in cartItems) {
			if (cartItems[item] > 0) {
				totalItem += cartItems[item]
			}
		}
		return totalItem
	}

	// Update localStorage whenever cartItems change
	useEffect(() => {
		if (!localStorage.getItem("token")) {
			localStorage.removeItem("cartItems")
		} else {
			localStorage.setItem("cartItems", JSON.stringify(cartItems))
		}
	}, [cartItems])
	const contextValue = {
		all_product,
		cartItems,
		setCartItems,
		addToCart,
		removeFromCart,
		getTotalCartAmount,
		getTotalCartItems,
		getTotalCartDiscountAmount,
	}

	return (
		<>
			<ShopContext.Provider value={contextValue}>
				{props.children}
			</ShopContext.Provider>
		</>
	)
}

export default ShopContextProvider
