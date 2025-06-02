// import React, { useEffect, useState, useRef } from 'react';
// import "./sendOtp.css";
// import { Link, useNavigate } from 'react-router-dom';
// import { makeApi } from "../../api/callApi"

// import { ToastContainer, toast } from "react-toastify";

// function OtpVerifiedForm() {
//   const navigate = useNavigate();

//   const [otp, setOtp] = useState(Array(6).fill(''));
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [IsOTPvalid, setIsOTPvalid] = useState(false);
//   const [OTPverified, setOTPverified] = useState(false);
//   const [passwordUpdated, setPasswordUpdated] = useState(false);
//   const inputRefs = useRef([]);


//   const [password, setPassword] = useState("");

//   const handleChange = (index, value) => {
//     const newOtp = [...otp];

//     // Handle pasting
//     if (value.length > 1) {
//       // Split the pasted value into an array of single digits
//       const pastedDigits = value.split('').slice(0, 6 - index);

//       // Fill the current and subsequent inputs
//       pastedDigits.forEach((digit, i) => {
//         if (index + i < 6) {
//           newOtp[index + i] = digit;
//         }
//       });

//       setOtp(newOtp);

//       // Focus on the next empty input or the last input
//       const nextEmptyIndex = newOtp.findIndex((digit, i) => i >= index && digit === '');
//       const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
//       inputRefs.current[focusIndex].focus();
//       return;
//     }

//     // Handle single digit input
//     if (!/^\d*$/.test(value)) {
//       return;
//     }

//     newOtp[index] = value;
//     setOtp(newOtp);

//     // Move focus forward if a digit is entered
//     if (value && index < 5) {
//       inputRefs.current[index + 1].focus();
//     }
//   };

//   // Add a separate function to handle backspace
//   const handleKeyDown = (index, event) => {
//     if (event.key === 'Backspace') {
//       const newOtp = [...otp];
//       newOtp[index] = '';
//       setOtp(newOtp);

//       // Move focus backward if the current input is already empty
//       if (index > 0 && otp[index] === '') {
//         inputRefs.current[index - 1].focus();
//       }
//     }
//   };


//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     // const enteredOtp = otp.join('');
//     const enteredOtp = parseInt(otp.join(''), 10);

//     if (!enteredOtp) {
//       toast.error('Please fill otp');
//       return;
//     }
//     try {
//       setLoading(true);
//       const response = await makeApi("/api/check-otp", "POST", { email, OTP: enteredOtp });
//       if (response.data.success === true) {
//         setOTPverified(true);
//         toast.success(response.data.message, {
//           // onClose: () => navigate("/")
//           onClose: () => {
//             setIsOTPvalid(true)
//             setOTPverified(false);

//           }
//         });
//       }
//     } catch (error) {
//       console.error('Error sending data:', error.response.data);
//       toast.error(error.response.data.message);
//     } finally {
//       setLoading(false);
//     }
//   };
//   const handleSubmitPassword = async (event) => {
//     event.preventDefault();
//     // const enteredOtp = otp.join('');
//     if (!password) {
//       toast.error('Please fill new password');
//       return;
//     }
//     try {
//       setLoading(true);
//       const response = await makeApi("/api/reset-password-with-otp", "POST", { email, newPassword: password });
//       if (response.data.success === true) {
//         setPasswordUpdated(true);
//         toast.success("Password updated successfully!", {
//           onClose: () => {
//             navigate("/")
//             setPasswordUpdated(false);

//           }
//         });
//       }
//     } catch (error) {
//       console.error('Error sending data:', error.response.data);
//       toast.error(error.response.data.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     setEmail(localStorage.getItem("send-otp-email", email));
//   }, []);

//   return (
//     <>
//       <ToastContainer />
//       {IsOTPvalid === false ?
//         <div className="main_login_page_div">
//           <form className="Otp-verified-form" >
//             <p className="Otp-verified-heading">Verify</p>
//             <svg
//               className="Otp-verified-check"
//               version="1.1"
//               id="Layer_1"
//               xmlns="http://www.w3.org/2000/svg"
//               xmlnsXlink="http://www.w3.org/1999/xlink"
//               x="0px"
//               y="0px"
//               width="60px"
//               height="60px"
//               viewBox="0 0 60 60"
//               xmlSpace="preserve"
//             >
           
//             </svg>

//             <div>
//               <div className="Otp-verified-box">
//                 {otp.map((digit, index) => (
//                   <input
//                     key={index}
//                     ref={el => (inputRefs.current[index] = el)}
//                     className="Otp-verified-input"
//                     type="text"
//                     maxLength={6} // Allow pasting multiple digits
//                     value={digit}
//                     onChange={(e) => handleChange(index, e.target.value)}
//                     onKeyDown={(e) => handleKeyDown(index, e)}
//                   />
//                 ))}

