


import React, { useEffect, useState } from "react"
import { makeApi } from "../../api/callApi"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import { auth, provider } from "./config.js";
import { signInWithPopup } from "firebase/auth";


import "./signup.css"

const Signup = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const mobileNumberRegex = /^[0-9]{10}$/
	const [signupSuccess, setSignupSuccess] = useState(false)
	const [loading, setLoading] = useState(false)
	const [state, setState] = useState("Login")
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		password: "",
		email: "",
		mobileNumber: "",
	})

	useEffect(() => {
		if (location.state?.state) {
			setState(location.state.state)
		}
	}, [location.state])

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
		// if (!formData.password) {
		// 	toast.error("Please fill password")
		// 	setLoading(false)
		// 	return
		// }

		try {
			const response = await makeApi("/api/login-user", "post", formData)
			const responseData = response.data
			if (responseData.success) {
				localStorage.setItem("token", responseData.token)
				setSignupSuccess(true)
				toast.success(responseData.message)
				navigate("/")
				window.location.reload();

			} else {
				console.log("Login failed:", responseData.error)
				// Handle login failure
			}
		} catch (error) {
			console.log("Error during login:", error)
			toast.error(error.response.data.message)
			// Handle error
		} finally {
			setLoading(false) // Set loading back to false after authentication attempt
		}
	}

	const signup = async () => {
		console.log("Signup function executed", formData)

		if (!formData.email) {
			toast.error("Please fill email")
			return
		}
		if (!formData.password) {
			toast.error("Please fill password")
			return
		}
		// if (!mobileNumberRegex.test(formData.mobileNumber)) {
		// 	toast.error("Please enter a valid 10-digit mobile number")
		// 	return
		// }
		// if (!formData.mobileNumber) {
		// 	toast.error("Please fill mobileNumber")
		// 	return
		// }
		if (!formData.firstName) {
			toast.error("Please fill firstName")
			return
		}
		if (!formData.lastName) {
			toast.error("Please fill lastName")
			return
		}

		try {
			const response = await makeApi("/api/register-user", "post", formData)
			const responseData = response.data
			if (responseData.success) {
				localStorage.setItem("token", responseData.token)
				setSignupSuccess(true)
				toast.success(responseData.message || "Sign up Successfully", {

					onClose: () => {
						navigate("/")
					},
				})

			} else {
				console.log("Signup failed:", responseData.error)
				// Handle signup failure
			}
		} catch (error) {
			// console.log("Error during signup:", error)
			// toast.error(error.response.data.message)

			// Handle error
			console.log("Error during signup:", error)
			const errorMessage =
				error.response?.data?.message || "Enter a valid email"
			toast.error(errorMessage)
		}
	}


	const handelClick = async () => {
		setLoading(true);
		try {
			// Sign in with Google and retrieve user info
			const result = await signInWithPopup(auth, provider);
			const user = result.user;

			// Prepare data for registration
			const registrationData = {
				email: user.email,
				firstName: user.displayName.split(' ')[0],
				lastName: user.displayName.split(' ')[1] || '',
			};

			// Attempt to register the user
			const response = await makeApi("/api/register-user", "post", registrationData);

			// Handle response
			const responseData = response.data;
			if (responseData.success) {
				localStorage.setItem("token", responseData.token);
				setSignupSuccess(true);
				toast.success(responseData.message || "Account created successfully!", {
					onClose: () => {
						navigate("/");
					},
				});
			} else {
				console.error("Registration failed:", responseData.error);
				toast.error("Failed to create account. Please try again.");
			}
		} catch (error) {
			console.error("Error during Google Sign-in:", error);
			toast.error(`Failed to sign in with Google: ${error.message || error.code}`);
		} finally {
			setLoading(false);
		}
	};


	return (
		<>
			<ToastContainer autoClose={1500} />
			<div className="signup">
				<div className="signup-form">
					<div
						onClick={handelClick}
						className="googleAUthorize"
					>
						<span  >
							<img
								src="https://static-00.iconduck.com/assets.00/google-icon-512x512-tqc9el3r.png" />
							<p> {state === "Sign Up" ? "Sign Up with Google" : "Sign In with Google"}</p>
						</span>
					</div>
					<div className="or">OR</div>
					<div className="enter-name">
						{state === "Sign Up" ? (
							<input
								name="firstName"
								type="text"
								placeholder="First Name"
								onChange={changeHandler}
								value={formData.firstName}
							/>
						) : (
							""
						)}
						{state === "Sign Up" ? (
							<input
								name="lastName"
								type="text"
								placeholder="Last Name"
								value={formData.lastName}
								onChange={changeHandler}
							/>
						) : (
							""
						)}
					</div>
					<input
						name="email"
						type="email"
						placeholder="Email Address"
						value={formData.email}
						onChange={changeHandler}
						required
					/>
					{state === "Sign Up" ? (
						<input
							name="mobileNumber"
							type="tel"
							placeholder="Phone Number"
							value={formData.mobileNumber}
							onChange={changeHandler}
						/>
					) : (
						""
					)}
					<input
						name="password"
						type="password"
						placeholder="Password"
						value={formData.password}
						onChange={changeHandler}
					/>
					{!loading &&
						<button
							onClick={() => {
								state === "Login" ? login() : signup()
							}}
							disabled={loading} // Disable button if form is invalid or loading

						>
							{loading ? "Loading..." : "Continue"}
						</button>
					}
					{state === "Login" ? (
						<Link
							to="/Forgot-Password"
							className="login-forgot-password"
						>
							Forgot Password
						</Link>
					) : (
						""
					)}

					{state === "Sign Up" ? (
						<p>
							<b> Already have an account ?</b>{" "}
							<span
								onClick={() => setState("Login")}
								style={{ cursor: "pointer" }}
							>
								Log in
							</span>
						</p>
					) : (
						<p className="loginsignup-login">
							<b>Create an account</b> <span> </span>
							<span
								onClick={() => setState("Sign Up")}
								style={{ cursor: "pointer" }}
							>
								Click Here
							</span>
						</p>
					)}
				</div>
			</div>
		</>
	)
}

