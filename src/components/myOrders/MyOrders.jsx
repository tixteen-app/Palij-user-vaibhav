// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { makeApi } from "../../api/callApi.tsx";
// import Primaryloader from "../loaders/primaryloader.jsx";
// import styles from "./MyOrders.module.css";
// import { FiPackage, FiCalendar, FiDollarSign, FiShoppingBag, FiTruck, FiX } from "react-icons/fi";

// const MyOrders = () => {
//     const [loading, setLoading] = useState(false);
//     const [orders, setOrders] = useState([]);
//     const [shiprocketOrders, setShiprocketOrders] = useState([]);
//     const [showConfirmDialog, setShowConfirmDialog] = useState(false);
//     const [orderToCancel, setOrderToCancel] = useState(null);
//     const [errorMessage, setErrorMessage] = useState(null);

//     useEffect(() => {
//         const fetchOrders = async () => {
//             try {
//                 setLoading(true);
//                 const shipResponse = await makeApi("/api/shiprocket/get-orders-by-user-id", "GET");
//                 const response = await makeApi("/api/get-my-second-order", "GET");
//                 setShiprocketOrders(shipResponse.data.data);
//                 setOrders(response.data.secondorders);
//             } catch (error) {
//                 console.error("Error fetching orders:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchOrders(); 
//     }, []);

//     const getOrderStatus = (orderId) => {
//         const localorder = orders.find((order) => order._id == orderId);
//         const shipOrder = shiprocketOrders.find((shipOrder) => shipOrder.id == orderId);
//         return localorder?.status || shipOrder?.status || "Processing";
//     };

//     const getStatusColor = (status) => {
//         if (!status) return "processing";
//         const lowerStatus = status.toLowerCase();
//         if (lowerStatus.includes("pending")) return "pending";
//         if (lowerStatus.includes("process")) return "processing";
//         if (lowerStatus.includes("ship")) return "shipped";
//         if (lowerStatus.includes("deliver")) return "delivered";
//         if (lowerStatus.includes("cancel")) return "cancelled";
//         return "processing";
//     };  

//     const handleCancelClick = (orderId) => {
//         setOrderToCancel(orderId);
//         setShowConfirmDialog(true);
//     };

//     const handleCancelOrder = async () => {
//         try {
//             setLoading(true);
//             await makeApi(`/api/shiprocket/cancel-order-by-id/${orderToCancel}`, "POST");
            
//             // Update the local state to reflect the cancellation
//             setOrders(prevOrders => 
//                 prevOrders.map(order => 
//                     order._id === orderToCancel || order.shiprocketOrderId === orderToCancel
//                         ? { ...order, status: "Cancelled" }
//                         : order
//                 )
//             );
            
//             // Also update shiprocket orders if needed
//             setShiprocketOrders(prevShipOrders => 
//                 prevShipOrders.map(order => 
//                     order.id === orderToCancel
//                         ? { ...order, status: "Cancelled" }
//                         : order
//                 )
//             );
            
//         } catch (error) {
//             console.error("Error cancelling order:", error);
//             setErrorMessage("Failed to cancel order. Please try again.");
//         } finally {
//             setLoading(false);
//             setShowConfirmDialog(false);
//             setOrderToCancel(null);
//         }
//     };

//     const closeConfirmDialog = () => {
//         setShowConfirmDialog(false);
//         setOrderToCancel(null);
//     };

//     const closeErrorPopup = () => {
//         setErrorMessage(null);
//     };

//     const canCancelOrder = (status) => {
//         const lowerStatus = (status || "").toLowerCase();
//         return !lowerStatus.includes("cancel") && 
//                !lowerStatus.includes("deliver") && 
//                !lowerStatus.includes("ship");
//     };

//     return (
//         <div className={styles.myOrders}>
//             <div className={styles.header}>
//                 <h1><FiShoppingBag /> My Orders</h1>
//             </div>
            
//             {loading ? (
//                 <div className={styles.loader}>
//                     <Primaryloader />
//                     <p>Loading your orders...</p>
//                 </div>
//             ) : orders?.length === 0 || orders === undefined || orders === null ? (
//                 <div className={styles.noOrders}>
//                     <FiPackage size={48} />
//                     <h3>No Orders Found</h3>
//                     <p>You haven't placed any orders yet.</p>
//                     <Link to="/products" className={styles.shopButton}>
//                         Start Shopping
//                     </Link>
//                 </div>
//             ) : (
//                 <div className={styles.orderList}>
//                     {orders?.map((order) => {
//                         const status = order.shiprocketOrderId ? 
//                             getOrderStatus(order.shiprocketOrderId) : 
//                             getOrderStatus(order._id);
//                         const statusColor = getStatusColor(status);
                        
