// import React, { useEffect, useState } from "react";
// import "./CSS/cart.css";
// import { assets } from "../assets/assets";
// import { ToastContainer, toast } from "react-toastify";
// import { Link } from "react-router-dom";
// import { fetchCart, addToCart, removeFromCart, deleteproductFromCart, incrementCakeQty, decrementCakeQty } from "../utils/productFunction";
// import CouponFunctions from "../utils/couponFunctions";
// import { makeApi } from "../api/callApi";

// const Cart = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [fetchCartLoader, setFetchCartLoader] = useState(true);
//   const [productLoaders, setProductLoaders] = useState({});
//   const [completeCart, setCompleteCart] = useState({ orderItems: [] });
//   const [isLogin, setIsLogin] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);
//   const [cartUpdated, setCartUpdated] = useState(false);
//   const [editingMessages, setEditingMessages] = useState({});
//   const [hasFetched, setHasFetched] = useState(false);
//   const [showMessageInputs, setShowMessageInputs] = useState({});
//   const [messageSaveStates, setMessageSaveStates] = useState({}); // New state for tracking save states

//   // Fetch Cart Items
//   const fetchCartItems = async () => {
//     try {
//       setFetchCartLoader(true);
//       await fetchCart(setCartItems, setCompleteCart, setFetchCartLoader);
//       setHasFetched(true);
//     } catch (error) {
//       console.error("Error fetching cart:", error);
//       setHasFetched(true);
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

//   const toggleMessageInput = (itemId) => {
//     setShowMessageInputs(prev => ({
//       ...prev,
//       [itemId]: !prev[itemId]
//     }));

//     // Initialize editing message with current value when opening
//     if (!showMessageInputs[itemId]) {
//       const currentItem = completeCart.orderItems.find(item => item._id === itemId);
//       if (currentItem) {
//         setEditingMessages(prev => ({
//           ...prev,
//           [itemId]: currentItem.cakemessage || ""
//         }));
//       }
//     }
//   };

//   const handleRemoveFromCart = async (item) => {
//     try {
//       setProductLoaders(prev => ({ ...prev, [item._id]: true }));

//       if (item.productId?.category?._id === "67b451f7ec3a4e4a3bbe5633") {
//         await decrementCakeQty(
//           item.productId._id,
//           item.size._id,
//           item.cakemessage
//         );
//       } else {
//         await removeFromCart(
//           item.productId._id,
//           (loaderState) => setProductLoaders(prev => ({ ...prev, [item._id]: loaderState })),
//           setCartItems,
//           fetchCartItems,
//           item.size._id
//         );
//       }
//       updateCart();
//     } catch (error) {
//       console.error("Error removing from cart:", error);
//     } finally {
//       setProductLoaders(prev => ({ ...prev, [item._id]: false }));
//     }
//   };

//   const handleAddToCart = async (item) => {
//     try {
//       console.log("-----1")
//       setProductLoaders(prev => ({ ...prev, [item._id]: true }));

//       if (item.productId?.category?._id === "67b451f7ec3a4e4a3bbe5633") {
//         await incrementCakeQty(
//           item.productId._id,
//           item.size._id,
//           item.cakemessage
//         );
//       } else {
//         await addToCart(
//           item.productId._id,
//           setIsLogin,
//           setShowPopup,
//           fetchCartItems,
//           setCartItems,
//           (loaderState) => setProductLoaders(prev => ({ ...prev, [item._id]: loaderState })),
//           item.size._id
//         );
//       }
//       updateCart();
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//     } finally {
//       setProductLoaders(prev => ({ ...prev, [item._id]: false }));
//     }
//   };

//   const handleDeleteItem = async (item) => {
//     try {
//       setProductLoaders(prev => ({ ...prev, [item._id]: true }));

//       await deleteproductFromCart(
//         item._id,
//         setProductLoaders,
//         setCartItems,
//         fetchCart
//       );

//       setCompleteCart(prev => ({
//         ...prev,
//         orderItems: prev.orderItems.filter(cartItem => cartItem._id !== item._id)
//       }));