export default Signup





// import React, { useEffect, useState } from "react";
// import { makeApi } from "../../api/callApi";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "./signup.css";

// const Signup = () => {
// 	const navigate = useNavigate();
// 	const location = useLocation();
// 	const [signupSuccess, setSignupSuccess] = useState(false);
// 	const [loading, setLoading] = useState(false);
// 	const [state, setState] = useState("Login");
// 	const [formData, setFormData] = useState({
// 		firstName: "",
// 		lastName: "",
// 		password: "",
// 		email: "",
// 		mobileNumber: "",
// 	});

// 	// Initialize Google API
// 	useEffect(() => {
// 		const initializeGapi = () => {
// 			window.gapi.load("auth2", {
// 				callback: () => {
// 					try {
// 						window.gapi.auth2
// 							.init({
// 								client_id: "666469184305-9o44or0equ1sg64886jm2elav70nqfmt.apps.googleusercontent.com",
// 								scope: "email profile",
// 							})
// 							.then(
// 								() => {
// 									console.log("Google API initialized successfully");
// 								},
// 								(error) => {
// 									console.error("Error initializing Google API:", error);
// 								}
// 							);
// 					} catch (error) {
// 						console.error("Error in gapi.auth2.init:", error);
// 					}
// 				},
// 				onerror: (error) => {
// 					console.error("Error loading gapi.auth2:", error);
// 				},
// 			});
// 		};

// 		const loadGapiScript = () => {
// 			try {
// 				if (window.gapi) {
// 					initializeGapi();
// 				} else {
// 					const script = document.createElement("script");
// 					script.src = "https://apis.google.com/js/api:client.js";
// 					script.async = true;
// 					script.defer = true;
// 					script.onload = initializeGapi;
// 					script.onerror = (error) => {
// 						console.error("Error loading Google API script:", error);
// 					};
// 					document.body.appendChild(script);
// 				}
// 			} catch (error) {
// 				console.error("Error in loadGapiScript:", error);
// 			}
// 		};

// 		loadGapiScript();
// 	}, []);

// 	useEffect(() => {
// 		if (location.state?.state) {
// 			setState(location.state.state);
// 		}
// 	}, [location.state]);

// 	const changeHandler = (e) => {
// 		setFormData({ ...formData, [e.target.name]: e.target.value });
// 	};

// 	const handleGoogleLogin = async () => {
// 		try {
// 			setLoading(true);

// 			// Check if gapi is loaded
// 			if (!window.gapi) {
// 				throw new Error("Google API not loaded");
// 			}

// 			// Check if auth2 is initialized
// 			const auth2 = window.gapi.auth2?.getAuthInstance();
// 			if (!auth2) {
// 				throw new Error("Google Auth not initialized");
// 			}

// 			// Attempt sign in
// 			const googleUser = await auth2.signIn();
// 			if (!googleUser) {
// 				throw new Error("Google Sign In failed");
// 			}

// 			const profile = googleUser.getBasicProfile();
// 			console.log("Google Profile:", profile);

// 			// Prepare data for registration
// 			const registrationData = {
// 				email: profile.getEmail(),
// 				firstName: profile.getGivenName(),
// 				lastName: profile.getFamilyName() || "",
// 			};

// 			// Register or Log in
// 			const response = await makeApi("/api/register-user", "post", registrationData);
// 			const responseData = response.data;