//                         return (
//                             <div key={order._id} className={styles.orderCard}>
//                                 <div className={styles.orderHeader}>
//                                     <div className={styles.orderMeta}>
//                                         <span className={styles.orderId}>
//                                             <FiPackage /> Order #{order?.orderId || order?._id.slice(-6)}
//                                         </span>
//                                         <span className={styles.orderDate}>
//                                             <FiCalendar /> {new Date(order?.createdAt).toLocaleDateString('en-IN', {
//                                                 day: 'numeric',
//                                                 month: 'long',
//                                                 year: 'numeric'
//                                             })}
//                                         </span>
//                                     </div>
//                                     <span className={`${styles.orderStatus} ${styles[statusColor]}`}>
//                                         {status}
//                                     </span>
//                                 </div>
                                
//                                 <div className={styles.orderItems}>
//                                     {order?.CartId?.orderItems.map((item) => (
//                                         <div key={item._id} className={styles.orderItem}>
//                                             <img
//                                                 src={item?.productId?.thumbnail}
//                                                 alt={item?.productId?.name}
//                                                 className={styles.productImage}
//                                                 onError={(e) => {
//                                                     e.target.src = '/path-to-default-image.jpg';
//                                                 }}
//                                             />
//                                             <div className={styles.productInfo}>
//                                                 <h3>{item?.productId?.name}</h3>
//                                                 <p>Quantity: {item?.quantity}</p>
//                                                 <p className={styles.itemPrice}>
//                                                     ₹{item?.totalPrice.toLocaleString('en-IN')}
//                                                 </p>
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
                                
//                                 <div className={styles.orderFooter}>
//                                     <span className={styles.orderTotal}>
//                                          Total: ₹{order?.CartId?.totalPrice.toLocaleString('en-IN')}
//                                     </span>
//                                     <div className={styles.actionButtons}>
//                                         <Link 
//                                             to={`/userprofile/myorders/${order._id}`} 
//                                             className={styles.viewButton}
//                                         >
//                                             View Details
//                                         </Link>
                                       
//                                         {canCancelOrder(status) && (
//                                             <button 
//                                                 onClick={() => handleCancelClick(order.shiprocketOrderId || order._id)}
//                                                 className={styles.cancelButton}
//                                             >
//                                                 <FiX /> Cancel
//                                             </button>
//                                         )}
//                                     </div>
//                                 </div> 
//                             </div>
//                         );
//                     })}
//                 </div>
//             )}

//             {/* Confirmation Dialog */}
//             {showConfirmDialog && (
//                 <div className="confirmation-dialog">
//                     <div className="dialog-content">
//                         <h2>Confirm Cancellation</h2>
//                         <p>Are you sure you want to cancel this order?</p>
//                         <div className="dialog-buttons_both">
//                             <button 
//                                 onClick={handleCancelOrder} 
//                                 className="confirm-button" 
//                                 style={{ background: 'var(--shadebuttncolor)' }}
//                                 disabled={loading}
//                             >
//                                 {loading ? 'Processing...' : 'Confirm'}
//                             </button>
//                             <button 
//                                 onClick={closeConfirmDialog} 
//                                 className="cancel-button"
//                                 disabled={loading}
//                             >
//                                 Cancel
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {/* Error Popup */}
//             {errorMessage && (
//                 <div className="confirmation-dialog">
//                     <div className="dialog-content">
//                         <h2>Error</h2>
//                         <p>{errorMessage}</p>
//                         <div className="dialog-buttons_both">
//                             <button 
//                                 onClick={closeErrorPopup} 
//                                 className="confirm-button" 
//                                 style={{ background: 'var(--shadebuttncolor)' }}
//                             >
//                                 OK
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default MyOrders;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { makeApi } from "../../api/callApi.tsx";
import Primaryloader from "../loaders/primaryloader.jsx";
import styles from "./MyOrders.module.css";
import { FiPackage, FiCalendar, FiDollarSign, FiShoppingBag, FiTruck, FiX } from "react-icons/fi";

