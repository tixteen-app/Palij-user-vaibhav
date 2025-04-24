
import React, { useState, useEffect } from "react"
import "./checkout.css"
import Orderbar from "../orderbar/orderbar.jsx"
import { makeApi } from "../../api/callApi"
import { Link, useNavigate } from "react-router-dom"
import SucessGIF from "../../assets/Order Placed.gif"
import Primaryloader from "../../components/loaders/primaryloader.jsx"
import { ToastContainer, toast } from "react-toastify"
import CartCalculation from "../CartCalculation/cartCalculation.jsx"
import BackButton from "../products/backButton.jsx"
import useCoupon from "../../hook/coupanHook.jsx"
import { deleteproductFromCart, fetchCart, submitOrder, submitOrderforlocal } from "../../utils/productFunction.js"
import { assets } from "../../assets/assets.js"
import styles from './checkout.module.css'
import axios from "axios"

function Checkout() {
	const navigate = useNavigate()
	const [shippingAddresses, setShippingAddresses] = useState([])
	const [selectedAddress, setSelectedAddress] = useState(null)
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
	const [availablePincodes, setAvailablePincodes] = useState([]);
	const [fetchCartLoader, setFetchCartLoader] = useState();
	const [completeCart, setCompleteCart] = useState([]);
	const [saveaddloader, setsaveaddresloder] = useState(false)
	const [deletePopup, setDeletePopup] = useState(false);
	const [addressToDelete, setAddressToDelete] = useState(null);
	const [deliverycharge, setDeliveryCharge] = useState(0)
	const [finaltotal, setFinalTotal] = useState(0)
	const [Razopaydiscount, setRazopayDiscount] = useState(0)
	const [coupandis, setCoupandis] = useState(0)
	const {
		couponCode,
		setCouponCode,
		appliedCoupon,
		couponDiscount,
		applyCoupon,
		removeCoupon,
	} = useCoupon()


	const [cartTotalWithGST, setCartTotalWithGST] = useState(0);
	const [totalAmountWithoutGST, setTotalAmountWithoutGST] = useState(0);

	const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
	const [editAddress, setEditAddress] = useState({
		firstname: "",
		lastname: "",
		address: "",
		city: "",
		state: "",
		country: "",
		pincode: "",
	});

	const openDeletePopup = (address) => {
		setAddressToDelete(address);
		setDeletePopup(true);
	};

	const closeDeletePopup = () => {
		setDeletePopup(false);
		setAddressToDelete(null);
	};

	const handleDeleteAddress = async () => {
		try {
			await makeApi(
				`/api/delete-shiped-address/${addressToDelete._id}`,
				"DELETE"
			)
			setDeletePopup(false);
			setAddressToDelete(null);
			// Refresh address list after deletion
		} catch (error) {
			console.error("Error deleting address:", error);
		} finally {
			fetchShippingAddresses()
		}
	};

	const openEditPopup = (address) => {
		setEditAddress(address);
		setIsEditPopupOpen(true);
	};

	const closeEditPopup = () => {
		setIsEditPopupOpen(false);
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		if (name === "pincode" && value.length === 6) {
			fetchCityStateCountry(value);
		}

		setEditAddress((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const fetchCityStateCountry = async (pincode) => {
		try {
			const response = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);

			if (response.data && response.data[0].Status === "Success") {
				const postOfficeData = response.data[0].PostOffice[0];
				const { State, Country, District: city } = postOfficeData; // Fixed "Division" to "District" (correct API field)

				setEditAddress((prevState) => ({
					...prevState,
					city,
					state: State,
					country: Country,
				}));
			} else {
				console.error("Invalid pincode or no data available.");
			}
		} catch (error) {
			console.error("Error fetching city, state, and country:", error);
		}
	};

	const handleSaveAddress = async () => {
		try {
			setsaveaddresloder(true)
			const response = await makeApi(`/api/update-shiped-address/${editAddress._id}`, "PUT", editAddress);
		} catch (error) {
			console.error("Error updating address:", error);
		} finally {
			closeEditPopup();
			fetchShippingAddresses()
			setsaveaddresloder(false)


		}
	};
	// old working 
	// useEffect(() => {
	// 	const fetchCartItem = async () => {
	// 		try {
	// 			const response = await makeApi("/api/my-cart", "GET");
	// 			// Set the cart items after fetching the data
	// 			setCartItem(response.data);

	// 			if (response?.data?.orderItems?.length > 0) {
	// 				let totalGstAmount = 0;
	// 				let totalAmountNoGST = 0

	// 				// Loop through each item and calculate GST, accounting for quantity and custom tax percentage
	// 				response.data.orderItems.forEach(item => {
	// 					let finalPrice = item.size?.FinalPrice || 0;

	// 					let gstPercentage = item.productId?.category?.tax; 

	// 					let actualPrice = finalPrice / (1 + gstPercentage / 100);
	// 					totalAmountNoGST += actualPrice * item.quantity;

	// 					let gstAmount = finalPrice - actualPrice;

	// 					gstAmount *= item.quantity;

	// 					// Add the GST amount to the total GST amount
	// 					totalGstAmount += gstAmount;
	// 				});


	// 				if (response.data.totalPrice < 500) {
	// 					setDeliveryCharge(75)
	// 					setFinalTotal(response.data.totalPrice + 75)
	// 				} else {
	// 					setDeliveryCharge(0)
	// 					setFinalTotal(response.data.totalPrice)
	// 				}

	// 				// Store the total GST amount in state
	// 				setCartTotalWithGST(totalGstAmount);
	// 				setTotalAmountWithoutGST(totalAmountNoGST - response.data.couapnDiscount);
	// 			}
	// 		} catch (error) {
	// 			console.error("Error fetching cart items:", error);
	// 		}
	// 	};

	// 	fetchCartItem();
	// }, []);


	// deep seek
	useEffect(() => {
		const fetchCartItem = async () => {
			try {
				const response = await makeApi("/api/my-cart", "GET");
				setCartItem(response.data);

				if (response?.data?.orderItems?.length > 0) {
					let totalGstAmount = 0;
					let totalAmountNoGST = 0;
					let totalDiscountedBase = 0;

					// Without coupon calculation
					if (!response.data.couapnDiscount) {
						response.data.orderItems.forEach(item => {
							const finalPrice = item.size?.FinalPrice || 0;
							const gstPercentage = item.productId?.category?.tax || 12;
							const basePrice = finalPrice / (1 + gstPercentage / 100);

							totalAmountNoGST += basePrice * item.quantity;
							totalGstAmount += (finalPrice - basePrice) * item.quantity;
						});
					}
					// With coupon calculation
					else {
						const totalDiscount = response.data.couapnDiscount;
						const originalTotal = response.data.totalPriceWithoutDiscount;

						response.data.orderItems.forEach(item => {
							const finalPrice = item.size?.FinalPrice || 0;
							const gstPercentage = item.productId?.category?.tax || 12;

							// Calculate base price after item discount
							const itemBasePrice = (item.size.price * (1 - item.size.discountPercentage / 100)) / (1 + gstPercentage / 100);

							// Calculate coupon discount proportion
							const itemShare = (item.size.price * item.quantity) / originalTotal;
							const itemDiscount = totalDiscount * itemShare;

							// Apply coupon discount to base price PER UNIT
							const discountedBasePerUnit = itemBasePrice - (itemDiscount / (1 + gstPercentage / 100)) / item.quantity;

							totalDiscountedBase += discountedBasePerUnit * item.quantity;
							totalGstAmount += discountedBasePerUnit * (gstPercentage / 100) * item.quantity;
						});

						totalAmountNoGST = totalDiscountedBase;
					}

					// Common calculations for both cases
					const deliveryCharge = response.data.totalPrice < 500 ? 75 : 0;
					const finalTotal = response.data.totalPrice + deliveryCharge;

					setDeliveryCharge(deliveryCharge);
					setFinalTotal(finalTotal);
					setCartTotalWithGST(totalGstAmount);
					setTotalAmountWithoutGST(response.data.couapnDiscount ? totalDiscountedBase : totalAmountNoGST);
				}
			} catch (error) {
				console.error("Error fetching cart items:", error);
			}
		};

		fetchCartItem();
	}, []);

	useEffect(() => {
		const fetchpincode = async () => {
			const response = await makeApi("/api/get-all-available-pincode", "GET")
			setAvailablePincodes(response.data)
		}
		fetchpincode()
	}, [])


	const fetchCartItems = async () => {
		setFetchCartLoader(true);
		await fetchCart(setCartItems, setCompleteCart, setFetchCartLoader);
		setFetchCartLoader(false);
	};

	useEffect(() => {
		fetchCartItems();
		setCoupandis(27)
	}, []);


	const fetchShippingAddresses = async () => {
		try {
			setLoading(true)
			const response = await makeApi("/api/get-my-shiped-address", "GET")
			setShippingAddresses(response.data.shipedaddress)
			setSelectedShippingAddress(response.data.shipedaddress[0])
			setLoading(false)
		} catch (error) {
			console.error("Error fetching shipping addresses: ", error)
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchShippingAddresses()
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
		if (payment === "Razorpay") {
			setRazopayDiscount(25)
		} else {
			setRazopayDiscount(0)
		}
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



		// check payment method 
		const roundValue = (value) => {
			return selectPaymentMethod === "Cash On Delivery" ? Math.round(value) : value;
		}

		const finaldiscount = cartItem?.totalPriceWithoutDiscount - cartItem?.totalPrice
		const roundedDiscount = roundValue(finaldiscount);
		const data = {
			shippingAddress: selectedShippingAddress,
			billingAddress: selectedBillingAddress,
			paymentMethod: selectPaymentMethod,
			taxprice: cartTotalWithGST,
			CartId: cartItem._id,
			taxableamount: totalAmountWithoutGST,
			addedtax : cartTotalWithGST,
			overalldiscount :  selectPaymentMethod === "Cash On Delivery" ? roundedDiscount : finaldiscount
		};
		if (selectPaymentMethod === "Razorpay") {
			if (!availablePincodes.pincode.some(p => p.pincode == data.shippingAddress.pincode)) {
				createRazorpayOrder(cartItem.totalPrice + deliverycharge - Razopaydiscount);
			} else {
				createRazorpayOrderforlocal(cartItem.totalPrice + deliverycharge - Razopaydiscount);
			}
		} else {
			if (!availablePincodes.pincode.some(p => p.pincode == data.shippingAddress.pincode)) {
				await submitOrder(data, setLoading, setOrderPlaced, navigate, deliverycharge);
			} else {
				await submitOrderforlocal(data, setLoading, setOrderPlaced, navigate, deliverycharge);

			}
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


	// const handleDeleteClick = async (productId) => {
	// 	try {
	// 	  // Call API to delete product from the cart using cart item ID
	// 	  await deleteproductFromCart(
	// 		productId,
	// 		setProductLoaders,
	// 		setCartItems,
	// 		fetchCart
	// 	  );
	  
	// 	  // Refresh both cart states
	// 	  await fetchCartItems();
		  
	// 	  // Also fetch the cart item data again to update totals
	// 	  const response = await makeApi("/api/my-cart", "GET");
	// 	  setCartItem(response.data);
		  
	// 	  setShowModal(false);
	// 	} catch (error) {
	// 	  console.error("Error deleting product from cart:", error);
	// 	}
	//   };

	  const handleDeleteClick = async (item) => {
		console.log("item",item)
		try {
		  // Call API to delete product from the cart using cart item ID
		  await deleteproductFromCart(
			item, // This should be the cart item ID
			setProductLoaders,
			setCartItems,
			fetchCart
		  );
	  
		  // Refresh cart and check if empty
		  const updatedCart = await fetchCartItems();

		  const response = await makeApi("/api/my-cart", "GET");
		  	  setCartItem(response.data);
		  
		  // If cart is empty, redirect to cart page
		  if (response.data.orderItems.length === 0) {
			navigate("/cart");
			return;
		  }
	  
		  // Check if there are still non-deliverable products
		  const updatedNonDeliverables = getNonDeliverableProducts(selectedShippingAddress, updatedCart?.orderItems);
		  
		  if (updatedNonDeliverables.length === 0) {
			setShowModal(false);
		  } else {
			setNonDeliverableProducts(updatedNonDeliverables);
		  }
		  
		} catch (error) {
		  console.error("Error deleting product from cart:", error);
		}
	  };

	  const handleRemoveAllClick = async () => {
		try {
		  for (const item of nonDeliverableProducts) {
			await deleteproductFromCart(
			  item._id, // Use cart item ID instead of product ID
			  setProductLoaders,
			  setCartItems,
			  fetchCart
			);
		  }
		  
		  // Refresh both cart states
		  await fetchCartItems();
		  
		  // Also fetch the cart item data again to update totals
		  const response = await makeApi("/api/my-cart", "GET");
		  setCartItem(response.data);

		  if (response.data.orderItems.length === 0) {
			navigate("/cart");
			return;
		  }
		  
		  setShowModal(false);
		} catch (error) {
		  console.error("Error removing products:", error);
		}
	  };


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
			handleRazorpayScreen(response.data.amount, response.data.id, response.data.created_at);
		} catch (error) {
			console.log(error);
		} finally {

		}
	};
	const createRazorpayOrderforlocal = async (amount) => {
		const data = {
			amount: amount, // Razorpay accepts amount in paise, so multiply by 100
			currency: "INR",
		};
		try {
			const response = await makeApi('/api/create-razorpay-order', 'POST', data);
			handleRazorpayScreenforlocal(response.data.amount, response.data.id, response.data.created_at);
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
			// check payment method 
			const roundValue = (value) => {
				return selectPaymentMethod === "Cash On Delivery" ? Math.round(value) : value;
			}
	
			const finaldiscount = cartItem?.totalPriceWithoutDiscount - cartItem?.totalPrice
			const roundedDiscount = roundValue(finaldiscount);

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
					taxableamount: totalAmountWithoutGST,
					addedtax : cartTotalWithGST,
					overalldiscount :  selectPaymentMethod === "Cash On Delivery" ? roundedDiscount : finaldiscount 
				};
				submitOrder(data, setLoading, setOrderPlaced, navigate, deliverycharge)

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
	const handleRazorpayScreenforlocal = async (amount, orderId, order_created_at) => {
		const res = await loadRazorpayScript(
			"https://checkout.razorpay.com/v1/checkout.js"
		);
		if (!res) {
			alert("Razorpay SDK failed to load");
			return;
		}
		const roundValue = (value) => {
			return selectPaymentMethod === "Cash On Delivery" ? Math.round(value) : value;
		}

		const finaldiscount = cartItem?.totalPriceWithoutDiscount - cartItem?.totalPrice
		const roundedDiscount = roundValue(finaldiscount);

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
					taxableamount: totalAmountWithoutGST,
					addedtax : cartTotalWithGST,
					overalldiscount :  selectPaymentMethod === "Cash On Delivery" ? roundedDiscount : finaldiscount
				};
				submitOrderforlocal(data, setLoading, setOrderPlaced, navigate, deliverycharge);
			},
			prefill: {
				name: "Vaibhav",
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

	const SubmitCoupan = async (e) => {
		e.preventDefault()
		try {
			const applyCoupan = await makeApi("/api/apply-coupon", "POST", {
				coupanCode: coupanCode,
			})
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
						<h4> UNAVAILABLE FOR DELIVERY </h4>
						<p>The following item(s) are not deliverable to the selected address:</p>
						<ul className={styles.popupList}>
							{nonDeliverableProducts.map((item, index) => (
								<li key={index} className={styles.popupItem}>
									<div className={styles.popupImageName}>
										<div className={styles.popupImagethumbnail} >
											<img
												src={item.productId.thumbnail}
												alt={item.productId.name}
												className={styles.popupThumbnail}
											/>
										</div>
										<div className={styles.popupproductdetails} >
											<div>{item.productId.name}</div>
											<div>Price: ₹{item.singleProductPrice}</div>
										</div>
									</div>
									<div>

										<div className={styles.remove}><button onClick={() => handleDeleteClick(item._id)}>Remove</button></div>
									</div>
								</li>
							))}
						</ul>
						<div className={styles.popupButtonscart} >
							<div
								className={styles.popupButtonforremovealldiv}

								onClick={handleRemoveAllClick}
							>
								<button
									className={styles.popupButtonforremoveall}

								>
									Remove All
								</button>
							</div>
							<div
								className={styles.popupButtonforremovealldiv}

							>
								<button
									className={styles.closepopupButton}
									onClick={() => {
										setShowModal(false);

									}} // Close the popup
								>
									Close
								</button>
							</div>
						</div>
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
							<div className="main_checkout_div">
								{/* Shipping and Billing Addresses */}
								<div className="shipping-address-container Order_page_display_none">
									<div>
										<div className="shipping-address-title">
											<div className="d-flex align-items-center gap-3" >
												<Link to={"/cart"} >
													<div className="d-flex align-items-center " >
														<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
															<path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
														</svg>
													</div>
												</Link>
												<div>
													<h2>Shipping Address</h2>
												</div>
											</div>
											<button className="add_new_address_button_cart_page" style={{ border: "1px solid black", color: "black", display: "flex", alignItems: "center", gap: "10px", justifyContent: "center" }} onClick={() => navigate("/add-shipping-address")}>
												<div>Add New Address </div> <div style={{ marginTop: "-3px", fontWeight: "bold" }} > <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
													<path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
												</svg></div>
											</button>
										</div>

										<div className="shipping-address-list">
											{loading && <Primaryloader />}
											{!loading &&
												shippingAddresses.map((address, index) => (
													<div
														key={index}
														className="address-item"
														style={{ justifyContent: "space-between" }}
													>
														<div className="cart_Address_input_address" >
															<div>
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
															</div>
															<div>

																<label
																	htmlFor={`shipping-address-${index}`}
																	className="address-label"
																>
																	{`${address.firstname} ${address.lastname}, ${address.address}, ${address.city}, ${address.state}, ${address.country}, ${address.pincode}`}
																</label>
															</div>
														</div>
														<div className="d-flex gap-3" >


															<div>
																<svg onClick={() => openEditPopup(address)}
																	xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
																	<path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
																</svg>
															</div>
															<div>
																<svg onClick={() => openDeletePopup(address)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
																	<path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
																</svg>
															</div>
														</div>
													</div>
												))}
										</div>
									</div>
									{isEditPopupOpen && (
										<div className="cart_page-popup-overlay">
											<div className="cart_page-popup">
												<h2>Edit Address</h2>

												<div className="form-group-edit-adrress">
													<label htmlFor="firstname">First Name</label>
													<input
														type="text"
														id="firstname"
														name="firstname"
														value={editAddress.firstname}
														onChange={handleInputChange}
														placeholder="Enter first name"
													/>
												</div>

												<div className="form-group-edit-adrress">
													<label htmlFor="lastname">Last Name</label>
													<input
														type="text"
														id="lastname"
														name="lastname"
														value={editAddress.lastname}
														onChange={handleInputChange}
														placeholder="Enter last name"
													/>
												</div>
												<div className="form-group-edit-adrress">
													<label htmlFor="lastname">Mobile Number</label>
													<input
														type="number"
														id="phonenumber"
														name="phonenumber"
														value={editAddress.phonenumber}
														onChange={handleInputChange}
														placeholder="Enter mobile number"
													/>
												</div>

												<div className="form-group-edit-adrress">
													<label htmlFor="address">Address</label>
													<input
														type="text"
														id="address"
														name="address"
														value={editAddress.address}
														onChange={handleInputChange}
														placeholder="Enter full address"
													/>
												</div>

												<div className="form-group-edit-adrress">
													<label htmlFor="pincode">Pincode</label>
													<input
														type="text"
														id="pincode"
														name="pincode"
														value={editAddress.pincode}
														onChange={handleInputChange}
														placeholder="Enter pincode"
													/>
												</div>

												<div className="form-group-edit-adrress">
													<label htmlFor="city">City</label>
													<input
														type="text"
														id="city"
														name="city"
														readOnly
														value={editAddress.city}
														onChange={handleInputChange}
														placeholder="City will auto-fill"
													/>
												</div>

												<div className="form-group-edit-adrress">
													<label htmlFor="state">State</label>
													<input
														type="text"
														id="state"
														name="state"
														readOnly
														value={editAddress.state}
														onChange={handleInputChange}
														placeholder="State will auto-fill"
													/>
												</div>

												<div className="form-group-edit-adrress">
													<label htmlFor="country">Country</label>
													<input
														type="text"
														id="country"
														name="country"
														readOnly
														value={editAddress.country}
														onChange={handleInputChange}
														placeholder="Country will auto-fill"
													/>
												</div>

												<div className="cart_page-popup-buttons">
													<button onClick={handleSaveAddress}>
														{saveaddloader ? <div>Saving...</div> : "Save"}
													</button>
													<button onClick={closeEditPopup}>Cancel</button>
												</div>
											</div>
										</div>
									)}

								</div>

								{deletePopup && (

									<div className="confirmation-dialog ">
										<div className="dialog-content">
											<h2>Confirm Deletion</h2>
											<p>Are you sure you want to remove this address ?</p>
											<div className="dialog-buttons_both">
												<button onClick={handleDeleteAddress} className="confirm-button">Confirm</button>
												<button onClick={closeDeletePopup} className="cancel-button">Cancel</button>
											</div>
										</div>
									</div>
								)}

								{/* Proceed to Payment */}
								<div className="styles_checkout_coupan">
									<div
									//  onClick={(e) => manageCurrentPage(e)}
									>
										<CartCalculation
											tax={cartTotalWithGST}
											shipping={deliverycharge}
											total={cartItem?.totalPriceWithoutDiscount}
											CoupanApplied={appliedCoupon ? couponDiscount : cartItem?.totalPriceWithoutDiscount}
											Final={cartItem?.totalPrice}
											// Final={finaltotal}
											// ButtonName="PROCEED TO PAYMENT"
											ButtonName="Proceed to Payment"
											totalwithoutgst={totalAmountWithoutGST}
											pricewithdevverycharge={finaltotal}
											Razopaydiscount={0}
											onButtonClick={(e) => manageCurrentPage(e)}
										/>
									</div>
								</div>
							</div>
						</div>
					) : (
						<div>
							<Orderbar activeOptionName="PAYMENT" />

							<div className="main_checkout_div">
								{/* Payment Method */}
								<div className="shipping-address-container">
									{/* <div className="shipping-address-title">Payment Method</div> */}
									<div className="d-flex align-items-center gap-4 " >
										<div className="d-flex align-items-center mb-2" onClick={() => setCurrentPage("CHECKOUT")} >
											<BackButton />
										</div>
										<div>
											<h2>Payment Method</h2>
										</div>
									</div>
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
												className="address-label case_on_delivery_text"
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
												className="address-label w-100"
											>
												<img src={assets.razorpay_logo} alt="" />

											</label>
											<br />
										</div>
									</div>
								</div>
								<div
								// onClick={(e) => handleSubmit(e)}
								>
									<CartCalculation
										tax={cartTotalWithGST}
										shipping={deliverycharge}
										total={cartItem?.totalPriceWithoutDiscount}
										CoupanApplied={appliedCoupon ? couponDiscount : cartItem?.totalPriceWithoutDiscount}
										Final={cartItem?.totalPrice}
										// Final={finaltotal}
										// ButtonName="PLACE ORDER"
										ButtonName="Place order"
										disabled={isSubmitDisabled}
										isCashOnDelivery={selectPaymentMethod === "Cash On Delivery"}
										totalwithoutgst={totalAmountWithoutGST}
										pricewithdevverycharge={finaltotal}
										Razopaydiscount={Razopaydiscount}
										onButtonClick={(e) => handleSubmit(e)}
										coupandis={27}
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