//       updateCart();
//     } catch (error) {
//       console.error("Error deleting item:", error);
//     } finally {
//       setProductLoaders(prev => ({ ...prev, [item._id]: false }));
//     }
//   };

//   const handleMessageChange = (itemId, value) => {
//     setEditingMessages(prev => ({
//       ...prev,
//       [itemId]: value
//     }));
//   };

//   const handleSaveMessage = async (itemId) => {
//     const newMessage = editingMessages[itemId];
//     const originalMessage = completeCart.orderItems.find(
//       item => item._id === itemId
//     )?.cakemessage;

//     if (newMessage !== undefined) {
//       try {
//         // Set saving state
//         setMessageSaveStates(prev => ({ ...prev, [itemId]: 'saving' }));

//         await makeApi('/api/update-cart-message', 'PUT', {
//           itemId,
//           message: newMessage
//         });

//         // Set saved state
//         setMessageSaveStates(prev => ({ ...prev, [itemId]: 'saved' }));

//         // Reset to update state after 2 seconds if message is different
//         setTimeout(() => {
//           if (newMessage !== originalMessage) {
//             setMessageSaveStates(prev => ({ ...prev, [itemId]: 'update' }));
//           } else {
//             setMessageSaveStates(prev => ({ ...prev, [itemId]: 'saved' }));
//           }
//         }, 2000);

//         fetchCartItems(); // Refresh to get updated message
//       } catch (error) {
//         console.error("Error updating cake message:", error);
//         setEditingMessages(prev => ({
//           ...prev,
//           [itemId]: originalMessage
//         }));
//         setMessageSaveStates(prev => ({ ...prev, [itemId]: 'error' }));
//       }
//     }
//   };

//   const getButtonText = (itemId, hasExistingMessage) => {
//     const saveState = messageSaveStates[itemId];

//     if (!saveState) {
//       return hasExistingMessage ? "Update" : "Add";
//     }

//     switch (saveState) {
//       case 'saving':
//         return "Saving...";
//       case 'saved':
//         return "Saved";
//       case 'update':
//         return "Update";
//       case 'error':
//         return "Error";
//       default:
//         return hasExistingMessage ? "Update" : "Add";
//     }
//   };

//   return (
//     <>
//       {fetchCartLoader && !hasFetched ? (
//         <div className="loader_container_cart_page">
//           <div className="loader_for_cart"></div>
//         </div>
//       ) : (
//         <>
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
//               <div className="cart_UI_for_dektop_view">
//                 <div className="cart-item">
//                   <div className="cart-items-title cart-items-title2">
//                     <p><span className="productItemName1span">Product</span> Name</p>
//                     <p>Price</p>
//                     <p className="quantity_heading">Qty</p>
//                     <p className="cartItemTotal">Total:</p>
//                   </div>
//                   <br />
//                   <hr />
//                   <div></div>
//                   {completeCart?.orderItems?.map((item, index) => (
//                     <div className="all_added_cart_list" key={index}>
//                       <div className="cross" onClick={() => handleDeleteItem(item)}>
//                         <img className="remove-cart" src={assets.cart_remove} alt="Remove" />
//                       </div>

//                       <div className="cart_items_div_cart">
//                         <div className="cart-items-title cart-items-item">
//                           <div className="productthumbnailname">
//                             <img src={item?.productId?.thumbnail} alt="" />
//                             {/* <p className="productItemName1">{item.productId?.name}</p> */}
//                             <p className="productItemName1">
//                               {(() => {
//                                 const name = item.productId?.name || "";
//                                 const parts = name.split(" ");
//                                 if (parts.length <= 2) return name;
//                                 return (
//                                   <>
//                                     {parts.slice(0, 2).join(" ")}<br />
//                                     {parts.slice(2).join(" ")}
//                                   </>
//                                 );
//                               })()}
//                             </p>

//                           </div>

//                           <p className="item-price"><span className="rs_color_cart">₹</span>{`${item.size.FinalPrice} x ${item?.quantity}`}</p>

