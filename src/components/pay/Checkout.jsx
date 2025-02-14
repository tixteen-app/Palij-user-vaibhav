
// import React, { useState, useEffect } from "react"
// import "./checkout.css"
// import Orderbar from "../orderbar/orderbar.jsx"
// import { makeApi } from "../../api/callApi"
// import { useNavigate } from "react-router-dom"
// import SucessGIF from "../../assets/Order Placed.gif"
// import Primaryloader from "../../components/loaders/primaryloader.jsx"
// import { ToastContainer, toast } from "react-toastify"
// import CartCalculation from "../CartCalculation/cartCalculation.jsx"
// import BackButton from "../products/backButton.jsx"
// import useCoupon from "../../hook/coupanHook.jsx"
// // import { updateCartCount } from "../../utils/couponFunctions.jsx"
// import { submitOrder } from "../../utils/productFunction.js"
// import { assets } from "../../assets/assets.js"

// function Checkout() {
// 	const navigate = useNavigate()
// 	const [shippingAddresses, setShippingAddresses] = useState([])
// 	const [selectedAddress, setSelectedAddress] = useState(null)
// 	const [billingAddresses, setBillingAddresses] = useState([])

// 	const [selectPaymentMethod, setSelectPaymentMethod] = useState(null)
// 	const [loading, setLoading] = useState(false)
// 	const [cartItem, setCartItem] = useState([])
// 	const [selectedShippingAddress, setSelectedShippingAddress] = useState(null)
// 	const [selectedBillingAddress, setSelectedBillingAddress] = useState(null)
// 	const [coupanCode, setCoupanCode] = useState(null)

// 	const [currentPage, setCurrentPage] = useState("CHECKOUT")
// 	const [orderPlaced, setOrderPlaced] = useState(false)
// 	const [isSubmitDisabled, setIsSubmitDisabled] = useState(false)

// 	const {
// 		couponCode,
// 		setCouponCode,
// 		appliedCoupon,
// 		couponDiscount,
// 		applyCoupon,
// 		removeCoupon,
// 	} = useCoupon()

// 	useEffect(() => {
// 		const fetchCartItem = async () => {
// 			const response = await makeApi("/api/my-cart", "GET")
// 			setCartItem(response.data)
// 		}
// 		fetchCartItem()
// 	}, [])

// 	const fetchShippingAddresses = async () => {
// 		try {
// 			setLoading(true)
// 			const response = await makeApi("/api/get-my-shiped-address", "GET")
// 			setShippingAddresses(response.data.shipedaddress)
// 			setLoading(false)
// 		} catch (error) {
// 			console.error("Error fetching shipping addresses: ", error)
// 			setLoading(false)
// 		}
// 	}

// 	const fetchBillingAddresses = async () => {
// 		try {
// 			setLoading(true)
// 			const response = await makeApi("/api/get-my-billing-address", "GET")
// 			setBillingAddresses(response.data.billingaddress)
// 			setLoading(false)
// 		} catch (error) {
// 			console.error("Error fetching billing addresses: ", error)
// 			setLoading(false)
// 		}
// 	}

// 	useEffect(() => {
// 		fetchShippingAddresses()
// 		fetchBillingAddresses()
// 	}, [])

// 	const handleAddressSelect = (address) => {
// 		setSelectedAddress(address)
// 	}

// 	const handleShippingAddressSelect = (address) => {
// 		setSelectedShippingAddress(address)
// 	}

// 	const handleBillingAddressSelect = (address) => {
// 		setSelectedBillingAddress(address)
// 	}

// 	const handlePaymentMethodSelect = (payment) => {
// 		setSelectPaymentMethod(payment)
// 	}




// 	const handleSubmit = async (event) => {
// 		event.preventDefault();

// 		if (!selectPaymentMethod) {
// 			toast("Please select a payment method");
// 			return;
// 		}

// 		if (!selectedShippingAddress) {
// 			toast.error("Please select a shipping address");
// 			return;
// 		}

// 		if (!isPincodeValid(selectedShippingAddress, cartItem?.orderItems)) {
// 			toast.error("The selected shipping address's pincode is not serviceable.");
// 			return;
// 		}

