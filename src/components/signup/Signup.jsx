


// import React, { useEffect, useState } from "react"
// import { makeApi } from "../../api/callApi"
// import { Link, useNavigate, useLocation } from "react-router-dom"
// import { ToastContainer, toast } from "react-toastify"
// import { auth, provider } from "./config.js";
// import { signInWithPopup } from "firebase/auth";


// import "./signup.css"

// const Signup = () => {
// 	const navigate = useNavigate()
// 	const location = useLocation()
// 	const mobileNumberRegex = /^[0-9]{10}$/
// 	const [signupSuccess, setSignupSuccess] = useState(false)
// 	const [loading, setLoading] = useState(false)
// 	const [state, setState] = useState("Login")
// 	const [formData, setFormData] = useState({
// 		firstName: "",
// 		lastName: "",
// 		password: "",
// 		email: "",
// 		mobileNumber: "",
// 	})

// 	useEffect(() => {
// 		if (location.state?.state) {
// 			setState(location.state.state)
// 		}
// 	}, [location.state])

// 	const changeHandler = (e) => {
// 		setFormData({ ...formData, [e.target.name]: e.target.value })
// 	}

// 	const login = async () => {
// 		setLoading(true)
// 		if (!formData.email) {
// 			toast.error("Please fill email")
// 			setLoading(false)
// 			return
// 		}

// 		try {
// 			const response = await makeApi("/api/login-user", "post", formData)
// 			const responseData = response.data
// 			if (responseData.success) {
// 				localStorage.setItem("token", responseData.token)
// 				setSignupSuccess(true)
// 				toast.success(responseData.message)
// 				navigate("/")
// 				window.location.reload();

// 			} else {
// 				console.log("Login failed:", responseData.error)
// 				// Handle login failure
// 			}
// 		} catch (error) {
// 			console.log("Error during login:", error)
// 			toast.error(error.response.data.message)
// 			// Handle error
// 		} finally {
// 			setLoading(false) // Set loading back to false after authentication attempt
// 		}
// 	}

// 	const signup = async () => {
// 		console.log("Signup function executed", formData)

// 		if (!formData.email) {
// 			toast.error("Please fill email")
// 			return
// 		}
// 		if (!formData.password) {
// 			toast.error("Please fill password")
// 			return
// 		}
// 		if (!formData.firstName) {
// 			toast.error("Please fill firstName")
// 			return
// 		}
// 		if (!formData.lastName) {
// 			toast.error("Please fill lastName")
// 			return
// 		}

// 		try {
// 			const response = await makeApi("/api/register-user", "post", formData)
// 			const responseData = response.data
// 			if (responseData.success) {
// 				localStorage.setItem("token", responseData.token)
// 				setSignupSuccess(true)
// 				toast.success(responseData.message || "Sign up Successfully", {

// 					onClose: () => {
// 						navigate("/")
// 					},
// 				})

// 			} else {
// 				console.log("Signup failed:", responseData.error)
// 				// Handle signup failure
// 			}
// 		} catch (error) {
// 			// console.log("Error during signup:", error)
// 			// toast.error(error.response.data.message)

// 			// Handle error
// 			console.log("Error during signup:", error)
// 			const errorMessage =
// 				error.response?.data?.message || "Enter a valid email"
// 			toast.error(errorMessage)
// 		}
// 	}


// 	const handelClick = async () => {
// 		setLoading(true);
// 		try {
// 			// Sign in with Google and retrieve user info
// 			const result = await signInWithPopup(auth, provider);
// 			const user = result.user;

// 			// Prepare data for registration
// 			const registrationData = {
// 				email: user.email,
// 				firstName: user.displayName.split(' ')[0],
// 				lastName: user.displayName.split(' ')[1] || '',
// 			};

// 			// Attempt to register the user
// 			const response = await makeApi("/api/register-user", "post", registrationData);

// 			// Handle response
// 			const responseData = response.data;
// 			if (responseData.success) {
// 				localStorage.setItem("token", responseData.token);
// 				setSignupSuccess(true);
// 				toast.success(responseData.message || "Account created successfully!", {
// 					onClose: () => {
// 						navigate("/");
// 					},
// 				});
// 			} else { 
// 				console.error("Registration failed:", responseData.error);
// 				toast.error("Failed to create account. Please try again.");
// 			}
// 		} catch (error) {
// 			console.error("Error during Google Sign-in:", error);
// 			toast.error(`Failed to sign in with Google: ${error.message || error.code}`);
// 		} finally {
// 			setLoading(false);
// 		}
// 	};


// 	return (
// 		<>
// 			<ToastContainer autoClose={1500} />
// 			<div className="signup">
// 				<div className="signup-form">
// 					<div
// 						onClick={handelClick}
// 						className="googleAUthorize"
// 					>
// 						<span  >
// 							<img
// 								src="https://static-00.iconduck.com/assets.00/google-icon-512x512-tqc9el3r.png" />
// 							<p> {state === "Sign Up" ? "Sign Up with Google" : "Sign In with Google"}</p>
// 						</span>
// 					</div>
// 					<div className="or">OR</div>
// 					<div className="enter-name">
// 						{state === "Sign Up" ? (
// 							<input
// 								name="firstName"
// 								type="text"
// 								placeholder="First Name"
// 								onChange={changeHandler}
// 								value={formData.firstName}
// 							/>
// 						) : (
// 							""
// 						)}
// 						{state === "Sign Up" ? (
// 							<input
// 								name="lastName"
// 								type="text"
// 								placeholder="Last Name"
// 								value={formData.lastName}
// 								onChange={changeHandler}
// 							/>
// 						) : (
// 							""
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
// 					{state === "Sign Up" ? (
// 						<input
// 							name="mobileNumber"
// 							type="tel"
// 							placeholder="Phone Number"
// 							value={formData.mobileNumber}
// 							onChange={changeHandler}
// 						/>
// 					) : (
// 						""
// 					)}
// 					<input
// 						name="password"
// 						type="password"
// 						placeholder="Password"
// 						value={formData.password}
// 						onChange={changeHandler}
// 					/>
// 					{!loading &&
// 						<button
// 							onClick={() => {
// 								state === "Login" ? login() : signup()
// 							}}
// 							disabled={loading} // Disable button if form is invalid or loading

