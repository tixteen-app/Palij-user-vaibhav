// import React, { useState, useEffect } from "react"
// import styles from "./addressForm.module.css"
// import { ToastContainer, toast } from "react-toastify"
// import { useNavigate, useParams } from "react-router-dom"
// import axios from "axios"
// import { makeApi } from "../../api/callApi"

// const AddressForm = ({ isBilling }) => {
// 	const navigate = useNavigate()
// 	const { id } = useParams()
// 	const [formData, setFormData] = useState({
// 		name: "",
// 		firstname: "",
// 		lastname: "",
// 		phonenumber: "",
// 		address: "",
// 		pincode: "",
// 		country: "",
// 		state: "",
// 		city: "",
// 	})

// 	useEffect(() => {
// 		const fetchAddress = async () => {
// 			try {
// 				const endpoint = isBilling
// 					? `/api/get-my-billing-address`
// 					: `/api/get-my-shiped-address`
// 				const response = await makeApi(endpoint, "GET")
// 				if (response.data.success) {
// 					const addresses = isBilling
// 						? response.data.billingaddress
// 						: response.data.shipedaddress
// 					const address = addresses.find((addr) => addr._id === id)
// 					if (address) {
// 						setFormData({
// 							name: address.name || "",
// 							firstname: address.firstname || "",
// 							lastname: address.lastname || "",
// 							phonenumber: address.phonenumber,
// 							address: address.address,
// 							pincode: address.pincode,
// 							country: address.country,
// 							state: address.state,
// 							city: address.city,
// 						})
// 					}
// 				} else {
// 					console.error("Failed to fetch address:", response.data.message)
// 				}
// 			} catch (error) {
// 				console.error("Error fetching address:", error)
// 			}
// 		}

// 		if (id) {
// 			fetchAddress()
// 		}
// 	}, [id, isBilling])

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

// 	const validatePhoneNumber = (number) => {
// 		const phoneRegex = /^[0-9]{10}$/
// 		return phoneRegex.test(number)
// 	}

// 	const validatePincode = (pincode) => {
// 		const pincodeRegex = /^[0-9]{6}$/
// 		return pincodeRegex.test(pincode)
// 	}

// 	const handleSubmit = async (e) => {
// 		e.preventDefault()
// 		if (!validatePhoneNumber(formData.phonenumber)) {
// 			toast.error("Invalid phone number. Please enter a 10-digit phone number.")
// 			return
// 		}
// 		if (!validatePincode(formData.pincode)) {
// 			toast.error("Invalid pincode. Please enter a 6-digit pincode.")
// 			return
// 		}
// 		try {
// 			const endpoint = isBilling
// 				? `/api/update-billing-address/${id}`
// 				: `/api/update-shiped-address/${id}`
// 			const response = await makeApi(endpoint, "PUT", formData)
// 			if (response.data.success) {
// 				toast.success("Updated Successfully", {
// 					onClose: () => {
// 						navigate("/userprofile/myaddress")
// 					},
// 				})
// 			} else {
// 				toast.error(response.data.message)
// 			}
// 		} catch (error) {
// 			console.error("Error updating address:", error)
// 			toast.error("Failed to update address. Please try again.")
// 		}
// 	}

// 	return (
// 		<>
// 			<ToastContainer autoClose={1000} />
// 			<div className={styles.myAddressForm}>
// 				<form
// 					className={styles.addressForm}
// 					onSubmit={handleSubmit}
// 				>
// 					<div className={styles.formHeader}>
// 						<h2>
// 							{isBilling ? "Edit Billing Address" : "Edit Shipping Address"}
// 						</h2>
// 					</div>
// 					{isBilling ? (
// 						<input
// 							type="text"
// 							name="name"
// 							placeholder="Name"
// 							value={formData.name}
// 							onChange={handleInputChange}
// 							required
// 						/>
// 					) : (
// 						<div className={styles.formName}>
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
// 					)}
// 					<input
// 						type="text"
// 						name="phonenumber"
// 						placeholder="Phone Number"
// 						value={formData.phonenumber}
// 						onChange={handleInputChange}
// 						required
// 					/>
// 					<textarea
// 						name="address"
// 						cols="30"
// 						rows="5"
// 						placeholder="Address"
// 						value={formData.address}
// 						onChange={handleInputChange}
// 						required
// 					></textarea>
// 					<div className={styles.formPinCountry}>
// 						<input
// 							type="text"
// 							name="pincode"
// 							placeholder="Pincode"
// 							value={formData.pincode}
// 							onChange={handleInputChange}
// 							required
// 						/>
// 						<input
// 							type="text"
// 							name="country"
// 							placeholder="Country"
// 							value={formData.country}
// 							onChange={handleInputChange}
// 							required
// 						/>
// 					</div>
// 					<div className={styles.formStateCity}>
// 						<input
// 							type="text"
// 							name="state"
// 							placeholder="State"
// 							value={formData.state}
// 							onChange={handleInputChange}
// 							required
// 						/>
// 						<input
// 							type="text"
// 							name="city"
// 							placeholder="City"
// 							value={formData.city}
// 							onChange={handleInputChange}
// 							required
// 						/>
// 					</div>
// 					<button
// 						className={styles.saveAddressBtn}
// 						type="submit"
// 					>
// 						Save
// 					</button>
// 				</form>
// 			</div>
// 		</>
// 	)
// }

