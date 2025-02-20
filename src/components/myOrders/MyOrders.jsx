

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { makeApi } from "../../api/callApi.tsx";
import Primaryloader from "../loaders/primaryloader.jsx";
import styles from "./MyOrders.module.css";

const MyOrders = () => {
	const [loading, setLoading] = useState(false);
	const [orders, setOrders] = useState([]);
	console.log("-=-=",orders);

	useEffect(() => {
		const fetchOrders = async () => {
			try {
				setLoading(true);
				const response = await makeApi("/api/get-my-second-order", "GET");
				setOrders(response.data.secondorders);
			} catch (error) {
				console.error("Error fetching orders:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchOrders();
	}, []);



	return (
		<div className={styles.myOrders}>
			<div className="userprofile-heading">
				<h1>MY ORDERS</h1>
			</div>
			{loading ? (
				<div className={styles.loader}>
					<Primaryloader />
				</div>
			) : (orders?.length === 0 || orders === undefined || orders === null  ) ? (
				<div className={styles.noOrders}>No orders found</div>
			) : (
				<div className={styles.orderList}>
					{orders?.map((order) => (
						<div key={order._id} className={styles.orderCard}>
							<div className={styles.orderHeader}>
								<span className={styles.orderId}>Order #{order?._id.slice(-6)}</span>
								<span className={styles.orderDate}>{new Date(order?.createdAt).toLocaleDateString()}</span>
								<span className={`${styles.orderStatus} ${styles[order?.status.toLowerCase()]}`}>
									{order?.status}
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
