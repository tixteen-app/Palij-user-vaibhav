import React, { useEffect, useState } from "react"
import "./payment.css"
import { assets } from "../../assets/assets"
import Orderbar from "../orderbar/orderbar.jsx"

import CartCalculation from "../CartCalculation/cartCalculation.jsx"
import { Link, useNavigate } from "react-router-dom"
import SucessGIF from "../../assets/Order Placed.gif"
import Primaryloader from "../loaders/primaryloader.jsx"
import { makeApi } from "../../api/callApi"
import { ToastContainer, toast } from "react-toastify"

const Payment = () => {
	const navigation = useNavigate()
	const [shippingAddresses, setShippingAddresses] = useState([])
	const [selectedAddress, setSelectedAddress] = useState(null)
	const [selectPaymentMethod, setSelectPaymentMethod] = useState(null)
	const [loading, setLoading] = useState(false)
	const [cartItem, setCartItem] = useState([])
	const [selectedShippingAddress, setSelectedShippingAddress] = useState(null)
	const [selectedBillingAddress, setSelectedBillingAddress] = useState(null)
	const [currentPage, setCurrentPage] = useState("CHECKOUT")
	const [orderPlaced, setOrderPlaced] = useState(false)

	useEffect(() => {
		const fetchCartItem = async () => {
			const response = await makeApi("/api/my-cart", "GET")
			setCartItem(response.data)
		}
		fetchCartItem()
	}, [])

	const handlepaymentmethodSelect = (payment) => {
		setSelectPaymentMethod(payment)
	}
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

	const handleSubmitt = async (event) => {
		event.preventDefault()
		if (!selectPaymentMethod) {
			toast("Please select payment method")
			return
		}
		const data = {
			shippingAddress: selectedAddress,
			paymentMethod: selectPaymentMethod,
			CartId: cartItem._id,
		}
		try {
			setLoading(true)
			conosle.log("data", data)
			// const response = await makeApi("/api/create-second-order", "POST", data)
			// setOrderPlaced(true)
			// setTimeout(() => {
			// 	setOrderPlaced(false) 
			// 	navigation("/product/all-products")
			// }, 5000)
		} catch (error) {
			console.error("Error fetching shipping addresses: ", error)
		} finally {
			setLoading(false)
		}
	}
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
	useEffect(() => {
		fetchShippingAddresses()
		fetchBillingAddresses()
	}, [])

	return (
		<div className="payment">
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
			{orderPlaced && (
				<div className="success-gif-container">
					<img
						src={SucessGIF}
						alt="Success GIF"
						className="success-gif"
					/>
				</div>
			)}
			{!orderPlaced && (
				<div>
					{currentPage === "CHECKOUT" ? (
						<div>
							<div>
								<Orderbar activeOptionName="CHECKOUT" />
							</div>

							<div className="main_checkout_div">
								{/* Shipping address */}
								<div className="shipping-address-container Order_page_display_none ">
									<div className="shipping-address-title">Shipping Address</div>
									<div className="shipping-address-list">
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
														id={`address-${index}`}
														name="shipping-address"
														value={address._id}
														checked={selectedAddress === address}
														onChange={() => handleAddressSelect(address)}
														className="address-radio"
													/>
													<label
														htmlFor={`address-${index}`}
														className="address-label"
													>
														{`${address.firstname} ${address.lastname}, ${address.address}, ${address.city}, ${address.state}, ${address.country}`}
													</label>
												</div>
											))}
									</div>
								</div>
								{/* payment */}
								<div onClick={(e) => ManageCurrnetPage(e)}>
									<CartCalculation
										tax={cartItem.taxPrice}
										shipping={cartItem.shippingPrice}
										total={cartItem.totalPrice}
										CoupanApplied={cartItem.Iscoupanapplied}
										Final={cartItem.TotalProductPrice}
										ButtonName="PROCEED TO PAYMENT"
									/>
								</div>
							</div>
						</div>
					) : (
						<div>
							<div>
								<Orderbar activeOptionName="PAYMENT" />
							</div>

							<div className="main_checkout_div">
								<div className="shipping-address-container">
									<div className="shipping-address-title">Payment Method</div>
									<div>
										<div
											className="address-item"
											onClick={() =>
												handlepaymentmethodSelect("Cash On Delievery")
											}
										>
											<input
												type="radio"
												id={`Cash On Delievery`}
												name="payment-method"
												value="Cash On Delievery"
												checked={selectPaymentMethod === "Cash On Delievery"}
												onChange={() =>
													handlepaymentmethodSelect("Cash On Delievery")
												}
												className="address-radio"
											/>
											<label
												htmlFor={`Cash On Delivery`}
												className="address-label"
											>
												Cash On Delievery
											</label>
										</div>
										<div
											className="address-item"
											onClick={() => handlepaymentmethodSelect("Razorpay")}
										>
											<input
												type="radio"
												id={`Razorpay`}
												name="payment-method"
												value="Razorpay"
												checked={selectPaymentMethod === "Razorpay"}
												onChange={() => handlepaymentmethodSelect("Razorpay")}
												className="address-radio"
											/>
											<label
												htmlFor={`Razorpay`}
												className="address-label"
											>
												Razorpay
											</label>
										</div>
									</div>
								</div>
								<div>
									<CartCalculation
										tax={cartItem.taxPrice}
										shipping={cartItem.shippingPrice}
										total={cartItem.totalPrice}
										CoupanApplied={cartItem.Iscoupanapplied}
										Final={cartItem.TotalProductPrice}
										ButtonName="PLACE ORDER"
										disabled={!selectPaymentMethod}
									/>
								</div>
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	)
}

export default Payment
