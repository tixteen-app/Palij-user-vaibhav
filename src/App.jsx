// import React, { useEffect } from "react"
// import "./App.css"
// import Navbar from "./components/navbar/Navbar"
// import Home from "./components/home/Home"
// import { Route, Routes, useLocation } from "react-router"
// import AboutUs from "./components/aboutus/AboutUs"
// import Contact from "./components/contact/Contact"
// import Login from "./components/login/Login"
// import Signup from "./components/signup/Signup"
// import UserProfile from "./pages/UserProfile"
// import ShopCategory from "./pages/ShopCategory"
// import OpenProduct from "./pages/OpenProduct"
// import Cart from "./pages/Cart"
// import MyAccount from "./components/myAccount/MyAccount"
// import MyOrders from "./components/myOrders/MyOrders"
// import MyAddress from "./components/myAddress/MyAddress"
// import MyWatchlist from "./components/myWatchlist/MyWatchlist"
// import ShippingAddress from "./components/shippingAddress/ShippingAddress"
// import EditUserProfile from "./components/editUserProfile/EditUserProfile"
// import CheckoutPayment from "./pages/CheckoutPayment"
// import BillingAddress from "./components/billingAddress/BillingAddress"
// import Payment from "./components/Payment/Payment"
// import OrderSummary from "./pages/OrderSummary"
// import ForgotPasswordForm from "./components/login/sendMail"
// import OtpVerifiedForm from "./components/login/otp"
// import ProductDetails from "./components/productDetails/ProductDetails"
// import Products from "./pages/products.jsx"
// import Checkout from "./components/pay/Checkout.jsx"
// import TestingCart from "./utils/TestingCart.jsx"
// import AddressForm from "./components/shippingAddress/AddressForm.jsx"
// import SignUp from "./components/authh/register/SighUp.jsx"
// import AddShippingAddress from "./components/addressCheckout/ShippingAddress.jsx"
// import AddBillingAddress from "./components/addressCheckout/BillingAddress.jsx"
// import TermsConditions from "./components/termsConditions/TermsConditions.jsx"
// import NewHome from "./components/NewHome/NewHome.jsx"
// import NewFooter from "./components/footer/NewFooter/NewFooter.jsx"
// import NewProductPage from "./components/NewProductPage/NewProductPage.jsx"
// import Product from "./pages/products.jsx"
// import PrivacyPolicy from "./PrivacyPolicy/PrivacyPolicy.jsx"
// import ShippingProcess from "./components/ShippingProcess/ShippingProcess.jsx"
// import LatestOrder from "./components/LatestOrder/LastestOrder.jsx"
// import ProductSidebar from "./components/products/slidebar/sidebar.jsx"
// import SecondHomePage from "./components/SecondHomePage/SecondHomePage.jsx"
// import SecondFooter from "./components/SecondFooter/SecondFooter.jsx"
// import { Navigate } from "react-router-dom";

// import PaljiSignUp from "./components/signup/PaljiSignUp.jsx"
// import Homepage from "./pages/Homepage.jsx"
// import Taxinvoice from "./pages/Taxinvoice.jsx"
// import Newcart from "./pages/Newcart.jsx"

// function App() {
//   const location = useLocation();  // Use useLocation hook to get the current location

//   useEffect(() => {
//     window.scrollTo(0, 0)
//   }, [location]);

//   // Check if the current route is /taxinvoice/:ordersummary
//   const isInvoicePage = location.pathname.startsWith("/taxinvoice");

//   return (
//     <div className="app">
//       {/* {!isInvoicePage && <Navbar />} */}
//       {!isInvoicePage && <Navbar />}
//       <Routes  >
//         <Route path="/" element={<Homepage />} />
//         <Route path="/new" element={<Homepage />} />
//         <Route path="/aboutus" element={<AboutUs />} />
//         <Route path="/product/*" element={<Products />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/cart" element={<Cart />} />
//         <Route path="/newcart" element={<Newcart />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/taxinvoice/:ordersummary" element={<Taxinvoice />} />
//         <Route path="/palji-login" element={<Signup />} />
//         <Route path="/register" element={<PaljiSignUp />} />
//         <Route path="/userprofile" element={<UserProfile />}>
//           <Route index element={<MyAccount profile="Profile Information" />} />
//           <Route path="/userprofile/myorders" element={<MyOrders />} />
//           <Route path="/userprofile/myaddress" element={<MyAddress />} />
//         </Route>
//         <Route path="/edit-userprofile" element={<EditUserProfile />} />
//         <Route path="/shipping-address" element={<ShippingAddress />} />
//         <Route path="/billing-address" element={<BillingAddress />} />
//         <Route path="/add-shipping-address" element={<AddShippingAddress />} />
//         <Route path="/add-billing-address" element={<AddBillingAddress />} />
//         <Route path="/cart/checkout" element={<Checkout />} />
//         <Route path="/cart/checkoutpayment" element={<CheckoutPayment />} />
//         <Route path="/cart/checkoutpayment/payment" element={<Payment />} />
//         <Route path="/userprofile/myorders/:ordersummary" element={<OrderSummary />} />
//         <Route path="/:productdetails/:productdetails" element={<ProductDetails />} />
//         <Route path="/products/:category" element={<ProductSidebar />} />
//         <Route path="/latest-order" element={<LatestOrder />} />
//         <Route path="/Forgot-Password" element={<ForgotPasswordForm />} />
//         <Route path="/terms-conditions" element={<TermsConditions />} />
//         <Route path="/privacy-policy" element={<PrivacyPolicy />} />
//         <Route path="/shipping-policy" element={<ShippingProcess />} />
//         <Route path="/otp-verified" element={<OtpVerifiedForm />} />
//         <Route path="*" element={<Navigate to="/" replace />} />
//         <Route path="/edit-billing-address/:id" element={<AddressForm isBilling={true} />} />
//         <Route path="/edit-shipping-address/:id" element={<AddressForm isBilling={false} />} />
//       </Routes>

