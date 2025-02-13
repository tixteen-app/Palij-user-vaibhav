import React, { useState } from "react";
// import { makeApi } from "../../api/callApi";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

import "../../styles/Information/billingAdress.css";
import { makeApi } from "../../api/callApi.tsx";

const BillingAddress = () => {
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
	if (!formData.name) {
	  toast.error('Please fill name');
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
	  const response = await makeApi("/api/create-billing-address", "POST", formData);
	  if (response.data.success === true) {
		  toast.success(response.data.message, {
			  onClose: () => {
				  navigate("/userprofile/myaddress")
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
          <h2>Billing Address</h2>
        
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            
          />
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
          <input
            type="text"
            name="GSTNumber"
            placeholder="GST Number"
            value={formData.GSTNumber}
            onChange={handleInputChange}
            
          />
          <button className="edit-address-btn" type="submit" disabled={submitting}>
            {submitting ? "Submitting..." : "Save"}
          </button>
        </div>
      </form>
    </div>
	</>

  );
};

export default BillingAddress;
