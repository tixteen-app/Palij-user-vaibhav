import React, { useState } from "react"
import { assets } from "../../../assets/assets"
import "./customer.css"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { makeApi } from "../../../api/callApi"
import { ToastContainer, toast } from "react-toastify"

const Customer = () => {
	const [email, setEmail] = useState("")

	const validateEmail = (email) => {
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		return regex.test(email)
	}

	const handleSubmit = async (event) => {
		event.preventDefault()
		if (!email) {
			toast.error("Please fill email")
			return
		}
		if (!validateEmail(email)) {
			toast.error("Please enter a valid email address")
			return
		}
		try {
			const response = await makeApi("/api/create-subscribe", "POST", { email })
			if (response.data.success === true) {
				toast.success(response.data.message, {
					onClose: () => {
						setEmail("")
					},
				})
				setEmail("")
			}
		} catch (error) {
			toast.error(error.response.data.message)
			console.error("Error sending data:", error.response.data.message)
		}
	}

	const settings = {
		dots: true,
		arrows: false,
		infinite: true,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 1600,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					infinite: true,
					dots: true,
				},
			},
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					infinite: true,
					dots: true,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					initialSlide: 1,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	}
	return (
		<>
			{/* keep center this toster */}
			<ToastContainer
				position="top-center"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
			<div className="customer">
				<div className="customer-cards">
					<h1>A word from our customers</h1>
					<div className="cards">
						<Slider
							{...settings}
							className="cust-slides"
						>
							<div className="cust1">
								<img
									src={assets.cust_review1}
									alt=""
								/>
							</div>
							<div className="cust2">
								<img
									src={assets.cust_review2}
									alt=""
								/>
							</div>
							<div className="cust3">
								<img
									src={assets.cust_review3}
									alt=""
								/>
							</div>
						</Slider>
					</div>
				</div>
				<div className="subscriber">
					<h1>Subscribe for regular updates</h1>
					<div className="subscribe-here">
						<input
							type="email"
							placeholder="Enter Your Mail"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
						<img
							src={assets.subscriberBtn_icon}
							alt=""
							onClick={(e) => handleSubmit(e)}
						/>
					</div>
				</div>
			</div>
		</>
	)
}

export default Customer
