import React, { useEffect, useState } from "react"
import Logo from "../../Images/Header/SK Foods Logo 3.png"
// import "../../styles/header/PCHeader.css"
import "../../pages/CSS/header/PCHeader.css"

import { Link, useNavigate } from "react-router-dom"
import LoginPopup from "../Auth/LoginPopup"
function PCHeaer() {
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

	const handelCartclick = () => {
		if (IsLogin) {
			navigation("/order/my-cart")
		} else {
			setShowPopup(true)
		}
	}
	return (
		<>
			{showPopup && <LoginPopup onClose={closePopup} />}
			<div className="main_PCHeader_div">
				<div>
					{IsLogin ? (
						<Link
							to={"/user/profile"}
							className="css-for-link-tag"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								fill="currentColor"
								className="bi bi-person-circleheader_icons"
								viewBox="0 0 16 16"
							>
								<path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
								<path
									fillRule="evenodd"
									d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
								/>
							</svg>
						</Link>
					) : (
						<Link
							to="/auth/login"
							className="css-for-link-tag"
						>
							Login
						</Link>
					)}
				</div>
				<div className="Pc_Header_logo_div">
					<img
						src={Logo}
						alt="Logo"
						className="Pc_Header_logo"
					/>
				</div>
				<Link
					to="/"
					className="css-for-link-tag pcHeader_options "
				>
					HOME
				</Link>
				<Link
					to="/product/all-products"
					className=" css-for-link-tag pcHeader_options"
				>
					PRODUCTS
				</Link>
				<Link
					to="/about-us"
					className=" css-for-link-tag pcHeader_options"
				>
					ABOUT US
				</Link>
				<Link
					to="/contact-us"
					className=" css-for-link-tag pcHeader_options"
				>
					CONTACT US 
				</Link>
				<div
					className="last_pcHeader_options"
					onClick={() => handelCartclick()}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						fill="currentColor"
						className="bi bi-cart header_icons"
						viewBox="0 0 16 16"
					>
						<path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
					</svg>
				</div>
			</div>
		</>
	)
}

export default PCHeaer
