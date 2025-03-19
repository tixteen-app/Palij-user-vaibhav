import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"

// import "./signup.css"
import { makeApi } from "../../../api/callApi"

const SignUp = () => {
	const navigate = useNavigate()
	const mobileNumberRegex = /^[0-9]{10}$/
	const [loading, setLoading] = useState(false)
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		password: "",
		email: "",
		mobileNumber: "",
	})

	const changeHandler = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const signup = async () => {
		if (!formData.email) {
			toast.error("Please fill email")
			return
		}
		if (!formData.password) {
			toast.error("Please fill password")
			return
		}
		if (!mobileNumberRegex.test(formData.mobileNumber)) {
			toast.error("Please enter a valid 10-digit mobile number")
			return
		}
		if (!formData.mobileNumber) {
			toast.error("Please fill mobileNumber")
			return
		}
		if (!formData.firstName) {
			toast.error("Please fill firstName")
			return
		}
		if (!formData.lastName) {
			toast.error("Please fill lastName")
			return
		}

		try {
			const response = await makeApi("/api/register-user-by-pass", "post", formData)
			const responseData = response.data
			if (responseData.success) {
				localStorage.setItem("token", responseData.token)
				toast.success(responseData.message || "Sign up Successfully", {
					onClose: () => {
						navigate("/")
					},
				})
			} else {
				console.log("Signup failed:", responseData.error)
			}
		} catch (error) {
			console.log("Error during signup:", error)
			const errorMessage =
				error.response?.data?.message || "Enter a valid email"
			toast.error(errorMessage)
		}
	}

	return (
		<>
			<ToastContainer />
			<div className="signup">
				<div className="signup-form">
					<div className="enter-name">
						<input
							name="firstName"
							type="text"
							placeholder="First Name"
							onChange={changeHandler}
							value={formData.firstName}
						/>
						<input
							name="lastName"
							type="text"
							placeholder="Last Name"
							value={formData.lastName}
							onChange={changeHandler}
						/>
					</div>
					<input
						name="email"
						type="email"
						placeholder="Email Address"
						value={formData.email}
						onChange={changeHandler}
						required
					/>
					<input
						name="mobileNumber"
						type="tel"
						placeholder="Phone Number"
						value={formData.mobileNumber}
						onChange={changeHandler}
					/>
					<input
						name="password"
						type="password"
						placeholder="Password"
						value={formData.password}
						onChange={changeHandler}
					/>
					<button
						onClick={signup}
						disabled={loading}
					>
						{loading ? "Loading..." : "Continue"}
					</button>
					<p>
						<b>Already have an account?</b>{" "}
						<span
							onClick={() => navigate("/login")}
							style={{ cursor: "pointer" }}
						>
							Log in
						</span>
					</p>
				</div>
			</div>
		</>
	)
}

export default SignUp
