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
//                 const response = await makeApi("/api/get-my-second-order", "GET");
//                 const shipResponse = await makeApi("/api/shiprocket/get-orders-by-user-id", "GET");
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
//         // Find shipOrder and localOrder synchronously (no await needed)
//         const shipOrder = shiprocketOrders.find((shipOrder) => shipOrder.id == orderId);
//         const localorder = orders.find((order) => order._id == orderId);
//         if (shipOrder?.status !== undefined) {
//             console.log("--1", shipOrder.status);
//             return shipOrder.status;
//         } else if (localorder?.status) {
//             console.log("--2", localorder.status);
//             return localorder.status;
//         }
    
//         return "Unknown";
//     };
    
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
//                                 <span className={styles.orderId}>Order #{order?._id.slice(-6)}</span>
//                                 <span className={styles.orderDate}>{new Date(order?.createdAt).toLocaleDateString()}</span>
//                                 <span className={`${styles.orderStatus} ${styles[getOrderStatus(order._id).toLowerCase()]}`}>
//                                     {getOrderStatus(order.shiprocketOrderId)}
//                                 </span>
//                             </div>
//                             <div className={styles.orderItems}>
//                                 {order?.CartId?.orderItems.map((item) => (
//                                     <div key={item._id} className={styles.orderItem}>
//                                         <img
//                                             src={item?.productId.thumbnail}
//                                             alt={item?.productId.name}
//                                             className={styles.productImage}
//                                         />
//                                         <div className={styles.productInfo}>
//                                             <h3>{item?.productId.name}</h3>
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

const MyOrders = () => {
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState([]);
    const [shiprocketOrders, setShiprocketOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const response = await makeApi("/api/get-my-second-order", "GET");
                const shipResponse = await makeApi("/api/shiprocket/get-orders-by-user-id", "GET");
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
        // Find shipOrder and localOrder synchronously (no await needed)
        const shipOrder = shiprocketOrders.find((shipOrder) => shipOrder.id == orderId);
        const localorder = orders.find((order) => order._id == orderId);
        if (shipOrder?.status !== undefined) {
            console.log("--1", shipOrder.status);
            return shipOrder.status;
        } else if (localorder?.status) {
            console.log("--2", localorder.status);
            return localorder.status;
        }
    
        return "Unknown";
    };
    
    return (
        <div className={styles.myOrders}>
            <div className="userprofile-heading">
                <h1>MY ORDERS</h1>
            </div>
            {loading ? (
                <div className={styles.loader}>
                    <Primaryloader />
                </div>
            ) : orders?.length === 0 || orders === undefined || orders === null ? (
                <div className={styles.noOrders}>No orders found</div>
            ) : (
                <div className={styles.orderList}>
                    {orders?.map((order) => {
                        const status = getOrderStatus(order._id);
                        return (
                            <div key={order._id} className={styles.orderCard}>
                                <div className={styles.orderHeader}>
                                    <span className={styles.orderId}>Order #{order?._id.slice(-6)}</span>
                                    <span className={styles.orderDate}>{new Date(order?.createdAt).toLocaleDateString()}</span>
                                    <span className={`${styles.orderStatus} ${styles[status.toLowerCase()]}`}>
                                        {status}
                                    </span>
                                </div>
                                <div className={styles.orderItems}>
                                    {order?.CartId?.orderItems.map((item) => (
                                        <div key={item._id} className={styles.orderItem}>
                                            <img
                                                src={item?.productId.thumbnail}
                                                alt={item?.productId.name}
                                                className={styles.productImage}
                                            />
                                            <div className={styles.productInfo}>
                                                <h3>{item?.productId.name}</h3>
                                                <p>Quantity: {item?.quantity}</p>
                                                <p className={styles.itemPrice}>₹{item?.totalPrice}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className={styles.orderFooter}>
                                    <span className={styles.orderTotal}>
                                        Total: ₹{order?.CartId?.totalPrice}
                                    </span>
                                    <Link to={`/userprofile/myorders/${order._id}`} className={styles.viewButton}>
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