// 		setIsSubmitDisabled(true);
// 		const data = {
// 			shippingAddress: selectedShippingAddress,
// 			billingAddress: selectedBillingAddress,
// 			paymentMethod: selectPaymentMethod,
// 			CartId: cartItem._id,
// 		};

// 		if (selectPaymentMethod === "Razorpay") {
// 			createRazorpayOrder(cartItem.totalPrice);
// 		} else {
// 			await submitOrder(data, setLoading, setOrderPlaced, navigate);
// 		}
// 	};






// 	const isPincodeValid = (selectedAddress, cartItems) => {
// 		// Ensure selectedAddress and cartItems exist
// 		if (!selectedAddress || !cartItems || cartItems.length === 0) return true; // Allow if no address or cart items

// 		const selectedPincode = selectedAddress.pincode?.toString(); // Convert to string for comparison
// 		const availablePincodes = cartItems.flatMap((item) =>
// 			item.productId?.category?.availablePinCodes?.map(String) || [] // Convert all to string
// 		);

// 		// If no pincodes in any cart item, allow proceeding to payment
// 		if (availablePincodes.length === 0) return true;

// 		// Check if selected pincode exists in available pincodes
// 		const isValid = availablePincodes.includes(selectedPincode);
// 		console.log("Selected Pincode:", selectedPincode); // Debugging
// 		console.log("Available Pincodes:", availablePincodes); // Debugging
// 		return isValid;
// 	};



// 	const manageCurrentPage = (e) => {
// 		e.preventDefault();

// 		if (!selectedShippingAddress) {
// 			toast.error("Please select a shipping address");
// 			return;
// 		}

// 		if (!isPincodeValid(selectedShippingAddress, cartItem?.orderItems)) {
// 			toast.error("The selected shipping address's pincode is not serviceable.");
// 			return;
// 		}

// 		setCurrentPage("PAYMENT");
// 	};


// 	// Calculate final price after applying coupon discount
// 	const calculateFinalPrice = () => {
// 		if (appliedCoupon) {
// 			return cartItem.TotalProductPrice * ((100 - couponDiscount) / 100)
// 		}
// 		return cartItem.TotalProductPrice
// 	}




// 	// Razopay
// 	const loadRazorpayScript = (src) => {
// 		return new Promise((resolve) => {
// 			const script = document.createElement("script");
// 			script.src = src;
// 			script.onload = () => {
// 				resolve(true);
// 			};
// 			script.onerror = () => {
// 				resolve(false);
// 			};
// 			document.body.appendChild(script);
// 		});
// 	};
// 	const createRazorpayOrder = async (amount) => {
// 		const data = {
// 			amount: amount, // Razorpay accepts amount in paise, so multiply by 100
// 			currency: "INR",
// 		};
// 		try {
// 			const response = await makeApi('/api/create-razorpay-order', 'POST', data);
// 			console.log("rezpay orders data", response);

// 			handleRazorpayScreen(response.data.amount, response.data.id, response.data.created_at);
// 		} catch (error) {
// 			console.log(error);
// 		} finally {

// 		}
// 	};
// 	const handleRazorpayScreen = async (amount, orderId, order_created_at) => {
// 		const res = await loadRazorpayScript(
// 			"https://checkout.razorpay.com/v1/checkout.js"
// 		);
// 		if (!res) {
// 			alert("Razorpay SDK failed to load");
// 			return;
// 		}

// 		const options = {
// 			key: "rzp_test_DaA1MMEW2IUUYe",
// 			// key: "rzp_test_WANgED2h9l3SKi",

// 			currency: "INR",
// 			amount: amount,
// 			name: "USER ",
// 			description: "Test Transaction",
// 			image: "http://localhost:5173/src/assets/logo.png",
// 			order_id: orderId,
// 			handler: function (response) {

// 				// setResponseId(response.razorpay_order_id);

// 				toast.success("Payment Successful");
// 				const data = {
// 					paymentId: response.razorpay_payment_id,
// 					currency: "INR",
// 					paymentorderCratedAt: order_created_at,
// 					paymentDoneAt: new Date(),
// 					orderfromURL: window.location.href,
// 					DeviceType: /Mobi|Android/i.test(navigator.userAgent) ? "Mobile" : "Desktop",
// 					shippingAddress: selectedShippingAddress,
// 					billingAddress: selectedBillingAddress,
// 					paymentMethod: selectPaymentMethod,
// 					CartId: cartItem._id,
// 				};
// 				submitOrder(data, setLoading, setOrderPlaced, navigate)