//                           <div className="cartPageButton">
//                             <svg
//                               xmlns="http://www.w3.org/2000/svg"
//                               onClick={() => handleRemoveFromCart(item)}
//                               fill="currentColor"
//                               className="bi bi-dash text-black cart_buutons_plus_minus"
//                               style={{ cursor: "pointer" }}
//                               viewBox="0 0 16 16"
//                             >
//                               <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
//                             </svg>

//                             {productLoaders[item._id] ? (
//                               <div className="loader_for_cart"></div>
//                             ) : (
//                               <p className="text-black">{item.quantity}</p>
//                             )}
//                             <svg
//                               xmlns="http://www.w3.org/2000/svg"
//                               onClick={() => handleAddToCart(item)}
//                               fill="currentColor"
//                               className="bi bi-plus text-black cart_buutons_plus_minus "
//                               style={{ cursor: "pointer" }}
//                               viewBox="0 0 16 16"
//                             >
//                               <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
//                             </svg>
//                           </div>

//                           <p className="cartItemTotal"><span className="rs_color_cart">₹</span>{(item.size.FinalPrice * item.quantity).toFixed(2)}</p>
//                         </div>
//                       </div>

//                       {item?.productId?.category?._id === "67b451f7ec3a4e4a3bbe5633" && (
//                         <div className="cart-cake-message px-3">
//                           <span className="message-label">Message:</span>
//                           {showMessageInputs[item._id] || item.cakemessage ? (
//                             <div className="message-input-wrapper">
//                               <div className="new_message_popup__edit_container">
//                                 <input
//                                   type="text"
//                                   value={editingMessages[item._id] ?? item.cakemessage ?? ""}
//                                   onChange={(e) => handleMessageChange(item._id, e.target.value)}
//                                   placeholder="Add your cake message"
//                                   maxLength={20}
//                                   className="message-input-bottom-border"
//                                 />
//                                 <button
//                                   className={`new_message_popup__update_btn ${messageSaveStates[item._id] === 'saved' ? 'saved' :
//                                       messageSaveStates[item._id] === 'saving' ? 'saving' : ''
//                                     }`}
//                                   onClick={() => handleSaveMessage(item._id)}
//                                   disabled={
//                                     messageSaveStates[item._id] === 'saving' ||
//                                     (editingMessages[item._id] === undefined && item.cakemessage) ||
//                                     (editingMessages[item._id] === item.cakemessage)
//                                   }
//                                 >
//                                   {getButtonText(item._id, item.cakemessage)}
//                                 </button>
//                               </div>
//                             </div>
//                           ) : (
//                             <div className="add-message-container">
//                               <span className="no-message-text me-2 text-black">Add message</span>
//                               <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 width="24"
//                                 height="24"
//                                 fill="#EE5564"
//                                 className="add-message-icon"
//                                 viewBox="0 0 16 16"
//                                 onClick={() => toggleMessageInput(item._id)}
//                                 style={{ cursor: "pointer" }}
//                               >
//                                 <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
//                               </svg>
//                             </div>
//                           )}
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="cart_UI_for_mobile_view">
//                 <div className="cart_items_for_mobile_view">
//                   <div className="cart_items_details_for_mobile_view">
//                     {completeCart?.orderItems?.map((item, index) => (
//                       <div className="moble_view_for_cart_border">
//                         <div key={index} className="cart_items_details_inside_for_mobile_view">
//                           <div className="cross_icon_mobile" onClick={() => handleDeleteItem(item)}>
//                             <img className="remove-cart" src={assets.cart_remove} alt="Remove" />
//                           </div>
//                           <div className="product_thubnil_for_mobile">
//                             <img src={item?.productId?.thumbnail} alt="" />
//                           </div>
//                           <div className="mobile_price_name_qunlity_div">
//                             <div className="product_name_for_mobile">
//                               <div style={{ fontWeight: "500" }}>
//                                 {item.productId?.name}
//                               </div>
//                               <div>
//                                 <span className="rs_color_cart">₹</span>{item.size.FinalPrice}
//                               </div>
//                             </div>
//                             <div className="cartPageButton cartPageButton_for_cart_mobile_view">
//                               <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 onClick={() => handleRemoveFromCart(item)}
//                                 fill="currentColor"
//                                 className="bi bi-dash text-black cart_buutons_plus_minus cart_buutons_plus_minus_for_mobile"
//                                 style={{ cursor: "pointer" }}
//                                 viewBox="0 0 16 16"
//                               >
//                                 <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
//                               </svg>

