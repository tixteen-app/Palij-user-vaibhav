import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import MainHeader from "./components/Header/MainHeader";
import Home from "./pages/Home";
import Auth from "./pages/auth";
import User from "./pages/User";
import Information from "./pages/information";
import Footer from "./components/Footer/footer";
import Product from "./pages/product";
import AboutUs from "./pages/aboutUs";
import ContectUs from "./pages/contect";
import Order from "./pages/order";
import ForgotPasswordForm from "./components/Auth/sendMail";
import OtpVerifiedForm from "./components/Auth/otp";

function App() {
  return (
    <div>
      {!useLocation().pathname.includes("/user-password") && <MainHeader />}

      <Routes>
        <Route path="/" element={<Home />} />
        {/* about */}
        <Route path="/about-us" element={<AboutUs />} />
        {/* contact */}
        <Route path="/contact-us" element={<ContectUs />} />
        {/* auth */}
        <Route path="/auth/*" element={<Auth />} />
        {/* user */}
        <Route path="/user/*" element={<User />} />
        {/* information */}
        <Route path="/information/*" element={<Information />} />
        {/* product */}
        <Route path="/product/*" element={<Product />} />
        {/* order */}
        <Route path="/order/*" element={<Order />} />
        {/* auth */}
        <Route
          path="/user-password/Forgot-Password"
          element={<ForgotPasswordForm />}
        />
        <Route
          path="/user-password/otp-verified"
          element={<OtpVerifiedForm />}
        />
        {/*  unknown page */}
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
