

// import React, { useState } from "react"
// import "./shippingAddress.css"
// import { makeApi } from "../../api/callApi"
// import { ToastContainer, toast } from "react-toastify"
// import { useNavigate , Link } from "react-router-dom"
// import axios from "axios"

// const ShippingAddress = () => {
// 	const navigate = useNavigate()
// 	const [formData, setFormData] = useState({
// 		firstname: "",
// 		lastname: "",
// 		phonenumber: "",
// 		address: "",
// 		pincode: "",
// 		country: "",
// 		state: "",
// 		city: "",
// 	})

// 	const handleInputChange = (e) => {
// 		const { name, value } = e.target
// 		setFormData({
// 			...formData,
// 			[name]: value,
// 		})

// 		if (name === "pincode" && value.length === 6) {
// 			fetchCityStateCountry(value)
// 		}
// 	}

// 	const fetchCityStateCountry = async (pincode) => {
// 		try {
// 			const response = await axios.get(
// 				`https://api.postalpincode.in/pincode/${pincode}`
// 			)
// 			const postOfficeData = response.data[0].PostOffice[0]
// 			const { State, Country, Division: city } = postOfficeData

// 			setFormData((prevState) => ({
// 				...prevState,
// 				city,
// 				state: State,
// 				country: Country,
// 			}))
// 		} catch (error) {
// 			console.error("Error fetching city, state, and country:", error)
// 		}
// 	}

// 	const handleSubmit = async (e) => {
// 		e.preventDefault()
// 		if (!formData.firstname) {
// 			toast.error("Please fill firstname")
// 			return
// 		}
// 		if (!formData.lastname) {
// 			toast.error("Please fill lastname")
// 			return
// 		}
// 		if (!formData.phonenumber) {
// 			toast.error("Please fill phone number")
// 			return
// 		}

// 		if (!/^\d{10}$/.test(formData.phonenumber)) {
// 			toast.error("Please enter a valid 10-digit phone number")
// 			return
// 		} 

// 		if (!formData.address) {
// 			toast.error("Please fill address")
// 			return
// 		}
// 		if (!formData.pincode) {
// 			toast.error("Please fill pincode")
// 			return
// 		}
// 		if (!formData.country) {
// 			toast.error("Please fill country")
// 			return
// 		}
// 		if (!formData.state) {
// 			toast.error("Please fill state")
// 			return
// 		}
// 		if (!formData.city) {
// 			toast.error("Please fill city")
// 			return
// 		}

// 		try {
// 			const response = await makeApi(
// 				"/api/create-shiped-address",
// 				"POST",
// 				formData
// 			)
// 			console.log("Address created successfully:", response.data)
// 			if (response.data.success === true) {
// 				toast.success("Shipping Address Added Successfully", {
// 					onClose: () => {
// 						navigate("/userprofile/myaddress")
// 					},
// 				})
// 			}
// 			// Clear form fields after successful submission if needed
// 			setFormData({
// 				firstname: "",
// 				lastname: "",
// 				phonenumber: "",
// 				address: "",
// 				pincode: "",
// 				country: "",
// 				state: "",
// 				city: "",
// 			})
// 		} catch (error) {
// 			console.error("Error creating address:", error)
// 			toast.error(error.response.data.message)
// 		}
// 	}

// 	return (
// 		<>
// 			<ToastContainer autoClose={1000} />
// 			<div className="my-shipping-belling-address">

// 					<Link to="/userprofile/myaddress" className="css-for-link-tag text-black" >
// 				<div className="back_button_add_order_page" >
// 					<svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
// 						<path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
// 					</svg>
// 				</div>
// 					</Link>

// 				<form
// 					action=""
// 					className="address-form"
// 				>
// 					<div className="my-shipping-address">

// 						<div className="shipping-header">

// 							<div>
// 								<h2>Shipping Address:</h2>
// 							</div>
// 							{/* <button type="button">Edit</button> */}
// 						</div>
// 						<div className="add-form-name">
// 							<input
// 								type="text"
// 								name="firstname"
// 								placeholder="First Name"
// 								value={formData.firstname}
// 								onChange={handleInputChange}
// 								required
// 							/>
// 							<input
// 								type="text"
// 								name="lastname"
// 								placeholder="Last Name"
// 								value={formData.lastname}
// 								onChange={handleInputChange}
// 								required
// 							/>
// 						</div>
// 						<input
// 							type="text"
// 							name="phonenumber"
// 							placeholder="Phone Number"
// 							value={formData.phonenumber}
// 							onChange={handleInputChange}
// 							required
// 							maxLength={10}
							
// 						/>
// 						<textarea
// 							name="address"
// 							cols="30"
// 							rows="5"
// 							placeholder="Address"
// 							value={formData.address}
// 							onChange={handleInputChange}
// 							required
// 						></textarea>
// 						<div className="add-pin-country">
// 							<input
// 								type="text"
// 								name="pincode"
// 								placeholder="Pincode"
// 								value={formData.pincode}
// 								onChange={handleInputChange}
// 								required
// 							/>
// 							<input
// 								type="text"
// 								name="country"
// 								placeholder="Country"
// 								value={formData.country}
// 								onChange={handleInputChange}
// 								required
// 							/>
// 						</div>
// 						<div className="add-state-city">
// 							<input
// 								type="text"
// 								name="state"
// 								placeholder="State"
// 								value={formData.state}
// 								onChange={handleInputChange}
// 								required
// 							/>
// 							<input
// 								type="text"
// 								name="city"
// 								placeholder="City"
// 								value={formData.city}
// 								onChange={handleInputChange}
// 								required
// 							/>
// 						</div>
// 						<button
// 							className="edit-address-btn"
// 							type="submit"
// 							onClick={(e) => handleSubmit(e)}
// 						>
// 							Save
// 							{/* {submitting ? "Submitting..." : "Save"} */}
// 						</button>
// 					</div>
// 				</form>
// 			</div>
// 		</>
// 	)
// }

