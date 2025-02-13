import React, { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
// import "../../styles/header/MobileHeader.css";
import "../../pages/CSS/header/MobileHeader.css"

import mainIcon from "../../Images/Header/SK Foods Logo 3.png"

function SmallNavbar() {
	const [showVerticalNavbar, setShowVerticalNavbar] = useState(false)
	const location = useLocation()

	useEffect(() => {
		setShowVerticalNavbar(false)
	}, [location])

	const toggleVerticalNavbar = () => {
		setShowVerticalNavbar(!showVerticalNavbar)
	}

	return (
		<>
			{/* navbar for small screen */}
			<div className="card_for_small_screen navbar_for_small_screen ">
				<nav className="navbar navbar-expand-lg px-2">
					<div
						className="d-flex justify-content-around w-100"
						data-aos="zoom-out"
						data-aos-offset="200"
						data-aos-delay="1000"
						data-aos-duration="5000"
						data-aos-easing="ease-in-out"
						data-aos-mirror="true"
						data-aos-anchor-placement="top-center"
					>
						<div className="">
							<Link
								to={"/"}
								className="css-for-link-tag"
							>
								<img
									src={mainIcon}
									alt=""
									srcset=""
									className="header-logo-for-mobile-nav"
								/>
							</Link>
						</div>
						<div
							className=""
							onClick={toggleVerticalNavbar}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="30"
								height="30"
								fill="currentColor"
								className="bi bi-filter-right"
								viewBox="0 0 16 16"
							>
								<path d="M14 10.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 .5-.5m0-3a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0 0 1h7a.5.5 0 0 0 .5-.5m0-3a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0 0 1h11a.5.5 0 0 0 .5-.5" />
							</svg>
						</div>
					</div>

					{/* Vertical Navbar */}
					{showVerticalNavbar && (
						<div className="vertical-navbar">
							<ul
								className="navbar_ul_for_small_screen"
								data-aos="zoom-out"
								data-aos-offset="200"
								data-aos-delay="100"
								data-aos-duration="500"
								data-aos-easing="ease-in-out"
								data-aos-mirror="true"
							>
								<Link
									to={"/"}
									className="css-for-link-tag"
								>
									<li>Home</li>
								</Link>
								<Link
									to={"/about-us"}
									className="css-for-link-tag"
								>
									<li>About Us</li>
								</Link>
								<Link
									to={"/product/all-products"}
									className="css-for-link-tag"
								>
									<li>Products</li>
								</Link>
								<Link
									to={"/infrastructure"}
									className="css-for-link-tag"
								>
									<li>Infrastructure</li>
								</Link>
								<Link
									to={"/contact-us"}
									className="css-for-link-tag"
								>
									<li>Contact Us</li>
								</Link>
							</ul>
						</div>
					)}
				</nav>
			</div>
		</>
	)
}

export default SmallNavbar
