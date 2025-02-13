import { makeApi } from "../api/callApi.tsx"
import Cookies from 'js-cookie';

let cartCountListeners = []

// export const fetchCart = async (setCartItems) => {
// 	try {
// 		const response = await makeApi("/api/my-cart", "GET")
// 		const cartItems = response.data.orderItems.map((item) => ({
// 			productId: item.productId._id,
// 			quantity: item.quantity,
// 		}))
// 		setCartItems(cartItems)
// 		updateCartCount(cartItems)
// 	} catch (error) {
// 		console.log(error)
// 	}
// }


export const ApplyCoupan = async (couponCode) => {
	try {
		const response = await makeApi("/api/apply-coupon", "POST", {
			coupon: couponCode,
		});
		fetchCart();
	} catch (error) {
		console.log(error);
	}
};
export const RemoveCoupan = async (couponCode) => {
	try {
		await makeApi("/api/remove-coupon", "POST");

		fetchCart();
	} catch (error) {
		console.log(error);
	}
};

export const fetchCart = async (setCartItems, setCompleteCart, setFetchCartLoader) => {
	try {
		setFetchCartLoader(true);
		const response = await makeApi("/api/my-cart", "GET");
		const cartItems = response.data.orderItems.map(item => ({
			productId: item.productId._id,
			quantity: item.quantity,
			size: item.size._id,
		}));
		console.log("000", cartItems);
		setCartItems(cartItems);
		if (setCompleteCart) {
			setCompleteCart(response.data);
		}
		updateCartCount(cartItems);
	} catch (error) {
		console.log(error);
	} finally {
		// fetchCart(setCartItems);
		setFetchCartLoader(false);
	}
};

export const fetchWishlist = async (setWishlistItems) => {
	try {
		const response = await makeApi("/api/get-my-wishlist", "GET")
		const wishlistIds = response.data.wishlist
			.filter((item) => item.products !== null)
			.map((item) => item.products._id)
		setWishlistItems(wishlistIds)
	} catch (error) {
		console.log(error)
	}
}

// export const addToCart = async (
// 	productId,
// 	setIsLogin,
// 	setShowPopup,
// 	fetchCart,
// 	setCartItems,
// 	setProductLoaders
// ) => {
// 	const token = localStorage.getItem("token")
// 	if (!token) {
// 		setIsLogin(false)
// 		setShowPopup(true)
// 		return
// 	}
// 	console.log("Added to cart")
// 	try {
// 		setProductLoaders((prevState) => ({
// 			...prevState,
// 			[productId]: true,
// 		}))

// 		const method = "POST"
// 		const endpoint = "/api/add-to-cart"
// 		await makeApi(endpoint, method, {
// 			productId,
// 			quantity: 1,
// 			shippingPrice: 0,
// 		})

// 		fetchCart(setCartItems)
// 	} catch (error) {
// 		console.log(error.response.data)
// 	} finally {
// 		setProductLoaders((prevState) => ({
// 			...prevState,
// 			[productId]: false,
// 		}))
// 	}
// }
export const addToCart = async (
	productId,
	setIsLogin,
	setShowPopup,
	fetchCart,
	setCartItems,
	setProductLoaders,
	selectProductSize
) => {
	const token = localStorage.getItem("token");
	if (!token) {
		setIsLogin(false);
		setShowPopup(true);
		return;
	}
	try {
		setProductLoaders((prevState) => ({
			...prevState,
			[productId]: true,
		}));

		const method = "POST";
		const endpoint = "/api/add-to-cart";
		await makeApi(endpoint, method, {
			productId,
			selectProductSize,
			quantity: 1,
			shippingPrice: 0,
		});

		fetchCart(setCartItems);
		const updatedCartItems = Cookies.get("cartItems") ? JSON.parse(Cookies.get("cartItems")) : [];
		const newCartItem = { productId, quantity: 1, size: selectProductSize };
		updatedCartItems.push(newCartItem);
		Cookies.set("cartItems", JSON.stringify(updatedCartItems), { expires: 2 });
	} catch (error) {
		console.log(error.response.data);
	} finally {
		setProductLoaders((prevState) => ({
			...prevState,
			[productId]: false,
		}));
		// RemoveCoupan()

	}
};


// export const removeFromCart = async (
// 	productId,
// 	setProductLoaders,
// 	setCartItems,
// 	fetchCart,
// 	selectProductSize
//   ) => {
// 	try {
// 	  setProductLoaders((prevState) => ({
// 		...prevState,
// 		[productId]: true, 
// 	  }));
// 	  const method = "POST";
// 	  const endpoint = "/api/remove-from-cart";
// 	  await makeApi(endpoint, method, { productId , selectProductSize });

