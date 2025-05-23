import { makeApi } from "../api/callApi.tsx"
import Cookies from 'js-cookie';

let cartCountListeners = []


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
		
        // Check if orderItems is available and is an array
        const orderItems = response?.data?.orderItems || [];

        // If orderItems is empty, handle accordingly
        if (orderItems?.length === 0) {
            setCartItems([]); // Set cartItems to empty array if no items exist
            updateCartCount([]); // Update cart count to 0
        } else {
            const cartItems = orderItems.map(item => ({
                productId: item.productId._id,
                quantity: item.quantity,
                size: item.size._id,
            }));
            setCartItems(cartItems);
            updateCartCount(cartItems); // Update cart count with fetched items
        }

        if (setCompleteCart) {
            setCompleteCart(response.data);
        }

    } catch (error) {
        console.log(error);
    } finally {
        setFetchCartLoader(false); // Stop loader once fetching is complete
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
export const addToCart = async (
	productId,
	setIsLogin,
	setShowPopup,
	fetchCart, 
	setCartItems,
	setProductLoaders,
	selectProductSize,
	tempCakeMessage
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
		cakemessage:tempCakeMessage || ""
	  });
  
	  // Ensure fetchCart is correctly called
	  await fetchCart(setCartItems);
	} catch (error) {
	  console.log(error.response.data);
	} finally {
	  setProductLoaders((prevState) => ({
		...prevState,
		[productId]: false,
	  }));
	}
  };
  
export const addToCartCake = async (
	productId,
	setIsLogin,
	setShowPopup,
	fetchCart, 
	setCartItems,
	setProductLoaders,
	selectProductSize,
	tempCakeMessage
  ) => {
	console.log("tttt",tempCakeMessage)

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
	  const endpoint = "/api/add-to-cart-cake";
	  await makeApi(endpoint, method, {
		productId,
		selectProductSize,
		quantity: 1,
		shippingPrice: 0,
		cakemessage:tempCakeMessage || ""
	  });
  
	  // Ensure fetchCart is correctly called
	  await fetchCart(setCartItems);
	} catch (error) {
	  console.log(error.response.data);
	} finally {
	  setProductLoaders((prevState) => ({
		...prevState,
		[productId]: false,
	  }));
	}
  };

  export const removeCakeFromCart = async (
	itemId,
	setProductLoaders,
	setCartItems,
	fetchCart
  ) => {
	const token = localStorage.getItem("token");
	if (!token) {
	  return;
	}
	try {
	  setProductLoaders((prevState) => ({
		...prevState,
		[itemId]: true,
	  }));
  
	  const method = "POST";
	  const endpoint = "/api/remove-from-cart-cake";
	  await makeApi(endpoint, method, { itemId });
	  
	  await fetchCart(setCartItems);
	} catch (error) {
	  console.log(error.response?.data);
	} finally {
	  setProductLoaders((prevState) => ({
		...prevState,
		[itemId]: false,
	  }));
	}
  };
  // Frontend productFunction.js updates
export const incrementCakeQty = async (productId, sizeId, message) => {
	const token = localStorage.getItem("token");
	if (!token) return;
  
	try {
	  const response = await makeApi('/api/increment-cake', 'POST', {
		productId,
		sizeId,
		message
	  });
	  return response.data;
	} catch (error) {
	  console.error("Error incrementing cake quantity:", error);
	  throw error;
	}
  };
  
  export const decrementCakeQty = async (productId, sizeId, message) => {
	const token = localStorage.getItem("token");
	if (!token) return;
  
	try {
	  const response = await makeApi('/api/decrement-cake', 'POST', {
		productId,
		sizeId,
		message
	  });
	  return response.data;
	} catch (error) {
	  console.error("Error decrementing cake quantity:", error);
	  throw error;
	}
  };
  
// export const addToCart = async (
// 	productId,
// 	setIsLogin,
// 	setShowPopup,
// 	fetchCart,
// 	setCartItems,
// 	setProductLoaders,
// 	selectProductSize
// ) => {
// 	const token = localStorage.getItem("token");
// 	if (!token) {
// 		setIsLogin(false);
// 		setShowPopup(true);
// 		return;
// 	}
// 	try {
// 		setProductLoaders((prevState) => ({
// 			...prevState,
// 			[productId]: true,
// 		}));

// 		const method = "POST";
// 		const endpoint = "/api/add-to-cart";
// 		await makeApi(endpoint, method, {
// 			productId,
// 			selectProductSize,
// 			quantity: 1,
// 			shippingPrice: 0,
// 		});

