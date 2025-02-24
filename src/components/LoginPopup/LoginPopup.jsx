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
// 			<div className="loginpopuptoast">
// 				<ToastContainer />
// 			</div>
// 			<div className="login-popup">
// 				<div className="login-popup-content">
// 					<div className="close_icon_login_popup" onClick={onClose} >
// 						<svg

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
// 						required
// 					/>
// 					<input
// 						type="password"
// 						placeholder="Password"
// 						value={password}
// 						onChange={(e) => setPassword(e.target.value)}
// 						required
// 					/>
// 					<button
// 						className="login_click_buttons"
// 						onClick={handleLogin}
// 					>
// 						Login
// 					</button>
// 					<div className="text-center px-4 py-3 loginpopuplink">
// 						<p>
// 							Don't Have An Account?{" "}
// 							<span>
// 								<Link
// 									style={{ color: "#EE5564" }}
// 									className="css-for-link-tag golden-color-text"
// 									to="/register"
// 									onClick={() => {
// 										onClose()
// 										navigate("/Signup", { state: { state: "Sign Up" } })
// 									}}
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
import { auth, provider } from "../signup/config"; // Import Firebase config
import { signInWithPopup } from "firebase/auth"; // Import the Firebase auth method

const LoginPopup = ({ onClose }) => {
	const navigate = useNavigate()

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [Loading , setLoading] = useState(false)

	// Handle Login with Email
	const handleLogin = async (event) => {
		event.preventDefault()
		   setLoading(true);

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

	// Handle Login with Google
	const handleGoogleLogin = async () => {
		try {
			setLoading(true);
			// const result = await signInWithPopup(auth, provider);
			// const user = result.user;

			// // Prepare data for login
			// const loginData = {
			// 	email: user.email,
			// };

			// // Attempt login with Google
			// const response = await makeApi("/api/login-user", "POST", loginData);

			const result = await signInWithPopup(auth, provider);
						const user = result.user;
			
						// Prepare data for registration
						const registrationData = {
							email: user.email,
							firstName: user.displayName.split(' ')[0],
							lastName: user.displayName.split(' ')[1] || '',
						};
			const response = await makeApi("/api/register-user", "post", registrationData);


			if (response.data.success) {
				localStorage.setItem("token", response.data.token);
				toast.success(response.data.message || "Successfully logged in with Google!");
				onClose();
				navigate(0, 0); // Reload the page after successful login
			} else {
				console.error("Login failed:", response.data.error);
				toast.error("Login failed. Please try again.");
			}
		} catch (error) {
			console.error("Error during Google Sign-in:", error);
			toast.error(`Failed to sign in with Google: ${error.message || error.code}`);
		}finally {
			setLoading(false)
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

					{/* Google Login Button */}
					<div
						className="googleAuthorize"
						onClick={handleGoogleLogin}
					>
						<img
							src="https://static-00.iconduck.com/assets.00/google-icon-512x512-tqc9el3r.png"
							alt="Google"
						/>
						<div className="googleAuthorizeText_login_with">Login with Google</div>
					</div>

					{/* OR Divider */}
					<div className="or_text_on_popup">OR</div>

					{/* Login form with Email and Password */}
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