// export default AddressForm


import React, { useState, useEffect } from "react"
import styles from "./addressForm.module.css"
import { ToastContainer, toast } from "react-toastify"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { makeApi } from "../../api/callApi"

const AddressForm = ({ isBilling }) => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [formData, setFormData] = useState({
        name: "",
        firstname: "",
        lastname: "",
        phonenumber: "",
        address: "",
        pincode: "",
        country: "",
        state: "",
        city: "",
    })

    useEffect(() => {
        const fetchAddress = async () => {
            try {
                const endpoint = isBilling
                    ? `/api/get-my-billing-address`
                    : `/api/get-my-shiped-address`
                const response = await makeApi(endpoint, "GET")
                if (response.data.success) {
                    const addresses = isBilling
                        ? response.data.billingaddress
                        : response.data.shipedaddress
                    const address = addresses.find((addr) => addr._id === id)
                    if (address) {
                        setFormData({
                            name: address.name || "",
                            firstname: address.firstname || "",
                            lastname: address.lastname || "",
                            phonenumber: address.phonenumber,
                            address: address.address,
                            pincode: address.pincode,
                            country: address.country,
                            state: address.state,
                            city: address.city,
                        })
                    }
                } else {
                    console.error("Failed to fetch address:", response.data.message)
                }
            } catch (error) {
                console.error("Error fetching address:", error)
            }
        }

        if (id) {
            fetchAddress()
        }
    }, [id, isBilling])

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

    const validatePhoneNumber = (number) => {
        const phoneRegex = /^[0-9]{10}$/
        return phoneRegex.test(number)
    }

    const validatePincode = (pincode) => {
        const pincodeRegex = /^[0-9]{6}$/
        return pincodeRegex.test(pincode)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validatePhoneNumber(formData.phonenumber)) {
            toast.error("Invalid phone number. Please enter a 10-digit phone number.")
            return
        }
        if (!validatePincode(formData.pincode)) {
            toast.error("Invalid pincode. Please enter a 6-digit pincode.")
            return
        }
        try {
            const endpoint = isBilling
                ? `/api/update-billing-address/${id}`
                : `/api/update-shiped-address/${id}`
            const response = await makeApi(endpoint, "PUT", formData)
            if (response.data.success) {
                toast.success("Updated Successfully", {
                    onClose: () => {
                        navigate("/userprofile/myaddress")
                    },
                })
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.error("Error updating address:", error)
            toast.error("Failed to update address. Please try again.")
        }
    }

    return (
        <>
            <ToastContainer autoClose={1000} />
            <div className={styles.myAddressForm}>
                <form
                    className={styles.addressForm}
                    onSubmit={handleSubmit}
                >
                    <div className={styles.formHeader}>
                        <h2>
                            {isBilling ? "Edit Billing Address" : "Edit Shipping Address"}
                        </h2>
                    </div>
                    
                    {isBilling ? (
                        <div className={styles.formGroup}>
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Enter name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    ) : (
                        <div className={styles.nameGroup}>
                            <div className={styles.formGroup}>
                                <label htmlFor="firstname">First Name</label>
                                <input
                                    type="text"
                                    id="firstname"
                                    name="firstname"
                                    placeholder="Enter first name"
                                    value={formData.firstname}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="lastname">Last Name</label>
                                <input
                                    type="text"
                                    id="lastname"
                                    name="lastname"
                                    placeholder="Enter last name"
                                    value={formData.lastname}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                    )}
                    
                    <div className={styles.formGroup}>
                        <label htmlFor="phonenumber">Phone Number</label>
                        <input
                            type="text"
                            id="phonenumber"
                            name="phonenumber"
                            placeholder="Enter phone number"
                            value={formData.phonenumber}
                            onChange={handleInputChange}
                            required
							maxLength={10}
                        />
                    </div>
                    
                    <div className={styles.formGroup}>
                        <label htmlFor="address">Address</label>
                        <textarea
                            id="address"
                            name="address"
                            cols="30"
                            rows="5"
                            placeholder="Enter full address"
                            value={formData.address}
                            onChange={handleInputChange}
                            required
                        ></textarea>
                    </div>
                    
                    <div className={styles.doubleInputGroup}>
                        <div className={styles.formGroup}>
                            <label htmlFor="pincode">Pincode</label>
                            <input
                                type="text"
                                id="pincode"
                                name="pincode"
                                placeholder="Enter pincode"
                                value={formData.pincode}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="country">Country</label>
                            <input
                                type="text"
                                id="country"
                                name="country"
                                placeholder="Enter country"
                                value={formData.country}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                    
                    <div className={styles.doubleInputGroup}>
                        <div className={styles.formGroup}>
                            <label htmlFor="state">State</label>
                            <input
                                type="text"
                                id="state"
                                name="state"
                                placeholder="Enter state"
                                value={formData.state}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="city">City</label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                placeholder="Enter city"
                                value={formData.city}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                    
                    <button
                        className={styles.saveAddressBtn}
                        type="submit"
                    >
                        Save Address
                    </button>
                </form>
            </div>
        </>
    )
}

export default AddressForm