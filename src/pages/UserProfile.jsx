
import React, { useEffect, useState } from "react";
import "./CSS/userProfile.css";
import { assets } from "../assets/assets";
import { Outlet, useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import { TbLogout2 } from "react-icons/tb";
import { makeApi } from "../api/callApi";
import { homeImg } from "../assets/home/home";

const UserProfile = () => {

	useEffect(() => {
		const token = localStorage.getItem("token");

		if (!token) {
			window.location.href = "/";
		}
	}, []);

	const navigate = useNavigate();
	const location = useLocation(); // Hook to get current location
	const [extended, setExtended] = useState(window.innerWidth > 800);
	const [userDatails, setUserDetails] = useState();
	const [isLoading, setIsLoading] = useState(true);
	const [showLogoutDialog, setShowLogoutDialog] = useState(false);


	const handleResize = () => {
		setExtended(window.innerWidth > 800);
	};

	useEffect(() => {
		fetchUserDetail();
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);



	const fetchUserDetail = async () => {
		try {
			setIsLoading(true);
			const responce = await makeApi("/api/my-profile", "GET");
			setUserDetails(responce.data.user);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.replace("/");
	};

	// Helper function to determine active route
	const isActive = (path) => location.pathname === path;


	const toggleLogoutDialog = () => {
		setShowLogoutDialog((prev) => !prev);
	};


	return (
		<div className="userProfile">
			<hr className="userprofile-hr" />
			<div className="user-sidebar-info">
				<div className="userProfile-sidebar">
					<div className="userprofile-h1">
						<img
							src={assets.userprofile_menu}
							alt=""
							className={extended ? "userprofiele-menu" : "userprofiele-menu-close"}
							onClick={() => setExtended((prev) => !prev)}
						/>
						<h1>PROFILE</h1>
					</div>
					<div
						className="userprofile-name user-flexcol"
						onClick={() => navigate("/userprofile")}
						style={isActive("/userprofile") ? { borderLeft: "6px solid #EE5564" } : {}}
					>
						{userDatails?.userImage ? (
							<img
								className="myuser-profile-icon"
								src={userDatails?.userImage}
								alt=""
							/>
						) : (
							<img src={homeImg.blackUserProfile} className="blackUserProfile" />
						)}
						{extended ? (
							<div className="user-name">
								<span>HELLO</span>
								{isLoading ? (
									<p className="loading-name"></p>
								) : (
									<p>{`${userDatails?.firstName || ''} ${userDatails?.lastName || ''}`}</p>
								)}
							</div>
						) : null}
					</div>
					<div
						className="user-account user-flexcol"
						onClick={() => navigate("/userprofile")}
						style={isActive("/userprofile") ? { borderLeft: "6px solid #EE5564" } : {}}
					>
						<img src={homeImg.blackPasswordImg} alt="user_account" />
						{extended ? <p>MY ACCOUNT</p> : null}
					</div>
					<div
						className="user-orders user-flexcol"
						onClick={() => navigate("/userprofile/myorders")}
						style={isActive("/userprofile/myorders") ? { borderLeft: "6px solid #EE5564" } : {}}
					>
						<img src={homeImg.blackShoppingCart} alt="user-orders" />
						{extended ? <p>MY ORDERS</p> : null}
					</div>
					<div
						className="user-address user-flexcol"
						onClick={() => navigate("/userprofile/myaddress")}
						style={isActive("/userprofile/myaddress") ? { borderLeft: "6px solid #EE5564" } : {}}
					>
						<img src={homeImg.blackHomeImg} alt="user_address" />
						{extended ? <p>MY ADDRESS</p> : null}
					</div>

					<div
						className="logouy_btn user-flexcol"
						// onClick={() => {
						// 	localStorage.removeItem("token");
						// 	window.location.replace("/");
						// }}
						onClick={toggleLogoutDialog}
					>
						<div className="tb_logout">
							<TbLogout2 />
						</div>
						{extended ? <p>LOGOUT</p> : null}
					</div>
					{showLogoutDialog && (
						<div className="logoutDialog-overlay">
							<div className="logoutDialog">
								<h2>Confirm Logout</h2>
								<p>Are you sure you want to log out?</p>
								<div className="logoutDialog-buttons">
									<button onClick={handleLogout} className="confirm-button">
										Confirm
									</button>
									<button onClick={toggleLogoutDialog} className="cancel-button">
										Cancel
									</button>
								</div>
							</div>
						</div>
					)}

				</div>
				<div className="userProfile-info">
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default UserProfile;
