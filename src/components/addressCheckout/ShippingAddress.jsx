import React, { useState } from "react"
import { makeApi } from "../../api/callApi"
import { ToastContainer, toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import BackButton from "../products/backButton"

const AddShippingAddress = () => {
	const navigate = useNavigate()
	const [formData, setFormData] = useState({
		firstname: "",
		lastname: "",
		phonenumber: "",
		address: "",
		pincode: "",
		country: "",
		state: "",
		city: "",
	})

	const handleInputChange = (e) => {
		const { name, value } = e.target
		setFormData({
			...formData,
			[name]: value,
		})

		if (name === "pincode" && value.length === 6) {
			fetchCityStateCountry(value)
		}
	}

	const fetchCityStateCountry = async (pincode) => {
		try {
			const response = await axios.get(
				`https://api.postalpincode.in/pincode/${pincode}`
			)
			const postOfficeData = response.data[0].PostOffice[0]
			const { State, Country, Division: city } = postOfficeData

			setFormData((prevState) => ({
				...prevState,
				city,
				state: State,
				country: Country,
			}))
		} catch (error) {
			console.error("Error fetching city, state, and country:", error)
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		if (!formData.firstname) {
			toast.error("Please fill firstname")
			return
		}
		if (!formData.lastname) {
			toast.error("Please fill lastname")
			return
		}
		if (!formData.phonenumber) {
			toast.error("Please fill phonenumber")
			return
		}
		if (!formData.address) {
			toast.error("Please fill address")
			return
		}
		if (!formData.pincode) {
			toast.error("Please fill pincode")
			return
		}
		if (!formData.country) {
			toast.error("Please fill country")
			return
		}
		if (!formData.state) {
			toast.error("Please fill state")
			return
		}
		if (!formData.city) {
			toast.error("Please fill city")
			return
		}
		if (!formData.phonenumber || formData.phonenumber.length !== 10) {
			toast.error("Please enter a valid 10-digit phone number");
			return;
		  }

		try {
			const response = await makeApi(
				"/api/create-shiped-address",
				"POST",
				formData
			)
			if (response.data.success === true) {
				toast.success(response.data.message, {
					onClose: () => {
						navigate("/cart/checkout")
					},
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
				city: "",
			})
		} catch (error) {
			console.error("Error creating address:", error)
			toast.error(error.response.data.message)
		}
	}

	return (
		<>
			<ToastContainer autoClose={1000} />
			<div className="d-flex align-items-center mb-2 my_cart_add_addreess_page_back_button"  >
				<BackButton pageLocation="/cart/checkout/" />
			</div>
			<div className="my-shipping-belling-address">

				<form
					action=""
					className="address-form"
				>


					<div className="my-shipping-address">

						<div className="shipping-header">
							<h2>Shipping Address:</h2>
							{/* <button type="button">Edit</button> */}
						</div>
						<div className="add-form-name">
							<input
								type="text"
								name="firstname"
								placeholder="First Name"
								value={formData.firstname}
								onChange={handleInputChange}
								required
							/>
							<input
								type="text"
								name="lastname"
								placeholder="Last Name"
								value={formData.lastname}
								onChange={handleInputChange}
								required
							/>
						</div>
						<input
							type="text"
							name="phonenumber"
							placeholder="Phone Number"
							value={formData.phonenumber}
							onChange={(e) => {
								const value = e.target.value.replace(/\D/g, '');
								if (value.length <= 10) {
									setFormData({
										...formData,
										phonenumber: value
									});
								}
							}}
							required
							maxLength={10}
						/>
						<textarea
							name="address"
							cols="30"
							rows="5"
							placeholder="Address"
							value={formData.address}
							onChange={handleInputChange}
							required
						></textarea>
						<div className="add-pin-country">
							<input
								type="text"
								name="pincode"
								placeholder="Pincode"
								value={formData.pincode}
								onChange={handleInputChange}
								required
							/>
							<input
								type="text"
								name="country"
								placeholder="Country"
								value={formData.country}
								onChange={handleInputChange}
								required
							/>
						</div>
						<div className="add-state-city">
							<input
								type="text"
								name="state"
								placeholder="State"
								value={formData.state}
								onChange={handleInputChange}
								required
							/>
							<input
								type="text"
								name="city"
								placeholder="City"
								value={formData.city}
								onChange={handleInputChange}
								required
							/>
						</div>
						<button
							className="edit-address-btn"
							type="submit"
							onClick={(e) => handleSubmit(e)}
						>
							Save
							{/* {submitting ? "Submitting..." : "Save"} */}
						</button>
					</div>
				</form>
			</div>
		</>
	)
}

export default AddShippingAddress
