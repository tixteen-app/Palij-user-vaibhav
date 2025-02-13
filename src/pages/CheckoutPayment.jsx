import React, { useContext, useEffect, useState } from "react"
import Breadcrum from "../components/breadcrum/Breadcrum"
import "./CSS/checkoutPayment.css"
import { ShopContext } from "../context/ShopContext"
import { useNavigate } from "react-router"
import { makeApi } from "../api/callApi"
import Orderbar from "../components/orderbar/orderbar"
import Primaryloader from "../components/loaders/primaryloader"

import { ToastContainer, toast } from "react-toastify"

const CheckoutPayment = () => {
	const { cartItems, all_product, removeFromCart, getTotalCartAmount } =
		useContext(ShopContext)
	const [shippingAddresses, setShippingAddresses] = useState([])
	const [billingAddresses, setBillingAddresses] = useState([])
	const [selectedShippingAddress, setSelectedShippingAddress] = useState(null)
	const [selectedBillingAddress, setSelectedBillingAddress] = useState(null)
	const [loading, setLoading] = useState(false)
	const [selectedAddress, setSelectedAddress] = useState(null)
	const [cartItem, setCartItem] = useState([])
	const [cartPoductList, setCartProductList] = useState([])
	const [coupanCode, setCoupanCode] = useState(null)

	useEffect(() => {
		const fetchCartItem = async () => {
			const response = await makeApi("/api/my-cart", "GET")
			setCartItem(response.data)
		}
		fetchCartItem()
	}, [])

	const fetchShippingAddresses = async () => {
		try {
			setLoading(true)
			const response = await makeApi("/api/get-my-shiped-address", "GET")
			setShippingAddresses(response.data.shipedaddress)
			setLoading(false)
		} catch (error) {
			console.error("Error fetching shipping addresses: ", error)
			setLoading(false)
		}
	}
	const fetchBillingAddresses = async () => {
		try {
			setLoading(true)
			const response = await makeApi("/api/get-my-billing-address", "GET")
			setBillingAddresses(response.data.billingaddress)
			setLoading(false)
		} catch (error) {
			console.error("Error fetching shipping addresses: ", error)
			setLoading(false)
		}
	}
	// useEffect(() => {
	// 	const fetchCartItem = async () => {
	// 		const response = await makeApi("/api/my-cart", "GET")
	// 		setCartItem(response.data)
	// 		setCartProductList(response.data.orderItems)
	// 	}
	// 	fetchCartItem()
	// }, [])
	// action
	// console.log("coupanCode", coupanCode)
	// const SubmitCoupan = async (e) => {
	// 	e.preventDefault()
	// 	try {
	// 		const applyCoupan = await makeApi("/api/apply-coupon", "POST", {
	// 			coupanCode: coupanCode,
	// 		})
	// 		console.log(applyCoupan.data.message)
	// 	} catch (error) {
	// 		console.log(error)
	// 	}
	// }

	// calling getting data
	useEffect(() => {
		fetchShippingAddresses()
		fetchBillingAddresses()
	}, [])

	const handleAddressSelect = (address) => {
		setSelectedAddress(address)
	}

	// const handlepaymentmethodSelect = (payment) => {
	// 	setSelectPaymentMethod(payment)
	// }

	// const handleSubmit = async (event) => {
	// 	if (!selectPaymentMethod) {
	// 		toast("Please select payment method")
	// 		return
	// 	}
	// 	event.preventDefault()
	// 	const data = {
	// 		shippingAddress: selectedAddress,
	// 		paymentMethod: selectPaymentMethod,
	// 		CartId: cartItem._id,
	// 	}
	// 	try {
	// 		setLoading(true)
	// 		const response = await makeApi("/api/create-second-order", "POST", data)
	// 		setOrderPlaced(true)
	// 		setTimeout(() => {
	// 			setOrderPlaced(false)
	// 			navigation("/product/all-products")
	// 		}, 5000)
	// 	} catch (error) {
	// 		console.error("Error fetching shipping addresses: ", error)
	// 	} finally {
	// 		setLoading(false)
	// 	}
	// }
	// const ManageCurrnetPage = (e) => {
	// 	e.preventDefault()
	// 	if (!selectedAddress) {
	// 		toast("Please select shipping address")
	// 	} else {
	// 		setCurrentPage("PAYMENT")
	// 	}
	// }
	const handleShippingAddressSelect = (address) => {
		setSelectedShippingAddress(address)
	}

	const handleBillingAddressSelect = (address) => {
		setSelectedBillingAddress(address)
	}

	const handleSubmit = async (event) => {
		if (!selectedShippingAddress) {
			toast("Please select a shipping address")
			return
		}

		if (!selectedBillingAddress) {
			toast("Please select a billing address")
			return
		}
		event.preventDefault()

		navigate("/cart/checkoutpayment/payment")
	}
	const SubmitCoupan = async (e) => {
		e.preventDefault()
		try {
			const applyCoupan = await makeApi("/api/apply-coupon", "POST", {
				coupanCode: coupanCode,
			})
			console.log(applyCoupan.data.message)
			toast(applyCoupan.data.message) // Show success message if coupon applied successfully
		} catch (error) {
			console.error(error)
			toast("Failed to apply coupon. Please try again.") // Show error message if coupon application fails
		}
	}

	const navigate = useNavigate()
	return (
		<>
			<ToastContainer
				position="top-center"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
			<div className="checkoutpayment">
				{/* <Breadcrum /> */}
				<div className="a_orderbar_checkout">
					<Orderbar activeOptionName="CHECKOUT" />
				</div>
				<h1 className="checkout-h1">checkout & payment</h1>
				<div className="checkoutpayment-div">
					<div className="left-checkoutpayment">
						<div className="check-outt">
							<div>
								<h2>Shipping Address:</h2>
								<button
									className="a_add_checkout_address"
									onClick={() => navigate("/userprofile/myaddress")}
								>
									Add New Address
								</button>
							</div>
							<div className="acheckout-shipping-address">
								{loading && (
									<div>
										{" "}
										<Primaryloader />{" "}
									</div>
								)}
								{!loading &&
									shippingAddresses.map((address, index) => (
										<div
											key={index}
											className="address-item"
										>
											<input
												type="radio"
												id={`shipping-address-${index}`}
												name="shipping-address"
												value={address._id}
												checked={selectedShippingAddress === address}
												onChange={() => handleShippingAddressSelect(address)}
												className="address-radio"
											/>
											<label
												htmlFor={`shipping-address-${index}`}
												className="address-label"
											>
												{`${address.firstname} ${address.lastname}, ${address.address}, ${address.city}, ${address.state}, ${address.country}`}
											</label>
										</div>
									))}
							</div>
						</div>
						<div className="check-outt">
							<div>
								<h2>Billing Address:</h2>
								<button
									className="a_add_checkout_address"
									onClick={() => navigate("/userprofile/myaddress")}
								>
									Add New Address
								</button>
							</div>
							<div className="acheckout-shipping-address">
								{!loading &&
									billingAddresses.map((address, index) => (
										<div
											key={index}
											className="address-item"
										>
											<input
												type="radio"
												id={`billing-address-${index}`}
												name="billing-address"
												value={address._id}
												checked={selectedBillingAddress === address}
												onChange={() => handleBillingAddressSelect(address)}
												className="address-radio"
											/>
											<label
												htmlFor={`billing-address-${index}`}
												className="address-label"
											>
												{`${address?.name}, ${address.address}, ${address.city}, ${address.state}, ${address.country}`}
											</label>
										</div>
									))}
							</div>
						</div>

					</div>
					<div className="right-checkoutpayment cart-billing">
						<div className="cart-order-summary">
							<h2>order summary</h2>
							<div className="cart-billing-charges">
								<div className="cart-billing-subtotal">
									<p>SUBTOTAL</p>
									<p>
										₹
										{cartItem.totalPrice
											? cartItem.totalPrice.toFixed(2)
											: "0.00"}
									</p>
								</div>{" "}
								<div className="cart-billing-discount">
									<p>DISCOUNT</p>
									<p>₹{0}</p>
								</div>{" "}
								<div className="cart-billing-tax">
									<p>TAX</p>
									<p>₹{cartItem.taxPrice}</p>
								</div>{" "}
								<div className="cart-billing-shipping">
									<p>SHIPPING</p>
									<p>{0}</p>
								</div>{" "}
								<div className="cart-billing-shipping">
									<b>TOTAL</b>
									<b>₹{cartItem.TotalProductPrice}</b>
								</div>
							</div>
							<div onClick={(e) => ManageCurrnetPage(e)}>
								<button onClick={handleSubmit}>Proceed To Payment</button>
							</div>
							<hr />
							<p className="cart-delivery-day">
								Delivery <span>4 To 5 Days</span>
							</p>
						</div>
						<div className="cart-promocode">
							<h2>HAVE A COUPON ?</h2>
							<div className="cart-promocode-input">
								<input
									type="text"
									placeholder="COUPON CODE"
									value={coupanCode}
									onChange={(e) => setCoupanCode(e.target.value)}
								/>
								<button onClick={(e) => SubmitCoupan(e)}>APPLY</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default CheckoutPayment
