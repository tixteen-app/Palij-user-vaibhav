import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PaljiSignUp.css';
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { makeApi } from "../../api/callApi"; // Make sure this API function is working.
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for the toast
import { auth, provider } from "./config.js"; // Firebase auth config
import { signInWithPopup } from "firebase/auth"; // Firebase Google Sign-In

const PaljiSignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.email || !formData.password || !formData.firstName || !formData.lastName || !formData.phoneNumber) {
      toast.error("Please fill all the fields");
      setLoading(false);
      return;
    }

    try {
      const response = await makeApi("/api/register-user-by-pass", "post", formData);
      const responseData = response.data;
console.log('responseData', responseData);
      if (responseData.success) {
        toast.success("Account created successfully!");
        // Redirect to login or home
        navigate("/");
      } else {
        toast.error("Signup failed, please try again!");
      }
    } catch (error) {
      toast.error(error.response.data.message|| "Google signup failed!");
      console.error("Signup error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Google sign-up
  const handleGoogleSignUp = async () => {
    setGoogleLoading(true);

    try {
      // Use Firebase or your authentication method
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const registrationData = {
        email: user.email,
        firstName: user.displayName.split(' ')[0],
        lastName: user.displayName.split(' ')[1] || '',
      };

      const response = await makeApi("/api/register-user-by-pass", "post", registrationData);
      const responseData = response.data;
      if (responseData.success) {
        toast.success("Account created successfully!");
        // Redirect to login or home
        navigate("/");
      } else {
        toast.error("Google signup failed!");
      }
    } catch (error) {
      toast.error(error.response.data.message|| "Google signup failed!");
      console.error("Google Sign-in error:", error);
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="palji-container">
      <div className="palji-card" style={{ height: '72vh' }}>
        {/* Left Section with Image and Logo */}
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

          <h2 className="palji-heading">Create Account</h2>
          <p className="palji-subheading">Sign up to Palji Bakery</p>

          {/* Google Sign Up Button */}
          <button
            type="button"
            className={`palji-google-btn ${googleLoading ? 'loading' : ''}`}
            onClick={handleGoogleSignUp}
            disabled={googleLoading || loading}
          >
            {/* {googleLoading ? (
              <span className="loader"></span>
            ) : ( */}
              <>
                <FaGoogle className="palji-google-icon" />
                Sign Up with Google
              </>
            {/* )} */}
          </button>

          <div className="palji-divider"><span>OR</span></div>

          {/* SignUp Form */}
          <form onSubmit={handleSubmit} className="palji-signup-form">
            <div className="palji-form-row">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />

            <div className="palji-password-field">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span className="toggle-eye" onClick={() => setShowPassword(prev => !prev)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <button
              type="submit"
              className={`palji-button ${loading ? 'loading' : ''}`}
              disabled={loading || googleLoading}
            >
              {loading ? 'Processing...' : 'Continue'}
            </button>
          </form>

          <p className="palji-login-link">
            Already have an account? <Link to="/palji-login">Log in</Link>
          </p>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} /> {/* ToastContainer to show toasts */}
    </div>
  );
};

export default PaljiSignUp;
