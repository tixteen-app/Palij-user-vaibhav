

import React, { useEffect, useState } from "react";
import "./CSS/cart.css";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router";
import { ToastContainer } from "react-toastify";
import PrimaryLoader from "../components/loaders/primaryloader";
import { Link } from "react-router-dom";
import { fetchCart, addToCart, removeFromCart, deleteproductFromCart } from "../utils/productFunction";
import CartCalculation from "../components/CartCalculation/cartCalculation";
import CouponFunctions from "../utils/couponFunctions";

const Cart = () => {
  const navigate = useNavigate();

  // States to manage cart items, loading, and product deletion
  const [cartItems, setCartItems] = useState([]);
  const [fetchCartLoader, setFetchCartLoader] = useState(false);
  const [productLoaders, setProductLoaders] = useState({});
  const [IscartEmpty, setIsCartEmpty] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [completeCart, setCompleteCart] = useState({ orderItems: [] });
  console.log("-----------------",completeCart);
  const [isLogin, setIsLogin] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  // Fetch Cart Items
  const fetchCartItems = async () => {
    setFetchCartLoader(true);
    await fetchCart(setCartItems, setCompleteCart, setFetchCartLoader);
    setFetchCartLoader(false);
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  // Handle removing a product from cart
  const handleRemoveFromCart = async (productId, selectedSize) => {
    // await removeFromCart(productId, setProductLoaders, fetchCartItems);
    await removeFromCart(productId, setProductLoaders, setCartItems, fetchCartItems, selectedSize);
  };

  // Handle adding a product to cart
  const handleAddToCart = async (productId, selectedSize) => {
    // await addToCart(productId, setProductLoaders, fetchCartItems);
    await addToCart(productId, setIsLogin, setShowPopup, fetchCartItems, setCartItems, setProductLoaders, selectedSize);

  };

  const handleDeleteClick = (productId, selectProductSize, quantity) => {
    console.log('Delete Clicked with productId:', productId);
    console.log('Size ID:', selectProductSize);
    console.log('Quantity:', quantity);
    setProductToDelete({ productId, selectProductSize, quantity });
    setShowConfirmDialog(true);  // Ensure this is called correctly

  };




  const confirmDelete = async () => {
    if (productToDelete) {
      const { productId, selectProductSize, quantity } = productToDelete;
      //   await deleteproductFromCart(productId, setProductLoaders, fetchCartItems, quantity);
      await deleteproductFromCart(productId, setProductLoaders, setCartItems, fetchCart, selectProductSize, quantity);

      setProductToDelete(null);
      setShowConfirmDialog(false);
      fetchCartItems();

    }
  };

  const cancelDelete = () => {
    setProductToDelete(null);
    setShowConfirmDialog(false);
  };


  return (
    <>
      <ToastContainer />
      {fetchCartLoader ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <PrimaryLoader />
        </div>
      ) : (completeCart?.orderItems?.length === 0 || completeCart?.orderItems?.length === undefined) ? (
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
              {/* <p className="productItemName2">Name</p> */}
              <p>Price</p>
              <p className="quantity_heading">Qty</p>
              <p className="cartItemTotal">Total:</p>
            </div>
            <br />
            <hr />
            {completeCart.orderItems.map((item, index) => (
              <div className="all_added_cart_list" key={index}>

                <div className="cross" onClick={() => handleDeleteClick(item.productId._id, item.size._id, item.quantity)}>
                  <img className="remove-cart" src={assets.cart_remove} alt="Remove" />
                </div>

                <div>
                  <div className="cart-items-title cart-items-item">

                    <div className="productthumbnailname">
                      <img src={item?.productId?.thumbnail} alt="" />
                      <p className="productItemName1">{item.productId?.name}  </p>
                    </div>

                    {/* <p className="productItemName2">
                      {item.productId?.name}
                      <br />
                      {(item.size.size.toLowerCase() !== "null" && item.size.size.toLowerCase() !== "null") &&
                        (item.size.sizetype.toLowerCase() !== "null" && item.size.sizetype.toLowerCase() !== "null") ? (
                        `${item.size.size} ${item.size.sizetype}`
                      ) : null}
                    </p> */}


                    {/* <p>₹{item.productId?.PriceAfterDiscount}</p> */}
                    <p>{` ₹${item.size.FinalPrice} x ${item.quantity} `}</p>

                    <div className="cartPageButton">
                      <img
                        src={assets.add_icon_red}
                        alt="RemoveIcon"
                        className="cart_increase"
                        onClick={() => handleRemoveFromCart(item.productId._id, item.size._id)}
                      />
                      <p>{item.quantity}</p>
                      <img
                        src={assets.add_icon_green}
                        alt="AddIcon"
                        className="Icon_add_to_cart_main_cart_page"
                        onClick={() => handleAddToCart(item.productId._id, item.size._id)}
                      />
                    </div>
                    {/* <p className="cartItemTotal">₹{item.totalPrice}</p> */}
                    <p className="cartItemTotal"> ₹{(item.size.FinalPrice * item.quantity)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="cartcalulaction-comp">
            <CouponFunctions toastContainer={<ToastContainer position="top-right"
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
  );
};

export default Cart;