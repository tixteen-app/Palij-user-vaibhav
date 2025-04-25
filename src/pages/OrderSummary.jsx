import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { makeApi } from "../api/callApi";
import Primaryloader from "../components/loaders/primaryloader";
import styles from "./OrderSummary.module.css";
import { GoArrowLeft } from "react-icons/go";
import TaxInvoice from "./Taxinvoice";

const OrderSummary = () => {
  const [orderSummary, setOrderSummary] = useState(null);
  const { ordersummary } = useParams();
  const [shiprocketorder, setShiprocketorder] = useState(null);
  const [showInvoice, setShowInvoice] = useState(false);
  const navigate = useNavigate();
  const isRazorpay = orderSummary?.paymentMethod?.toLowerCase() === "razorpay";

  useEffect(() => {
    const fetchOrderSummary = async () => {
      try {
        const response = await makeApi(
          `/api/get-second-order-by-id/${ordersummary}`,
          "GET"
        );
        const fetchedOrderSummary = response.data.secondorder;
        setOrderSummary(fetchedOrderSummary);

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

    fetchOrderSummary();
  }, [ordersummary]);

  if (!orderSummary) {
    return (
      <div className={styles.loaderContainer}>
        <Primaryloader />
      </div>
    );
  }

  const handleInvoiceClick = () => {
    window.open(`/taxinvoice/${ordersummary}`, '_blank');
  };

  // Calculate order summary values
  // const calculateOrderSummary = () => {
  //   const cart = orderSummary.CartId;
  //   const subtotal = cart.totalPriceWithoutDiscount || 0;
  //   const deliveryCharges = cart.deliveryCharges || 0;
  //   const couponDiscount = cart.couapnDiscount || 0;
  //   const totalBeforeDiscount = subtotal + deliveryCharges;
  //   const finalTotal = cart.totalPrice || 0;
  //   const otherDiscounts = Math.max(0, (totalBeforeDiscount - couponDiscount) - finalTotal);

  //   return {
  //     subtotal,
  //     deliveryCharges,
  //     couponDiscount,
  //     totalBeforeDiscount,
  //     otherDiscounts,
  //     finalTotal
  //   };
  // };

  // const {
  //   subtotal,
  //   deliveryCharges,
  //   couponDiscount,
  //   totalBeforeDiscount,
  //   otherDiscounts,
  //   finalTotal
  // } = calculateOrderSummary();


  const calculateOrderSummary = () => {
    const cart = orderSummary.CartId;
    const subtotal = cart.totalPriceWithoutDiscount || 0;
    const deliveryCharges = cart.deliveryCharges || 0;
    const couponDiscount = cart.couapnDiscount || 0;
    
    // Calculate GST like in your cart logic
    let totalGstAmount = 0;
    let taxableAmount = 0;
  
    // Without coupon calculation
    if (!couponDiscount) {
      cart.orderItems.forEach(item => {
        const finalPrice = item.singleProductPrice || 0;
        const gstPercentage = item.productId?.category?.tax || 12;
        const basePrice = finalPrice / (1 + gstPercentage / 100);
  
        taxableAmount += basePrice * item.quantity;
        totalGstAmount += (finalPrice - basePrice) * item.quantity;
      });
    }
    // With coupon calculation
    else {
      const originalTotal = subtotal;
  
      cart.orderItems.forEach(item => {
        const finalPrice = item.singleProductPrice || 0;
        const gstPercentage = item.productId?.category?.tax || 12;
  
        // Calculate base price after item discount
        const itemBasePrice = finalPrice / (1 + gstPercentage / 100);
  
        // Calculate coupon discount proportion
        const itemShare = (finalPrice * item.quantity) / originalTotal;
        const itemDiscount = couponDiscount * itemShare;
  
        // Apply coupon discount to base price PER UNIT
        const discountedBasePerUnit = itemBasePrice - (itemDiscount / (1 + gstPercentage / 100)) / item.quantity;
  
        taxableAmount += discountedBasePerUnit * item.quantity;
        totalGstAmount += discountedBasePerUnit * (gstPercentage / 100) * item.quantity;
      });
    }
  
    // Use the actual paid amount from the order
    const finalTotal = cart.totalPrice || 0;
  
    return {
      subtotal,
      deliveryCharges,
      couponDiscount,
      taxAmount: totalGstAmount,
      taxableAmount,
      finalTotal
    };
  };
  const {
    subtotal,
    deliveryCharges,
    couponDiscount,
    taxAmount,
    taxableAmount,
    finalTotal
  } = calculateOrderSummary();

  return (
    <div>
      <div className={styles.userupdatebackButton} onClick={() => navigate(-1)}>
        <GoArrowLeft />
      </div>
      <div className={styles.invoiceContainer}>
        <h1 className={styles.invoiceTitle}>Order Details</h1>

        <button className={styles.invoiceButton} onClick={handleInvoiceClick}>
          Generate Invoice
        </button>

        <div className={styles.invoiceDetails}>
          <div className={styles.billingInfo}>
            <p>
              <strong>Customer Name: </strong> {orderSummary?.userId?.firstName}{" "}
              {orderSummary?.userId?.lastName}
            </p>
            <p>
              <strong>Email: </strong> {orderSummary?.userId?.email}
            </p>
            <p>
              <strong>Mobile Number: </strong> {orderSummary?.userId?.mobileNumber}
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

        <table className={styles.productTable}>
          <thead>
            <tr>
              <th>PRODUCT</th>
              <th>QTY</th>
              <th>UNIT PRICE</th>
              <th>AMOUNT</th>
            </tr>
          </thead>
          <tbody>
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
                  <div>
                    {/* <div> cake message : {item?.cakemessage}</div> */}

                  </div>
                </td>
                <td>{item.quantity}</td>
                <td>₹{item.singleProductPrice}</td>
                <td>₹{item.totalPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* <div className={styles.footerSection}>
          <div className={styles.totalSection}>
            <div className={styles.totalRow}> 
              <span><strong>Subtotal:</strong></span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            
            <div className={styles.totalRow}>
              <span><strong>Delivery Charges:</strong></span>
              <span>₹{deliveryCharges.toFixed(2)}</span>
            </div>
            
            <div className={styles.totalRow} style={{ borderTop: '1px solid #ddd', paddingTop: '8px' }}>
              <span><strong>Total Before Discount:</strong></span>
              <span>₹{totalBeforeDiscount.toFixed(2)}</span>
            </div>
            
            {couponDiscount > 0 && (
              <div className={styles.totalRow}>
                <span><strong>Coupon Discount ({orderSummary.CartId.coupancode}):</strong></span>
                <span>-₹{couponDiscount.toFixed(2)}</span>
              </div>
            )}
            
            {otherDiscounts > 0 && (
              <div className={styles.totalRow}>
                <span><strong>Other Discounts:</strong></span>
                <span>-₹{otherDiscounts.toFixed(2)}</span>
              </div>
            )}
            
            <div className={styles.totalRow} style={{ borderTop: '1px solid #ddd', paddingTop: '8px' }}>
              <span><strong>Final Total:</strong></span>
              <span>₹{finalTotal.toFixed(2)}</span>
            </div>
          </div>
        </div> */}

        <div className={styles.footerSection}>
          <div className={styles.totalSection}>
            <div className={styles.totalRow}>
              <span><strong>Subtotal:</strong></span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>

            {/* {couponDiscount > 0 && (
              <div className={styles.totalRow}>
                <span><strong>Coupon Discount ({orderSummary.CartId.coupancode}):</strong></span>
                <span>-₹{couponDiscount.toFixed(2)}</span>
              </div>
            )} */}

            <div className={styles.totalRow}>
              <span><strong>Taxable Amount:</strong></span>
              <span>₹{taxableAmount.toFixed(2)}</span>
            </div>

            <div className={styles.totalRow}>
              <span><strong>Tax (GST):</strong></span>
              <span>₹{taxAmount.toFixed(2)}</span>
            </div>

            <div className={styles.totalRow}>
              <span><strong>Delivery Charges:</strong></span>
              <span>₹{deliveryCharges.toFixed(2)}</span>
            </div>
            {orderSummary?.paymentMethod === "Razorpay" && (
            <div className={styles.totalRow}>
              <span><strong>Pre Paid discount :</strong></span>
              <span>₹-25</span>
            </div>
              
            )}

            <div className={styles.totalRow} style={{ borderTop: '1px solid #ddd', paddingTop: '8px' }}>
              <span><strong>Final Total:</strong></span>
              <span>₹{finalTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>


      </div>

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