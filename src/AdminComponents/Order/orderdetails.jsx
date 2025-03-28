import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { makeApi } from "../../api/callApi";
import "../../adminCss/order/orderdetails.css";
import Loader from "../../components/loader/loader";

function Orderdetails() {
  const [order, setOrder] = useState({});
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const fetchOrder = async () => {
    try {
      setLoading(true);

      const response = await makeApi(`/api/get-order-by-id/${id}`, "GET");
      setOrder(response.data.order);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="order-details-container">
          <div>
            <Link to={"/admin/all-orders"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="36"
                fill="currentColor"
                className="bi bi-arrow-left back_arrow_icon"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
                />
              </svg>
            </Link>
          </div>
          <h2>Order Details</h2>
          {/* mini order dashboard */}
          <div className="main_mini_order_dashboard_div">
            {/* 1 */}
            <div className="mini_order_dashboard_contact_div">
              <div>Status</div>
              <div>{order.status}</div>
            </div>
            {/* 2 */}
            <div className="mini_order_dashboard_contact_div">
              <div>Order date</div>
              <div>
                {new Date(order.createdAt).toLocaleString("en-US", {
                  timeZone: "UTC", // Change this according to your timezone if needed
                })}
              </div>
            </div>
            {/* 3 */}
            <div className="mini_order_dashboard_contact_div">
              <div>isPaid</div>
              <div>{order.isPaid ? "True" : "False"}</div>
            </div>
            {/* 4 */}
            {order?.status != "Pending" && (
              <div className="mini_order_dashboard_contact_div">
                {/* if order status is delivered then show */}
                {order?.status === "Delivered" && (
                  <div>
                    <div>Delivered date</div>
                    <div>
                      {new Date(order.deliveredAt).toLocaleString("en-US", {
                        timeZone: "UTC", // Change this according to your timezone if needed
                      })}
                    </div>
                  </div>
                )}
                {/* if order status is shipped then show */}
                {order?.status === "Shipped" && (
                  <div>
                    <div>Shipped date</div>
                    <div>
                      {new Date(order.shippedAt).toLocaleString("en-US", {
                        timeZone: "UTC", // Change this according to your timezone if needed
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 5 */}
            <div className="mini_order_dashboard_contact_div">
              <div>updatedAt</div>
              <div>
                {new Date(order.updatedAt).toLocaleString("en-US", {
                  timeZone: "UTC", // Change this according to your timezone if needed
                })}
              </div>
            </div>
          </div>

          <div className="order_details_main_section">
            {/* user section */}
            <div className="user_section order_details_cards">
              <h3>User Details</h3>
              <div>
                <img
                  src={order?.userId?.userImage}
                  alt="User"
                  className="user-image"
                />
                <p>
                  <b>Name:</b> {order?.userId?.firstName} {order?.userId?.lastName}
                </p>
                <p>
                  <b>Email:</b> {order?.userId?.email}
                </p>
                <p>
                  <b>Mobile Number:</b> {order?.userId?.mobileNumber}
                </p>
              </div>
            </div>
            {/* order items */}
            <div className="order_item_section order_details_cards">
              <h3>Order Items</h3>
              <div>
                {order?.orderItems?.map((item, index) => (
                  <div key={index}>
                    <img
                      src={item.productId.thumbnail}
                      alt="Product"
                      className="product-thumbnail"
                    />
                    <p>
                      <b>Name:</b> {item.productId.name}
                    </p>
                    <p>
                      <b>Price:</b> {item.productId.price}
                    </p>
                    <p>
                      <b>Quantity:</b> {item.quantity}
                    </p>
                    <p>
                      <b>Total Price:</b> {item.totalPrice}
                    </p>
                    <p>
                      <b>Brand:</b> {item.productId.brand}
                    </p>
                    <p>
                      <b>Product Id:</b> {item._id}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            {/* shipping address */}
            <div className="order_shipping_address_section order_details_cards">
              <h3>Shipping Address</h3>
              <div>
                <p>
                  <b>Firstname:</b> {order?.shippingAddress?.firstname}
                </p>
                <p>
                  <b>Lastname:</b> {order?.shippingAddress?.lastname}
                </p>
                <p>
                  <b>Phone Number:</b> {order?.shippingAddress?.phonenumber}
                </p>
                <p>
                  <b>Address:</b> {order?.shippingAddress?.address}
                </p>
                <p>
                  <b>Pincode:</b> {order?.shippingAddress?.pincode}
                </p>
                <p>
                  <b>Country:</b> {order?.shippingAddress?.country}
                </p>
                <p>
                  <b>State:</b> {order?.shippingAddress?.state}
                </p>
                <p>
                  <b>City:</b> {order?.shippingAddress?.city}
                </p>
              </div>
            </div>
            {/* billing address */}
            <div className="order_billing_address_section order_details_cards">
              <h3>Billing Address</h3>
              <div>
                <p>
                  <b>Name:</b> {order?.billingAddress?.name}
                </p>
                <p>
                  <b>Phone Number:</b> {order?.billingAddress?.phonenumber}
                </p>
                <p>
                  <b>Address:</b> {order?.billingAddress?.address}
                </p>
                <p>
                  <b>Pincode:</b> {order?.billingAddress?.pincode}
                </p>
                <p>
                  <b>Country:</b> {order?.billingAddress?.country}
                </p>
                <p>
                  <b>State:</b> {order?.billingAddress?.state}
                </p>
                <p>
                  <b>City:</b> {order?.billingAddress?.city}
                </p>
                <p>
                  <b>GST Number:</b> {order?.billingAddress?.GSTNumber}
                </p>
              </div>
            </div>
            {/* payment details */}
            <div className="order_payment_details_section order_details_cards">
              <h3>Payment Details</h3>
              <div>
                <p>
                  <b>Payment Method:</b> {order?.paymentMethod}
                </p>
                <p>
                  <b>Total Price:</b> {order?.totalPrice}
                </p>
                <p>
                  <b>Tax Price:</b> {order?.taxPrice}
                </p>
                <p>
                  <b>Shipping Price:</b> {order?.shippingPrice}
                </p>
                <p>
                  <b>Is Paid:</b> {order?.isPaid ? "Yes" : "No"}
                </p>
                <p>
                  <b>Paid At:</b>{" "}
                  {order?.paidAt
                    ? new Date(order.paidAt).toLocaleString()
                    : "Not Paid Yet"}
                </p>
                <p>
                  <b>Is Delivered:</b> {order?.isDelivered ? "Yes" : "No"}
                </p>
                <p>
                  <b>Delivered At:</b>{" "}
                  {order?.deliveredAt
                    ? new Date(order.deliveredAt).toLocaleString()
                    : "Not Delivered Yet"}
                </p>
                <p>
                  <b>Status:</b> {order?.status}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Orderdetails;