//                               {productLoaders[item.productId._id] ? (
//                                 <div className="loader_for_mobile_cart"></div>
//                               ) : (
//                                 <p className="text-black card_quntity_mobile">{item.quantity}</p>
//                               )}

//                               <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 onClick={() => handleAddToCart(item)}
//                                 fill="currentColor"
//                                 className="bi bi-plus text-black cart_buutons_plus_minus cart_buutons_plus_minus_for_mobile"
//                                 style={{ cursor: "pointer" }}
//                                 viewBox="0 0 16 16"
//                               >
//                                 <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
//                               </svg>
//                             </div>
//                           </div>
//                           <div className="cart_total_for_mobile">
//                             <div></div>
//                             <div>
//                               <span className="rs_color_cart">₹</span>{(item.size.FinalPrice * item.quantity).toFixed(2)}
//                             </div>
//                           </div>
//                         </div>
//                         <div>
//                           {item?.productId?.category?._id == "67b451f7ec3a4e4a3bbe5633" && (
//                             <div className="cart-cake-message px-3">
//                               <span className="message-label">Message:</span>
//                               {item.productId?.category?._id === "67b451f7ec3a4e4a3bbe5633" && (
//                                 <div className="message-input-wrapper">
//                                   <input
//                                     type="text"
//                                     value={editingMessages[item._id] || item.cakemessage || ""}
//                                     onChange={(e) => handleMessageChange(item._id, e.target.value)}
//                                     placeholder="Add message"
//                                     maxLength={20}
//                                     className="message-input-bottom-border"
//                                   />
//                                   <button
//                                     className={`new_message_popup__update_btn ${messageSaveStates[item._id] === 'saved' ? 'saved' :
//                                         messageSaveStates[item._id] === 'saving' ? 'saving' : ''
//                                       }`}
//                                     onClick={() => handleSaveMessage(item._id)}
//                                     disabled={
//                                       messageSaveStates[item._id] === 'saving' ||
//                                       (editingMessages[item._id] === undefined && item.cakemessage) ||
//                                       (editingMessages[item._id] === item.cakemessage)
//                                     }
//                                   >
//                                     {getButtonText(item._id, item.cakemessage)}
//                                   </button>
//                                 </div>
//                               )}
//                             </div>
//                           )}
//                         </div>
//                       </div> 
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               <div className="cartcalulaction-comp">
//                 <CouponFunctions
//                   updateCart={updateCart}
//                 />
//               </div>
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
import { fetchCart, addToCart, removeFromCart, deleteproductFromCart, incrementCakeQty, decrementCakeQty } from "../utils/productFunction";
import CouponFunctions from "../utils/couponFunctions";
import { makeApi } from "../api/callApi";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [fetchCartLoader, setFetchCartLoader] = useState(true);
  const [productLoaders, setProductLoaders] = useState({});
  const [completeCart, setCompleteCart] = useState({ orderItems: [] });
  const [isLogin, setIsLogin] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [cartUpdated, setCartUpdated] = useState(false);
  const [editingMessages, setEditingMessages] = useState({});
  const [hasFetched, setHasFetched] = useState(false);
  const [showMessageInputs, setShowMessageInputs] = useState({});
  const [messageSaveStates, setMessageSaveStates] = useState({}); // New state for tracking save states

  // Fetch Cart Items
  const fetchCartItems = async () => {
    try {
      setFetchCartLoader(true);
      await fetchCart(setCartItems, setCompleteCart, setFetchCartLoader);
      setHasFetched(true);
    } catch (error) {
      console.error("Error fetching cart:", error);
      setHasFetched(true);
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

  const toggleMessageInput = (itemId) => {
    setShowMessageInputs(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));

    // Initialize editing message with current value when opening
    if (!showMessageInputs[itemId]) {
      const currentItem = completeCart.orderItems.find(item => item._id === itemId);
      if (currentItem) {
        setEditingMessages(prev => ({
          ...prev,
          [itemId]: currentItem.cakemessage || ""
        }));
      }
    }
  };

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

  const handleAddToCart = async (item) => {
    try {
      console.log("-----1")
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

  const handleDeleteItem = async (item) => {
    try {
      setProductLoaders(prev => ({ ...prev, [item._id]: true }));

      await deleteproductFromCart(
        item._id,
        setProductLoaders,
        setCartItems,
        fetchCart
      );

      setCompleteCart(prev => ({
        ...prev,
        orderItems: prev.orderItems.filter(cartItem => cartItem._id !== item._id)
      }));

      updateCart();
    } catch (error) {
      console.error("Error deleting item:", error);
    } finally {
      setProductLoaders(prev => ({ ...prev, [item._id]: false }));
    }
  };

  const handleMessageChange = (itemId, value) => {
    setEditingMessages(prev => ({
      ...prev,
      [itemId]: value
    }));
  };

  const handleSaveMessage = async (itemId) => {
    const newMessage = editingMessages[itemId];
    const originalMessage = completeCart.orderItems.find(
      item => item._id === itemId
    )?.cakemessage;

    if (newMessage !== undefined) {
      try {
        // Set saving state
        setMessageSaveStates(prev => ({ ...prev, [itemId]: 'saving' }));

        await makeApi('/api/update-cart-message', 'PUT', {
          itemId,
          message: newMessage
        });

        // Set saved state
        setMessageSaveStates(prev => ({ ...prev, [itemId]: 'saved' }));

        // Reset to update state after 2 seconds if message is different
        setTimeout(() => {
          if (newMessage !== originalMessage) {
            setMessageSaveStates(prev => ({ ...prev, [itemId]: 'update' }));
          } else {
            setMessageSaveStates(prev => ({ ...prev, [itemId]: 'saved' }));
          }
        }, 2000);

        fetchCartItems(); // Refresh to get updated message
      } catch (error) {
        console.error("Error updating cake message:", error);
        setEditingMessages(prev => ({
          ...prev,
          [itemId]: originalMessage
        }));
        setMessageSaveStates(prev => ({ ...prev, [itemId]: 'error' }));
      }
    }
  };

  const getButtonText = (itemId, hasExistingMessage) => {
    const saveState = messageSaveStates[itemId];

    if (!saveState) {
      return hasExistingMessage ? "Update" : "Add";
    }

    switch (saveState) {
      case 'saving':
        return "Saving...";
      case 'saved':
        return "Saved";
      case 'update':
        return "Update";
      case 'error':
        return "Error";
      default:
        return hasExistingMessage ? "Update" : "Add";
    }
  };

  return (
    <>
      {fetchCartLoader && !hasFetched ? (
        <div className="loader_container_cart_page">
          <div className="loader_for_cart"></div>
        </div>
      ) : (
        <>
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
              <div className="cart_UI_for_dektop_view">
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
                      <div className="cross" onClick={() => handleDeleteItem(item)}>
                        <img className="remove-cart" src={assets.cart_remove} alt="Remove" />
                      </div>

                      <div className="cart_items_div_cart">
                        <div className="cart-items-title cart-items-item">
                          <div className="productthumbnailname">
                            <img src={item?.productId?.thumbnail} alt="" />
                            <p className="productItemName1">
                              {(() => {
                                const name = item.productId?.name || "";
                                const parts = name.split(" ");
                                if (parts.length <= 2) return name;
                                return (
                                  <>
                                    {parts.slice(0, 2).join(" ")}<br />
                                    {parts.slice(2).join(" ")}
                                  </>
                                );
                              })()}
                            </p>
                          </div>

                          <p className="item-price"><span className="rs_color_cart">₹</span>{`${item.size.FinalPrice} x ${item?.quantity}`}</p>

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

                          <p className="cartItemTotal"><span className="rs_color_cart">₹</span>{(item.size.FinalPrice * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>

                      {item?.productId?.category?._id === "67b451f7ec3a4e4a3bbe5633" && (
                        <div className="cart-cake-message px-3">
                          <span className="message-label">Message:</span>
                          {showMessageInputs[item._id] || item.cakemessage ? (
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
                                  className={`new_message_popup__update_btn ${messageSaveStates[item._id] === 'saved' ? 'saved' :
                                      messageSaveStates[item._id] === 'saving' ? 'saving' : ''
                                    }`}
                                  onClick={() => handleSaveMessage(item._id)}
                                  disabled={
                                    messageSaveStates[item._id] === 'saving' ||
                                    (editingMessages[item._id] === undefined && item.cakemessage) ||
                                    (editingMessages[item._id] === item.cakemessage)
                                  }
                                >
                                  {getButtonText(item._id, item.cakemessage)}
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="add-message-container">
                              <span className="no-message-text me-2 text-black">Add message</span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="#EE5564"
                                className="add-message-icon"
                                viewBox="0 0 16 16"
                                onClick={() => toggleMessageInput(item._id)}
                                style={{ cursor: "pointer" }}
                              >
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                              </svg>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="cart_UI_for_mobile_view">
                <div className="cart_items_for_mobile_view">
                  <div className="cart_items_details_for_mobile_view">
                    {completeCart?.orderItems?.map((item, index) => (
                      <div className="moble_view_for_cart_border" key={index}>
                        <div className="cart_items_details_inside_for_mobile_view">
                          <div className="cross_icon_mobile" onClick={() => handleDeleteItem(item)}>
                            <img className="remove-cart" src={assets.cart_remove} alt="Remove" />
                          </div>
                          <div className="product_thubnil_for_mobile">
                            <img src={item?.productId?.thumbnail} alt="" />
                          </div>
                          <div className="mobile_price_name_qunlity_div">
                            <div className="product_name_for_mobile">
                              <div style={{ fontWeight: "500" }}>
                                {item.productId?.name}
                              </div>
                              <div>
                                <span className="rs_color_cart">₹</span>{item.size.FinalPrice}
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

                              {productLoaders[item._id] ? (
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
                              <span className="rs_color_cart">₹</span>{(item.size.FinalPrice * item.quantity).toFixed(2)}
                            </div>
                          </div>
                        </div>
                        {item?.productId?.category?._id === "67b451f7ec3a4e4a3bbe5633" && (
                          <div className="cart-cake-message px-3">
                            <span className="message-label">Message:</span>
                            {showMessageInputs[item._id] || item.cakemessage ? (
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
                                    className={`new_message_popup__update_btn ${messageSaveStates[item._id] === 'saved' ? 'saved' :
                                        messageSaveStates[item._id] === 'saving' ? 'saving' : ''
                                      }`}
                                    onClick={() => handleSaveMessage(item._id)}
                                    disabled={
                                      messageSaveStates[item._id] === 'saving' ||
                                      (editingMessages[item._id] === undefined && item.cakemessage) ||
                                      (editingMessages[item._id] === item.cakemessage)
                                    }
                                  >
                                    {getButtonText(item._id, item.cakemessage)}
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="add-message-container">
                                <span className="no-message-text me-2 text-black">Add message</span>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  fill="#EE5564"
                                  className="add-message-icon"
                                  viewBox="0 0 16 16"
                                  onClick={() => toggleMessageInput(item._id)}
                                  style={{ cursor: "pointer" }}
                                >
                                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                </svg>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="cartcalulaction-comp">
                <CouponFunctions
                  updateCart={updateCart}
                />
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Cart;