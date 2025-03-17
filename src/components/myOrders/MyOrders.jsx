

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { makeApi } from "../../api/callApi.tsx";
// import Primaryloader from "../loaders/primaryloader.jsx";
// import styles from "./MyOrders.module.css";

// const MyOrders = () => {
// 	const [loading, setLoading] = useState(false);
// 	const [orders, setOrders] = useState([]);
// 	const [shiprocketOrders, setShiprocketOrders] = useState([]);
// 	console.log(shiprocketOrders.data[0].status	);

// 	useEffect(() => {
// 		const fetchOrders = async () => {
// 			try {
// 				setLoading(true);
// 				const response = await makeApi("/api/get-my-second-order", "GET");
// 				const SHipresponse = await makeApi("/api/shiprocket/get-orders-by-user-id", "GET");
// 				setShiprocketOrders(SHipresponse.data);

// 				setOrders(response.data.secondorders);
// 			} catch (error) {
// 				console.error("Error fetching orders:", error);
// 			} finally {
// 				setLoading(false);
// 			}
// 		};
// 		fetchOrders();
// 	}, []);



// 	return (
// 		<div className={styles.myOrders}>
// 			<div className="userprofile-heading">
// 				<h1>MY ORDERS</h1>
// 			</div>
// 			{loading ? (
// 				<div className={styles.loader}>
// 					<Primaryloader />
// 				</div>
// 			) : (orders?.length === 0 || orders === undefined || orders === null  ) ? (
// 				<div className={styles.noOrders}>No orders found</div>
// 			) : (
// 				<div className={styles.orderList}>
// 					{orders?.map((order) => (
// 						<div key={order._id} className={styles.orderCard}>
// 							<div className={styles.orderHeader}>
// 								<span className={styles.orderId}>Order #{order?._id.slice(-6)}</span>
// 								<span className={styles.orderDate}>{new Date(order?.createdAt).toLocaleDateString()}</span>
// 								<span className={`${styles.orderStatus} ${styles[order?.status.toLowerCase()]}`}>
// 									{order?.status}
// 								</span>
// 							</div>
// 							<div className={styles.orderItems}>
// 								{order?.CartId?.orderItems.map((item) => (
// 									<div key={item._id} className={styles.orderItem}>
// 										<img
// 											src={item?.productId.thumbnail}
// 											alt={item?.productId.name}
// 											className={styles.productImage}
// 										/>
// 										<div className={styles.productInfo}>
// 											<h3>{item?.productId.name}</h3>
// 											<p>Quantity: {item?.quantity}</p>
// 											<p className={styles.itemPrice}>₹{item?.totalPrice}</p>
// 										</div>
// 									</div>
// 								))}
// 							</div>
// 							<div className={styles.orderFooter}>
// 								<span className={styles.orderTotal}>
// 									Total: ₹{order?.CartId?.totalPrice}
// 								</span>
// 								<Link to={`/userprofile/myorders/${order._id}`} className={styles.viewButton}>
// 									View Details
// 								</Link>
// 							</div>
// 						</div>
// 					))}
// 				</div>
// 			)}
// 		</div>
// 	);
// };

// export default MyOrders;



// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { makeApi } from "../../api/callApi.tsx";
// import Primaryloader from "../loaders/primaryloader.jsx";
// import styles from "./MyOrders.module.css";

// const MyOrders = () => {
// 	const [loading, setLoading] = useState(false);
// 	const [orders, setOrders] = useState([]);
// 	const [shiprocketOrders, setShiprocketOrders] = useState([]);

// 	useEffect(() => {
// 		const fetchOrders = async () => {
// 			try {
// 				setLoading(true);
// 				const response = await makeApi("/api/get-my-second-order", "GET");
// 				const SHipresponse = await makeApi("/api/shiprocket/get-orders-by-user-id", "GET");
// 				await setShiprocketOrders(SHipresponse.data.data);
// 				await setOrders(response.data.secondorders);
// 			} catch (error) {
// 				console.error("Error fetching orders:", error);
// 			} finally {
// 				setLoading(false);
// 			}
// 		};
// 		fetchOrders();
// 	}, []);

// 	return (
// 		<div className={styles.myOrders}>
// 			<div className="userprofile-heading">
// 				<h1>MY ORDERS</h1>
// 			</div>
// 			{loading ? (
// 				<div className={styles.loader}>
// 					<Primaryloader />
// 				</div>
// 			) : orders?.length === 0 && shiprocketOrders?.length === 0 ? (
// 				<div className={styles.noOrders}>No orders found</div>
// 			) : (
// 				<div className={styles.orderList}>
// 					{[...orders, ...shiprocketOrders]?.map((order) => (
// 						<div key={order?._id} className={styles.orderCard}>
// 							<div className={styles.orderHeader}>
// 								{/* <span className={styles.orderId}>Order #{order?._id.slice(-6)}</span> */}
// 								<span className={styles.orderDate}>{new Date(order?.createdAt).toLocaleDateString()}</span>
// 								<span className={`${styles.orderStatus} ${styles[order?.status?.toLowerCase()]}`}>
// 									{order?.status || order?.shipment_status || "Pending"}
// 								</span>
// 							</div>
// 							<div className={styles.orderItems}>
// 								{order?.CartId?.orderItems?.map((item) => (
// 									<div key={item._id} className={styles.orderItem}>
// 										<img
// 											src={item?.productId?.thumbnail}
// 											alt={item?.productId?.name}
// 											className={styles.productImage}
// 										/>
// 										<div className={styles.productInfo}>
// 											<h3>{item?.productId?.name}</h3>
// 											<p>Quantity: {item?.quantity}</p>
// 											<p className={styles.itemPrice}>₹{item?.totalPrice}</p>
// 										</div>
// 									</div>
// 								))}
// 							</div>
// 							<div className={styles.orderFooter}>
// 								<span className={styles.orderTotal}>
// 									Total: ₹{order?.CartId?.totalPrice || order?.total_price}
// 								</span>
// 								<Link to={`/userprofile/myorders/${order._id}`} className={styles.viewButton}>
// 									View Details
// 								</Link>
// 							</div>
// 						</div>
// 					))}
// 				</div>
// 			)}
// 		</div>
// 	);
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

    // const getOrderStatus = (orderId) => {
    //     const shipOrder = shiprocketOrders.find((shipOrder) => shipOrder.id == orderId);
    //     const localorder  = orders.find((order) => order._id == orderId);
    //     console.log("--1",localorder?.status, shipOrder?.status);
    //     return shipOrder ? shipOrder.status : "Unknown";
    // };
    const getOrderStatus = (orderId) => {
    const localorder = orders.find((order) => order._id == orderId);
    const shipOrder = shiprocketOrders.find((shipOrder) => shipOrder.id == orderId);

    const shipstaus = shipOrder?.status
    const localstaus = localorder?.status
    console.log ("--", localstaus, shipstaus);

return localstaus || shipstaus || "Pending";
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
                    {orders?.map((order) => (
                        <div key={order._id} className={styles.orderCard}>
                            <div className={styles.orderHeader}>
                                <span className={styles.orderId}>Order #{order?._id.slice(-6)}</span>
                                <span className={styles.orderDate}>{new Date(order?.createdAt).toLocaleDateString()}</span>
                                <span className={`${styles.orderStatus} ${styles[getOrderStatus(order._id).toLowerCase()]}`}>
                                    {getOrderStatus(order.shiprocketOrderId)}
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
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyOrders;