// 		fetchCart(setCartItems);
// 		const updatedCartItems = Cookies.get("cartItems") ? JSON.parse(Cookies.get("cartItems")) : [];
// 		const newCartItem = { productId, quantity: 1, size: selectProductSize };
// 		updatedCartItems.push(newCartItem);
// 		Cookies.set("cartItems", JSON.stringify(updatedCartItems), { expires: 2 });
// 	} catch (error) {
// 		console.log(error.response.data);
// 	} finally {
// 		setProductLoaders((prevState) => ({
// 			...prevState,
// 			[productId]: false,
// 		}));
// 		// RemoveCoupan()

// 	}
// };
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
// export const submitOrder = async (
// 	data,
// 	setLoading,
// 	setOrderPlaced,
// 	navigation,
// 	finaltotal,
// 	deliverycharge
// ) => {
// 	try {
// 		setLoading(true)
// 		// data.priceaftertax = updatedTotal
// 		const response = await makeApi("/api/create-second-order", "POST", data)
// 		setOrderPlaced(true)

// 		// Update cart count to 0
// 		updateCartCount([])

// 		setTimeout(() => {
// 			setOrderPlaced(false)
// 			navigation("/latest-order")
// 		}, 5000)
// 	} catch (error) {
// 		console.error("Error creating order: ", error)
// 	} finally {
// 		setLoading(false)
// 	}
// }

export const submitOrder = async (
	data,
	setLoading,
	setOrderPlaced,
	navigation,
	deliverycharge
  ) => {
	try {
	  setLoading(true);
	  console.log(deliverycharge , typeof(deliverycharge));
	  const updateCartResponse = await makeApi( 
		"/api/update-cart-data",
		"PUT",
		{ deliveryCharges: deliverycharge  , payment : data.paymentMethod }
	  );

		const response = await makeApi("/api/create-second-order", "POST", data);
		setOrderPlaced(true);
    
		// Update cart count to 0
		updateCartCount([]);
  
		setTimeout(() => {
		  setOrderPlaced(false);
		  navigation("/latest-order");
		}, 5000);
	 
	} catch (error) {
	  console.error("Error creating order: ", error);
	} finally {
	  setLoading(false);
	}
  };
  

export const submitOrderforlocal = async (
	data,
	setLoading,
	setOrderPlaced,
	navigation,
	deliverycharge
) => {
	try {
		setLoading(true)
		const updateCartResponse = await makeApi(
			"/api/update-cart-data",
			"PUT",
			{ deliveryCharges: deliverycharge  , payment : data.paymentMethod }

		  );
	  
		const response = await makeApi("/api/create-second-order-for-self-delivery", "POST", data)
		setOrderPlaced(true)
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
// export const deleteproductFromCart = async (
// 	productId,
// 	setProductLoaders,
// 	setCartItems,
// 	fetchCart,
// 	selectProductSize,
// 	quantity
// ) => {
// 	try {
// 		// setProductLoaders((prevState) => ({
// 		// 	...prevState,
// 		// 	[productId]: true,
// 		// }));
// 		const method = "POST";
// 		const endpoint = "/api/delete-product-from-cart";
// 		await makeApi(endpoint, method, { productId, selectProductSize, productQuantity: quantity });

// 		fetchCart(setCartItems);
// 		let updatedCartItems = Cookies.get("cartItems") ? JSON.parse(Cookies.get("cartItems")) : [];
// 		updatedCartItems = updatedCartItems.filter(item => item.productId !== productId);
// 		Cookies.set("cartItems", JSON.stringify(updatedCartItems), { expires: 2 });
// 	} catch (error) {
// 		console.log(error);
// 	} finally {
// 		fetchCart(setCartItems);

// 		// setProductLoaders((prevState) => ({
// 		// 	...prevState,
// 		// 	[productId]: false,
// 		// }));
// 		// RemoveCoupan()
// 	}
// };

// Frontend productFunction.js Update
export const deleteproductFromCart = async (
	itemId,
	setProductLoaders,
	setCartItems,
	fetchCart
  ) => {
	try {
	  setProductLoaders(prev => ({ ...prev, [itemId]: true }));
	  
	  const method = "POST";
	  const endpoint = "/api/delete-product-from-cart";
	  const response = await makeApi(endpoint, method, { itemId });
  
	  // Return the updated cart data
	  return response.data.cart;
	} catch (error) {
	  console.error("Delete error:", error);
	  throw error;
	} finally {
	  setProductLoaders(prev => ({ ...prev, [itemId]: false }));
	}
  };
export const updateCartCount = (cartItems) => {
	const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0)
	cartCountListeners.forEach((listener) => listener(cartCount))
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