// 						>
// 							{loading ? "Loading..." : "Continue"}
// 						</button>
// 					}
// 					{state === "Login" ? (
// 						<Link
// 							to="/Forgot-Password"
// 							className="login-forgot-password"
// 						>
// 							Forgot Password
// 						</Link>
// 					) : (
// 						""
// 					)}

// 					{state === "Sign Up" ? (
// 						<p>
// 							<b> Already have an account ?</b>{" "}
// 							<span
// 								onClick={() => setState("Login")}
// 								style={{ cursor: "pointer" }}
// 							>
// 								Log in
// 							</span>
// 						</p>
// 					) : (
// 						<p className="loginsignup-login">
// 							<b>Create an account</b> <span> </span>
// 							<span
// 								onClick={() => setState("Sign Up")}
// 								style={{ cursor: "pointer" }}
// 							>
// 								Click Here
// 							</span>
// 						</p>
// 					)}
// 				</div>
// 			</div>
// 		</>
// 	)
// }

// export default Signup


import React, { useState, useEffect } from 'react';
import './PaljiLogin.css';
import {
  FaEye,
  FaEyeSlash,
  FaEnvelope,
  FaLock,
  FaGoogle
} from 'react-icons/fa';
import { makeApi } from "../../api/callApi";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { auth, provider } from "./config.js";
import { signInWithPopup } from "firebase/auth";

const PaljiLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(prev => !prev);

  const [state, setState] = useState("Login");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // ✅ Separate loading states for buttons
  const [loginLoading, setLoginLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // ✅ Check location for state (optional)
  useEffect(() => {
    if (location.state?.state) {
      setState(location.state.state);
    }
  }, [location.state]);

  // ✅ Handle form inputs
  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Normal Login
  const login = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoginLoading(true);

    try {
      const response = await makeApi("/api/login-user", "post", formData);
      const responseData = response.data;

      if (responseData.success) {
        localStorage.setItem("token", responseData.token);
        toast.success(responseData.message);
        navigate("/");
        window.location.reload();
      } else {
        toast.error("Login failed!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed!");
      console.error("Login error:", error);
    } finally {
      setLoginLoading(false);
    }
  };

  // ✅ Google Login
  const handelClickGoogle = async () => {
    setGoogleLoading(true);

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const registrationData = {
        email: user.email,
        firstName: user.displayName.split(' ')[0],
        lastName: user.displayName.split(' ')[1] || '',
      };

      const response = await makeApi("/api/register-user", "post", registrationData);
      const responseData = response.data;

      if (responseData.success) {
        localStorage.setItem("token", responseData.token);
        toast.success(responseData.message || "Account created successfully!", {
          onClose: () => navigate("/"),
        });
      } else {
        toast.error("Google registration failed!");
      }
    } catch (error) {
      toast.error(error.message || "Google sign-in failed!");
      console.error("Google sign-in error:", error);
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="palji-container">
      <div className="palji-card">
        {/* Left Section */}
        <div className="palji-left">
          <div className="palji-overlay">
            <h2>Palji Bakery</h2>
            <p>Serving Sweetness Since 1985</p>
          </div>
        </div>

        {/* Right Section */}
        <div className="palji-right">
          <div className="palji-logo-container">
            <img
              src="https://res.cloudinary.com/dtivafy25/image/upload/v1742203035/png_2_ohkc4l.png"
              alt="Palji Bakery Logo"
              className="palji-logo"
            />
          </div>

          <h2 className="palji-heading">Welcome Back!</h2>
          <p className="palji-subheading">Log in to Palji Bakery</p>

          {/* Google Login */}
          <button
            type="button"
            className={`palji-google-btn ${googleLoading ? 'loading' : ''}`}
            onClick={handelClickGoogle}
            disabled={googleLoading || loginLoading} // Disable if any loading is true
          >
              <>
                <FaGoogle className="palji-google-icon" /> Sign in with Google
              </>
          </button>

          <div className="palji-divider"><span>or</span></div>

          {/* Form */}
          <form onSubmit={login} className="palji-form">
            <div className="palji-form-group">
              <label>Email Address</label>
              <div className="palji-input-box">
                <FaEnvelope className="palji-icon" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={changeHandler}
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="palji-form-group">
              <label>Password</label>
              <div className="palji-input-box">
                <FaLock className="palji-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={changeHandler}
                  placeholder="Enter your password"
                  required
                />
                <span className="palji-eye" onClick={togglePassword}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            <div className="palji-options">
              <label className="remember-me">
                <input type="checkbox" /> Remember Me
              </label>
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>

            <button
              type="submit"
              className={`palji-button ${loginLoading ? 'loading' : ''}`}
              disabled={loginLoading || googleLoading} // Disable if any loading is true
            >
              {loginLoading ? (
                <>
                  <span className="loader"></span> Processing...
                </>
              ) : (
                <>➔ Continue</>
              )}
            </button>
          </form>

          <p className="palji-create-account">
            Create an account? <Link to="/register">Click Here</Link>
          </p>

          <p className="palji-footer">© 2025 Palji Bakery. All rights reserved.</p>
        </div>
      </div>

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default PaljiLogin;