const MyOrders = () => {
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState([]);
    const [shiprocketOrders, setShiprocketOrders] = useState([]);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [orderToCancel, setOrderToCancel] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [cancelling, setCancelling] = useState(false);

    const fetchAllOrders = async () => {
        try {
            setLoading(true);
            const [shipResponse, localResponse] = await Promise.all([
                makeApi("/api/shiprocket/get-orders-by-user-id", "GET"),
                makeApi("/api/get-my-second-order", "GET")
            ]);
            setShiprocketOrders(shipResponse.data.data);
            setOrders(localResponse.data.secondorders);
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllOrders();
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

    const handleCancelClick = (orderId, hasShiprocketId) => {
        setOrderToCancel({ id: orderId, hasShiprocketId });
        setShowConfirmDialog(true);
    };

    const handleCancelOrder = async () => {
        try {
            setCancelling(true);
            
            if (orderToCancel.hasShiprocketId) {
                // Cancel Shiprocket order
                await makeApi(`/api/shiprocket/cancel-order-by-id/${orderToCancel.id}`, "POST");
            } else {
                // Cancel local order
                await makeApi(`/api/update-second-order-by-id/${orderToCancel.id}`, "PUT", { status: "Canceled" });
            }
            
            // Refresh both order lists
            await fetchAllOrders();
            
        } catch (error) {
            console.error("Error cancelling order:", error);
            setErrorMessage("Failed to cancel order. Please try again.");
        } finally {
            setCancelling(false);
            setShowConfirmDialog(false);
            setOrderToCancel(null);
        }
    };

    const closeConfirmDialog = () => {
        setShowConfirmDialog(false);
        setOrderToCancel(null);
    };

    const closeErrorPopup = () => {
        setErrorMessage(null);
    };

    const canCancelOrder = (status) => {
        const lowerStatus = (status || "").toLowerCase();
        return !lowerStatus.includes("cancel") && 
               !lowerStatus.includes("deliver") && 
               !lowerStatus.includes("ship");
    };

    return (
        <div className={styles.myOrders}>
            <div className={styles.header}>
                <h1><FiShoppingBag /> My Orders</h1>
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
                        const status = order.shiprocketOrderId ? 
                            getOrderStatus(order.shiprocketOrderId) : 
                            getOrderStatus(order._id);
                        const statusColor = getStatusColor(status);
                        const hasShiprocketId = !!order.shiprocketOrderId;
                        
                        return (
                            <div key={order._id} className={styles.orderCard}>
                                <div className={styles.orderHeader}>
                                    <div className={styles.orderMeta}>
                                        <span className={styles.orderId}>
                                            <FiPackage /> Order #{order?.orderId || order?._id.slice(-6)}
                                        </span>
                                        <span className={styles.orderDate}>
                                            <FiCalendar /> {new Date(order?.createdAt).toLocaleDateString('en-IN', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric'
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
                                                    e.target.src = '/path-to-default-image.jpg';
                                                }}
                                            />
                                            <div className={styles.productInfo}>
                                                <h3>{item?.productId?.name}</h3>
                                                <p>Quantity: {item?.quantity}</p>
                                                <p className={styles.itemPrice}>
                                                    ₹{item?.totalPrice.toLocaleString('en-IN')}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                
                                <div className={styles.orderFooter}>
                                    <span className={styles.orderTotal}>
                                         Total: ₹{order?.CartId?.totalPrice.toLocaleString('en-IN')}
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
                                                onClick={() => handleCancelClick(
                                                    hasShiprocketId ? order.shiprocketOrderId : order._id, 
                                                    hasShiprocketId
                                                )}
                                                className={styles.cancelButton}
                                                disabled={cancelling}
                                            >
                                                <FiX /> {cancelling && orderToCancel?.id === (hasShiprocketId ? order.shiprocketOrderId : order._id) ? 'Cancelling...' : 'Cancel'}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Confirmation Dialog */}
            {showConfirmDialog && (
                <div className="confirmation-dialog">
                    <div className="dialog-content">
                        <h2>Confirm Cancellation</h2>
                        <p>Are you sure you want to cancel this order?</p>
                        <div className="dialog-buttons_both">
                            <button 
                                onClick={handleCancelOrder} 
                                className="confirm-button" 
                                style={{ background: 'var(--shadebuttncolor)' }}
                                disabled={cancelling}
                            >
                                {cancelling ? 'Processing...' : 'Confirm'}
                            </button>
                            <button 
                                onClick={closeConfirmDialog} 
                                className="cancel-button"
                                disabled={cancelling}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Error Popup */}
            {errorMessage && (
                <div className="confirmation-dialog">
                    <div className="dialog-content">
                        <h2>Error</h2>
                        <p>{errorMessage}</p>
                        <div className="dialog-buttons_both">
                            <button 
                                onClick={closeErrorPopup} 
                                className="confirm-button" 
                                style={{ background: 'var(--shadebuttncolor)' }}
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyOrders;