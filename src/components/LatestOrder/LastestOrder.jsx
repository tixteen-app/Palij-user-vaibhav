
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
          <p><strong>Order Number:</strong> {orderSummary.orderId}</p>
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