// 					;
// 			},
// 			prefill: {
// 				name: "Vaibhav", // Optional user details
// 				email: "fZ5vA@example.com",
// 				contact: "9999999999",
// 			},
// 			theme: {
// 				color: "#EE5564", // Customize Razorpay theme color
// 			},
// 		};

// 		const paymentObject = new window.Razorpay(options);
// 		paymentObject.open();
// 	};





// 	console.log("coupanCode", coupanCode)
// 	const SubmitCoupan = async (e) => {
// 		e.preventDefault()
// 		try {
// 			const applyCoupan = await makeApi("/api/apply-coupon", "POST", {
// 				coupanCode: coupanCode,
// 			})
// 			console.log(applyCoupan.data.message)
// 		} catch (error) {
// 			console.log(error)
// 		}
// 	}

// 	return (
// 		<>
// 			<ToastContainer
// 				position="top-center"
// 				autoClose={3000}
// 				hideProgressBar={false}
// 				newestOnTop={false}
// 				closeOnClick
// 				rtl={false}
// 				pauseOnFocusLoss
// 				draggable
// 				pauseOnHover
// 			/>

// 			{orderPlaced && (
// 				<div className="success-gif-container">
// 					<img
// 						src={SucessGIF}
// 						alt="Success GIF"
// 						className="success-gif"
// 					/>
// 				</div>
// 			)}
// 			{!orderPlaced && (
// 				<div className="a_checkout">
// 					{currentPage === "CHECKOUT" ? (
// 						<div>
// 							<Orderbar activeOptionName="CHECKOUT" />
// 							<div className="checkout_to_cart">
// 								<BackButton pageLocation="/cart" />
// 							</div>
// 							<div className="main_checkout_div">
// 								{/* Shipping and Billing Addresses */}
// 								<div className="shipping-address-container Order_page_display_none">
// 									<div>
// 										<div className="shipping-address-title">
// 											<h2>Shipping Address</h2>
// 											<button onClick={() => navigate("/add-shipping-address")}>
// 												Add New Address
// 											</button>
// 										</div>

// 										<div className="shipping-address-list">
// 											{loading && <Primaryloader />}
// 											{!loading &&
// 												shippingAddresses.map((address, index) => (
// 													<div
// 														key={index}
// 														className="address-item"
// 													>
// 														<input
// 															type="radio"
// 															id={`shipping-address-${index}`}
// 															name="shippingAddress"
// 															value={address._id}
// 															checked={selectedShippingAddress === address}
// 															onChange={() =>
// 																handleShippingAddressSelect(address)
// 															}
// 															className="address-radio"
// 														/>
// 														<label
// 															htmlFor={`shipping-address-${index}`}
// 															className="address-label"
// 														>
// 															{`${address.firstname} ${address.lastname}, ${address.address}, ${address.city}, ${address.state}, ${address.country}, ${address.pincode}`}
// 														</label>
// 													</div>
// 												))}
// 										</div>
// 									</div>

// 								</div>
// 								{/* Proceed to Payment */}
// 								<div className="styles_checkout_coupan">


// 									<div onClick={(e) => manageCurrentPage(e)}>

// 										<CartCalculation
// 											tax={0}
// 											shipping={0}
// 											total={cartItem?.totalPriceWithoutDiscount}
// 											// CoupanApplied={appliedCoupon}
// 											CoupanApplied={appliedCoupon ? couponDiscount : cartItem?.totalPriceWithoutDiscount}

// 											// Final={calculateFinalPrice()}
// 											Final={cartItem?.totalPrice}

