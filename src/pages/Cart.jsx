// import React, { useEffect, useState } from "react";
// import "./CSS/cart.css";
// import { assets } from "../assets/assets";
// import { ToastContainer, toast } from "react-toastify";
// import { Link } from "react-router-dom";
// import { fetchCart, addToCart, removeFromCart, deleteproductFromCart } from "../utils/productFunction";
// import CouponFunctions from "../utils/couponFunctions";
// import { makeApi } from "../api/callApi";

// const Cart = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [fetchCartLoader, setFetchCartLoader] = useState(true); // Initialize as true
//   const [productLoaders, setProductLoaders] = useState({});
//   const [showConfirmDialog, setShowConfirmDialog] = useState(false);
//   const [productToDelete, setProductToDelete] = useState(null);
//   const [completeCart, setCompleteCart] = useState({ orderItems: [] });
//   const [isLogin, setIsLogin] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);
//   const [cartUpdated, setCartUpdated] = useState(false);
//   const [editingMessages, setEditingMessages] = useState({});
//   const [hasFetched, setHasFetched] = useState(false); // New state to track initial fetch

//   // Fetch Cart Items
//   const fetchCartItems = async () => {
//     try {
//       setFetchCartLoader(true);
//       await fetchCart(setCartItems, setCompleteCart, setFetchCartLoader);
//       setHasFetched(true); // Mark that we've completed the initial fetch
//     } catch (error) {
//       console.error("Error fetching cart:", error);
//       setHasFetched(true); // Even if error, we've completed the attempt
//     } finally {
//       setFetchCartLoader(false);
//     }
//   };

//   useEffect(() => {
//     fetchCartItems();
//   }, [cartUpdated]);

//   const updateCart = () => {
//     setCartUpdated((prev) => !prev);
//   };

//   // Handle removing a product from cart
//   const handleRemoveFromCart = async (productId, selectedSize) => {
    
//     await removeFromCart(productId, setProductLoaders, setCartItems, fetchCartItems, selectedSize);
//     updateCart();
//   };

//   // Handle adding a product to cart
//   const handleAddToCart = async (productId, selectedSize) => {
//     await addToCart(productId, setIsLogin, setShowPopup, fetchCartItems, setCartItems, setProductLoaders, selectedSize);
//     updateCart();
//   };

//   const handleDeleteClick = (productId, selectProductSize, quantity) => {
//     setProductToDelete({ productId, selectProductSize, quantity });
//     setShowConfirmDialog(true);
//   };

//   const confirmDelete = async () => {
//     if (productToDelete) {
//       const { productId, selectProductSize, quantity } = productToDelete;
//       // await deleteproductFromCart(productId, setProductLoaders, setCartItems, fetchCart, selectProductSize, quantity);
//       await deleteproductFromCart(productId, setProductLoaders, setCartItems, fetchCart, selectProductSize, quantity);
//       setProductToDelete(null);
//       setShowConfirmDialog(false);
//       fetchCartItems();
//       updateCart();
//     }
//   };

//   const cancelDelete = () => {
//     setProductToDelete(null);
//     setShowConfirmDialog(false);
//   };

//   const handleMessageChange = (itemId, value) => {
//     setEditingMessages(prev => ({
//       ...prev,
//       [itemId]: value
//     }));
//   };

//   const handleMessageBlur = async (productId, sizeId, itemId) => {
//     const newMessage = editingMessages[itemId];
//     if (newMessage !== undefined && newMessage !== completeCart.orderItems.find(item => item._id === itemId)?.cakemessage) {
//       try {
//         await makeApi('/api/update-cart-message', 'PUT', {
//           productId,
//           sizeId,
//           message: newMessage
//         });

//         setCompleteCart(prev => ({
//           ...prev,
//           orderItems: prev.orderItems.map(item =>
//             item._id === itemId
//               ? { ...item, cakemessage: newMessage }
//               : item
//           )
//         }));

//         setEditingMessages(prev => {
//           const newState = { ...prev };
//           delete newState[itemId];
//           return newState;
//         });
//       } catch (error) {
//         console.error("Error updating cake message:", error);
//         toast.error("Failed to update message");
//       }
//     }
//   };