//       {!isInvoicePage && <SecondFooter />}
//     </div>
//   );
// }

// export default App;

import React, { useEffect } from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import { Route, Routes, useLocation } from "react-router";
import AboutUs from "./components/aboutus/AboutUs";
import Contact from "./components/contact/Contact";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import UserProfile from "./pages/UserProfile";
import ShopCategory from "./pages/ShopCategory";
import OpenProduct from "./pages/OpenProduct";
import Cart from "./pages/Cart";
import MyAccount from "./components/myAccount/MyAccount";
import MyOrders from "./components/myOrders/MyOrders";
import MyAddress from "./components/myAddress/MyAddress";
import MyWatchlist from "./components/myWatchlist/MyWatchlist";
import ShippingAddress from "./components/shippingAddress/ShippingAddress";
import EditUserProfile from "./components/editUserProfile/EditUserProfile";
import CheckoutPayment from "./pages/CheckoutPayment";
import BillingAddress from "./components/billingAddress/BillingAddress";
import Payment from "./components/Payment/Payment";
import OrderSummary from "./pages/OrderSummary";
import ForgotPasswordForm from "./components/login/sendMail";
import OtpVerifiedForm from "./components/login/otp";
import ProductDetails from "./components/productDetails/ProductDetails";
import Products from "./pages/products.jsx";
import Checkout from "./components/pay/Checkout.jsx";
import TestingCart from "./utils/TestingCart.jsx";
import AddressForm from "./components/shippingAddress/AddressForm.jsx";
import SignUp from "./components/authh/register/SighUp.jsx";
import AddShippingAddress from "./components/addressCheckout/ShippingAddress.jsx";
import AddBillingAddress from "./components/addressCheckout/BillingAddress.jsx";
import TermsConditions from "./components/termsConditions/TermsConditions.jsx";
import NewHome from "./components/NewHome/NewHome.jsx";
import NewFooter from "./components/footer/NewFooter/NewFooter.jsx";
import NewProductPage from "./components/NewProductPage/NewProductPage.jsx";
import Product from "./pages/products.jsx";
import PrivacyPolicy from "./PrivacyPolicy/PrivacyPolicy.jsx";
import ShippingProcess from "./components/ShippingProcess/ShippingProcess.jsx";
import LatestOrder from "./components/LatestOrder/LastestOrder.jsx";
import ProductSidebar from "./components/products/slidebar/sidebar.jsx";
import SecondHomePage from "./components/SecondHomePage/SecondHomePage.jsx";
import SecondFooter from "./components/SecondFooter/SecondFooter.jsx";
import { Navigate } from "react-router-dom";

import PaljiSignUp from "./components/signup/PaljiSignUp.jsx";
import Homepage from "./pages/Homepage.jsx";
import Taxinvoice from "./pages/Taxinvoice.jsx";
import Newcart from "./pages/Newcart.jsx";
import Test from "./component/Test.jsx";

function App() {
  const location = useLocation(); // Use useLocation hook to get the current location

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // Check if the current route is /taxinvoice/:ordersummary
  const isInvoicePage = location.pathname.startsWith("/taxinvoice");

  return (
    <div className="app">
      {!isInvoicePage && <Navbar />}

      <div style={{ marginTop: "70px" }}  >
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/test" element={<Test />} />
          <Route path="/new" element={<Homepage />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/product/*" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/newcart" element={<Newcart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/taxinvoice/:ordersummary" element={<Taxinvoice />} />
          <Route path="/palji-login" element={<Signup />} />
          <Route path="/register" element={<PaljiSignUp />} />
          <Route path="/userprofile" element={<UserProfile />}>
            <Route index element={<MyAccount profile="Profile Information" />} />
            <Route path="/userprofile/myorders" element={<MyOrders />} />
            <Route path="/userprofile/myaddress" element={<MyAddress />} />
          </Route>
          <Route path="/edit-userprofile" element={<EditUserProfile />} />
          <Route path="/shipping-address" element={<ShippingAddress />} />
          <Route path="/billing-address" element={<BillingAddress />} />
          <Route path="/add-shipping-address" element={<AddShippingAddress />} />
          <Route path="/add-billing-address" element={<AddBillingAddress />} />
          <Route path="/cart/checkout" element={<Checkout />} />
          <Route path="/cart/checkoutpayment" element={<CheckoutPayment />} />
          <Route path="/cart/checkoutpayment/payment" element={<Payment />} />
          <Route path="/userprofile/myorders/:ordersummary" element={<OrderSummary />} />
          <Route path="/:productdetails/:productdetails" element={<ProductDetails />} />
          <Route path="/products/:category" element={<ProductSidebar />} />
          <Route path="/latest-order" element={<LatestOrder />} />
          <Route path="/Forgot-Password" element={<ForgotPasswordForm />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/shipping-policy" element={<ShippingProcess />} />
          <Route path="/otp-verified" element={<OtpVerifiedForm />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/edit-billing-address/:id" element={<AddressForm isBilling={true} />} />
          <Route path="/edit-shipping-address/:id" element={<AddressForm isBilling={false} />} />
        </Routes>
      </div>

      {!isInvoicePage && <SecondFooter />}
    </div>
  );
}

export default App;
