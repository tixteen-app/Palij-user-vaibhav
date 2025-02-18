import React, { useEffect, useState } from "react"
// import "./CSS/userProfile.css"
import "../../styles/User/usersidebar.css"
import { assets } from "../../assets/assets.js"
import { Outlet, useNavigate } from "react-router-dom"
import { makeApi } from "../../api/callApi.tsx"
import Primaryloader from "../loaders/primaryloader.jsx"

const UserProfileSidebar = () => {
	const navigate = useNavigate()
	const [extended, setExtended] = useState(window.innerWidth > 800)
	const [userDatails, setUserDetails] = useState()
	const [loading, setLoading] = useState(false)

	const handleResize = () => {
		setExtended(window.innerWidth > 800)
	}

	useEffect(() => {
		fetchUserDetail()
		window.addEventListener("resize", handleResize)
		return () => {
			window.removeEventListener("resize", handleResize)
		}
	}, [])

	const fetchUserDetail = async () => {
		try {
			setLoading(true)
			const responce = await makeApi("/api/my-profile", "GET")
			setUserDetails(responce.data.user)
		} catch (error) {
			console.log(error)
		} finally {
			setLoading(false)
		}
	}
	const handleLogout = (e) => {
		e.preventDefault()
		localStorage.removeItem("token")
		console.log("1")
		// navigate("/product/all-products");
		window.location.href = "/product/all-products"
		console.log("2")
	}

	return (
		<div className="userProfile">
			<hr className="userprofile-hr" />
			<div className="user-sidebar-info">
				<div className="userProfile-sidebar">
					<div className="userprofile-h1">
						<img
							src={assets.userprofile_menu}
							alt=""
							className="userprofiele-menu"
							onClick={() => setExtended((prev) => !prev)}
						/>
					</div>
					<div
						className="userprofile-name user-flexcol"
						onClick={() => navigate("/user/userprofile")}
					>
						<img
							className="myuser-profile-icon"
							src={userDatails?.userImage}
							alt=""
						/>

						{extended ? (
							<div className="user-name">
								<span>HELLO</span>
								{loading ? (
									<Primaryloader />
								) : (
									<p>{`${userDatails?.firstName} ${userDatails?.lastName}`}</p>
								)}
							</div>
						) : null}
					</div>
					<div
						className="user-account user-flexcol"
						onClick={() => navigate("/user/userprofile")}
					>
						<img
							src={assets.user_account}
							alt="user_account"
						/>
						{extended ? <p>MY ACCOUNT</p> : null}
					</div>
					<div
						className="user-orders user-flexcol"
						onClick={() => navigate("/user/my-orders")}
					>
						<img
							src={assets.user_orders}
							alt="user-orders"
						/>
						{extended ? <p>MY ORDERS</p> : null}
					</div>
					<div
						className="user-address user-flexcol"
						onClick={() => navigate("/user/my-address")}
					>
						<img
							src={assets.user_address}
							alt="user_address"
						/>
						{extended ? <p>MY ADDRESS</p> : null}
					</div>
					<div
						className="user-watchlist user-flexcol"
						onClick={() => navigate("/user/my-wishlist")}
					>
						<img
							src={assets.user_watchlist}
							alt="user_watchlist"
						/>
						{extended ? <p>WISHLIST</p> : null}
					</div>
					<div
						className="user-watchlist user-flexcol"
						onClick={() => navigate("/user/my-wishlist")}
					>
						{/* <img
							// src={assets.user_watchlist}
							alt="user_watchlist"
						/> */}
						{extended ? (
							<>
								<div className=" price_filter_sidebar_pc_sidebar  user-flexcol">
									<div
										onClick={(e) => handleLogout(e)}
										className=" btn  text-danger py-3 "
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="20"
											height="20"
											fill="currentColor"
											className="bi bi-box-arrow-in-left"
											viewBox="0 0 16 16"
										>
											<path
												fillRule="evenodd"
												d="M10 3.5a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 1 1 0v2A1.5 1.5 0 0 1 9.5 14h-8A1.5 1.5 0 0 1 0 12.5v-9A1.5 1.5 0 0 1 1.5 2h8A1.5 1.5 0 0 1 11 3.5v2a.5.5 0 0 1-1 0z"
											/>
											<path
												fillRule="evenodd"
												d="M4.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H14.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708z"
											/>
										</svg>{" "}
										Logout
									</div>
								</div>
							</>
						) : null}
					</div>
				</div>
				<div className="userProfile-info">
					<Outlet />
				</div>
			</div>
		</div>
	)
}

export default UserProfileSidebar