//   return (
//     <>
//       <ToastContainer />
      
//       {/* Show loader while loading and we haven't completed initial fetch */}
//       {fetchCartLoader && !hasFetched ? (
//         <div className="loader_container_cart_page">
//           {/* Use your preferred loader here - could be a spinner, skeleton, etc. */}
//           {/* <SkeletonLoader items={3} /> Adjust based on your loader component */}
//            <div className="loader_for_cart"></div>
//         </div>
//       ) : (
//         <>
//           {/* Only show empty cart message after loading is complete and cart is truly empty */}
//           {hasFetched && (completeCart?.orderItems?.length === 0 || completeCart?.orderItems === undefined) ? (
//             <div className="empty_cart_div">
//               <img src={assets.cart_gif} alt="Empty Cart" className="NO_cart_image" />
//               <Link to="/product/all-products">
//                 <p>Your Cart is Empty</p>
//                 <h2>Start Shopping</h2>
//               </Link>
//             </div>
//           ) : (
//             <div className="cart-container">
//               <div className="cart-item">
//                 <div className="cart-items-title cart-items-title2">
//                   <p><span className="productItemName1span">Product</span> Name</p>
//                   <p>Price</p>
//                   <p className="quantity_heading">Qty</p>
//                   <p className="cartItemTotal">Total:</p>
//                 </div>
//                 <br />
//                 <hr />
//                 {completeCart?.orderItems?.map((item, index) => (
//                   <div className="all_added_cart_list" key={index}>
//                     <div className="cross" onClick={() => handleDeleteClick(item.productId._id, item.size._id, item.quantity)}>
//                       <img className="remove-cart" src={assets.cart_remove} alt="Remove" />
//                     </div>

//                     <div className="cart_items_div_cart">
//                       <div className="cart-items-title cart-items-item">
//                         <div className="productthumbnailname">
//                           <img src={item?.productId?.thumbnail} alt="" />
//                           <p className="productItemName1">{item.productId?.name}</p>
//                         </div>

//                         <p className="item-price">{`₹${item.size.FinalPrice} x ${item.quantity}`}</p>

//                         <div className="cartPageButton">
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             onClick={() => handleRemoveFromCart(item.productId._id, item.size._id)}
//                             // width="30"
//                             // height="30"

//                             fill="currentColor"
//                             className="bi bi-dash text-black cart_buutons_plus_minus"
//                             style={{ cursor: "pointer" }}
//                             viewBox="0 0 16 16"
//                           >
//                             <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
//                           </svg>

//                           {productLoaders[item.productId._id] ? (
//                             <div className="loader_for_cart"></div>
//                           ) : (
//                             <p className="text-black">{item.quantity}</p>
//                           )}

//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             onClick={() => handleAddToCart(item.productId._id, item.size._id)}
//                             // width="30"
//                             // height="30"
//                             fill="currentColor"
//                             className="bi bi-plus text-black cart_buutons_plus_minus "
//                             style={{ cursor: "pointer" }}
//                             viewBox="0 0 16 16"
//                           >
//                             <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
//                           </svg>
//                         </div>

//                         <p className="cartItemTotal">₹{(item.size.FinalPrice * item.quantity).toFixed(2)}</p>
//                       </div>
//                     </div>

//                     {item?.productId?.category?._id == "67b451f7ec3a4e4a3bbe5633" && (
//                       <div className="cart-cake-message px-3">
//                         <span className="message-label">Message:</span>
//                         {item.productId?.category?._id === "67b451f7ec3a4e4a3bbe5633" && (
//                           <div className="message-input-wrapper">
//                             <input
//                               type="text"
//                               value={editingMessages[item._id] || item.cakemessage || ""}
//                               onChange={(e) => handleMessageChange(item._id, e.target.value)}
//                               onBlur={() => handleMessageBlur(item.productId._id, item.size._id, item._id)}
//                               placeholder="Add message..."
//                               maxLength={20}
//                               className="message-input-bottom-border"
//                             />
//                             <svg
//                               xmlns="http://www.w3.org/2000/svg"
//                               width="16"
//                               height="16"
//                               fill="#EE5564"
//                               className="edit-icon-inside"
//                               viewBox="0 0 16 16"
//                             >
//                               <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z" />
//                             </svg>
//                           </div>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>

