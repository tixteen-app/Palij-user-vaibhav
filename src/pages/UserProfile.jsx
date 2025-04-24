import React, { useEffect, useState } from "react";
import "./CSS/userProfile.css";
import { assets } from "../assets/assets";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { TbLogout2 } from "react-icons/tb";
import { makeApi } from "../api/callApi";
import { homeImg } from "../assets/home/home";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const UserProfile = () => {
	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) {
			window.location.href = "/";
		}
	}, []);

	const navigate = useNavigate();
	const location = useLocation();
	const [extended, setExtended] = useState(window.innerWidth > 800);
	const [userDetails, setUserDetails] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [showLogoutDialog, setShowLogoutDialog] = useState(false);
	const [mobileNumberChanged, setMobileNumberChanged] = useState(false);
	const [editData, setEditData] = useState({
		firstName: "",
		lastName: "",
		gender: "",
		dateofbirth: "",
		email: "",
		mobileNumber: "",
		userImage: "",
	});

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
			const response = await makeApi("/api/my-profile", "GET");
			const user = response.data.user;
			setUserDetails(user);
			setEditData({
				firstName: user.firstName || "",
				lastName: user.lastName || "",
				gender: user.gender || "",
				dateofbirth: user.dateofbirth ? user.dateofbirth.substring(0, 10) : "",
				email: user.email || "",
				mobileNumber: user.mobileNumber ? user.mobileNumber.toString() : "",
				userImage: user.userImage || "",
			});
			setMobileNumberChanged(false); // Reset the changed flag when loading user data
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

	const isActive = (path) => location.pathname === path;
	const toggleLogoutDialog = () => setShowLogoutDialog((prev) => !prev);

	// const onChangeHandler = (event) => {
	// 	setEditData({
	// 		...editData,
	// 		[event.target.name]: event.target.value,
	// 	});
	// 	if (event.target.name === "mobileNumber") {
	// 		setMobileNumberChanged(true);
	// 	}
	// };
	const onChangeHandler = (event) => {
		const { name, value } = event.target;
		setEditData({
			...editData,
			[name]: value,
		});
		if (name === "mobileNumber" && value !== (userDetails.mobileNumber ? userDetails.mobileNumber.toString() : "")) {
			setMobileNumberChanged(true);
		}
	};

	const isValidMobileNumber = (number) => {
		const regex = /^\d{10}$/;
		return regex.test(number);
	};

	const onSubmitHandler = async (event) => {
		event.preventDefault();
		try {
			const userDataToUpdate = { ...editData };
			
			// Only validate mobile number if it was changed or is being added for the first time
			if ((mobileNumberChanged || !userDetails.mobileNumber) && editData.mobileNumber) {
				if (!isValidMobileNumber(editData.mobileNumber)) {
					toast.error("Please enter a valid 10-digit mobile number");
					return;
				}
			}
			
			// If mobile number wasn't changed, don't send it in the update
			if (!mobileNumberChanged) {
				delete userDataToUpdate.mobileNumber;
			}
			
			const response = await makeApi("/api/update-user", "PUT", userDataToUpdate);
			toast.success(response.data.message);
			setMobileNumberChanged(false); // Reset the changed flag after successful update
			fetchUserDetail(); // Refresh user data after update
		} catch (error) {
			console.log("Error updating user details:", error);
			toast.error(error.response?.data?.message || "Failed to update profile");
		}
	};

	// const handleProfileUpload = async (event) => {
	// 	try {
	// 		const file = event.target.files[0];
	// 		if (file) {
	// 			const data = new FormData();
	// 			data.append("file", file);
	// 			data.append("upload_preset", "pfendx01");
	// 			data.append("folder", "palji");

	// 			const response = await axios.post(
	// 				`https://api.cloudinary.com/v1_1/dwxtuqnty/upload`,
	// 				data
	// 			);
	// 			if (response.status === 200) {
	// 				const imageURL = response.data.url;
	// 				setEditData((prevData) => ({
	// 					...prevData,
	// 					userImage: imageURL,
	// 				}));
	// 				// Update the user image immediately in the UI
	// 				setUserDetails(prev => ({ ...prev, userImage: imageURL }));
	// 			}
	// 		}
	// 	} catch (error) {
	// 		console.log("Image upload error:", error);
	// 		toast.error("Failed to upload image");
	// 	}
	// };

	const handleProfileUpload = async (event) => {
		try {
			const file = event.target.files[0];
			if (file) {
				const data = new FormData();
				data.append("file", file);
				data.append("upload_preset", "grzbbapu");
				// data.append("upload_preset", "pfendx01");
				data.append("folder", "palji");
	
				const response = await axios.post(
					// `https://api.cloudinary.com/v1_1/dwxtuqnty/upload`,
					`https://api.cloudinary.com/v1_1/dh74mrqe0/upload`,
					data
				);
				if (response.status === 200) {
					const imageURL = response.data.url;
					setEditData((prevData) => ({
						...prevData,
						userImage: imageURL,
					}));
					
					// Save image to your server
					await makeApi("/api/update-user", "PUT", { userImage: imageURL });
	
					// Reload page after image upload
					window.location.reload();
				}
			}
		} catch (error) {
			console.log("Image upload error:", error);
			toast.error("Failed to upload image");
		}
	};
	
	return (
		<div className="userProfile">
			<ToastContainer position="top-center" />
			<hr className="userprofile-hr" />
			<div className="user-sidebar-info">
		
				<div className="new_home_page_tabs-list">
					<button
						className={`new_home_page_tab-trigger ${isActive("/userprofile") ? "new_home_page_active" : ""}`}
						onClick={() => navigate("/userprofile")}
					>
						Profile
					</button>
					<button
						className={`new_home_page_tab-trigger ${isActive("/userprofile/myorders") ? "new_home_page_active" : ""}`}
						onClick={() => navigate("/userprofile/myorders")}
					>
						Orders
					</button>
					<button
						className={`new_home_page_tab-trigger ${isActive("/userprofile/myaddress") ? "new_home_page_active" : ""}`}
						onClick={() => navigate("/userprofile/myaddress")}
					>
						Address
					</button>
				</div>
				<div className="userProfile-info">
					{location.pathname === "/userprofile" ? (
						<>
							<div className="user_profie_new_div_from_v0" >
								<div className="new_home_page_section-title">
									<h2>Personal Information</h2>
								</div>
								<div className="new_home_page_tab-content new_home_page_profile-tab">

									<div className="new_home_page_profile-image-container">
										<div className="new_home_page_profile-image-wrapper">
											<div className="new_home_page_profile-image">
												{userDetails?.userImage ? (
													<img src={userDetails.userImage} alt="Profile" className="new_home_page_profile-image" />
												) : (
													<img src={homeImg.blackUserProfile} alt="Default Profile" className="new_home_page_profile-image" />
												)}
											</div>
											<button className="new_home_page_change-profile-btn">
												<label htmlFor="profile-upload">
													<span>Change profile information</span>
												</label>
												<input
													id="profile-upload"
													type="file"
													accept="image/*"
													style={{ display: "none" }}
													onChange={handleProfileUpload}
													className="new_home_page_profile-upload-input"
												/>
											</button>
										</div>
									</div>

									<form className="new_home_page_profile-form" onSubmit={onSubmitHandler}>
										<div className="new_home_page_form-group">
											<label>NAME</label>
											<div className="new_home_page_profile-name-fields">
												<div>

													<input
														type="text"
														name="firstName"
														value={editData.firstName}
														onChange={onChangeHandler}
														placeholder="First Name"
														className="new_home_page_profile-first-name"
													/>
												</div>
												<div>

													<input
														type="text"
														name="lastName"
														value={editData.lastName}
														onChange={onChangeHandler}
														placeholder="Last Name"
														className="new_home_page_profile-first-name"

													/>
												</div>
											</div>
										</div>

										<div className="new_home_page_form-group">
											<label>GENDER</label>
											<select
												name="gender"
												value={editData.gender}
												onChange={onChangeHandler}
												className="p-1"
												style={{ borderRadius: "5px" }}
											>
												<option value="">Select Gender</option>
												<option value="male">Male</option>
												<option value="female">Female</option>
												<option value="other">Other</option>
											</select>
										</div>

										<div className="new_home_page_form-group">
											<label>CONTACT NUMBER</label>
											<input
												type="tel"
												name="mobileNumber"
												value={editData.mobileNumber}
												onChange={onChangeHandler}
												placeholder="Phone Number"
											/>
										</div>

										<div className="new_home_page_form-group ">
											<label>EMAIL</label>
											<input
												type="email"
												name="email"
												value={editData.email}
												onChange={onChangeHandler}
												placeholder="Email Address"
												disabled
											/>
										</div>

										<button type="submit" className="new_home_page_save-btn">
											Save Changes
										</button>
									</form>
								</div>
							</div>
							{/* for desktop view */}
							<div className="dektop_view_for_profile_main_div" >
								<div className="new_home_page_section-title">
									<h2>Personal Information</h2>
								</div>

								{/* data */}
								<div className="dekstop_profile_view_new">
									<div className="new_home_page_profile-image-container">
										<div className="new_home_page_profile-image-wrapper">
											<div className="new_home_page_profile-image">
												{userDetails?.userImage ? (
													<img src={userDetails.userImage} alt="Profile" className="new_home_page_profile-image" />
												) : (
													<img src={homeImg.blackUserProfile} alt="Default Profile" className="new_home_page_profile-image" />
												)}
											</div>
											<button className="new_home_page_change-profile-btn p-0">
												<label htmlFor="profile-upload">
													<span>Change profile information</span>
												</label>
												<input
													id="profile-upload"
													type="file"
													accept="image/*"
													style={{ display: "none" }}
													onChange={handleProfileUpload}
													className="new_home_page_profile-upload-input"
												/>
											</button>
										</div>
									</div>


									<div className="details_Section_desktop_view" >
										<form className="new_home_page_profile-form" onSubmit={onSubmitHandler}>
											<div className="new_home_page_form-group">
												<div className="new_home_page_profile-name-fields">
													<div>
														<label>FIST NAME</label>
														<input
															type="text"
															name="firstName"
															value={editData.firstName}
															onChange={onChangeHandler}
															placeholder="First Name"
															className="new_home_page_profile-first-name"
														/>
													</div>
													<div>
														<label> LAST NAME</label>

														<input
															type="text"
															name="lastName"
															value={editData.lastName}
															onChange={onChangeHandler}
															placeholder="Last Name"
															className="new_home_page_profile-first-name"

														/>
													</div>
												</div>
											</div>
											<div className="new_home_page_form-group">
												<div className="new_home_page_profile-name-fields">
													<div>
														<label>GENDER</label>
														<select
															name="gender"
															value={editData.gender}
															onChange={onChangeHandler}
															className="p-2 w-100"
															style={{ borderRadius: "5px" }}
														>
															<option value="">Select Gender</option>
															<option value="male">Male</option>
															<option value="female">Female</option>
															<option value="other">Other</option>
														</select>
													</div>
													<div>
														<label>CONTACT NUMBER</label>
														<input
															type="tel"
															name="mobileNumber"
															value={editData.mobileNumber}
															onChange={onChangeHandler}
															placeholder="Phone Number"
														/>
													</div>
												</div>
											</div>



											{/* <div className="new_home_page_form-group">
											</div> */}

											<div className="new_home_page_form-group w-50">
												<label>EMAIL</label>
												<input
													type="email"
													name="email"
													value={editData.email}
													onChange={onChangeHandler}
													placeholder="Email Address"
													disabled
													className="inpur_file_for_email_profile"
												/>
											</div>

											<button type="submit" className="new_home_page_save-btn w-25">
												Save Changes
											</button>
										</form>
									</div>
								</div>

							</div>
						</>

					) : (
						<Outlet />
					)}
				</div>
			</div>
		</div>
	);
};

export default UserProfile;