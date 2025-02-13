import React, { useEffect, useState } from "react"
import LoginPopup from "../login/Login"
// import "../../styles/header/ecombar.css"
import "../../pages/CSS/header/ecombar.css"
import { Link, useNavigate } from "react-router-dom"
function Ecombar() {
	const navigation = useNavigate()

	const [IsLogin, setIsLogin] = useState(false)
	const [showPopup, setShowPopup] = useState(false)
	const closePopup = () => {
		setShowPopup(false)
	}
	useEffect(() => {
		const token = localStorage.getItem("token")

		if (token) {
			setIsLogin(true)
		} else {
			setIsLogin(false)
		}
	}, [localStorage.getItem("token")])

	// action
	const handelclick = (PageName) => {
		if (IsLogin && PageName == "Cart") {
			navigation("/order/my-cart")
		} else if (IsLogin && PageName == "Profile") {
			navigation("/user/user-profile")
		} else if (IsLogin && PageName == "Wishlist") {
			navigation("/user/my-wishlist")
		} else {
			setShowPopup(true)
		}
	}
	return (
		<>
			{showPopup && <LoginPopup onClose={closePopup} />}

			<div className="main_ecombar_parent_div">
				<div className="ecom_bar_main_div">
					<div className="ecom_bar_items_div">
						<Link
							to={"/product/all-products"}
							className="css-for-link-tag-color"
						>
							<div>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									fill="currentColor"
									class="bi bi-house"
									viewBox="0 0 16 16"
								>
									<path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
								</svg>
							</div>
							<div>Home</div>
						</Link>
					</div>
					<div
						className="ecom_bar_items_div"
						onClick={() => handelclick("Wishlist")}
					>
						{/* <Link to={"/user/my-wishlist"} className='css-for-link-tag-color'  > */}

						<div>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								fill="currentColor"
								class="bi bi-heart"
								viewBox="0 0 16 16"
							>
								<path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
							</svg>
						</div>
						<div>Wishlist</div>
						{/* </Link> */}
					</div>
					<div
						className="ecom_bar_items_div"
						onClick={() => handelclick("Cart")}
					>
						{/* <Link to={"/order/my-cart"} className='css-for-link-tag-color'   > */}
						<div>
							<div>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									fill="currentColor"
									class="bi bi-cart"
									viewBox="0 0 16 16"
								>
									<path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
								</svg>
							</div>
						</div>
						<div>cart</div>
						{/* </Link> */}
					</div>
					<div
						className="ecom_bar_items_div"
						onClick={() => handelclick("Profile")}
					>
						{/* <Link to={"/user/profile"} className='css-for-link-tag-color'  > */}
						<div>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								fill="currentColor"
								class="bi bi-person"
								viewBox="0 0 16 16"
							>
								<path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
							</svg>
						</div>
						{IsLogin ? (
							<div>Profile</div>
						) : (
							<div onClick={() => setShowPopup(true)}>Login</div>
						)}

						{/* </Link> */}
					</div>
				</div>
			</div>
		</>
	)
}

export default Ecombar

// import React, { useEffect, useState } from 'react';
// import LoginPopup from '../Auth/LoginPopup';
// import "../../styles/header/ecombar.css";
// import { Link, useNavigate } from 'react-router-dom';

// function Ecombar() {
//     const navigation = useNavigate();
//     const [activeTab, setActiveTab] = useState("");
//     console.log(activeTab, "==================");

//     const [IsLogin, setIsLogin] = useState(false);
//     const [showPopup, setShowPopup] = useState(false);

//     const closePopup = () => {
//         setShowPopup(false);
//     };

//     useEffect(() => {
//         const token = localStorage.getItem("token");
//         setIsLogin(!!token);
//     }, []);

//     useEffect(() => {
//         if (activeTab === "Cart") {
//             navigation('/order/my-cart');
//         } else if (activeTab === "Profile") {
//             navigation('/user/user-profile');
//         } else if (activeTab === "Wishlist") {
//             navigation('/user/my-wishlist');
//         } else if (activeTab === "Home") {
//             navigation('/product/all-products');
//         }
//     }, [activeTab]);

//     const handelclick = async (PageName) => {
//         if (IsLogin && PageName === "Cart") {
//             await setActiveTab("Cart");
//         } else if (IsLogin && PageName === "Profile") {
//             await setActiveTab("Profile");
//         } else if (IsLogin && PageName === "Wishlist") {
//             await setActiveTab("Wishlist");
//         } else if (PageName === "Home") {
//             await setActiveTab("Home");
//         } else {
//             setShowPopup(true);
//         }
//     };

//     return (
//         <>
//             {showPopup && <LoginPopup onClose={closePopup} />}

//             <div className='main_ecombar_parent_div'>
//                 <div className='ecom_bar_main_div'>
//                     <div className='ecom_bar_items_div' onClick={() => handelclick("Home")}>
//                         {/* Your Home content */}
//                     </div>
//                     <div className='ecom_bar_items_div' onClick={() => handelclick("Wishlist")}>
//                         {/* Your Wishlist content */}
//                     </div>
//                     <div className='ecom_bar_items_div' onClick={() => handelclick("Cart")}>
//                         {/* Your Cart content */}
//                     </div>
//                     <div className='ecom_bar_items_div' onClick={() => handelclick("Profile")}>
//                         {/* Your Profile content */}
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default Ecombar;
