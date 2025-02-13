// import React, { useState, useEffect } from "react"; 
// import { ToastContainer, toast } from "react-toastify";
// import { fetchCart } from "../utils/productFunction";
// import CartCalculation from "../components/CartCalculation/cartCalculation";
// import { makeApi } from "../api/callApi.tsx";

// const CouponFunctions = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [completeCart, setCompleteCart] = useState({});
//   const [fetchCartLoader, setFetchCartLoader] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [appliedCoupon, setAppliedCoupon] = useState(false);
//   const [couponCode, setCouponCode] = useState("");

//   const fetchCartItem = async () => {
//     try {
//       await fetchCart(setCartItems, setCompleteCart, setFetchCartLoader);

//       if (completeCart?.coupancode) {
//         setCouponCode(completeCart.coupancode);
//         setAppliedCoupon(true);
//       }
//     } catch (error) {
//       console.error("Error fetching cart items:", error);
//     }
//   };

//   useEffect(() => {
//     fetchCartItem();
//   }, []);


//   const handleApplyCoupon = async () => {
//     if (!couponCode) {
//       toast.error("Please enter a coupon code!");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await makeApi("/api/apply-coupon", "POST", { coupon: couponCode });
//       if (response.data) {
//         toast.success("Coupon applied successfully!");
//         fetchCartItem();  
//       }
//     } catch (error) {
//       toast.error(error.response.data.message || "Failed to apply coupon.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRemoveCoupon = async () => {
//     setLoading(true);
//     try {
//        await makeApi("/api/remove-coupon", "POST");
// 	  setCouponCode("");  
// 	  setAppliedCoupon(false);  
// 	  toast.success("Coupon removed successfully!");
//     } catch (error) {
//       toast.error(error.response.data.message || "Failed to remove coupon.");
//     } finally {
//       setLoading(false);
// 	  fetchCartItem();  

//     }
//   };
//   useEffect(() => {
//     if (completeCart?.coupancode) {
//       setCouponCode(completeCart.coupancode);
//       setAppliedCoupon(true);
//     }
//   }, [completeCart,handleRemoveCoupon,handleApplyCoupon]);


//   return (
//     <div>
//       <div className="coupon-section">
//         <input
//           type="text"
//           placeholder="Enter coupon code"
//           value={couponCode}
//           onChange={(e) => setCouponCode(e.target.value)}
//           disabled={loading || appliedCoupon}  
//         />
//         <button onClick={handleApplyCoupon} disabled={loading || appliedCoupon}>
//           {loading ? "Applying..." : appliedCoupon ? "Coupon Applied" : "Apply Coupon"}
//         </button>
//         {appliedCoupon && (
//           <button onClick={handleRemoveCoupon} disabled={loading}>
//             {loading ? "Removing..." : "Remove Coupon"}
//           </button>
//         )}
//       </div>

//       <div className="cart-bottomm">
//         <div className="cart-address">
//           <div className="cart-shipping-address"></div>
//         </div>

//         <div className="cart-billing">
//           <CartCalculation
//             tax={0}
//             shipping={0}
//             CoupanApplied={appliedCoupon ? completeCart?.couapnDiscount : 0}
//             Final={completeCart?.totalPrice}
//             total={completeCart?.totalPriceWithoutDiscount}
//             ButtonName="PROCEED TO CHECKOUT"
//             disabled={false}
//           />
//         </div>
//       </div>

//       <ToastContainer />
//     </div>
//   );
// };

// export default CouponFunctions;

import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { fetchCart } from "../utils/productFunction";
import CartCalculation from "../components/CartCalculation/cartCalculation";
import { makeApi } from "../api/callApi.tsx";
import styles from "./CouponSection.module.css";