// 											ButtonName="PROCEED TO PAYMENT"
// 										/>
// 										{/* <CouponFunctions /> */}
// 									</div>
// 								</div>
// 							</div>
// 						</div>
// 					) : (
// 						<div>
// 							<Orderbar activeOptionName="PAYMENT" />
// 							<div
// 								className="checkout_to_cart"
// 								onClick={() => setCurrentPage("CHECKOUT")}
// 							>
// 								<BackButton />
// 							</div>
// 							<div className="main_checkout_div">
// 								{/* Payment Method */}
// 								<div className="shipping-address-container">
// 									<div className="shipping-address-title">Payment Method</div>
// 									<div className="cod-rzyp">
// 										<div
// 											className="address-item"
// 											onClick={() =>
// 												handlePaymentMethodSelect("Cash On Delivery")
// 											}
// 										>
// 											<input
// 												type="radio"
// 												id="CashOnDelivery"
// 												name="payment-method"
// 												value="Cash On Delivery"
// 												checked={selectPaymentMethod === "Cash On Delivery"}
// 												onChange={() =>
// 													handlePaymentMethodSelect("Cash On Delivery")
// 												}
// 												className="address-radio"
// 											/>
// 											<label
// 												htmlFor="CashOnDelivery"
// 												className="address-label"
// 											>
// 												Cash On Delivery
// 											</label>
// 										</div>
// 										<div
// 											className="address-item"
// 											onClick={() => handlePaymentMethodSelect("Razorpay")}
// 										>
// 											<input
// 												type="radio"
// 												id="Razorpay"
// 												name="payment-method"
// 												value="Razorpay"
// 												checked={selectPaymentMethod === "Razorpay"}
// 												onChange={() => handlePaymentMethodSelect("Razorpay")}
// 												className="address-radio"
// 											/>
// 											<label
// 												htmlFor="Razorpay"
// 												className="address-label"
// 											>
// 												<img src={assets.razorpay_logo} alt="" />

// 											</label>
// 										</div>
// 									</div>
// 								</div>
// 								<div onClick={(e) => handleSubmit(e)}>
// 									<CartCalculation
// 										tax={0}
// 										shipping={0}
// 										total={cartItem?.totalPriceWithoutDiscount}
// 										// CoupanApplied={appliedCoupon}
// 										CoupanApplied={appliedCoupon ? couponDiscount : cartItem?.totalPriceWithoutDiscount}

// 										// Final={calculateFinalPrice()}
// 										Final={cartItem?.totalPrice}

// 										ButtonName="PLACE ORDER"
// 										disabled={isSubmitDisabled}
// 										isCashOnDelivery={selectPaymentMethod === "Cash On Delivery"}
// 									/>
// 								</div>
// 							</div>
// 						</div>
// 					)}
// 				</div>
// 			)}
// 		</>
// 	)
// }

// export default Checkout






import React, { useState, useEffect } from "react"
import "./checkout.css"
import Orderbar from "../orderbar/orderbar.jsx"
import { makeApi } from "../../api/callApi"
import { useNavigate } from "react-router-dom"
import SucessGIF from "../../assets/Order Placed.gif"
import Primaryloader from "../../components/loaders/primaryloader.jsx"
import { ToastContainer, toast } from "react-toastify"
import CartCalculation from "../CartCalculation/cartCalculation.jsx"
import BackButton from "../products/backButton.jsx"
import useCoupon from "../../hook/coupanHook.jsx"
// import { updateCartCount } from "../../utils/couponFunctions.jsx"
import { deleteproductFromCart, fetchCart, submitOrder } from "../../utils/productFunction.js"
import { assets } from "../../assets/assets.js"
import styles from './checkout.module.css'

