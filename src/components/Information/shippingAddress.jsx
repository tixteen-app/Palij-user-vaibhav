import React, { useState } from "react";
import { makeApi } from "../../api/callApi.tsx";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

import "../../styles/Information/billingAdress.css";

const ShippingAddress = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phonenumber: "",
    address: "",
    pincode: "",
    country: "",
    state: "",
    city: "",
    GSTNumber: ""
  });
  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.firstname) {
      toast.error('Please fill firstname');
      return;
    }
    if (!formData.lastname) {
      toast.error('Please fill lastname');
      return;
    }
    if (!formData.phonenumber) {
      toast.error('Please fill phonenumber');
      return;
    }
    if (!formData.address) {
      toast.error('Please fill address');
      return;
    }
    if (!formData.pincode) {
      toast.error('Please fill pincode');
      return;
    }
    if (!formData.country) {
      toast.error('Please fill country');
      return;
    }
    if (!formData.state) {
      toast.error('Please fill state');
      return;
    }
    // if (!formData.GSTNumber) {
    //   toast.error('Please fill GSTNumber');
    //   return;
    // }


    try {
      const response = await makeApi("/api/create-shiped-address", "POST", formData);
      if (response.data.success === true) {
        toast.success(response.data.message, {
          onClose: () => {
            navigate("/user/my-address")
          }
        })
      }
      // Clear form fields after successful submission if needed
      setFormData({
        firstname: "",
        lastname: "",
        phonenumber: "",
        address: "",
        pincode: "",
        country: "",
        state: "",
        city: ""
      });
    } catch (error) {
      console.error("Error creating address:", error);
      toast.error(error.response.data.message);
    }
  }

  return (
    <>
      <ToastContainer autoClose={1000} />
      <div className="my-shipping-belling-address">
        <form action="" className="address-form" onSubmit={handleSubmit}>
          <div className="my-billing-address">
            <h2>Shipping Address</h2>
            <div className="add-state-city">

              <input
                type="text"
                name="firstname"
                placeholder="firstname"
                value={formData.firstname}
                onChange={handleInputChange}

              />

              <input
                type="text"
                name="lastname"
                placeholder="lastname"
                value={formData.lastname}
                onChange={handleInputChange}

              />
            </div>
            <input
              type="text"
              name="phonenumber"
              placeholder="Phone Number"
              value={formData.phonenumber}
              onChange={handleInputChange}

            />
            <textarea
              name="address"
              cols="30"
              rows="5"
              placeholder="Address"
              value={formData.address}
              onChange={handleInputChange}

            ></textarea>
            <div className="add-pin-country">
              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                value={formData.pincode}
                onChange={handleInputChange}

              />
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleInputChange}

              />
            </div>
            <div className="add-state-city">
              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleInputChange}

              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleInputChange}

              />
            </div>

            <button className="edit-address-btn" type="submit" disabled={submitting}>
              {submitting ? "Submitting..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </>

  );
};

export default ShippingAddress;
