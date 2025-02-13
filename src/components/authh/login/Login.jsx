import React, { useState } from "react"
import { makeApi } from "../../api/callApi"
import { Link, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"

import "./login.css"

const Login = () => {
	const navigate = useNavigate()
	const [loading, setLoading] = useState(false)
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	})

	const changeHandler = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const login = async () => {
		setLoading(true)
		if (!formData.email) {
			toast.error("Please fill email")
			setLoading(false)
			return
		}
		if (!formData.password) {
			toast.error("Please fill password")
			setLoading(false)
			return
		}

		try {
			const response = await makeApi("/api/login-user", "post", formData)
			const responseData = response.data
			if (responseData.success) {
				localStorage.setItem("token", responseData.token)
				toast.success(responseData.message, {
					onClose: () => {
						navigate("/")
					},
				})
			} else {
				console.log("Login failed:", responseData.error)
			}
		} catch (error) {
			console.log("Error during login:", error)
			toast.error(error.response.data.message)
		} finally {
			setLoading(false)
		}
	}

	return (
		<>
			<ToastContainer />
			<div className="login">
				<div className="login-form">
					<input
						name="email"
						type="email"
						placeholder="Email Address"
						value={formData.email}
						onChange={changeHandler}
						required
					/>
					<input
						name="password"
						type="password"
						placeholder="Password"
						value={formData.password}
						onChange={changeHandler}
					/>
					<button
						onClick={login}
						disabled={loading}
					>
						{loading ? "Loading..." : "Continue"}
					</button>
					<Link
						to="/Forgot-Password"
						className="login-forgot-password"
					>
						Forgot Password
					</Link>
					<p className="loginsignup-login">
						<b>Create an account</b> <span> </span>
						<span
							onClick={() => navigate("/signup")}
							style={{ cursor: "pointer" }}
						>
							Click Here
						</span>
					</p>
				</div>
			</div>
		</>
	)
}

export default Login