// 	  // fetchCart(setCartItems);
// 	  let updatedCartItems = Cookies.get("cartItems") ? JSON.parse(Cookies.get("cartItems")) : [];
// 	  updatedCartItems = updatedCartItems.filter(item => item.productId !== productId);
// 	  Cookies.set("cartItems", JSON.stringify(updatedCartItems), { expires: 2 });
// 	} catch (error) {
// 	  console.log(error);
// 	} finally {
// 	  setProductLoaders((prevState) => ({
// 		...prevState,
// 		[productId]: false,
// 	  }));
// 	}
//   };
export const removeFromCart = async (
	productId,
	setProductLoaders,
	setCartItems,
	fetchCart,
	selectProductSize
) => {
	try {
		setProductLoaders((prevState) => ({
			...prevState,
			[productId]: true,
		}));

		const method = "POST";
		const endpoint = "/api/remove-from-cart";
		await makeApi(endpoint, method, { productId, selectProductSize });

		// Immediately update the cartItems state after removing the item
		setCartItems((prevItems) => {
			const existingItem = prevItems.find(item => item.productId === productId && item.size === selectProductSize);
			if (existingItem && existingItem.quantity > 1) {
				return prevItems.map(item =>
					item.productId === productId && item.size === selectProductSize
						? { ...item, quantity: item.quantity - 1 }
						: item
				);
			} else {
				return prevItems.filter(item => !(item.productId === productId && item.size === selectProductSize));
			}
		});

	} catch (error) {
		console.log(error);
	} finally {
		setProductLoaders((prevState) => ({
			...prevState,
			[productId]: false,
		}));
		fetchCart(setCartItems);
		// RemoveCoupan()

	}
};
export const submitOrder = async (
	data,
	setLoading,
	setOrderPlaced,
	navigation
) => {
	try {
		setLoading(true)
		const response = await makeApi("/api/create-second-order", "POST", data)
		setOrderPlaced(true)

		// Update cart count to 0
		updateCartCount([])

		setTimeout(() => {
			setOrderPlaced(false)
			navigation("/latest-order")
		}, 5000)
	} catch (error) {
		console.error("Error creating order: ", error)
	} finally {
		setLoading(false)
	}
}

export const cartItemFetchCart = async (
	setCartItems,
	setCartProductList,
	setAllProductLoader,
	setIsCartEmpty
) => {
	try {
		setAllProductLoader(true)
		const response = await makeApi("/api/my-cart", "GET")
		const cartItems = response.data.orderItems
		setCartItems(response.data)
		setCartProductList(cartItems) // Set the cart product list here
		if (cartItems.length === 0) {
			setIsCartEmpty(true)
		}
		updateCartCount(cartItems)
	} catch (error) {
		console.log(error)
		if (error.response.data.message === "Cart not found") {
			setIsCartEmpty(true)
		}
	} finally {
		setAllProductLoader(false)
	}
}

export const cartItemAddToCart = async (
	productId,
	setProductLoaders,
	fetchCart
) => {
	try {
		setProductLoaders((prevState) => ({
			...prevState,
			[productId]: true,
		}))
		const method = "POST"
		const endpoint = "/api/add-to-cart"
		await makeApi(endpoint, method, {
			productId,
			quantity: 1,
			shippingPrice: 0,
		})
		fetchCart()
	} catch (error) {
		console.log(error)
	} finally {
		setProductLoaders((prevState) => ({
			...prevState,
			[productId]: false,
		}))
	}
}

export const cartItemRemoveFromCart = async (
	productId,
	setProductLoaders,
	fetchCart
) => {
	try {
		setProductLoaders((prevState) => ({
			...prevState,
			[productId]: true,
		}))
		const method = "POST"
		const endpoint = "/api/remove-from-cart"
		await makeApi(endpoint, method, { productId })
		fetchCart()
	} catch (error) {
		console.log(error)
	} finally {
		setProductLoaders((prevState) => ({
			...prevState,
			[productId]: false,
		}))
	}
}

// export const deleteCartItemRemoveFromCart = async (
// 	productId,
// 	setProductLoaders,
// 	fetchCart,
// 	quantity
// ) => {
// 	try {
// 		let removeQuantity = quantity ? quantity : 1
// 		setProductLoaders((prevState) => ({
// 			...prevState,
// 			[productId]: true,
// 		}))
// 		const method = "POST"
// 		const endpoint = `/api/remove-from-cart?quantity=${removeQuantity}`

// 		await makeApi(endpoint, method, { productId })
// 		fetchCart()
// 	} catch (error) {
// 		console.log(error)
// 	} finally {
// 		setProductLoaders((prevState) => ({
// 			...prevState,
// 			[productId]: false,
// 		}))
// 	}
// }
export const deleteproductFromCart = async (
	productId,
	setProductLoaders,
	setCartItems,
	fetchCart,
	selectProductSize,
	quantity
) => {
	try {
		setProductLoaders((prevState) => ({
			...prevState,
			[productId]: true,
		}));
		const method = "POST";
		const endpoint = "/api/delete-product-from-cart";
		await makeApi(endpoint, method, { productId, selectProductSize, productQuantity: quantity });

		fetchCart(setCartItems);
		let updatedCartItems = Cookies.get("cartItems") ? JSON.parse(Cookies.get("cartItems")) : [];
		updatedCartItems = updatedCartItems.filter(item => item.productId !== productId);
		Cookies.set("cartItems", JSON.stringify(updatedCartItems), { expires: 2 });
	} catch (error) {
		console.log(error);
	} finally {
		fetchCart(setCartItems);

		setProductLoaders((prevState) => ({
			...prevState,
			[productId]: false,
		}));
		// RemoveCoupan()
	}
};


export const updateCartCount = (cartItems) => {
	const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0)
	cartCountListeners.forEach((listener) => listener(cartCount))
	console.log("cart count")
}

export const subscribeToCartCount = (listener) => {
	cartCountListeners.push(listener)
}

export const unsubscribeFromCartCount = (listener) => {
	cartCountListeners = cartCountListeners.filter((l) => l !== listener)
}

export const removeAllProductsFromCart = async (
	productId,
	setProductLoaders,
	fetchCart
) => {
	try {
		setProductLoaders((prevState) => ({
			...prevState,
			[productId]: true,
		}))
		const method = "DELETE"
		const endpoint = `/api/cart/remove-all/${productId}`
		await makeApi(endpoint, method)
		fetchCart()
	} catch (error) {
		console.log("Error removing all products from cart: ", error)
	} finally {
		setProductLoaders((prevState) => ({
			...prevState,
			[productId]: false,
		}))
	}
}