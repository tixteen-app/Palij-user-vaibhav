

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { makeApi } from "../../api/callApi.tsx";
import Primaryloader from "../loaders/primaryloader.jsx";
import styles from "./MyOrders.module.css";

const MyOrders = () => {
	const [loading, setLoading] = useState(false);
	const [orders, setOrders] = useState([]);

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

<<<<<<< HEAD
=======
	const fetchShiprocketOrder = async () => {
		try {
			const token = "your_auth_token"; // Replace with your actual token

			const response = await axios.get(
				`https://apiv2.shiprocket.in/v1/external/orders/show/${orders.shiprocketOrderId}`,
				{
					headers: {
						Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjQ2MDQxODksInNvdXJjZSI6InNyLWF1dGgtaW50IiwiZXhwIjoxNzMzMzkzMDkxLCJqdGkiOiJqQWh2QTdCakJ5eDNaNWVXIiwiaWF0IjoxNzMyNTI5MDkxLCJpc3MiOiJodHRwczovL3NyLWF1dGguc2hpcHJvY2tldC5pbi9hdXRob3JpemUvdXNlciIsIm5iZiI6MTczMjUyOTA5MSwiY2lkIjo0NDMyNDc1LCJ0YyI6MzYwLCJ2ZXJib3NlIjpmYWxzZSwidmVuZG9yX2lkIjowLCJ2ZW5kb3JfY29kZSI6IiJ9.oF9ssDAF09sg6LLDzoVVGNOg31XnnQMYuQiiu9kgnGU`, // Add the token here
					},
				}
			);

		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchShiprocketOrder();
	}, []);

>>>>>>> 3ed727c91ad52b00480fe018db8bc84293fab2d1


	return (
		<div className={styles.myOrders}>
			<div className="userprofile-heading">
				<h1>MY ORDERS</h1>
			</div>
			{loading ? (
				<div className={styles.loader}>
					<Primaryloader />
				</div>
			) : orders.length === 0 ? (
				<div className={styles.noOrders}>No orders found</div>
			) : (
				<div className={styles.orderList}>
					{orders.map((order) => (
						<div key={order._id} className={styles.orderCard}>
							<div className={styles.orderHeader}>
								<span className={styles.orderId}>Order #{order._id.slice(-6)}</span>
								<span className={styles.orderDate}>{new Date(order.createdAt).toLocaleDateString()}</span>
								<span className={`${styles.orderStatus} ${styles[order.status.toLowerCase()]}`}>
									{order.status}
								</span>
							</div>
							<div className={styles.orderItems}>
								{order.CartId.orderItems.map((item) => (
									<div key={item._id} className={styles.orderItem}>
										<img
											src={item.productId.thumbnail}
											alt={item.productId.name}
											className={styles.productImage}
										/>
										<div className={styles.productInfo}>
											<h3>{item.productId.name}</h3>
											<p>Quantity: {item.quantity}</p>
											<p className={styles.itemPrice}>₹{item.totalPrice}</p>
										</div>
									</div>
								))}
							</div>
							<div className={styles.orderFooter}>
								<span className={styles.orderTotal}>
									Total: ₹{order.CartId.totalPrice}
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