const CouponFunctions = () => {
  const [cartItems, setCartItems] = useState([]);
  const [completeCart, setCompleteCart] = useState({});
  const [fetchCartLoader, setFetchCartLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(false);
  const [couponCode, setCouponCode] = useState("");

  const fetchCartItem = async () => {
    try {
      await fetchCart(setCartItems, setCompleteCart, setFetchCartLoader);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  useEffect(() => {
    fetchCartItem();
  }, []);

  useEffect(() => {
    if (completeCart?.coupancode) {
      setCouponCode(completeCart.coupancode);
      setAppliedCoupon(true);
    }
  }, [completeCart]);

  const handleApplyCoupon = async () => {
    if (!couponCode) {
      toast.error("Please enter a coupon code!");
      return;
    }

    setLoading(true);
    try {
      const response = await makeApi("/api/apply-coupon", "POST", { coupon: couponCode });
      if (response.data) {
        toast.success("Coupon applied successfully!");
        fetchCartItem();
      }
    } catch (error) {
      toast.error(error.response.data.message || "Failed to apply coupon.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveCoupon = async () => {
    setLoading(true);
    try {
      await makeApi("/api/remove-coupon", "POST");
      setCouponCode("");  // Clear the input field after coupon removal
      setAppliedCoupon(false);  // Mark coupon as removed
      toast.success("Coupon removed successfully!");
      fetchCartItem();  // Refresh cart after removing coupon
    } catch (error) {
      toast.error(error.response.data.message || "Failed to remove coupon.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // <div>


    //   <div className="cart-bottomm">
    //     <div className="cart-address">
    //       <div className="cart-shipping-address"></div>
    //     </div>

    //     <div className="cart-billing">
    //       <div className={styles.couponSection}>

    //         <div className={styles.inputGroup}>
    //           <input
    //             type="text"
    //             placeholder="Enter coupon code"
    //             value={couponCode}
    //             onChange={(e) => setCouponCode(e.target.value)}
    //             disabled={loading || appliedCoupon}
    //             className={styles.input}
    //           />
    //           <button
    //             onClick={handleApplyCoupon}
    //             disabled={loading || appliedCoupon}
    //             className={styles.button}
    //           >
    //             {loading ? "Applying..." : appliedCoupon ? "Applied" : "Apply Coupon"}
    //           </button>
    //         </div>
    //         {appliedCoupon && (
    //           <div className={styles.appliedCoupon}>
    //             <span>Coupon applied: {couponCode}</span>
    //             <button
    //               onClick={handleRemoveCoupon}
    //               disabled={loading}
    //               className={`${styles.button} ${styles.removeButton}`}
    //             >
    //               {loading ? "Removing..." : "Remove"}
    //             </button>
    //           </div>
    //         )}
    //       </div>
    //       <CartCalculation
    //         tax={0}
    //         shipping={0}
    //         CoupanApplied={appliedCoupon ? completeCart?.couapnDiscount : 0}
    //         Final={completeCart?.totalPrice}
    //         total={completeCart?.totalPriceWithoutDiscount}
    //         ButtonName="PROCEED TO CHECKOUT"
    //         disabled={false}
    //       />
    //     </div>
    //   </div>

    //   <ToastContainer />
    // </div>
    <>
      <ToastContainer position="top-right"
        autoClose={2000}
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
          top: '5rem',
          right: '1rem',
          zIndex: 99999999999999

        }} />
      <div>
        <div className="cart-bottomm">
          <div className="cart-address">
            <div className="cart-shipping-address"></div>
          </div>

          <div className="cart-billing">
            <div className={styles.couponSection}>
              {!appliedCoupon && ( // Conditionally render input and button only if coupon is not applied
                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    disabled={loading}
                    className={styles.input}
                  />
                  <button
                    onClick={handleApplyCoupon}
                    disabled={loading}
                    className={styles.button}
                  >
                    {loading ? "Applying..." : "Apply Coupon"}
                  </button>
                </div>
              )}
              {appliedCoupon && (
                <div className={styles.appliedCoupon}>
                  <span>Coupon applied: {couponCode}</span>
                  <button
                    onClick={handleRemoveCoupon}
                    disabled={loading}
                    className={`${styles.button} ${styles.removeButton}`}
                  >
                    {loading ? "Removing..." : "Remove"}
                  </button>
                </div>
              )}
            </div>
            <CartCalculation
              tax={0}
              shipping={0}
              CoupanApplied={appliedCoupon ? completeCart?.couapnDiscount : 0}
              Final={completeCart?.totalPrice}
              total={completeCart?.totalPriceWithoutDiscount}
              ButtonName="PROCEED TO CHECKOUT"
              disabled={false}
            />
          </div>
        </div>


      </div>
    </>
  );
};

export default CouponFunctions;
