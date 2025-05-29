import React, { useState } from "react";
import "../../styles/Auth/login.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { makeApi } from "../../api/callApi.tsx";
import HorizotalLoader from "../loaders/horizotalLoader.jsx";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [Islogin, setIslogin] = useState(false);


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email) {
      toast.error("Please fill email");
      return;
    }
    if (!password) {
      toast.error("Please fill password");
      return;
    }

    try {
      setIsLoading(true);
      const response = await makeApi("/api/login-user", "POST", {
        password,
        email,
      });
      localStorage.setItem("token", response.data.token);
      // toast.success(response.data.message);

      setIslogin(true);
      toast.success(response.data.message, {
        onClose: () => {
          navigate("/product/all-products");
        }
      })
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("Error sending data:", error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ToastContainer autoClose={1500} />

      <div className="login-signup">
        <form onSubmit={handleSubmit}>
          <div className="login">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              autoComplete="off"
            />

            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <div className="text-end w-100 text-danger">
              <Link className="css-for-link-tag golden-color-text" to={"/user-password/Forgot-Password"}>
                Forgot passwordsss
              </Link>
            </div>
            {isLoading ? <HorizotalLoader /> :
              <>
                {!Islogin ? <button type="submit">Login</button> : null}
              </>
            }
            <p>
              Don't have an account?{" "}
              <span>
                <Link className="css-for-link-tag golden-color-text" to="/auth/signup">
                  Sign Up
                </Link>
              </span>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