//               </div>
//               <div className="button_otp_page">
//                 {OTPverified === true ?
//                   <div>
//                     <div className='opt_don_loader_main_div'>
//                       <div className="otp_done_loader">
//                         <div className="circle">
//                           <div className="dot"></div>
//                           <div className="outline"></div>
//                         </div>
//                         <div className="circle">
//                           <div className="dot"></div>
//                           <div className="outline"></div>
//                         </div>
//                         <div className="circle">
//                           <div className="dot"></div>
//                           <div className="outline"></div>
//                         </div>
//                         <div className="circle">
//                           <div className="dot"></div>
//                           <div className="outline"></div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>  
//                   :
//                   <div className="test" >
//                     {loading ? <div className='match_OTP_loader'></div> : <div>
//                       <button className="Otp-verified-btn1" onClick={(e) => { handleSubmit(e) }}>Submit</button>
//                     </div>}
//                     <div>
//                       <Link to="/Forgot-Password">
//                         <button className="Otp-verified-btn2">Back</button>
//                       </Link>
//                     </div>
//                   </div>
//                 }
//               </div>
//             </div>
//           </form>
//         </div>
//         :
//         <div className='login-signup' >
//           <form className="d-flex flex-column" >
//             <div>
//               <p className="login text-center ">Update Password </p>
//             </div>
//             <div className="login_inputContainer login">

//               <input
//                 placeholder="Enter New Password"
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               {/* <small className='text-warning' >{password}</small> */}
//             </div>
//             <div>
//               {passwordUpdated === true ?
//                 <div>
//                   <div className='opt_don_loader_main_div'>
//                     <div className="otp_done_loader">
//                       <div className="circle">
//                         <div className="dot"></div>
//                         <div className="outline"></div>
//                       </div>
//                       <div className="circle">
//                         <div className="dot"></div>
//                         <div className="outline"></div>
//                       </div>
//                       <div className="circle">
//                         <div className="dot"></div>
//                         <div className="outline"></div>
//                       </div>
//                       <div className="circle">
//                         <div className="dot"></div>
//                         <div className="outline"></div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 :
//                 <div>
//                   <button type="submit" className="btn update_password_btn"
//                     style={{ marginTop: "10px" }}
//                     onClick={(e) => handleSubmitPassword(e)} >Update Password</button>
//                 </div>
//               } 
//             </div>

 
//           </form>
//         </div>

//       }


//     </>
//   );
// }

// export default OtpVerifiedForm;


import React, { useState, useRef, useEffect } from 'react';
import './OtpVerification.css';
import { useNavigate } from 'react-router-dom';
import { makeApi } from "../../api/callApi";
import { ToastContainer, toast } from "react-toastify";
import { FaArrowLeft, FaEye, FaEyeSlash } from 'react-icons/fa';
import { assets } from '../../assets/assets';


const OtpVerification = () => {
  const navigate = useNavigate();

  const [otp, setOtp] = useState(new Array(6).fill(''));
  const inputRefs = useRef([]);

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [OTPverified, setOTPverified] = useState(false);

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Eye icon toggle

  useEffect(() => {
    const storedEmail = localStorage.getItem("send-otp-email");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      navigate('/forgot-password');
    }
  }, [navigate]);

  const handleChange = (index, value) => {
    const newOtp = [...otp];
    if (value.length > 1) {
      const pastedDigits = value.split('').slice(0, 6 - index);
      pastedDigits.forEach((digit, i) => {
        if (index + i < 6) newOtp[index + i] = digit;
      });
      setOtp(newOtp);
      const nextEmptyIndex = newOtp.findIndex((digit, i) => i >= index && digit === '');
      const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
      inputRefs.current[focusIndex]?.focus();
      return;
    }

    if (!/^\d*$/.test(value)) return;
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === 'Backspace') {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);

      if (index > 0 && otp[index] === '') {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleOtpSubmit = async (event) => {
    event.preventDefault();
    const enteredOtp = otp.join('');
    if (!enteredOtp) {
      toast.error('Please enter OTP');
      return;
    }

    try {
      setLoading(true);
      const response = await makeApi("/api/check-otp", "POST", { email, OTP: parseInt(enteredOtp, 10) });

      if (response.data.success) {
        setOTPverified(true);
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();

    if (!password) {
      toast.error('Please enter your new password');
      return;
    }

    try {
      setLoading(true);
      const response = await makeApi("/api/reset-password-with-otp", "POST", { email, newPassword: password });

      if (response.data.success) {
        toast.success("Password updated successfully!", {
          onClose: () => navigate("/")
        });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Password update failed');
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const handleBack = () => navigate(-1);

  const isOtpComplete = otp.every(digit => digit !== "");

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="otp-page">
        <div className="otp-card">
          <div className="otp-back" onClick={handleBack}>
            <FaArrowLeft />
          </div>

          <div className="otp-logo-container">
            <img
              src={assets.newlogo}
              alt="Logo"
              className="otp-logo"
            />
          </div>

          <h2 className="otp-title">{OTPverified ? "Set New Password" : "Verify OTP"}</h2>

          {!OTPverified ? (
            <form onSubmit={handleOtpSubmit}>
              <div className="otp-inputs">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    ref={(el) => inputRefs.current[index] = el}
                    className="otp-input"
                    disabled={loading}
                  />
                ))}
              </div>

              <button
                type="submit"
                className={`otp-submit-button ${isOtpComplete ? 'active' : ''}`}
                disabled={!isOtpComplete || loading}
              >
                {loading ? "Verifying..." : "Continue"}
              </button>
            </form>
          ) : (
            <form onSubmit={handlePasswordSubmit}>
              <div className="password-input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="password-input"
                  disabled={loading}
                />

                {/* Eye Icon */}
                <div className="eye-icon" onClick={togglePasswordVisibility}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>

              <button
                type="submit"
                className={`otp-submit-button ${password ? 'active' : ''}`}
                disabled={!password || loading}
              >
                {loading ? "Updating..." : "Update Password"}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default OtpVerification;