//               <div className="cartcalulaction-comp">
//                 <CouponFunctions updateCart={updateCart} toastContainer={<ToastContainer position="top-right"
//                   autoClose={3000}
//                   hideProgressBar={false}
//                   newestOnTop={false}
//                   closeOnClick
//                   rtl={false}
//                   pauseOnFocusLoss
//                   draggable
//                   pauseOnHover
//                   theme="light"
//                   style={{
//                     position: 'fixed',
//                     top: '1rem',
//                     right: '1rem',
//                     zIndex: 99999999999999
//                   }} />} />
//               </div>

//               {/* Confirmation Dialog for product deletion */}
//               {showConfirmDialog && (
//                 <div className="confirmation-dialog">
//                   <div className="dialog-content">
//                     <h2>Confirm Deletion</h2>
//                     <p>Are you sure you want to remove this item from your cart?</p>
//                     <div className="dialog-buttons_both">
//                       <button onClick={confirmDelete} className="confirm-button">Confirm</button>
//                       <button onClick={cancelDelete} className="cancel-button">Cancel</button>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}
//         </>
//       )}
//     </>
//   );
// };

// export default Cart;

import React, { useEffect, useState } from "react";
import "./CSS/cart.css";
import { assets } from "../assets/assets";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { fetchCart, addToCart, removeFromCart, deleteproductFromCart } from "../utils/productFunction";
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
      
      {/* Show loader while loading and we haven't completed initial fetch */}
      {fetchCartLoader && !hasFetched ? (
        <div className="loader_container_cart_page">
          {/* Use your preferred loader here - could be a spinner, skeleton, etc. */}
          {/* <SkeletonLoader items={3} /> Adjust based on your loader component */}
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
              <div className="cart-item">
                <div className="cart-items-title cart-items-title2">
                  <p><span className="productItemName1span">Product</span> Name</p>
                  <p>Price</p>
                  <p className="quantity_heading">Qty</p>
                  <p className="cartItemTotal">Total:</p>
                </div>
                <br />
                <hr />
                {completeCart?.orderItems?.map((item, index) => (
                  <div className="all_added_cart_list" key={index}>
                    <div className="cross" onClick={() => handleDeleteClick(item.productId._id, item.size._id, item.quantity)}>
                      <img className="remove-cart" src={assets.cart_remove} alt="Remove" />
                    </div>

                    <div className="cart_items_div_cart">
                      <div className="cart-items-title cart-items-item">
                        <div className="productthumbnailname">
                          <img src={item?.productId?.thumbnail} alt="" />
                          <p className="productItemName1">{item.productId?.name}</p>
                        </div>

                        <p className="item-price">{`₹${item.size.FinalPrice} x ${item?.quantity}`}</p>

                        {/* <div className="cartPageButton">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            onClick={() => handleRemoveFromCart(item.productId._id, item.size._id)}
                            // width="30"
                            // height="30"

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
                            // width="30"
                            // height="30"
                            fill="currentColor"
                            className="bi bi-plus text-black cart_buutons_plus_minus "
                            style={{ cursor: "pointer" }}
                            viewBox="0 0 16 16"
                          >
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                          </svg>
                        </div> */}
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

                        <p className="cartItemTotal">₹{(item.size.FinalPrice * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>

                    {item?.productId?.category?._id == "67b451f7ec3a4e4a3bbe5633" && (
                      <div className="cart-cake-message px-3">
                        <span className="message-label">Message:</span>
                        {item.productId?.category?._id === "67b451f7ec3a4e4a3bbe5633" && (
                          <div className="message-input-wrapper">
                            <input
                              type="text"
                              value={editingMessages[item._id] || item.cakemessage || ""}
                              onChange={(e) => handleMessageChange(item._id, e.target.value)}
                              onBlur={() => handleMessageBlur(item.productId._id, item.size._id, item._id)}
                              placeholder="Add message..."
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
                ))}
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