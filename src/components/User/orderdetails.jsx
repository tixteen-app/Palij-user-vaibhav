import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { makeApi } from "../../api/callApi.tsx";
import "../../styles/User/orderdetails.css";
import UserProfileSidebar from "./sidebar.jsx";
import Primaryloader from "../loaders/primaryloader.jsx";

const OrderDetailsPage = () => {
    const { orderId } = useParams();
    const [orderDetails, setOrderDetails] = useState(null);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await makeApi(`/api/get-second-order-by-id/${orderId}`, "GET");
                setOrderDetails(response.data.secondorder);
            } catch (error) {
                console.log(error);
            }
        };
        fetchOrderDetails();
    }, [orderId]);

    if (!orderDetails) {
        return <div className="loading All_Product_loader" style={{ height: "90vh" }} >
            <div className='' >
                <Primaryloader />
            </div>
        </div>;
    }

    return (
        <>
            <div>
                <Link to={"/user/my-orders"}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                    </svg>
                </Link>
            </div>
            <div className="order-details-page">
                <div className="sidebar my_wishlist_mobile_view">
                    <UserProfileSidebar />
                </div>
                <div className="order-details-container">
                    <h1>Order Details</h1>
                    <div className="order-details">
                        <p><strong>Order ID:</strong> {orderDetails._id}</p>
                        <p><strong>Customer Name:</strong> {orderDetails.userId.firstName} {orderDetails.userId.lastName}</p>
                        <p><strong>Email:</strong> {orderDetails.userId.email}</p>
                        <p><strong>Mobile Number:</strong> {orderDetails.userId.mobileNumber}</p>
                        <p><strong>Shipping Address:</strong> {orderDetails.shippingAddress.address}, {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state}, {orderDetails.shippingAddress.country}, {orderDetails.shippingAddress.pincode}</p>
                        <p><strong>Status:</strong> {orderDetails.status}</p>
                        <p><strong>Payment Method:</strong> {orderDetails.paymentMethod}</p>
                        <p><strong>Payment ID:</strong> {orderDetails.paymentId}</p>
                        <p><strong>Is Paid:</strong> {orderDetails.isPaid ? "Yes" : "No"}</p>
                        <p><strong>Is Delivered:</strong> {orderDetails.isDelivered ? "Yes" : "No"}</p>
                        <p><strong>Created At:</strong> {new Date(orderDetails.createdAt).toLocaleString()}</p>
                        <p><strong>Last Updated At:</strong> {new Date(orderDetails.UpdateAt).toLocaleString()}</p>

                        <h2>Ordered Products:</h2>
                        {orderDetails.CartId.orderItems.map((item) => (
                            <div key={item._id} className="product-item">
                                <img src={item.productId.thumbnail} alt={item.productId.name} />
                                <div className="product-details">
                                    <h3>{item.productId.name}</h3>
                                    <p><strong>Price:</strong> ₹{item.singleProductPrice}</p>
                                    <p><strong>Quantity:</strong> {item.quantity}</p>
                                    <p><strong>Total Price:</strong> ₹{item.totalPrice}</p>
                                </div>
                            </div>
                        ))}
                        <p><strong>Total Price:</strong> ₹{orderDetails.CartId.totalPrice}</p>
                        <p><strong>Tax Price:</strong> ₹{orderDetails.CartId.taxPrice}</p>
                        <p><strong>Shipping Price:</strong> ₹{orderDetails.CartId.shippingPrice}</p>
                        <p><strong>Total Product Price:</strong> ₹{orderDetails.CartId.TotalProductPrice}</p>
                        {/* <p><strong>Price After Adding Tax:</strong> ₹{orderDetails.CartId.priceAfterAddingTax}</p> */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderDetailsPage;
