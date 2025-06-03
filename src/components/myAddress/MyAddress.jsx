// import React, { useState, useEffect } from "react";
// import "./myAddress.css";
// import { useNavigate } from "react-router";
// import { makeApi } from "../../api/callApi";

// const MyAddress = () => {
//   const [billingAddresses, setBillingAddresses] = useState([]);
//   const [shippingAddresses, setShippingAddresses] = useState([]);
//   const [deleteProductId, setDeleteProductId] = useState(null);
//   const navigate = useNavigate();

//   const handleDeleteConfirm = async () => {
//     if (!deleteProductId) return;

//     try {
//       if (billingAddresses.some((address) => address._id === deleteProductId)) {
//         await makeApi(`/api/delete-billing-address/${deleteProductId}`, "DELETE");
//         setBillingAddresses(billingAddresses.filter((address) => address._id !== deleteProductId));
//       } else if (shippingAddresses.some((address) => address._id === deleteProductId)) {
//         await makeApi(`/api/delete-shiped-address/${deleteProductId}`, "DELETE");
//         setShippingAddresses(shippingAddresses.filter((address) => address._id !== deleteProductId));
//       }
//     } catch (error) {
//       console.error("Error deleting address:", error);
//     } finally {
//       setDeleteProductId(null);
//     }
//   };

//   const fetchAddresses = async () => {
//     try {
//       const [billingResponse, shippingResponse] = await Promise.all([
//         makeApi("/api/get-my-billing-address", "GET"),
//         makeApi("/api/get-my-shiped-address", "GET")
//       ]);

//       if (billingResponse.data.success) {
//         setBillingAddresses(billingResponse.data.billingaddress);
//       }
//       if (shippingResponse.data.success) {
//         setShippingAddresses(shippingResponse.data.shipedaddress);
//       }
//     } catch (error) {
//       console.error("Error fetching addresses:", error);
//     }
//   };

//   useEffect(() => {
//     fetchAddresses();
//   }, []);

//   const renderAddressCard = (address, isShipping = true) => (
//     <div key={address._id} className="new_home_page_address-card">
//       <div className="new_home_page_address-header">
//         {/* <span className="new_home_page_address-name">{address.addressType || (isShipping ? "Shipping" : "Billing")}</span> */}
//         {address.isDefault && <span className="new_home_page_default-badge">Default</span>}
//       </div>
//       <p className="new_home_page_address-details m-0">
//         <b > {`${address.firstname || ''} ${address.lastname || ''}`}</b>
//         <br />
//         {address.address}
//         {address.landmark && `, ${address.landmark}`}
//         <br />
//         {`${address.city || ''}, ${address.state || ''} ${address.pincode || ''}`}
//         <br />
//         {address.mobileNumber && `Phone: +91 ${address.mobileNumber}`}
//       </p>
//       <div className="new_home_page_address-actions">
//         <button
//           className="new_home_page_edit-btn"
//           onClick={() => navigate(isShipping ? `/edit-shipping-address/${address._id}` : `/edit-billing-address/${address._id}`)}
//         >
//           Edit
//         </button>
//         <button
//           className="new_home_page_delete-btn"
//           onClick={() => setDeleteProductId(address._id)}
//         >
//           Delete
//         </button>
//       </div>
//     </div>
//   );

//   return (
//     <div className="new_home_page_tab-content new_home_page_address-tab">
//       <div className="new_home_page_section-title">
//         <h2>Saved Address</h2>
//       </div>

//       {shippingAddresses.length > 0 && (
//         <div className="w-100 d-flex justify-content-center flex-column align-items-center" >

//           <div className="d-flex flex-wrap gap-3 justify-content-between  shipping_address_list_new_main_div">
//             {/* <h3>Shipping Addresses</h3> */}
//             {shippingAddresses.map(address => renderAddressCard(address, true))}
//           </div>
//           <div className="button_Setion_new_add_address" >
//             <button
//               className="new_home_page_add-address-btn "
//               onClick={() => navigate("/shipping-address")}
//             >
//               Add New Address
//             </button>
//           </div>
//         </div>
//       )}


//       {/* Delete Confirmation Modal */}
//       {deleteProductId && (
//         <div className="confirmation-modal">
//           <div className="modal-content">
//             <h2>Confirm Deletion</h2>
//             <p>Are you sure you want to remove this address?</p>
//             <div className="modal-actions">
//               <button onClick={handleDeleteConfirm} className="confirm-btn">
//                 Confirm
//               </button>
//               <button onClick={() => setDeleteProductId(null)} className="cancel-btn">
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyAddress;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { makeApi } from "../../api/callApi";
import Primaryloader from "../loaders/primaryloader";
import "./myAddress.css";
import {
  FiPackage,
  FiCalendar,
  FiDollarSign,
  FiShoppingBag,
  FiTruck,
  FiX,
  FiCheck,
  FiAlertCircle,
} from "react-icons/fi";