function Checkout() {
	const navigate = useNavigate()
	const [shippingAddresses, setShippingAddresses] = useState([])
	const [selectedAddress, setSelectedAddress] = useState(null)
	const [billingAddresses, setBillingAddresses] = useState([])

	const [selectPaymentMethod, setSelectPaymentMethod] = useState(null)
	const [loading, setLoading] = useState(false)
	const [cartItem, setCartItem] = useState([])
	const [selectedShippingAddress, setSelectedShippingAddress] = useState(null)
	const [selectedBillingAddress, setSelectedBillingAddress] = useState(null)
	const [coupanCode, setCoupanCode] = useState(null)

	const [currentPage, setCurrentPage] = useState("CHECKOUT")
	const [orderPlaced, setOrderPlaced] = useState(false)
	const [isSubmitDisabled, setIsSubmitDisabled] = useState(false)
	const [showModal, setShowModal] = useState(false); // To control the modal visibility
	const [nonDeliverableProducts, setNonDeliverableProducts] = useState([]); // List of non-deliverable products



	const [cartItems, setCartItems] = useState([]);
	const [productLoaders, setProductLoaders] = useState({});



	const {
		couponCode,
		setCouponCode,
		appliedCoupon,
		couponDiscount,
		applyCoupon,
		removeCoupon,
	} = useCoupon()

	useEffect(() => {
		const fetchCartItem = async () => {
			const response = await makeApi("/api/my-cart", "GET")
			setCartItem(response.data)
		}
		fetchCartItem()
	}, [])

	const fetchCartItems = async () => {
		setFetchCartLoader(true);
		await fetchCart(setCompleteCart, setFetchCartLoader);
		setFetchCartLoader(false);
	};

	useEffect(() => {
		fetchCartItems();
	}, []);

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
			console.error("Error fetching billing addresses: ", error)
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchShippingAddresses()
		fetchBillingAddresses()
	}, [])

	const handleAddressSelect = (address) => {
		setSelectedAddress(address)
	}

	const handleShippingAddressSelect = (address) => {
		setSelectedShippingAddress(address)
	}

	const handleBillingAddressSelect = (address) => {
		setSelectedBillingAddress(address)
	}

	const handlePaymentMethodSelect = (payment) => {
		setSelectPaymentMethod(payment)
	}




	const handleSubmit = async (event) => {
		event.preventDefault();

		if (!selectPaymentMethod) {
			toast("Please select a payment method");
			return;
		}

		if (!selectedShippingAddress) {
			toast.error("Please select a shipping address");
			return;
		}

		if (!isPincodeValid(selectedShippingAddress, cartItem?.orderItems)) {
			toast.error("The selected shipping address's pincode is not serviceable.");
			return;
		}

		setIsSubmitDisabled(true);
		const data = {
			shippingAddress: selectedShippingAddress,
			billingAddress: selectedBillingAddress,
			paymentMethod: selectPaymentMethod,
			CartId: cartItem._id,
		};

		if (selectPaymentMethod === "Razorpay") {
			createRazorpayOrder(cartItem.totalPrice);
		} else {
			await submitOrder(data, setLoading, setOrderPlaced, navigate);
		}
	};





	const getNonDeliverableProducts = (selectedAddress, cartItems) => {
		if (!selectedAddress || !cartItems || cartItems.length === 0) return []; // No restrictions if no address or items

		const selectedPincode = selectedAddress.pincode?.toString();
		const nonDeliverable = cartItems.filter((item) => {
			const availablePincodes = item.productId?.category?.availablePinCodes || [];
			return availablePincodes.length > 0 && !availablePincodes.includes(selectedPincode); // Only check if pincodes exist
		});

		return nonDeliverable;
	};




	const isPincodeValid = (selectedAddress, cartItems) => {
		// Ensure selectedAddress and cartItems exist
		if (!selectedAddress || !cartItems || cartItems.length === 0) return true; // Allow if no address or cart items

		const selectedPincode = selectedAddress.pincode?.toString(); // Convert to string for comparison
		const availablePincodes = cartItems.flatMap((item) =>
			item.productId?.category?.availablePinCodes?.map(String) || [] // Convert all to string
		);

		// If no pincodes in any cart item, allow proceeding to payment
		if (availablePincodes.length === 0) return true;

		// Check if selected pincode exists in available pincodes
		const isValid = availablePincodes.includes(selectedPincode);
		console.log("Selected Pincode:", selectedPincode); // Debugging
		console.log("Available Pincodes:", availablePincodes); // Debugging
		return isValid;
	};


	const manageCurrentPage = (e) => {
		e.preventDefault();

		if (!selectedShippingAddress) {
			toast.error("Please select a shipping address");
			return;
		}

		const nonDeliverables = getNonDeliverableProducts(selectedShippingAddress, cartItem?.orderItems);

		if (nonDeliverables.length > 0) {
			setNonDeliverableProducts(nonDeliverables); // Store products for the popup
			setShowModal(true); // Show the popup
			return;
		}

		// Proceed to payment if no non-deliverable products
		setCurrentPage("PAYMENT");
	};


	const handleDeleteClick = async (productId, selectProductSize, quantity) => {
		console.log(productId, selectProductSize, quantity);
		await deleteproductFromCart(productId, setProductLoaders, setCartItems, fetchCart, selectProductSize, quantity);

		fetchCartItems();

		// Check if cartItems state is empty
		if (cartItems.length === 0) {
			navigate("/cart");
		}

	};


	console.log("cartItem", cartItem);


	// Calculate final price after applying coupon discount
	const calculateFinalPrice = () => {
		if (appliedCoupon) {
			return cartItem.TotalProductPrice * ((100 - couponDiscount) / 100)
		}
		return cartItem.TotalProductPrice
	}




	// Razopay
	const loadRazorpayScript = (src) => {
		return new Promise((resolve) => {
			const script = document.createElement("script");
			script.src = src;
			script.onload = () => {
				resolve(true);
			};
			script.onerror = () => {
				resolve(false);
			};
			document.body.appendChild(script);
		});
	};
	const createRazorpayOrder = async (amount) => {
		const data = {
			amount: amount, // Razorpay accepts amount in paise, so multiply by 100
			currency: "INR",
		};
		try {
			const response = await makeApi('/api/create-razorpay-order', 'POST', data);
			console.log("rezpay orders data", response);

			handleRazorpayScreen(response.data.amount, response.data.id, response.data.created_at);
		} catch (error) {
			console.log(error);
		} finally {

		}
	};
	const handleRazorpayScreen = async (amount, orderId, order_created_at) => {
		const res = await loadRazorpayScript(
			"https://checkout.razorpay.com/v1/checkout.js"
		);
		if (!res) {
			alert("Razorpay SDK failed to load");
			return;
		}

		const options = {
			key: "rzp_test_DaA1MMEW2IUUYe",
			// key: "rzp_test_WANgED2h9l3SKi",

			currency: "INR",
			amount: amount,
			name: "USER ",
			description: "Test Transaction",
			image: "http://localhost:5173/src/assets/logo.png",
			order_id: orderId,
			handler: function (response) {

				// setResponseId(response.razorpay_order_id);

				toast.success("Payment Successful");
				const data = {
					paymentId: response.razorpay_payment_id,
					currency: "INR",
					paymentorderCratedAt: order_created_at,
					paymentDoneAt: new Date(),
					orderfromURL: window.location.href,
					DeviceType: /Mobi|Android/i.test(navigator.userAgent) ? "Mobile" : "Desktop",
					shippingAddress: selectedShippingAddress,
					billingAddress: selectedBillingAddress,
					paymentMethod: selectPaymentMethod,
					CartId: cartItem._id,
				};
				submitOrder(data, setLoading, setOrderPlaced, navigate)

					;
			},
			prefill: {
				name: "Vaibhav", // Optional user details
				email: "fZ5vA@example.com",
				contact: "9999999999",
			},
			theme: {
				color: "#EE5564", // Customize Razorpay theme color
			},
		};

		const paymentObject = new window.Razorpay(options);
		paymentObject.open();
	};





	console.log("coupanCode", coupanCode)
	const SubmitCoupan = async (e) => {
		e.preventDefault()
		try {
			const applyCoupan = await makeApi("/api/apply-coupon", "POST", {
				coupanCode: coupanCode,
			})
			console.log(applyCoupan.data.message)
		} catch (error) {
			console.log(error)
		}
	}

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

			{showModal && (
				<div className={styles.popupOverlay}>
					<div className={styles.popupContent}>
						<h2>Non-Deliverable Products</h2>
						<p>The following products are not deliverable to the selected address:</p>
						<ul className={styles.popupList}>
							{nonDeliverableProducts.map((item, index) => (
								<li key={index} className={styles.popupItem}>
									<div className={styles.popupImageName}>
										<img
											src={item.productId.thumbnail}
											alt={item.productId.name}
											className={styles.popupThumbnail}
										/>
										<div>
											<h4>{item.productId.name}</h4>
											<p>Price: ₹{item.singleProductPrice}</p>
										</div>
									</div>
									<div className={styles.remove}><button onClick={() => handleDeleteClick(item.productId._id, item.size._id, item?.quantity)}>Remove</button></div>
								</li>
							))}
						</ul>
						<button
							className={styles.popupButton}
							onClick={() => {
								setShowModal(false);

							}} // Close the popup
						>
							Close
						</button>
					</div>
				</div>
			)}





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
				<div className="a_checkout">
					{currentPage === "CHECKOUT" ? (
						<div>
							<Orderbar activeOptionName="CHECKOUT" />
							<div className="checkout_to_cart">
								<BackButton pageLocation="/cart" />
							</div>
							<div className="main_checkout_div">
								{/* Shipping and Billing Addresses */}
								<div className="shipping-address-container Order_page_display_none">
									<div>
										<div className="shipping-address-title">
											<h2>Shipping Address</h2>
											<button onClick={() => navigate("/add-shipping-address")}>
												Add New Address
											</button>
										</div>

										<div className="shipping-address-list">
											{loading && <Primaryloader />}
											{!loading &&
												shippingAddresses.map((address, index) => (
													<div
														key={index}
														className="address-item"
													>
														<input
															type="radio"
															id={`shipping-address-${index}`}
															name="shippingAddress"
															value={address._id}
															checked={selectedShippingAddress === address}
															onChange={() =>
																handleShippingAddressSelect(address)
															}
															className="address-radio"
														/>
														<label
															htmlFor={`shipping-address-${index}`}
															className="address-label"
														>
															{`${address.firstname} ${address.lastname}, ${address.address}, ${address.city}, ${address.state}, ${address.country}, ${address.pincode}`}
														</label>
													</div>
												))}
										</div>
									</div>

								</div>
								{/* Proceed to Payment */}
								<div className="styles_checkout_coupan">


									<div onClick={(e) => manageCurrentPage(e)}>

										<CartCalculation
											tax={0}
											shipping={0}
											total={cartItem?.totalPriceWithoutDiscount}
											// CoupanApplied={appliedCoupon}
											CoupanApplied={appliedCoupon ? couponDiscount : cartItem?.totalPriceWithoutDiscount}

											// Final={calculateFinalPrice()}
											Final={cartItem?.totalPrice}

											ButtonName="PROCEED TO PAYMENT"
										/>
										{/* <CouponFunctions /> */}
									</div>
								</div>
							</div>
						</div>
					) : (
						<div>
							<Orderbar activeOptionName="PAYMENT" />
							<div
								className="checkout_to_cart"
								onClick={() => setCurrentPage("CHECKOUT")}
							>
								<BackButton />
							</div>
							<div className="main_checkout_div">
								{/* Payment Method */}
								<div className="shipping-address-container">
									<div className="shipping-address-title">Payment Method</div>
									<div className="cod-rzyp">
										<div
											className="address-item"
											onClick={() =>
												handlePaymentMethodSelect("Cash On Delivery")
											}
										>
											<input
												type="radio"
												id="CashOnDelivery"
												name="payment-method"
												value="Cash On Delivery"
												checked={selectPaymentMethod === "Cash On Delivery"}
												onChange={() =>
													handlePaymentMethodSelect("Cash On Delivery")
												}
												className="address-radio"
											/>
											<label
												htmlFor="CashOnDelivery"
												className="address-label"
											>
												Cash On Delivery
											</label>
										</div>
										<div
											className="address-item"
											onClick={() => handlePaymentMethodSelect("Razorpay")}
										>
											<input
												type="radio"
												id="Razorpay"
												name="payment-method"
												value="Razorpay"
												checked={selectPaymentMethod === "Razorpay"}
												onChange={() => handlePaymentMethodSelect("Razorpay")}
												className="address-radio"
											/>
											<label
												htmlFor="Razorpay"
												className="address-label"
											>
												<img src={assets.razorpay_logo} alt="" />

											</label>
										</div>
									</div>
								</div>
								<div onClick={(e) => handleSubmit(e)}>
									<CartCalculation
										tax={0}
										shipping={0}
										total={cartItem?.totalPriceWithoutDiscount}
										// CoupanApplied={appliedCoupon}
										CoupanApplied={appliedCoupon ? couponDiscount : cartItem?.totalPriceWithoutDiscount}

										// Final={calculateFinalPrice()}
										Final={cartItem?.totalPrice}

										ButtonName="PLACE ORDER"
										disabled={isSubmitDisabled}
										isCashOnDelivery={selectPaymentMethod === "Cash On Delivery"}
									/>
								</div>
							</div>
						</div>
					)}
				</div>
			)}
		</>
	)
}

export default Checkout