// export default ShippingAddress
import React, { useState } from "react";
import styles from "./addressForm.module.css";
import { makeApi } from "../../api/callApi";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const ShippingAddress = () => {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        phonenumber: "",
        address: "",
        pincode: "",
        country: "",
        state: "",
        city: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // Only fetch location data if pincode is exactly 6 digits
        if (name === "pincode" && /^\d{6}$/.test(value)) {
            fetchCityStateCountry(value);
        }
    };

    const fetchCityStateCountry = async (pincode) => {
        try {
            setIsLoading(true);
            const response = await axios.get(
                `https://api.postalpincode.in/pincode/${pincode}`
            );
            
            if (response.data[0].Status === "Success") {
                const postOfficeData = response.data[0].PostOffice[0];
                const { State, Country, Division: city } = postOfficeData;

                setFormData(prev => ({
                    ...prev,
                    city: city || "",
                    state: State || "",
                    country: Country || "",
                }));
            }
        } catch (error) {
            console.error("Error fetching location data:", error);
            toast.error("Could not fetch location details for this pincode");
        } finally {
            setIsLoading(false);
        }
    };

    const validateForm = () => {
        const requiredFields = [
            "firstname", "lastname", "address", 
            "country", "state", "city"
        ];
        
        for (const field of requiredFields) {
            if (!formData[field].trim()) {
                toast.error(`Please fill ${field}`);
                return false;
            }
        }

        if (!/^\d{10}$/.test(formData.phonenumber)) {
            toast.error("Please enter a valid 10-digit phone number");
            return false;
        }

        if (!/^\d{6}$/.test(formData.pincode)) {
            toast.error("Please enter a valid 6-digit pincode");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        try {
            setIsLoading(true);
            const response = await makeApi(
                "/api/create-shiped-address",
                "POST",
                formData
            );
            
            if (response.data.success) {
                toast.success("Shipping Address Added Successfully", {
                    onClose: () => navigate("/userprofile/myaddress"),
                    autoClose: 1500
                });
                
                // Reset form after successful submission
                setFormData({
                    firstname: "",
                    lastname: "",
                    phonenumber: "",
                    address: "",
                    pincode: "",
                    country: "",
                    state: "",
                    city: "",
                });
            }
        } catch (error) {
            console.error("Error creating address:", error);
            toast.error(error.response?.data?.message || "Failed to create address");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.myAddressForm}>
            <ToastContainer position="top-center" autoClose={2000} />
            
            <Link to="#" onClick={() => navigate(-1)} className={styles.backButtonLink}>
                <div className={styles.backButton}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                    </svg>
                </div>
            </Link>

            <form className={styles.addressForm} onSubmit={handleSubmit}>
                <div className={styles.formHeader}>
                    <h2>Shipping Address</h2>
                </div>
                
                <div className={styles.nameGroup}>
                    <div className={styles.formGroup}>
                        <label htmlFor="firstname">First Name*</label>
                        <input
                            type="text"
                            id="firstname"
                            name="firstname"
                            placeholder="Enter first name"
                            value={formData.firstname}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="lastname">Last Name*</label>
                        <input
                            type="text"
                            id="lastname"
                            name="lastname"
                            placeholder="Enter last name"
                            value={formData.lastname}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                
                <div className={styles.formGroup}>
                    <label htmlFor="phonenumber">Phone Number*</label>
                    <input
                        type="tel"
                        id="phonenumber"
                        name="phonenumber"
                        placeholder="Enter 10-digit phone number"
                        value={formData.phonenumber}
                        onChange={handleInputChange}
                        maxLength={10}
                    />
                </div>
                
                <div className={styles.formGroup}>
                    <label htmlFor="address">Address*</label>
                    <textarea
                        id="address"
                        name="address"
                        placeholder="Enter full address"
                        value={formData.address}
                        onChange={handleInputChange}
                        rows={4}
                    />
                </div>
                
                <div className={styles.doubleInputGroup}>
                    <div className={styles.formGroup}>
                        <label htmlFor="pincode">Pincode*</label>
                        <input
                            type="text"
                            id="pincode"
                            name="pincode"
                            placeholder="Enter 6-digit pincode"
                            value={formData.pincode}
                            onChange={handleInputChange}
                            maxLength={6}
                        />
                        {isLoading && formData.pincode.length === 6 && (
                            <span className={styles.loadingText}>Fetching location...</span>
                        )}
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="country">Country*</label>
                        <input
                            type="text"
                            id="country"
                            name="country"
                            placeholder="Country"
                            value={formData.country}
                            onChange={handleInputChange}
                            readOnly={!!formData.country}
                        />
                    </div>
                </div>
                
                <div className={styles.doubleInputGroup}>
                    <div className={styles.formGroup}>
                        <label htmlFor="state">State*</label>
                        <input
                            type="text"
                            id="state"
                            name="state"
                            placeholder="State"
                            value={formData.state}
                            onChange={handleInputChange}
                            readOnly={!!formData.state}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="city">City*</label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            placeholder="City"
                            value={formData.city}
                            onChange={handleInputChange}
                            readOnly={!!formData.city}
                        />
                    </div>
                </div>
                
                <button
                    className={styles.saveAddressBtn}
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? "Saving..." : "Save Address"}
                </button>
            </form>
        </div>
    );
};

export default ShippingAddress;