const MyOrders = () => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [shiprocketOrders, setShiprocketOrders] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState(null);
  const [showMessage, setShowMessage] = useState({
    show: false,
    type: "",
    message: "",
  });
  const [cancellingId, setCancellingId] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const shipResponse = await makeApi(
          "/api/shiprocket/get-orders-by-user-id",
          "GET"
        );
        const response = await makeApi("/api/get-my-second-order", "GET");
        setShiprocketOrders(shipResponse.data.data);
        setOrders(response.data.secondorders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const getOrderStatus = (orderId) => {
    const localorder = orders.find((order) => order._id == orderId);
    const shipOrder = shiprocketOrders.find((shipOrder) => shipOrder.id == orderId);
    return localorder?.status || shipOrder?.status || "Processing";
  };

  const getStatusColor = (status) => {
    if (!status) return "processing";
    const lowerStatus = status.toLowerCase();
    if (lowerStatus.includes("pending")) return "pending";
    if (lowerStatus.includes("process")) return "processing";
    if (lowerStatus.includes("ship")) return "shipped";
    if (lowerStatus.includes("deliver")) return "delivered";
    if (lowerStatus.includes("cancel")) return "cancelled";
    return "processing";
  };

  const handleCancelClick = (orderId) => {
    setOrderToCancel(orderId);
    setShowConfirmation(true);
  };

  const handleCancelConfirm = async () => {
    if (!orderToCancel) return;

    try {
      setCancellingId(orderToCancel);
      await makeApi(`/api/shiprocket/cancel-order-by-id/${orderToCancel}`, "POST");

      // Update local state
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderToCancel || order.shiprocketOrderId === orderToCancel
            ? { ...order, status: "Cancelled" }
            : order
        )
      );

      setShiprocketOrders((prevShipOrders) =>
        prevShipOrders.map((order) =>
          order.id === orderToCancel ? { ...order, status: "Cancelled" } : order
        )
      );

      // Show success message
      setShowMessage({
        show: true,
        type: "success",
        message: "Order cancelled successfully!",
      });
    } catch (error) {
      console.error("Error cancelling order:", error);
      setShowMessage({
        show: true,
        type: "error",
        message: "Failed to cancel order. Please try again.",
      });
    } finally {
      setCancellingId(null);
      setShowConfirmation(false);
      setOrderToCancel(null);

      // Auto-hide message after 3 seconds
      setTimeout(() => {
        setShowMessage({ show: false, type: "", message: "" });
      }, 3000);
    }
  };

  const handleCancelModal = () => {
    setShowConfirmation(false);
    setOrderToCancel(null);
  };

  const canCancelOrder = (status) => {
    const lowerStatus = (status || "").toLowerCase();
    return (
      !lowerStatus.includes("cancel") &&
      !lowerStatus.includes("deliver") &&
      !lowerStatus.includes("ship")
    );
  };

  return (
    <div className={styles.myOrders}>
      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className={styles.confirmationModal}>
          <div className={styles.modalContent}>
            <h2>
              <FiAlertCircle /> Confirm Cancellation
            </h2>
            <p>Are you sure you want to cancel this order?</p>
            <div className={styles.modalActions}>
              <button
                onClick={handleCancelConfirm}
                className={styles.confirmBtn}
                disabled={cancellingId === orderToCancel}
              >
                {cancellingId === orderToCancel ? "Processing..." : "Confirm"}
              </button>
              <button
                onClick={handleCancelModal}
                className={styles.cancelBtn}
                disabled={cancellingId === orderToCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Message Popup */}
      {showMessage.show && (
        <div className={`${styles.messagePopup} ${styles[showMessage.type]}`}>
          <div className={styles.messageContent}>
            {showMessage.type === "success" ? (
              <FiCheck className={styles.messageIcon} />
            ) : (
              <FiAlertCircle className={styles.messageIcon} />
            )}
            <p>{showMessage.message}</p>
          </div>
        </div>
      )}

      <div className={styles.header}>
        <h1>
          <FiShoppingBag /> My Orders
        </h1>
      </div>

      {loading ? (
        <div className={styles.loader}>
          <Primaryloader />
          <p>Loading your orders...</p>
        </div>
      ) : orders?.length === 0 || orders === undefined || orders === null ? (
        <div className={styles.noOrders}>
          <FiPackage size={48} />
          <h3>No Orders Found</h3>
          <p>You haven't placed any orders yet.</p>
          <Link to="/products" className={styles.shopButton}>
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className={styles.orderList}>
          {orders?.map((order) => {
            const status = order.shiprocketOrderId
              ? getOrderStatus(order.shiprocketOrderId)
              : getOrderStatus(order._id);
            const statusColor = getStatusColor(status);

            return (
              <div key={order._id} className={styles.orderCard}>
                <div className={styles.orderHeader}>
                  <div className={styles.orderMeta}>
                    <span className={styles.orderId}>
                      <FiPackage /> Order #{order?.orderId || order?._id.slice(-6)}
                    </span>
                    <span className={styles.orderDate}>
                      <FiCalendar />{" "}
                      {new Date(order?.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <span className={`${styles.orderStatus} ${styles[statusColor]}`}>
                    {status}
                  </span>
                </div>

                <div className={styles.orderItems}>
                  {order?.CartId?.orderItems.map((item) => (
                    <div key={item._id} className={styles.orderItem}>
                      <img
                        src={item?.productId?.thumbnail}
                        alt={item?.productId?.name}
                        className={styles.productImage}
                        onError={(e) => {
                          e.target.src = "/path-to-default-image.jpg";
                        }}
                      />
                      <div className={styles.productInfo}>
                        <h3>{item?.productId?.name}</h3>
                        <p>Quantity: {item?.quantity}</p>
                        <p className={styles.itemPrice}>
                          ₹{item?.totalPrice.toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className={styles.orderFooter}>
                  <span className={styles.orderTotal}>
                    Total: ₹{order?.CartId?.totalPrice.toLocaleString("en-IN")}
                  </span>
                  <div className={styles.actionButtons}>
                    <Link
                      to={`/userprofile/myorders/${order._id}`}
                      className={styles.viewButton}
                    >
                      View Details
                    </Link>

                    {canCancelOrder(status) && (
                      <button
                        onClick={() =>
                          handleCancelClick(order.shiprocketOrderId || order._id)
                        }
                        className={styles.cancelButton}
                        disabled={cancellingId === (order.shiprocketOrderId || order._id)}
                      >
                        {cancellingId === (order.shiprocketOrderId || order._id) ? (
                          "Cancelling..."
                        ) : (
                          <>
                            <FiX /> Cancel
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyOrders;