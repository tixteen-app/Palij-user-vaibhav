
// import React, { useState, useEffect } from "react"
// import "./editUserProfile.css"
// import { useNavigate } from "react-router-dom"
// import { makeApi } from "../../api/callApi"
// import { ToastContainer, toast } from "react-toastify"
// import "react-toastify/dist/ReactToastify.css"
// import axios from "axios"
// import { GoArrowLeft } from "react-icons/go"

// const EditUserProfile = () => {
// 	const navigate = useNavigate()
// 	const [mobileNumberChanged, setMobileNumberChanged] = useState(false)
// 	const [editData, setEditData] = useState({
// 		firstName: "",
// 		lastName: "",
// 		gender: "",
// 		dateofbirth: "",
// 		email: "",
// 		mobileNumber: "",
// 		userImage: "",
// 	})

// 	// Fetch existing user details on component mount
// 	useEffect(() => {
// 		const fetchUserDetails = async () => {
// 			try {
// 				const response = await makeApi("/api/my-profile", "GET")
// 				const user = response.data.user
// 				setEditData({
// 					firstName: user.firstName,
// 					lastName: user.lastName,
// 					gender: user.gender,
// 					dateofbirth: user.dateofbirth
// 						? user.dateofbirth.substring(0, 10)
// 						: "",
// 					email: user.email,
// 					mobileNumber: user.mobileNumber.toString(),
// 					userImage: user.userImage,
// 				})
// 			} catch (error) {
// 				console.log(error)
// 			}
// 		}
// 		fetchUserDetails()
// 	}, [])

// 	const onChangeHandler = (event) => {
// 		setEditData({
// 			...editData,
// 			[event.target.name]: event.target.value,
// 		})
// 		if (event.target.name === "mobileNumber") {
// 			setMobileNumberChanged(true)
// 		}
// 	}
// 	const isValidMobileNumber = (number) => {
// 		const regex = /^\d{10}$/ // Adjust the regex pattern as needed
// 		return regex.test(number)
// 	}

// 	const onSubmitHandler = async (event) => {
// 		event.preventDefault()
// 		try {
// 			const userDataToUpdate = { ...editData }
// 			if (!mobileNumberChanged) {
// 				delete userDataToUpdate.mobileNumber
// 			}
// 			if (mobileNumberChanged && !isValidMobileNumber(editData.mobileNumber)) {
// 				toast.error("Please enter a valid 10-digit mobile number")
// 				return
// 			}
// 			const response = await makeApi(
// 				"/api/update-user",
// 				"PUT",
// 				userDataToUpdate
// 			)
// 			toast.success(response.data.message, {
// 				onClose: () => {
// 					if (response.data.user.role === "admin") {
// 						navigate("/userprofile")
// 					}
// 				},
// 			})

// 			navigate("/userprofile")
// 			window.location.reload();
// 		} catch (error) {
// 			console.log("Error updating user details:", error.response.data.message)
// 			toast.error(error.response.data.message)
// 		}
// 	}

// 	const handleProfileUpload = async (event) => {
// 		try {
// 			const file = event.target.files[0]
// 			if (file) {
// 				const data = new FormData()
// 				data.append("file", file)
// 				data.append("upload_preset", "pfendx01")
// 				data.append("folder", "palji")

// 				const response = await axios.post(
// 					`  https://api.cloudinary.com/v1_1/dwxtuqnty/upload`,
// 					data
// 				)
// 				if (response.status === 200) {
// 					const imageURL = response.data.url
// 					setEditData((prevData) => ({
// 						...prevData,
// 						userImage: imageURL,
// 					}))
// 				}
// 			}
// 		} catch (error) {
// 			console.log("Image upload error:", error)
// 		}
// 	}

