
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
import {assets} from "../../assets/assets.js"

const PaljiLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(prev => !prev);

  const [state, setState] = useState("Login");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loginLoading, setLoginLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  useEffect(() => {
    if (location.state?.state) {
      setState(location.state.state);
    }
  }, [location.state]);

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Normal Login
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
        window.location.reload(); // Refresh the page instead of navigating
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

  // Google Login
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
        toast.success(responseData.message || "Account created successfully!");
        window.location.reload(); // Refresh the page after successful login
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
									src={assets.newlogo}
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
            disabled={googleLoading || loginLoading}
          >
            <FaGoogle className="palji-google-icon" /> Sign in with Google
          </button>

          <div className="palji-divider"><span>OR</span></div>

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
                {/* <input type="checkbox" /> Remember Me */}
              </label>
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>

            <button
              type="submit"
              className={`palji-button ${loginLoading ? 'loading' : ''}`}
              disabled={loginLoading || googleLoading} 
            >
              ➔ Continue
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