// 			if (responseData.success) {
// 				localStorage.setItem("token", responseData.token);
// 				setSignupSuccess(true);
// 				toast.success(responseData.message || "Account created successfully!");
// 				navigate("/");
// 			} else {
// 				throw new Error(responseData.message || "Failed to create account");
// 			}

// 		} catch (error) {
// 			console.error("Google Sign-In Error:", error);
// 			toast.error(error.message || "Failed to sign in with Google. Please try again.");
// 		} finally {
// 			setLoading(false);
// 		}
// 	};


// 	const login = async () => {
// 		setLoading(true);
// 		if (!formData.email) {
// 			toast.error("Please fill email");
// 			setLoading(false);
// 			return;
// 		}

// 		try {
// 			const response = await makeApi("/api/login-user", "post", formData);
// 			const responseData = response.data;

// 			if (responseData.success) {
// 				localStorage.setItem("token", responseData.token);
// 				setSignupSuccess(true);
// 				toast.success(responseData.message);
// 				navigate("/");
// 				window.location.reload();
// 			} else {
// 				toast.error("Login failed. Please try again.");
// 			}
// 		} catch (error) {
// 			toast.error(error.response?.data?.message || "Login error");
// 		} finally {
// 			setLoading(false);
// 		}
// 	};

// 	const signup = async () => {
// 		if (!formData.email || !formData.password || !formData.firstName || !formData.lastName) {
// 			toast.error("Please fill all required fields");
// 			return;
// 		}

// 		try {
// 			const response = await makeApi("/api/register-user", "post", formData);
// 			const responseData = response.data;

// 			if (responseData.success) {
// 				localStorage.setItem("token", responseData.token);
// 				setSignupSuccess(true);
// 				toast.success(responseData.message || "Sign up successfully!", {
// 					onClose: () => navigate("/"),
// 				});
// 			} else {
// 				toast.error("Sign-up failed. Please try again.");
// 			}
// 		} catch (error) {
// 			toast.error(error.response?.data?.message || "Error during signup");
// 		}
// 	};

// 	return (
// 		<>
// 			<ToastContainer autoClose={1500} />
// 			<div className="signup">
// 				<div className="signup-form">
// 					<div
// 						onClick={!loading ? handleGoogleLogin : undefined}
// 						className={`googleAuthorize ${loading ? 'disabled' : ''}`}
// 						style={{ opacity: loading ? 0.7 : 1 }}
// 					>
// 						<span>
// 							<img
// 								src="https://static-00.iconduck.com/assets.00/google-icon-512x512-tqc9el3r.png"
// 								alt="Google Icon"
// 							/>
// 							<p>
// 								{loading
// 									? "Loading..."
// 									: (state === "Sign Up" ? "Sign Up with Google" : "Sign In with Google")
// 								}
// 							</p>
// 						</span>
// 					</div>

// 					<div className="or">OR</div>
// 					<div className="enter-name">
// 						{state === "Sign Up" && (
// 							<>
// 								<input
// 									name="firstName"
// 									type="text"
// 									placeholder="First Name"
// 									onChange={changeHandler}
// 									value={formData.firstName}
// 								/>
// 								<input
// 									name="lastName"
// 									type="text"
// 									placeholder="Last Name"
// 									value={formData.lastName}
// 									onChange={changeHandler}
// 								/>
// 							</>
// 						)}
// 					</div>
// 					<input
// 						name="email"
// 						type="email"
// 						placeholder="Email Address"
// 						value={formData.email}
// 						onChange={changeHandler}
// 						required
// 					/>
// 					{state === "Sign Up" && (
// 						<input
// 							name="mobileNumber"
// 							type="tel"
// 							placeholder="Phone Number"
// 							value={formData.mobileNumber}
// 							onChange={changeHandler}
// 						/>
// 					)}
// 					<input
// 						name="password"
// 						type="password"
// 						placeholder="Password"
// 						value={formData.password}
// 						onChange={changeHandler}
// 					/>
// 					<button
// 						onClick={() => (state === "Login" ? login() : signup())}
// 						disabled={loading}
// 					>
// 						{loading ? "Loading..." : "Continue"}
// 					</button>
// 					{state === "Login" && (
// 						<Link to="/Forgot-Password" className="login-forgot-password">
// 							Forgot Password
// 						</Link>
// 					)}
// 					{state === "Sign Up" ? (
// 						<p>
// 							<b> Already have an account?</b>{" "}
// 							<span onClick={() => setState("Login")} style={{ cursor: "pointer" }}>
// 								Log in
// 							</span>
// 						</p>
// 					) : (
// 						<p className="loginsignup-login">
// 							<b>Create an account</b>{" "}
// 							<span onClick={() => setState("Sign Up")} style={{ cursor: "pointer" }}>
// 								Click Here
// 							</span>
// 						</p>
// 					)}
// 				</div>
// 			</div>
// 		</>
// 	);
// };

// export default Signup;