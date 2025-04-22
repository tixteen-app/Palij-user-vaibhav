
import React, { useEffect, useState } from "react";
import "./CSS/cart.css";
import { assets } from "../assets/assets";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { fetchCart, addToCart, removeFromCart, deleteproductFromCart, incrementCakeQty, decrementCakeQty } from "../utils/productFunction";
import CouponFunctions from "../utils/couponFunctions";
import { makeApi } from "../api/callApi";

const Cart = () => {
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
  const handleRemoveFromCart = async (item) => {
    try {
      setProductLoaders(prev => ({ ...prev, [item._id]: true }));

      if (item.productId?.category?._id === "67b451f7ec3a4e4a3bbe5633") {
        await decrementCakeQty(
          item.productId._id,
          item.size._id,
          item.cakemessage
        );
      } else {
        await removeFromCart(
          item.productId._id,
          (loaderState) => setProductLoaders(prev => ({ ...prev, [item._id]: loaderState })),
          setCartItems,
          fetchCartItems,
          item.size._id
        );
      }
      updateCart();
    } catch (error) {
      console.error("Error removing from cart:", error);
    } finally {
      setProductLoaders(prev => ({ ...prev, [item._id]: false }));
    }
  };
  // Handle adding a product to cart
  // const handleAddToCart = async (productId, selectedSize) => {
  //   await addToCart(productId, setIsLogin, setShowPopup, fetchCartItems, setCartItems, setProductLoaders, selectedSize);
  //   updateCart();
  // };
  const handleAddToCart = async (item) => {
    try {
      setProductLoaders(prev => ({ ...prev, [item._id]: true }));

      if (item.productId?.category?._id === "67b451f7ec3a4e4a3bbe5633") {
        await incrementCakeQty(
          item.productId._id,
          item.size._id,
          item.cakemessage
        );
      } else {
        await addToCart(
          item.productId._id,
          setIsLogin,
          setShowPopup,
          fetchCartItems,
          setCartItems,
          (loaderState) => setProductLoaders(prev => ({ ...prev, [item._id]: loaderState })),
          item.size._id
        );
      }
      updateCart();
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setProductLoaders(prev => ({ ...prev, [item._id]: false }));
    }
  };
  const handleDeleteClick = (item) => {
    setProductToDelete(item);
    setShowConfirmDialog(true);
  };

  const confirmDelete = async () => {
    if (productToDelete) {
      try {
        setProductLoaders(prev => ({
          ...prev,
          [productToDelete._id]: true
        }));
  
        await deleteproductFromCart(
          productToDelete._id,
          setProductLoaders,
          setCartItems,
          fetchCart
        );
  
        // Optimistically update the UI
        setCompleteCart(prev => ({
          ...prev,
          orderItems: prev.orderItems.filter(item => item._id !== productToDelete._id)
        }));
  
        setShowConfirmDialog(false);
        setProductToDelete(null);
        updateCart();
        
        toast.success("Item removed successfully");
      } catch (error) {
        console.error("Error deleting item:", error);
        toast.error("Failed to remove item");
      } finally {
        setProductLoaders(prev => ({
          ...prev,
          [productToDelete._id]: false
        }));
      }
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

  const handleMessageBlur = async (itemId) => {
    const newMessage = editingMessages[itemId];
    const originalMessage = completeCart.orderItems.find(
      item => item._id === itemId
    )?.cakemessage;

    if (newMessage !== undefined && newMessage !== originalMessage) {
      try {
        const response = await makeApi('/api/update-cart-message', 'PUT', {
          itemId,
          message: newMessage
        });

      } catch (error) {
        console.error("Error updating cake message:", error);
        toast.error("Failed to update message");
        setEditingMessages(prev => ({
          ...prev,
          [itemId]: originalMessage
        }));
      }
    }
  };

  return (
    <>
      {/* <div style={{ zIndex : 999999999999999}} > */}
      <ToastContainer />
      {/* </div> */}

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
              <div className="cart_UI_for_dektop_view" >
                <div className="cart-item">
                  <div className="cart-items-title cart-items-title2">
                    <p><span className="productItemName1span">Product</span> Name</p>
                    <p>Price</p>
                    <p className="quantity_heading">Qty</p>
                    <p className="cartItemTotal">Total:</p>
                  </div>
                  <br />
                  <hr />
                  <div></div>
                  {completeCart?.orderItems?.map((item, index) => (
                    <div className="all_added_cart_list" key={index}>
                      <div className="cross" onClick={() => handleDeleteClick(item)}>
                        <img className="remove-cart" src={assets.cart_remove} alt="Remove" />
                      </div>

                      <div className="cart_items_div_cart">
                        <div className="cart-items-title cart-items-item">
                          <div className="productthumbnailname">
                            <img src={item?.productId?.thumbnail} alt="" />
                            <p className="productItemName1">{item.productId?.name}</p>
                          </div>

                          <p className="item-price"><span className="rs_color_cart" >₹</span>{`${item.size.FinalPrice} x ${item?.quantity}`}</p>

                          <div className="cartPageButton">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              onClick={() => handleRemoveFromCart(item)}
                              fill="currentColor"
                              className="bi bi-dash text-black cart_buutons_plus_minus"
                              style={{ cursor: "pointer" }}
                              viewBox="0 0 16 16"
                            >
                              <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
                            </svg>

                            {productLoaders[item._id] ? (
                              <div className="loader_for_cart"></div>
                            ) : (
                              <p className="text-black">{item.quantity}</p>
                            )}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              onClick={() => handleAddToCart(item)}
                              fill="currentColor"
                              className="bi bi-plus text-black cart_buutons_plus_minus "
                              style={{ cursor: "pointer" }}
                              viewBox="0 0 16 16"
                            >
                              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                            </svg>
                          </div>

                          <p className="cartItemTotal"><span className="rs_color_cart" >₹</span>{(item.size.FinalPrice * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>


                      {item?.productId?.category?._id === "67b451f7ec3a4e4a3bbe5633" && (
                        <div className="cart-cake-message px-3">
                          <span className="message-label">Message:</span>
                          <div className="message-input-wrapper">
                            <div className="new_message_popup__edit_container">
                              <input
                                type="text"
                                value={editingMessages[item._id] ?? item.cakemessage ?? ""}
                                onChange={(e) => handleMessageChange(item._id, e.target.value)}
                                placeholder="Add your cake message"
                                maxLength={20}
                                className="message-input-bottom-border"
                              />
                              <button
                                className="new_message_popup__update_btn"
                                onClick={() => handleMessageBlur(item._id)}
                                disabled={!editingMessages[item._id] || editingMessages[item._id] === item.cakemessage}
                              >
                                Update
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                      {/* {item?.productId?.category?._id === "67b451f7ec3a4e4a3bbe5633" && (
                        <div className="cart-cake-message px-3">
                          <span className="message-label">Message:</span>
                          <div className="message-input-wrapper">
                            {editingMessages[item._id] !== undefined ? (
                              <div className="new_message_popup__edit_container">
                                <input
                                  type="text"
                                  value={editingMessages[item._id] || ""}
                                  onChange={(e) => handleMessageChange(item._id, e.target.value)}
                                  placeholder="Add message"
                                  maxLength={20}
                                  className="message-input-bottom-border"
                                />
                                <button
                                  className="new_message_popup__update_btn"
                                  onClick={() => handleMessageBlur(item._id)}
                                >
                                  Update
                                </button>
                              </div>
                            ) : (
                              <div className="new_message_popup__display_container">
                                <span className="new_message_popup__display_text">
                                  {item.cakemessage || "No message added"}
                                </span>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="#EE5564"
                                  className="new_message_popup__edit_icon"
                                  viewBox="0 0 16 16"
                                  onClick={() => setEditingMessages(prev => ({
                                    ...prev,
                                    [item._id]: item.cakemessage || ""
                                  }))}
                                >
                                  <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z" />
                                </svg>
                              </div>
                            )}
                          </div>
                        </div>
                      )} */}
                      {/* {item?.productId?.category?._id == "67b451f7ec3a4e4a3bbe5633" && (
                        <div className="cart-cake-message px-3">
                          <span className="message-label">Message:</span>
                          {item.productId?.category?._id === "67b451f7ec3a4e4a3bbe5633" && (
                            <div className="message-input-wrapper">
                              <input
                                type="text"
                                value={editingMessages[item._id] || item.cakemessage || ""}
                                onChange={(e) => handleMessageChange(item._id, e.target.value)}
                                onBlur={() => handleMessageBlur(item._id)}
                                placeholder="Add message"
                                maxLength={20}
                                className="message-input-bottom-border"
                              />
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="#EE5564"
                                className="edit-icon-inside"
                                viewBox="0 0 16 16"
                              >
                                <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z" />
                              </svg>
                            </div>
                          )}
                        </div>
                      )} */}
                    </div>
                  ))}



                </div>
              </div>

              <div className="cart_UI_for_mobile_view" >
                <div className="cart_items_for_mobile_view" >
                  <div className="cart_items_details_for_mobile_view" >
                    {completeCart?.orderItems?.map((item, index) => (
                      <div className="moble_view_for_cart_border" >
                        <div key={index} className="cart_items_details_inside_for_mobile_view" >
                          <div className="cross_icon_mobile" onClick={() => handleDeleteClick(item.productId._id, item.size._id, item.quantity)}>
                            <img className="remove-cart" src={assets.cart_remove} alt="Remove" />
                          </div>
                          <div className="product_thubnil_for_mobile">
                            <img src={item?.productId?.thumbnail} alt="" />
                          </div>
                          <div className="mobile_price_name_qunlity_div" >
                            <div className="product_name_for_mobile" >
                              <div style={{ fontWeight: "500" }} >
                                {item.productId?.name}
                              </div>
                              <div>
                                <span className="rs_color_cart" >₹</span>{item.size.FinalPrice}
                              </div>
                            </div>
                            <div className="cartPageButton cartPageButton_for_cart_mobile_view">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                onClick={() => handleRemoveFromCart(item)}
                                fill="currentColor"
                                className="bi bi-dash text-black cart_buutons_plus_minus cart_buutons_plus_minus_for_mobile"
                                style={{ cursor: "pointer" }}
                                viewBox="0 0 16 16"
                              >
                                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
                              </svg>

                              {productLoaders[item.productId._id] ? (
                                <div className="loader_for_mobile_cart"></div>
                              ) : (
                                <p className="text-black card_quntity_mobile">{item.quantity}</p>
                              )}

                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                onClick={() => handleAddToCart(item)}
                                fill="currentColor"
                                className="bi bi-plus text-black cart_buutons_plus_minus cart_buutons_plus_minus_for_mobile"
                                style={{ cursor: "pointer" }}
                                viewBox="0 0 16 16"
                              >
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                              </svg>
                            </div>
                          </div>
                          <div className="cart_total_for_mobile">
                            <div></div>
                            <div>
                              <span className="rs_color_cart" >₹</span>{(item.size.FinalPrice * item.quantity).toFixed(2)}
                            </div>
                          </div>

                        </div>
                        <div>
                          {item?.productId?.category?._id == "67b451f7ec3a4e4a3bbe5633" && (
                            <div className="cart-cake-message px-3">
                              <span className="message-label">Message:</span>
                              {item.productId?.category?._id === "67b451f7ec3a4e4a3bbe5633" && (
                                <div className="message-input-wrapper">
                                  <input
                                    type="text"
                                    value={editingMessages[item._id] || item.cakemessage || ""}
                                    onChange={(e) => handleMessageChange(item._id, e.target.value)}
                                    onBlur={() => handleMessageBlur(item._id)}
                                    placeholder="Add message"
                                    maxLength={20}
                                    className="message-input-bottom-border"
                                  />
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="#EE5564"
                                    className="edit-icon-inside"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z" />
                                  </svg>
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                      </div>
                    ))}

                  </div>
                </div>
              </div>


              <div className="cartcalulaction-comp">
                <CouponFunctions updateCart={updateCart} toastContainer={<ToastContainer position="top-right"
                  autoClose={3000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                  style={{
                    position: 'fixed',
                    top: '1rem',
                    right: '1rem',
                    zIndex: 99999999999999
                  }} />} />
              </div>

              {/* Confirmation Dialog for product deletion */}
              {showConfirmDialog && (
                <div className="confirmation-dialog">
                  <div className="dialog-content">
                    <h2>Confirm Deletion</h2>
                    <p>Are you sure you want to remove this item from your cart?</p>
                    <div className="dialog-buttons_both">
                      <button onClick={confirmDelete} className="confirm-button">Confirm</button>
                      <button onClick={cancelDelete} className="cancel-button">Cancel</button>
                    </div>
                  </div>
                </div>
              )}  
            </div>
          )}
        </>
      )} 
    </>
  );
};

export default Cart;