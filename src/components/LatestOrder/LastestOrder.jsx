// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router";


// import styles from "./LatestOrder.module.css";
// import { GoArrowLeft } from "react-icons/go";
// import { makeApi } from "../../api/callApi";
// import Primaryloader from "../loaders/primaryloader";


// const LatestOrder = () => {
//   const [orderSummary, setOrderSummary] = useState(null);
//   const { ordersummary } = useParams();
//   const isCashOnDelivery = orderSummary?.paymentMethod.toLowerCase() === "cash on delivery";
//   const isRazorpay = orderSummary?.paymentMethod.toLowerCase() === "razorpay";


//   useEffect(() => {
//     const fetchOrderSummary = async () => {
//       try {
//         const response = await makeApi(
//           `/api/get-my-second-order`,
//           "GET"
//         );
//         setOrderSummary(response.data?.secondorders[0]);


//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchOrderSummary();
//   }, [ordersummary]);

//   if (!orderSummary) {
//     return (
//       <div className={styles.loaderContainer}>
//         <Primaryloader />
//       </div>
//     );
//   }
//   console.log(orderSummary, "orderSummary");

//   return (
//     <div></div>
//   );
// };

// export default LatestOrder;



// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { makeApi } from '../../api/callApi';

// const LatestOrder = () => {
//   const [orderSummary, setOrderSummary] = useState(null);
//   const { ordersummary } = useParams();

//   useEffect(() => {
//     const fetchOrderSummary = async () => {
//       try {
//         const response = await makeApi("/api/get-my-second-order", "GET");
//         setOrderSummary(response.data?.secondorders[0]);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchOrderSummary();
//   }, [ordersummary]);

//   if (!orderSummary) {
//     return (
//       <div className={styles.loaderContainer}>
//         <div className={styles.loader}></div>
//       </div>
//     );
//   }

//   const orderDate = new Date(orderSummary.createdAt).toLocaleDateString();
//   const estimatedDelivery = new Date(orderSummary.createdAt);
//   estimatedDelivery.setDate(estimatedDelivery.getDate() + 7);

//   return (
//     <div className={styles.container}>
//       <div className={styles.card}>
//         <div className={styles.checkmark}>✓</div>
//         <h1 className={styles.title}>Order Placed Successfully!</h1>
//         <p className={styles.message}>
//           Thank you for your purchase. Your order has been received and is
//           being processed.
//         </p>
//         <div className={styles.orderDetails}>
//           <h2 className={styles.sectionTitle}>Order Details</h2>
//           <p><strong>Order Number:</strong> {orderSummary._id}</p>
//           <p><strong>Date:</strong> {orderDate}</p>
//           <p><strong>Total Amount:</strong> ₹{orderSummary.CartId.totalPrice.toFixed(2)}</p>
//           <p><strong>Estimated Delivery:</strong> {estimatedDelivery.toLocaleDateString()}</p>
//         </div>
//         <p className={styles.notification}>
//           We'll send you an email with your order details and tracking
//           information once your package has shipped.
//         </p>
//         <button className={styles.continueButton}>Continue Shopping</button>
//       </div>
//     </div>
//   );
// };

// export default LatestOrder;

// const styles = {
//   container: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     minHeight: '100vh',
//     backgroundColor: '#f0f0f0',
//     fontFamily: 'Arial, sans-serif',
//   },
//   card: {
//     backgroundColor: 'white',
//     borderRadius: '8px',
//     boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//     padding: '2rem',
//     maxWidth: '500px',
//     width: '100%',
//     textAlign: 'center',
//   },
//   checkmark: {
//     color: '#4CAF50',
//     fontSize: '3rem',
//     marginBottom: '1rem',
//   },
//   title: {
//     color: '#4CAF50',
//     fontSize: '1.5rem',
//     marginBottom: '1rem',
//   },
//   message: {
//     color: '#333',
//     marginBottom: '1.5rem',
//   },
//   orderDetails: {
//     backgroundColor: '#f9f9f9',
//     borderRadius: '4px',
//     padding: '1rem',
//     textAlign: 'left',
//     marginBottom: '1.5rem',
//   },
//   sectionTitle: {
//     fontSize: '1.2rem',
//     marginBottom: '0.5rem',
//   },
//   notification: {
//     color: '#666',
//     fontSize: '0.9rem',
//     marginBottom: '1.5rem',
//   },
//   continueButton: {
//     backgroundColor: '#4CAF50',
//     color: 'white',
//     border: 'none',
//     borderRadius: '4px',
//     padding: '0.75rem 1.5rem',
//     fontSize: '1rem',
//     cursor: 'pointer',
//     transition: 'background-color 0.3s',
//   },
//   loaderContainer: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     minHeight: '100vh',
//   },
//   loader: {
//     border: '4px solid #f3f3f3',
//     borderTop: '4px solid #3498db',
//     borderRadius: '50%',
//     width: '40px',
//     height: '40px',
//     animation: 'spin 1s linear infinite',
//   },
//   '@keyframes spin': {
//     '0%': { transform: 'rotate(0deg)' },
//     '100%': { transform: 'rotate(360deg)' },
//   },
// };



import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { makeApi } from '../../api/callApi';
import styles from './LatestOrder.module.css';

const LatestOrder = () => {
  const [orderSummary, setOrderSummary] = useState(null);
  const { ordersummary } = useParams();
  const navigate = useNavigate()
  useEffect(() => {
    const fetchOrderSummary = async () => {
      try {
        const response = await makeApi("/api/get-my-second-order", "GET");
        setOrderSummary(response.data?.secondorders[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrderSummary();
  }, [ordersummary]);

  if (!orderSummary) {
    return (
      <div className={styles.loaderContainer}>
        <div className={styles.loader}></div>
      </div>
    );
  }

  const orderDate = new Date(orderSummary.createdAt).toLocaleDateString();
  const estimatedDelivery = new Date(orderSummary.createdAt);
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 7);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.checkmark}>✓</div>
        <h1 className={styles.title}>Order Placed Successfully!</h1>
        <p className={styles.message}>
          Thank you for your purchase. Your order has been received and is
          being processed.
        </p>
        <div className={styles.orderDetails}>
          <h2 className={styles.sectionTitle}>Order Details</h2>
          <p><strong>Order Number:</strong> {orderSummary._id}</p>
          <p><strong>Date:</strong> {orderDate}</p>
          <p><strong>Total Amount:</strong> ₹{orderSummary.CartId.totalPrice.toFixed(2)}</p>
          <p><strong>Estimated Delivery:</strong> {estimatedDelivery.toLocaleDateString()}</p>
        </div>
        <p className={styles.notification}>
          We'll send you an email with your order details and tracking
          information once your package has shipped.
        </p>
        <button onClick={() => navigate('/product/all-products')} className={styles.continueButton}>Continue Shopping</button>
      </div>
    </div>
  );
};

export default LatestOrder;