import React, { useState } from "react"
import "./contact.css"
import { makeApi } from "../../api/callApi.tsx"
import { ToastContainer, toast } from "react-toastify"

const Contact = () => {
	const [Data, setData] = useState({
		firstname: "",
		lastname: "",
		email: "",
		message: "",
		phonennumber: "",
	})

	const handelChange = (event) => {
		const { name, value } = event.target
		setData((prevState) => ({
			...prevState,
			[name]: value,
		}))
	}

	const handleSubmit = async (event) => {
		event.preventDefault()
		if (!Data.firstname) {
			toast.error("Please fill firstname")
			return
		}
		if (!Data.lastname) {
			toast.error("Please fill lastname")
			return
		}
		if (!Data.email) {
			toast.error("Please fill email")
			return
		}
		if (!Data.phonennumber) {
			toast.error("Please fill phonennumber")
			return
		}
		if (!Data.message) {
			toast.error("Please fill message")
			return
		}
		if (Data.phonennumber && Data.phonennumber.length < 10) {
			toast.error("Please enter valid phonennumber")
			return
		}
		// Validate email
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		if (!Data.email) {
			toast.error("Please fill email")
			return
		} else if (!emailPattern.test(Data.email)) {
			toast.error("Please enter a valid email address")
			return
		}

		// Validate phonennumber
		const phonePattern = /^\d{10}$/
		if (!Data.phonennumber) {
			toast.error("Please fill phone number")
			return
		} else if (!phonePattern.test(Data.phonennumber)) {
			toast.error("Please enter a valid 10-digit phone number")
			return
		}
		try {
			const response = await makeApi("/api/create-message", "POST", Data)
			toast.success(response.data.message, {
				onClose: () => {
					setData({
						firstname: "",
						lastname: "",
						email: "",
						message: "",
						phonennumber: "",
					})
				},
			})
			// toast.info("Thank you for sharing your thoughts with us")
		} catch (error) {
			toast.error(error)
			console.error("Error sending data:", error.response.data.message)
		}
	}

	return (
		<>
			<ToastContainer />
			<div className="contact-container">
				<div className="contact">
					<h1>CONTACT US</h1>
				</div>
				<div className="contact-form">
					<h1>SHARE YOUR THOUGHTS</h1>
					<div className="fill-form">
						<form action="">
							<div className="enter-name">
								<input
									type="text"
									placeholder="First Name"
									onChange={handelChange}
									name="firstname"
									value={Data.firstname}
								/>
								<input
									type="text"
									placeholder="Last Name"
									onChange={handelChange}
									name="lastname"
									value={Data.lastname}
								/>
							</div>
							<input
								type="tel"
								placeholder="Phone Number"
								onChange={handelChange}
								name="phonennumber"
								value={Data.phonennumber}
							/>
							<input
								type="email"
								placeholder="Email Address"
								onChange={handelChange}
								name="email"
								value={Data.email}
							/>
							<textarea
								cols="30"
								rows="4"
								placeholder="Message"
								onChange={handelChange}
								name="message"
								value={Data.message}
							></textarea>
							<button onClick={(e) => handleSubmit(e)}>Submit</button>
						</form>
					</div>
				</div>
				<div className="google-map">
					<h1>Where to Find Us</h1>
					<div className="geo-location">
						<iframe
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13694.569790832711!2d75.80660897740836!3d30.896661903417566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a839a09925acd%3A0xc21362fc90786a27!2sPalji%20Bakery!5e0!3m2!1sen!2sin!4v1710379919663!5m2!1sen!2sin"
							width="600"
							height="450"
							// style="border:0;"
							// allowfullscreen=""
							loading="lazy"

						// frameborder={0}
						// referrerpolicy="no-referrer-when-downgrade"
						></iframe>
					</div>
				</div>
			</div>
		</>
	)
}

export default Contact