// 	return (
// 		<>
// 			<ToastContainer autoClose={1300} />
// 			<div className="userupdatebackButton" onClick={() => navigate(-1)}>
// 				<GoArrowLeft />
// 			</div>
// 			<div className="editUserProfile">
// 				<form
// 					className="edit-form"
// 					onSubmit={onSubmitHandler}
// 				>
// 					<div className="edit-about-section">
// 						<div className="file-input">
// 							<input
// 								id="file"
// 								type="file"
// 								onChange={handleProfileUpload}
// 								className="p-5"
// 							/>
// 							<div className="select-user-img">
// 								<img
// 									src={editData.userImage}
// 									alt="profile"
// 								/>
// 							</div>
// 						</div>
// 						<div className="about-edit-btn">
// 							<h2>About</h2>
// 						</div>
// 						<div className="edit-username">
// 							<input
// 								type="text"
// 								placeholder="First Name"
// 								name="firstName"
// 								value={editData.firstName}
// 								onChange={onChangeHandler}
// 							/>
// 							<input
// 								type="text"
// 								placeholder="Last Name"
// 								name="lastName"
// 								value={editData.lastName}
// 								onChange={onChangeHandler}
// 							/>
// 						</div>
// 						<div className="edit-gender">
// 							<label htmlFor="gender">Gender</label>
// 							<div className="male-female">
// 								<div>
// 									<input
// 										type="radio"
// 										name="gender"
// 										value="male"
// 										checked={editData.gender === "male"}
// 										onChange={onChangeHandler}
// 									/>
// 									<label htmlFor="male">Male</label>
// 								</div>
// 								<div>
// 									<input
// 										type="radio"
// 										name="gender"
// 										value="female"
// 										checked={editData.gender === "female"}
// 										onChange={onChangeHandler}
// 									/>
// 									<label htmlFor="female">Female</label>
// 								</div>
// 							</div>
// 						</div>
// 						<div className="edit-dob">
// 							<label htmlFor="dateofbirth">D.O.B</label>
// 							<input
// 								type="date"
// 								name="dateofbirth"
// 								value={editData.dateofbirth}
// 								onChange={onChangeHandler}
// 							/>
// 						</div>
// 					</div>
// 					<div className="edit-contacts">
// 						<h2>Contacts</h2>
// 						<div className="edit-email">
// 							<label htmlFor="email">Email</label>
// 							<input
// 								type="email"
// 								name="email"
// 								value={editData.email}
// 								onChange={onChangeHandler}
// 								disabled
// 							/>
// 						</div>
// 						<div className="edit-pno">
// 							<label htmlFor="mobileNumber">Phone number</label>
// 							<input
// 								type="text"
// 								name="mobileNumber"
// 								value={editData.mobileNumber}
// 								onChange={onChangeHandler}
// 							/>
// 						</div>
// 					</div>
// 					<button
// 						type="submit"
// 						className="edit-save-btn"
// 					>
// 						Update
// 					</button>
// 				</form>
// 			</div>
// 		</>
// 	)
// }

// export default EditUserProfile

import React, { useState, useEffect } from "react";
import "./editUserProfile.css";
import { useNavigate } from "react-router-dom";
import { makeApi } from "../../api/callApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { GoArrowLeft } from "react-icons/go";

