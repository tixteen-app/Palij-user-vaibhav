// import React, { useState } from "react"
// // import '../../styles/Auth/LoginPopup.css';
// import "./LoginPopup.css"

// import { ToastContainer, toast } from "react-toastify"
// import { Link, useNavigate } from "react-router-dom"
// import { makeApi } from "../../api/callApi"

// const LoginPopup = ({ onClose }) => {
// 	const navigate = useNavigate()

// 	const [email, setEmail] = useState("")

// 	const [password, setPassword] = useState("")

// 	const handleLogin = async (event) => {
// 		event.preventDefault()

// 		if (!email) {
// 			toast.error("Please fill email")
// 			return
// 		}
// 		if (!password) {
// 			toast.error("Please fill password")
// 			return
// 		}

// 		try {
// 			const response = await makeApi("/api/login-user", "POST", {
// 				password,
// 				email,
// 			})
// 			localStorage.setItem("token", response.data.token)
// 			toast.success(response.data.message)
// 			onClose()
// 			// refresh the page
// 			navigate(0, 0)
// 		} catch (error) {
// 			toast.error(error.response.data.message)
// 			console.error("Error sending data:", error.response.data.message)
// 		}
// 	}

// 	return (
// 		<>
// 			<ToastContainer />
// 			<div className="login-popup">
// 				<div className="login-popup-content">
// 					<div className="close_icon_login_popup">
// 						<svg
// 							onClick={() => onClose()}
// 							xmlns="http://www.w3.org/2000/svg"
// 							width="16"
// 							height="16"
// 							fill="currentColor"
// 							class="bi bi-x-lg"
// 							viewBox="0 0 16 16"
// 						>
// 							<path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
// 						</svg>
// 					</div>
// 					<h2>Login</h2>
// 					<input
// 						type="email"
// 						placeholder="Email"
// 						value={email}
// 						onChange={(e) => setEmail(e.target.value)}
// 					/>
// 					<input
// 						type="password"
// 						placeholder="Password"
// 						value={password}
// 						onChange={(e) => setPassword(e.target.value)}
// 					/>
// 					<button
// 						className="login_click_buttons"
// 						onClick={(e) => handleLogin(e)}
// 					>
// 						Login
// 					</button>
// 					<div className="text-center px-4 py-3">
// 						<p>
// 							Don't Have An Account?{" "}
// 							<span>
// 								<Link
// 									style={{ color: "#E5087E" }}
// 									className="css-for-link-tag golden-color-text"
// 									to="/Signup"
// 								>
// 									Sign Up
// 								</Link>
// 							</span>{" "}
// 							Now
// 						</p>
// 					</div>
// 				</div>
// 			</div>
// 		</>
// 	)
// }

// export default LoginPopup

// import React, { useState } from "react"
// import "./LoginPopup.css"
// import { ToastContainer, toast } from "react-toastify"
// import { Link, useNavigate } from "react-router-dom"
// import { makeApi } from "../../api/callApi"

// const LoginPopup = ({ onClose }) => {
// 	const navigate = useNavigate()

// 	const [email, setEmail] = useState("")
// 	const [password, setPassword] = useState("")

// 	const handleLogin = async (event) => {
// 		event.preventDefault()

// 		if (!email) {
// 			toast.error("Please fill email")
// 			return
// 		}
// 		if (!password) {
// 			toast.error("Please fill password")
// 			return
// 		}

// 		try {
// 			const response = await makeApi("/api/login-user", "POST", {
// 				password,
// 				email,
// 			})
// 			localStorage.setItem("token", response.data.token)
// 			toast.success(response.data.message)
// 			onClose()
// 			navigate(0, 0)
// 		} catch (error) {
// 			toast.error(error.response.data.message)
// 			console.error("Error sending data:", error.response.data.message)
// 		}
// 	}

// 	return (
// 		<>
// 			<ToastContainer />
// 			<div className="login-popup">
// 				<div className="login-popup-content">
// 					<div className="close_icon_login_popup">
// 						<svg
// 							onClick={onClose}
// 							xmlns="http://www.w3.org/2000/svg"
// 							width="16"
// 							height="16"
// 							fill="currentColor"
// 							className="bi bi-x-lg"
// 							viewBox="0 0 16 16"
// 						>
// 							<path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
// 						</svg>
// 					</div>
// 					<h2>Login</h2>
// 					<input
// 						type="email"
// 						placeholder="Email"
// 						value={email}
// 						onChange={(e) => setEmail(e.target.value)}
// 					/>
// 					<input
// 						type="password"
// 						placeholder="Password"
// 						value={password}
// 						onChange={(e) => setPassword(e.target.value)}
// 					/>
// 					<button
// 						className="login_click_buttons"
// 						onClick={handleLogin}
// 					>
// 						Login
// 					</button>
// 					<div className="text-center px-4 py-3">
// 						<p>
// 							Don't Have An Account?{" "}
// 							<span>
// 								<Link
// 									style={{ color: "#E5087E" }}
// 									className="css-for-link-tag golden-color-text"
// 									to="/Signup"
// 									onClick={onClose}
// 								>
// 									Sign Up
// 								</Link>
// 							</span>{" "}
// 							Now
// 						</p>
// 					</div>
// 				</div>
// 			</div>
// 		</>
// 	)
// }

// export default LoginPopup

import React, { useState } from "react"
import "./LoginPopup.css"
import { ToastContainer, toast } from "react-toastify"
import { Link, useNavigate } from "react-router-dom"
import { makeApi } from "../../api/callApi"

const LoginPopup = ({ onClose }) => {
	const navigate = useNavigate()

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const handleLogin = async (event) => {
		event.preventDefault()

		if (!email) {
			toast.error("Please fill email")
			return
		}
		if (!password) {
			toast.error("Please fill password")
			return
		}

		try {
			const response = await makeApi("/api/login-user", "POST", {
				password,
				email,
			})
			localStorage.setItem("token", response.data.token)
			toast.success(response.data.message)
			onClose()
			navigate(0, 0)
		} catch (error) {
			toast.error(error.response.data.message)
			console.error("Error sending data:", error.response.data.message)
		}
	}

	return (
		<>
			<div className="loginpopuptoast">
				<ToastContainer />
			</div>
			<div className="login-popup">
				<div className="login-popup-content">
					<div className="close_icon_login_popup" onClick={onClose} >
						<svg

							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							fill="currentColor"
							className="bi bi-x-lg"
							viewBox="0 0 16 16"
						>
							<path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
						</svg>
					</div>
					<h2>Login</h2>
					<input
						type="email"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
					<button
						className="login_click_buttons"
						onClick={handleLogin}
					>
						Login
					</button>
					<div className="text-center px-4 py-3 loginpopuplink">
						<p>
							Don't Have An Account?{" "}
							<span>
								<Link
									style={{ color: "#EE5564" }}
									className="css-for-link-tag golden-color-text"
									to="/register"
									onClick={() => {
										onClose()
										navigate("/Signup", { state: { state: "Sign Up" } })
									}}
								>
									Sign Up
								</Link>
							</span>{" "}
							Now
						</p>
					</div>
				</div>
			</div>
		</>
	)
}

export default LoginPopup
