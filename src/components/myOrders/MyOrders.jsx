
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { makeApi } from "../../api/callApi.tsx";
// import Primaryloader from "../loaders/primaryloader.jsx";
// import styles from "./MyOrders.module.css";

// const MyOrders = () => {
//     const [loading, setLoading] = useState(false);
//     const [orders, setOrders] = useState([]);
//     const [shiprocketOrders, setShiprocketOrders] = useState([]);

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

//     // const getOrderStatus = (orderId) => {
//     //     const shipOrder = shiprocketOrders.find((shipOrder) => shipOrder.id == orderId);
//     //     const localorder  = orders.find((order) => order._id == orderId);
//     //     console.log("--1",localorder?.status, shipOrder?.status);
//     //     return shipOrder ? shipOrder.status : "Unknown";
//     // };
//     const getOrderStatus = (orderId) => {
//     const localorder = orders.find((order) => order._id == orderId);
//     const shipOrder = shiprocketOrders.find((shipOrder) => shipOrder.id == orderId);

//     const shipstaus = shipOrder?.status
//     const localstaus = localorder?.status
//     console.log ("--", localstaus, shipstaus);

// return localstaus || shipstaus ;
// };


//     return (
//         <div className={styles.myOrders}>
//             <div className="userprofile-heading">
//                 <h1>MY ORDERS</h1>
//             </div>
//             {loading ? (
//                 <div className={styles.loader}>
//                     <Primaryloader />
//                 </div>
//             ) : orders?.length === 0 || orders === undefined || orders === null ? (
//                 <div className={styles.noOrders}>No orders found</div>
//             ) : (
//                 <div className={styles.orderList}>
//                     {orders?.map((order) => (
//                         <div key={order._id} className={styles.orderCard}>
//                             <div className={styles.orderHeader}>
//                                 {/* <span className={styles.orderId}>Order #{order?._id.slice(-6)}</span> */}
//                                 <span className={styles.orderId}>Order #{order?.orderId}</span>
//                                 <span className={styles.orderDate}>{new Date(order?.createdAt).toLocaleDateString()}</span>
//                                 <span className={`${styles.orderStatus} ${styles[getOrderStatus(order._id).toLowerCase()]}`}>
//                                 {order.shiprocketOrderId ? getOrderStatus(order.shiprocketOrderId) : getOrderStatus(order._id)}
  
//                                 </span>
//                             </div>
//                             <div className={styles.orderItems}>
//                                 {order?.CartId?.orderItems.map((item) => (
//                                     <div key={item._id} className={styles.orderItem}>
//                                         <img
//                                             src={item?.productId?.thumbnail}
//                                             alt={item?.productId?.name}
//                                             className={styles.productImage}
//                                         />
//                                         <div className={styles.productInfo}>
//                                             <h3>{item?.productId?.name}</h3>
//                                             <p>Quantity: {item?.quantity}</p>
//                                             <p className={styles.itemPrice}>₹{item?.totalPrice}</p>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                             <div className={styles.orderFooter}>
//                                 <span className={styles.orderTotal}>
//                                     Total: ₹{order?.CartId?.totalPrice}
//                                 </span>
//                                 <Link to={`/userprofile/myorders/${order._id}`} className={styles.viewButton}>
//                                     View Details
//                                 </Link>
//                             </div>
//                         </div>
//                     ))}
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
import { FiPackage, FiCalendar, FiDollarSign, FiShoppingBag } from "react-icons/fi";

const MyOrders = () => {
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState([]);
    const [shiprocketOrders, setShiprocketOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const shipResponse = await makeApi("/api/shiprocket/get-orders-by-user-id", "GET");
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
                                                    <FiDollarSign /> ₹{item?.totalPrice.toLocaleString('en-IN')}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                
                                <div className={styles.orderFooter}>
                                    <span className={styles.orderTotal}>
                                        Total: ₹{order?.CartId?.totalPrice.toLocaleString('en-IN')}
                                    </span>
                                    <Link 
                                        to={`/userprofile/myorders/${order._id}`} 
                                        className={styles.viewButton}
                                    >
                                        View Details
                                    </Link>
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