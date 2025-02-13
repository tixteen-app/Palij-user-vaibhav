import React, { useContext, useEffect, useState } from "react"
import "./item.css"
import { IoIosHeart } from "react-icons/io"
import { Link, useNavigate } from "react-router-dom"
import { ShopContext } from "../../context/ShopContext"
import { assets } from "../../assets/assets"
import { makeApi } from "../../api/callApi"

const Item = (props) => {
	// const { cartItems, addToCart, removeFromCart } = useContext(ShopContext)
	const [isInWishlist, setIsInWishlist] = useState(false)
	const [IsLogin, setIsLogin] = useState(false)
	const [cartItems, setCartItems] = useState([])
	const [AddTocartLoader, setAddTocartLoader] = useState(false)
	const [AllProductLoader, setAllProductLoader] = useState(false)
	const [toalProduct, setToalProduct] = useState(0)
	const [products, setProducts] = useState([])

	const [loading, setLoading] = useState(false)

	const fetchProduct = async () => {
		try {
			setAllProductLoader(true)
			const response = await makeApi(
				`/api/get-all-products?name=${search}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}&page=${currentPage}&perPage=${ResultPerPage}&IsOutOfStock=false`,
				"GET"
			)
			setProducts(response.data.products)
			setToalProduct(response.data.totalProducts)
		} catch (error) {
			console.log(error)
		} finally {
			setAllProductLoader(false)
		}
	}
	const fetchCart = async () => {
		try {
			const response = await makeApi("/api/my-cart", "GET")
			setCartItems(
				response.data.orderItems.map((item) => ({
					productId: item.productId._id,
					quantity: item.quantity,
				}))
			)
		} catch (error) {
			console.log(error)
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

	const isInCart = (productId) => {
		return cartItems.some((item) => item.productId === productId)
	}

	const addToCart = async (productId) => {
		if (!IsLogin) {
			setShowPopup(true)
		} else {
			try {
				setAddTocartLoader(true)
				const method = "POST"
				const endpoint = "/api/add-to-cart"
				const data = await makeApi(endpoint, method, {
					productId,
					quantity: 1,
					shippingPrice: 0,
				})
				setCartItems((prevState) => {
					const existingItem = prevState.find(
						(item) => item.productId === productId
					)
					if (existingItem) {
						return prevState.map((item) => {
							if (item.productId === productId) {
								return { ...item, quantity: item.quantity + 1 }
							}
							return item
						})
					} else {
						return [...prevState, { productId, quantity: 1 }]
					}
				})
			} catch (error) {
				console.log(error.response.data)
			} finally {
				fetchCart()
				// setAddTocartLoader(false)
			}
		}
	}
	const removeFromCart = async (productId) => {
		try {
			// setAddTocartLoader(true)
			const method = "POST"
			const endpoint = "/api/remove-from-cart"
			const data = await makeApi(endpoint, method, { productId })
			setCartItems((prevState) =>
				prevState.filter((item) => item.productId !== productId)
			)
		} catch (error) {
			console.log(error)
		} finally {
			fetchCart()
			// setAddTocartLoader(false)
		}
	}

	const getProductQuantity = (productId) => {
		const cartItem = cartItems.find((item) => item.productId === productId)
		return cartItem ? cartItem.quantity : 0
	}

	useEffect(() => {
		const checkWishlist = async () => {
			try {
				const response = await makeApi(`/api/get-my-wishlist`, "GET")
				const wishlistItems = response.data.wishlist

				const existsInWishlist = wishlistItems.some(
					(item) => item.products._id === props.id
				)

				setIsInWishlist(existsInWishlist)
			} catch (error) {
				console.log(error)
			}
		}

		checkWishlist()
	}, [props.id])

	const toggleWishlist = async () => {
		try {
			setLoading(true)
			const method = "POST"
			const endpoint = `/api/create-wishlist/${props.id}`
			const data = await makeApi(endpoint, method)
			setIsInWishlist(!isInWishlist)
		} catch (error) {
			console.log(error)
		} finally {
			setLoading(false)
		}
	}

	const handleAddToCart = () => {
		const token = localStorage.getItem("token")
		if (!token) {
			navigate("/login") // Redirect to login page if not logged in
			return
		}
		addToCart(props.id)
	}

	return (
		<div className="item">
			{/* {products.map((product, index) => ( */}
			<div className="item-card">
				{loading ? (
					<div className="whist_loader_main_div">
						<div class="whislist_loader"></div>
					</div>
				) : (
					<div>
						<IoIosHeart
							className={`watchlist-icon pointer-event ${
								isInWishlist ? "wishlist-active" : ""
							}`}
							onClick={toggleWishlist}
						/>
					</div>
				)}
				<Link to={`/openproduct/${props.id}`}>
					<img
						src={props.image}
						alt=""
					/>
				</Link>
				<div className="item-price-name">
					<p className="item-name">{props.name} </p>
					<div className="old-new-price">
						<p className="old-item-price">₹{props.old_price}</p>
						<p className="new-item-price">₹{props.new_price}</p>
					</div>
				</div>
				<div className="item-cart">
					{isInCart(props.id) ? (
						<div
							className="item-addto-cart "
							// onClick={() => addToCart(props.id)}
							// onClick={handleAddToCart}
							onClick={() => addToCart(props.id)}
						>
							ADD TO CART
						</div>
					) : (
						<div className="food-item-counter">
							<img
								// onClick={() => removeFromCart(props.id)}
								onClick={() => removeFromCart(props.id)}
								src={assets.add_icon_red}
								alt=""
							/>
							<p className="cart-item-no">{getProductQuantity[props.id]}</p>
							<img
								onClick={() => addToCart(products._id)}
								src={assets.add_icon_green}
								alt=""
							/>
						</div>
					)}
				</div>
			</div>
			{/* ))} */}
		</div>
	)
}

export default Item
