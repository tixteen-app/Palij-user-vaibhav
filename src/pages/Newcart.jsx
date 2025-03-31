
import React, { useEffect, useState } from "react";
import "./CSS/newcart.css";
import { assets } from "../assets/assets";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { fetchCart, addToCart, removeFromCart, deleteproductFromCart } from "../utils/productFunction";
import CouponFunctions from "../utils/couponFunctions";
import { makeApi } from "../api/callApi";

const Newcart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [fetchCartLoader, setFetchCartLoader] = useState(true); // Initialize as true
  const [productLoaders, setProductLoaders] = useState({});
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [completeCart, setCompleteCart] = useState({ orderItems: [] });
  const [isLogin, setIsLogin] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [cartUpdated, setCartUpdated] = useState(false);
  const [editingMessages, setEditingMessages] = useState({});
  const [hasFetched, setHasFetched] = useState(false); // New state to track initial fetch

  // Fetch Cart Items
  const fetchCartItems = async () => {
    try {
      setFetchCartLoader(true);
      await fetchCart(setCartItems, setCompleteCart, setFetchCartLoader);
      setHasFetched(true); // Mark that we've completed the initial fetch
    } catch (error) {
      console.error("Error fetching cart:", error);
      setHasFetched(true); // Even if error, we've completed the attempt
    } finally {
      setFetchCartLoader(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [cartUpdated]);

  const updateCart = () => {
    setCartUpdated((prev) => !prev);
  };

  // Handle removing a product from cart
  // const handleRemoveFromCart = async (productId, selectedSize) => {
  //   await removeFromCart(productId, setProductLoaders, setCartItems, fetchCartItems, selectedSize);
  //   updateCart();
  // };
  const handleRemoveFromCart = async (productId, selectedSize) => {
    try {
      setProductLoaders(prev => ({ ...prev, [productId]: true }));

      // Optimistic update
      setCompleteCart(prev => {
        const updatedItems = prev.orderItems.map(item => {
          if (item.productId._id === productId && item.size._id === selectedSize) {
            return {
              ...item,
              quantity: Math.max(1, item.quantity - 1)
            };
          }
          return item;
        });
        return { ...prev, orderItems: updatedItems };
      });

      await removeFromCart(productId, setProductLoaders, setCartItems, fetchCartItems, selectedSize);

      updateCart();
    } catch (error) {
      console.error("Error removing from cart:", error);
      fetchCartItems(); // Revert on error
    } finally {
      setProductLoaders(prev => ({ ...prev, [productId]: false }));
    }
  };

  // Handle adding a product to cart
  // const handleAddToCart = async (productId, selectedSize) => {
  //   await addToCart(productId, setIsLogin, setShowPopup, fetchCartItems, setCartItems, setProductLoaders, selectedSize);
  //   updateCart();
  // };
  const handleAddToCart = async (productId, selectedSize) => {
    try {
      setProductLoaders(prev => ({ ...prev, [productId]: true }));

      // Optimistic update
      setCompleteCart(prev => {
        const updatedItems = prev.orderItems.map(item => {
          if (item.productId._id === productId && item.size._id === selectedSize) {
            return {
              ...item,
              quantity: item.quantity + 1
            };
          }
          return item;
        });
        return { ...prev, orderItems: updatedItems };
      });

      await addToCart(productId, setIsLogin, setShowPopup, fetchCartItems, setCartItems, setProductLoaders, selectedSize);
      updateCart();
    } catch (error) {
      console.error("Error adding to cart:", error);
      fetchCartItems(); // Revert on error
    } finally {
      setProductLoaders(prev => ({ ...prev, [productId]: false }));
    }
  };
  const handleDeleteClick = (productId, selectProductSize, quantity) => {
    setProductToDelete({ productId, selectProductSize, quantity });
    setShowConfirmDialog(true);
  };

  const confirmDelete = async () => {
    if (productToDelete) {
      const { productId, selectProductSize, quantity } = productToDelete;
      // await deleteproductFromCart(productId, setProductLoaders, setCartItems, fetchCart, selectProductSize, quantity);
      await deleteproductFromCart(productId, setProductLoaders, setCartItems, fetchCart, selectProductSize, quantity);
      setProductToDelete(null);
      setShowConfirmDialog(false);
      fetchCartItems();
      updateCart();
    }
  };

  const cancelDelete = () => {
    setProductToDelete(null);
    setShowConfirmDialog(false);
  };

  const handleMessageChange = (itemId, value) => {
    setEditingMessages(prev => ({
      ...prev,
      [itemId]: value
    }));
  };

  const handleMessageBlur = async (productId, sizeId, itemId) => {
    const newMessage = editingMessages[itemId];
    if (newMessage !== undefined && newMessage !== completeCart.orderItems.find(item => item._id === itemId)?.cakemessage) {
      try {
        await makeApi('/api/update-cart-message', 'PUT', {
          productId,
          sizeId,
          message: newMessage
        });

        setCompleteCart(prev => ({
          ...prev,
          orderItems: prev.orderItems.map(item =>
            item._id === itemId
              ? { ...item, cakemessage: newMessage }
              : item
          )
        }));

        setEditingMessages(prev => {
          const newState = { ...prev };
          delete newState[itemId];
          return newState;
        });
      } catch (error) {
        console.error("Error updating cake message:", error);
        toast.error("Failed to update message");
      }
    }
  };

  return (
    <>
      <ToastContainer />

      {fetchCartLoader && !hasFetched ? (
        <div className="loader_container_cart_page">
          <div className="loader_for_cart"></div>
        </div>
      ) : (
        <>
          {/* Only show empty cart message after loading is complete and cart is truly empty */}
          {hasFetched && (completeCart?.orderItems?.length === 0 || completeCart?.orderItems === undefined) ? (
            <div className="empty_cart_div">
              <img src={assets.cart_gif} alt="Empty Cart" className="NO_cart_image" />
              <Link to="/product/all-products">
                <p>Your Cart is Empty</p>
                <h2>Start Shopping</h2>
              </Link>
            </div>
          ) : (
            <div className="cart-container">

              <div className="" >
                <div className="cart_items_for_mobile_view" >
                  <div className="cart_items_top_bar_for_mobile_view"  >
                    <div>.</div>
                    <div>.</div>
                    <div>Product Name:</div>
                    <div>Price:</div>
                    <div>Qty:</div>
                    <div>Total:</div>

                  </div>
                  <div className="cart_items_details_for_mobile_view" >
                    {completeCart?.orderItems?.map((item, index) => (
                      <div key={index} className="cart_items_details_inside_for_mobile_view" >
                        <sapn className="asaasas" ></sapn>
                        <div className="cross_icon_mobile" onClick={() => handleDeleteClick(item.productId._id, item.size._id, item.quantity)}>
                          <img className="remove-cart" src={assets.cart_remove} alt="Remove" />
                        </div>
                        <div className="product_thubnil_for_mobile">
                          <img src={item?.productId?.thumbnail} alt="" />
                        </div>
                        
                        <div className="product_name_for_mobile" >
                          {item.productId?.name}
                        </div>
                        <div className="item_price_for_mobile">{`₹${item.size.FinalPrice} `}</div>
                        <div className="cartPageButton">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            onClick={() => handleRemoveFromCart(item.productId._id, item.size._id)}
                            fill="currentColor"
                            className="bi bi-dash text-black cart_buutons_plus_minus"
                            style={{ cursor: "pointer" }}
                            viewBox="0 0 16 16"
                          >
                            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
                          </svg>

                          {productLoaders[item.productId._id] ? (
                            <div className="loader_for_cart"></div>
                          ) : (
                            <p className="text-black">{item.quantity}</p>
                          )}

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            onClick={() => handleAddToCart(item.productId._id, item.size._id)}
                            fill="currentColor"
                            className="bi bi-plus text-black cart_buutons_plus_minus "
                            style={{ cursor: "pointer" }}
                            viewBox="0 0 16 16"
                          >
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                          </svg>
                        </div>
                        <div className="cart_total_for_mobile">₹{(item.size.FinalPrice * item.quantity).toFixed(2)}</div>

                      </div>
                    ))}

                  </div>
                </div>
              </div>
         
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Newcart;