import React, { useState, useEffect } from "react";
import { makeApi } from "../../api/callApi";
import "../../adminCss/order/updateorder.css";

const UpdateOrderPopup = ({ orderId, onClose }) => {
  const [order, setOrder] = useState(null);
  const [updatedOrderData, setUpdatedOrderData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    address: "",
    pincode: "",
    city: "",
    state: "",
    country: "",
    billingAddressName: "",
    billingAddressAddress: "",
    billingAddressPincode: "",
    billingAddressCity: "",
    billingAddressState: "",
    billingAddressCountry: "",
    GSTNumber: "",
    paymentMethod: "",
    totalPrice: "",
    taxPrice: "",
    shippingPrice: "",
    isPaid: false,
    paidAt: "",
    isDelivered: false,
    deliveredAt: "",
    status: "",
  });
  console.log("setUpdatedOrderData", setUpdatedOrderData);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await makeApi(
          `/api/get-order-by-id/${orderId}`,
          "GET"
        );
        setOrder(response.data.order);
        setUpdatedOrderData({
          firstName: response.data.order.userId.firstName || "",
          lastName: response.data.order.userId.lastName || "",
          email: response.data.order.userId.email || "",
          mobileNumber: response.data.order.userId.mobileNumber || "",
          address: response.data.order.shippingAddress.address || "",
          pincode: response.data.order.shippingAddress.pincode || "",
          city: response.data.order.shippingAddress.city || "",
          state: response.data.order.shippingAddress.state || "",
          country: response.data.order.shippingAddress.country || "",
          billingAddressName: response.data.order.billingAddress.name || "",
          billingAddressAddress:
            response.data.order.billingAddress.address || "",
          billingAddressPincode:
            response.data.order.billingAddress.pincode || "",
          billingAddressCity: response.data.order.billingAddress.city || "",
          billingAddressState: response.data.order.billingAddress.state || "",
          billingAddressCountry:
            response.data.order.billingAddress.country || "",
          GSTNumber: response.data.order.billingAddress.GSTNumber || "",
          paymentMethod: response.data.order.paymentMethod || "",
          totalPrice: response.data.order.totalPrice || "",
          taxPrice: response.data.order.taxPrice || "",
          shippingPrice: response.data.order.shippingPrice || "",
          isPaid: response.data.order.isPaid || false,
          paidAt: response.data.order.paidAt || "",
          isDelivered: response.data.order.isDelivered || false,
          deliveredAt: response.data.order.deliveredAt || "",
          status: response.data.order.status || "",
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedOrderData({
      ...updatedOrderData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setUpdatedOrderData({
      ...updatedOrderData,
      [name]: checked,
    });
  };

  const handleUpdateOrder = async () => {
    try {
      console.log(
        "----------------------=-------------------",
        updatedOrderData
      );
      const response = await makeApi(
        `/api/update-order-by-id/${orderId}`,
        "PUT",
        updatedOrderData
      );
      console.log(response, "udpated");
      //   onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="popup-container">
      {order && (
        <div className="popup-content-for-update-page">
          <h2>Update Order</h2>
          <div className="update_page_payment_details">
            <h3>Payment Details:</h3>
            <label>Payment Method:</label>
            <input
              type="text"
              className="update_order_input_fileds"
              name="paymentMethod"
              value={updatedOrderData.paymentMethod}
              onChange={handleInputChange}
            />
            <label>Total Price:</label>
            <input
              type="text"
              className="update_order_input_fileds"
              name="totalPrice"
              value={updatedOrderData.totalPrice}
              onChange={handleInputChange}
            />
            <label>Tax Price:</label>
            <input
              type="text"
              className="update_order_input_fileds"
              name="taxPrice"
              value={updatedOrderData.taxPrice}
              onChange={handleInputChange}
            />
            <label>Shipping Price:</label>
            <input
              type="text"
              className="update_order_input_fileds"
              name="shippingPrice"
              value={updatedOrderData.shippingPrice}
              onChange={handleInputChange}
            />
            {/* <label>Is Paid:</label>
            <input
              type="checkbox"
              className="update_order_input_fileds"
              name="isPaid"
              checked={updatedOrderData.isPaid}
              onChange={handleCheckboxChange}
            /> */}
            <div>
              <label>Is Paid:</label>
              <select
                name="isPaid"
                className="update_order_input_fileds"
                value={updatedOrderData.isPaid}
                onChange={handleInputChange}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            <div>
              <label>Paid At:</label>
              <input
                type="datetime-local"
                className="update_order_input_fileds"
                name="paidAt"
                value={updatedOrderData.paidAt}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Is Delivered:</label>
              <select
                name="isPaid"
                className="update_order_input_fileds"
                value={updatedOrderData.isDelivered}
                onChange={handleInputChange}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            {/* <label>Is Delivered:</label>
            <input
              type="checkbox"
              className="update_order_input_fileds"
              name="isDelivered"
              checked={updatedOrderData.isDelivered}
              onChange={handleCheckboxChange}
            /> */}
            <div>
              <label>Delivered At:</label>
              <input
                type="datetime-local"
                className="update_order_input_fileds"
                name="deliveredAt"
                value={updatedOrderData.deliveredAt}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Status:</label>
              <select
                name="status"
                className="update_order_input_fileds"
                value={updatedOrderData.status}
                onChange={handleInputChange}
              >
                <option value="Pending">Pending</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Delivered">Delivered</option>
                <option value="Shipped">Shipped</option>
              </select>
            </div>
          </div>
          <div className="button-group">
            <button onClick={handleClose}>Close</button>
            <button onClick={handleUpdateOrder}>Update Order</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateOrderPopup;
