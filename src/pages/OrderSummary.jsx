import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { makeApi } from "../api/callApi";
import Primaryloader from "../components/loaders/primaryloader";
import styles from "./OrderSummary.module.css";
import { GoArrowLeft } from "react-icons/go";
import TaxInvoice from "./Taxinvoice"; // Import the TaxInvoice component

const OrderSummary = () => {
  const [orderSummary, setOrderSummary] = useState(null);
  const { ordersummary } = useParams();
  const [shiprocketorder, setShiprocketorder] = useState(null);
  const [showInvoice, setShowInvoice] = useState(false); // State to control invoice visibility
  const navigate = useNavigate();
  const isRazorpay = orderSummary?.paymentMethod.toLowerCase() === "razorpay";

  useEffect(() => {
    const fetchOrderSummary = async () => {
      try {
        // Fetch order summary data
        const response = await makeApi(
          `/api/get-second-order-by-id/${ordersummary}`,
          "GET"
        );
        // If order summary is successful, set it to state
        const fetchedOrderSummary = response.data.secondorder;
        setOrderSummary(fetchedOrderSummary);

        // Once orderSummary is set, check if shiprocketOrderId is available
        if (fetchedOrderSummary?.shiprocketOrderId) {
          const Shipresponse = await makeApi(
            `/api/shiprocket/get-order-by-id/${fetchedOrderSummary.shiprocketOrderId}`,
            "GET"
          );
          setShiprocketorder(Shipresponse?.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    // Call the function to fetch order summary
    fetchOrderSummary();
  }, [ordersummary]);

  if (!orderSummary) {
    return (
      <div className={styles.loaderContainer}>
        <Primaryloader />
      </div>
    );
  }

  // Function to handle invoice button click
  // const handleInvoiceClick = () => {
  //   navigate(`/taxinvoice/${ordersummary}`);
  // };
  const handleInvoiceClick = () => {
    window.open(`/taxinvoice/${ordersummary}`, '_blank');
  };
  

  return (
    <div>
      <div className={styles.userupdatebackButton} onClick={() => navigate(-1)}>
        <GoArrowLeft />
      </div>
      <div className={styles.invoiceContainer}>
        <h1 className={styles.invoiceTitle}>Order Details</h1>

        {/* Invoice Button */}
        <button className={styles.invoiceButton} onClick={handleInvoiceClick}>
          Generate Invoice
        </button>

        <div className={styles.invoiceDetails}>
          <div className={styles.billingInfo}>
            <p>
              <strong>Customer Name: </strong> {orderSummary?.userId.firstName}{" "}
              {orderSummary?.userId.lastName}
            </p>
            <p>
              <strong>Email: </strong> {orderSummary?.userId.email}
            </p>
            <p>
              <strong>Mobile Number: </strong> {orderSummary?.userId.mobileNumber}
            </p>
          </div>
          <div className={styles.invoiceInfo}>
            <p>
              <strong>Order ID:</strong> {orderSummary?.orderId}
            </p>
            <p>
              <strong>Status:</strong> {shiprocketorder?.data?.status ? <>{shiprocketorder?.data?.status}</> : <>{orderSummary?.status}</>}
            </p>
            <p>
              <strong>Payment Method:</strong> {orderSummary?.paymentMethod}
            </p>
            {isRazorpay && (
              <p>
                <strong>Payment ID:</strong> {orderSummary?.paymentId}
              </p>
            )}
            <p>
              <strong>Issued:</strong>{" "}
              {new Date(orderSummary?.createdAt).toLocaleDateString()}
            </p>
            <p>
              <strong>Shipping Address: </strong>
              {orderSummary?.shippingAddress?.firstname}{" "}
              {orderSummary?.shippingAddress?.lastname}{" "}
              {orderSummary?.shippingAddress?.address}
              <br />
              {orderSummary?.shippingAddress?.city},{" "}
              {orderSummary?.shippingAddress?.state}{" "}
              {orderSummary?.shippingAddress?.pincode}{" "}
              {orderSummary?.shippingAddress?.country}
              <br />
              Phone: {orderSummary?.shippingAddress?.phonenumber}
            </p>
          </div>
        </div>

        <table className={styles.productTable} >
          <thead  >
            <tr>
              <th>PRODUCT</th>
              <th>QTY</th>
              <th>UNIT PRICE</th>
              <th>AMOUNT</th>
            </tr>
          </thead>
          <tbody  >
            {orderSummary?.CartId?.orderItems?.map((item) => (
              <tr key={item._id}>
                <td>
                  <div className={styles.productInfo}>
                    <img
                      src={item.productId?.thumbnail}
                      alt={item.productId?.name}
                      className={styles.productImage}
                    />
                    <span>{item.productId?.name}</span>
                  </div>
                </td>
                <td>{item.quantity}</td>
                <td>{item.singleProductPrice}</td>
                <td>₹{item.totalPrice} </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles.footerSection}>
          <div className={styles.totalSection}>
            <div className={styles.totalRow}>
              <span>
                <strong>Subtotal:</strong>
              </span>
              <span>₹ {orderSummary.CartId.totalPriceWithoutDiscount} </span>
            </div>
            {orderSummary.CartId.couapnDiscount > 0 && (
              <div className={styles.totalRow}>
                <span>
                  <strong>Coupan Discount:</strong>
                </span>
                <span>₹ {orderSummary.CartId.couapnDiscount}</span>
              </div>
            )}
            <div className={styles.totalRow}>
              <span>
                <strong>Shipping Price:</strong>
              </span>
              <span>₹ {orderSummary.CartId.deliveryCharges}</span>
            </div>
            {/* {
              orderSummary?.paymentMethod === "Razorpay" && (
                <div className={styles.totalRow}>
                  <span>
                    <strong>Per paid discount:</strong>
                  </span>
                  <span> - ₹25</span>
                </div>
              )
            } */}
            <div className={styles.totalRow}>
              <span>
                <strong> Total discount:</strong>
              </span>
              <span>  ₹{orderSummary?.CartId.totalPrice - orderSummary?.CartId.totalPriceWithoutDiscount}</span>
            </div>
            <div className={styles.totalRow}>
              <span>
                <strong>Total:</strong>
              </span>
              <span>₹ {orderSummary.CartId.totalPrice} </span>
            </div>
          </div>
        </div>
      </div>

      {/* Render TaxInvoice component if showInvoice is true */}
      {showInvoice && (
        <TaxInvoice
          orderSummary={orderSummary}
          onClose={() => setShowInvoice(false)}
        />
      )}
    </div>
  );
};

export default OrderSummary;