const EditUserProfile = () => {
	const navigate = useNavigate();
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

	// Fetch existing user details on component mount
	useEffect(() => {
		const fetchUserDetails = async () => {
			try {
				const response = await makeApi("/api/my-profile", "GET");
				const user = response.data.user;
				setEditData({
					firstName: user.firstName || "",
					lastName: user.lastName || "",
					gender: user.gender || "",
					dateofbirth: user.dateofbirth ? user.dateofbirth.substring(0, 10) : "",
					email: user.email || "",
					mobileNumber: user.mobileNumber ? user.mobileNumber.toString() : "",
					userImage: user.userImage || "",
				});
			} catch (error) {
				console.log(error);
			}
		};
		fetchUserDetails();
	}, []);

	const onChangeHandler = (event) => {
		setEditData({
			...editData,
			[event.target.name]: event.target.value,
		});
		if (event.target.name === "mobileNumber") {
			setMobileNumberChanged(true);
		}
	};

	const isValidMobileNumber = (number) => {
		const regex = /^\d{10}$/; // Adjust the regex pattern as needed
		return regex.test(number);
	};

	const onSubmitHandler = async (event) => {
		event.preventDefault();
		try {
			const userDataToUpdate = { ...editData };
			if (!mobileNumberChanged) {
				delete userDataToUpdate.mobileNumber;
			}
			if (mobileNumberChanged && !isValidMobileNumber(editData.mobileNumber)) {
				toast.error("Please enter a valid 10-digit mobile number");
				return;
			}
			const response = await makeApi("/api/update-user", "PUT", userDataToUpdate);
			toast.success(response.data.message, {
				onClose: () => {
					if (response.data.user.role === "admin") {
						navigate("/userprofile");
					}
				},
			});

			navigate("/userprofile");
			window.location.reload();
		} catch (error) {
			console.log("Error updating user details:", error.response.data.message);
			toast.error(error.response.data.message);
		}
	};

	const handleProfileUpload = async (event) => {
		try {
			const file = event.target.files[0];
			if (file) {
				const data = new FormData();
				data.append("file", file);
				data.append("upload_preset", "pfendx01");
				data.append("folder", "palji");

				const response = await axios.post(
					`https://api.cloudinary.com/v1_1/dwxtuqnty/upload`,
					data
				);
				if (response.status === 200) {
					const imageURL = response.data.url;
					setEditData((prevData) => ({
						...prevData,
						userImage: imageURL,
					}));
				}
			}
		} catch (error) {
			console.log("Image upload error:", error);
		}
	};

	return (
		<>
			<ToastContainer autoClose={1300} />
			<div className="userupdatebackButton" onClick={() => navigate(-1)}>
				<GoArrowLeft />
			</div>
			<div className="editUserProfile">
				<form className="edit-form" onSubmit={onSubmitHandler}>
					<div className="edit-about-section">
						<div className="file-input">
							<input
								id="file"
								type="file"
								onChange={handleProfileUpload}
								className="p-5"
							/>
							<div className="select-user-img">
								<img src={editData.userImage} alt="profile" />
							</div>
						</div>
						<div className="about-edit-btn">
							<h2>About</h2>
						</div>
						<div className="edit-username">
							<input
								type="text"
								placeholder="First Name"
								name="firstName"
								value={editData.firstName}
								onChange={onChangeHandler}
							/>
							<input
								type="text"
								placeholder="Last Name"
								name="lastName"
								value={editData.lastName}
								onChange={onChangeHandler}
							/>
						</div>
						<div className="edit-gender">
							<label htmlFor="gender">Gender</label>
							<div className="male-female">
								<div>
									<input
										type="radio"
										name="gender"
										value="male"
										checked={editData.gender === "male"}
										onChange={onChangeHandler}
									/>
									<label htmlFor="male">Male</label>
								</div>
								<div>
									<input
										type="radio"
										name="gender"
										value="female"
										checked={editData.gender === "female"}
										onChange={onChangeHandler}
									/>
									<label htmlFor="female">Female</label>
								</div>
							</div>
						</div>
						<div className="edit-dob">
							<label htmlFor="dateofbirth">D.O.B</label>
							<input
								type="date"
								name="dateofbirth"
								value={editData.dateofbirth}
								onChange={onChangeHandler}
							/>
						</div>
					</div>
					<div className="edit-contacts">
						<h2>Contacts</h2>
						<div className="edit-email">
							<label htmlFor="email">Email</label>
							<input
								type="email"
								name="email"
								value={editData.email}
								onChange={onChangeHandler}
								disabled
							/>
						</div>
						<div className="edit-pno">
							<label htmlFor="mobileNumber">Phone number</label>
							<input
								type="text"
								name="mobileNumber"
								value={editData.mobileNumber}
								onChange={onChangeHandler}
							/>
						</div>
					</div>
					<button type="submit" className="edit-save-btn">
						Update
					</button>
				</form>
			</div>
		</>
	);
};

export default EditUserProfile;