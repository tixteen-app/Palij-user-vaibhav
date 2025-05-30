// import React, { useState } from 'react';
// import "./sendmail.css"
// import { Link, useNavigate } from 'react-router-dom';
// import { makeApi } from "../../api/callApi"
// import { ToastContainer, toast } from "react-toastify";

// function ForgotPasswordForm() {
//   const navigate = useNavigate()

//   const [email, setEmail] = useState("")
//   const [Loading, setLoading] = useState(false);
//   const [mailSend, setMailSend] = useState(false);
//   const handleSubmit = async (event) => {
//     event.preventDefault()
//     if (!email) {
//       toast.error('Please fill email');
//       return;
//     }
//     try {
//       setLoading(true)
//       const response = await makeApi("/api/forgot-password", "POST", { email })
//       if (response.data.success === true) {
//         setMailSend(true)
//         localStorage.setItem("send-otp-email", email)
//         // show this toast and then navigate
//         toast.success(response.data.message, {

//           onClose: () => {
//             navigate("/otp-verified")
//             setMailSend(false)
//           }
//         })
//       }
//     } catch (error) {
//       console.error('Error sending data:', error.response.data);
//       toast.info(error.response.data.message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <>
//       <ToastContainer />
//       <div className='main_login_page_div' >
//         <div className="form-container-forgot-password">
//           <div className="logo-container">
//             Forgot Password
//           </div>

//           <form className="form-forgot-password">
//             <div className="form-group-forgot-password">
//               <label htmlFor="email">Email</label>
//               <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} name="email" placeholder="Enter your email" required />
//             </div>
//             <div className='text-center w-100 d-flex justify-content-center p-3' >

//               {mailSend === true ?
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
//                   {Loading ? <div className="send_mail_loader"></div> : <div>
//                     <button className="form-submit-btn-forgot-password" type="submit" onClick={(e) => handleSubmit(e)} >Send Email</button>
//                   </div>}
//                 </div>
//               }

//             </div>
//           </form>

//           <p className="signup-link">
//             Remember your password?
//             {/* <a href="#" className="signup-link link"> Sign up now</a> */}
//             <Link to="/Signup" className="signup-link link"> Sign in now</Link>
//           </p>
//         </div>
//       </div>
//     </>
//   );
// }

// export default ForgotPasswordForm;


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { makeApi } from "../../api/callApi";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './ForgotPassword.css';
import { FaEnvelope } from 'react-icons/fa';
import { assets } from '../../assets/assets';

const ForgotPasswordForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [mailSend, setMailSend] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email) {
      toast.error('Please fill email');
      return;
    }

    try {
      setLoading(true);

      const response = await makeApi("/api/forgot-password", "POST", { email });

      if (response.data.success === true) {
        setMailSend(true);
        localStorage.setItem("send-otp-email", email);

        toast.success(response.data.message, {
          onClose: () => {
            navigate("/otp-verified");
            setMailSend(false);
          }
        });
      }
    } catch (error) {
      console.error('Error sending data:', error?.response?.data);
      toast.info(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <form className="forgot-password-form" onSubmit={handleSubmit}>

        {/* Website Logo */}
        <div className="logo-container">
          <img
            src={assets.newlogo}
            alt="Website Logo"
            className="website-logo"
          />
        </div>

        {/* Heading */}
        <h2 className="animated-fade-in">Forgot Password</h2>

        {/* Email Input with Icon */}
        <div className="input-with-icon animated-slide-up">
          <FaEnvelope className="fa-icon" />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="animated-slide-up"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Email"}
        </button>

        {/* Footer Link */}
        <p className="login-redirect animated-fade-in">
          Remember your password? <Link to="/login">Sign in now</Link>
        </p>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          closeButton={false} // optional if using close button style above
          toastClassName="custom-toast"
          bodyClassName="custom-toast-body"
        />

      </form>
    </div>
  );
};

export default ForgotPasswordForm;
