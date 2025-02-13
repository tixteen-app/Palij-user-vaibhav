function OrderConfirmed({ orderDetails }) {
  if (!orderDetails) return null;

  return (
    <div>
      <h2>Order Confirmed</h2>
      <p>Order ID: {orderDetails.orderId}</p>
      {/* Display other relevant order details */}
    </div>
  );
}
