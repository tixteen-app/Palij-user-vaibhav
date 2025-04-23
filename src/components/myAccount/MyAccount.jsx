// import React, { useEffect, useState } from "react"
// import "./myAccount.css"
// import { assets } from "../../assets/assets"
// import { useNavigate } from "react-router"
// import { makeApi } from "../../api/callApi"

// const MyAccount = () => {
// 	const navigate = useNavigate()
// 	const [userDatails, setUserDetails] = useState()

// 	const fetchUserDetail = async () => {
// 		try {
// 			const responce = await makeApi("/api/my-profile", "GET")
// 			setUserDetails(responce.data.user)
// 		} catch (error) {
// 			console.log(error)
// 		}
// 	}

// 	useEffect(() => {
// 		fetchUserDetail()
// 	}, [])

// 	console.log("user details", userDatails)

// 	return (
// 		<div className="myaccount">
// 			<div className="userprofile-heading">
// 				<h1>PERSONAL INFORMATION</h1>
// 			</div>
// 			{userDatails && (
// 				<div className="myaccount-info userprofile-info-css">
// 					<div className="left-myaccount-info">
// 						<img
// 							src={userDatails.userImage}
// 							alt=""
// 						/>
// 						<div className="userprofilename">
// 							<span>NAME</span>
// 							<p>{userDatails.firstName + " " + userDatails.lastName}</p>
// 						</div>
// 						<div className="userprofile-birthdate">
// 							<span>DATE OF BIRTH</span>
// 							<p>{userDatails?.dateofbirth?.substr(0, 10)}</p>
// 						</div>
// 						<div className="userprofile-gender">
// 							<span>GENDER</span>
// 							<p>{userDatails.gender}</p>
// 						</div>
// 						<div className="userprofile-no">
// 							<span>CONTACT NUMBER</span>
// 							<p>{userDatails.mobileNumber}</p>
// 						</div>
// 						<div className="userprofile-email">
// 							<span>EMAIL ADDRESS</span>
// 							<p>{userDatails.email}</p>
// 						</div>
// 					</div>
// 					<div className="right-myaccount-info">
// 						<div
// 							className="change-profileinfo"
// 							onClick={() => navigate("/edit-userprofile")}
// 						>
// 							<img
// 								src={assets.profile_reset}
// 								alt=""
// 							/>
// 							<p>change profile information</p>
// 						</div>{" "}
// 						{/* <div
// 							className="change-profilepwd"
// 							onClick={() => navigate("/edit-userprofile")}
// 						>
// 							<img
// 								src={assets.password_reset}
// 								alt=""
// 							/>
// 							<p>change password</p>
// 						</div> */}
// 					</div>
// 				</div>
// 			)}
// 		</div>
// 	)
// }

// export default MyAccount

import React, { useEffect, useState } from "react"
import "./myAccount.css"
import { assets } from "../../assets/assets"
import { useNavigate } from "react-router"
import { makeApi } from "../../api/callApi"
import Primaryloader from "../loaders/primaryloader"

const MyAccount = () => {
	const navigate = useNavigate()
	const [userDetails, setUserDetails] = useState(null)
	const [loading, setLoading] = useState(false);


	const fetchUserDetail = async () => {
		try {
			setLoading(true);

			const response = await makeApi("/api/my-profile", "GET")
			setUserDetails(response.data.user)
		} catch (error) {
			console.log(error)
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		fetchUserDetail()
	}, [])

	useEffect(() => {
		// Fetch user details again if needed when navigating back from edit page
		const handleNavigation = () => {
			fetchUserDetail()
		}

		window.addEventListener("focus", handleNavigation)

		return () => {
			window.removeEventListener("focus", handleNavigation)
		}
	}, [])

	return (
		<div className="myaccount">
			<div className="userprofile-heading">
				<h1>PERSONAL INFORMATION</h1>
			</div>

			{loading ?
				<div className='' style={{ display: "flex", justifyContent: "center", height: "40vh", alignItems: "center" }}>
					<Primaryloader />
				</div> :
				<>
					{userDetails && (

						<div className="myaccount-info userprofile-info-css">
							<div className="left-myaccount-info">
								<img
									src={userDetails.userImage}
									alt=""
								/>
								<div className="userprofilename">
									<span>NAME</span>
									<p>{userDetails.firstName + " " + userDetails.lastName}</p>
								</div>
								<div className="userprofile-birthdate">
									<span>DATE OF BIRTH</span>
									<p>
										{userDetails?.dateofbirth
											? userDetails?.dateofbirth?.substr(0, 10)
											: "Date Of Birth"}
									</p>
								</div>
								<div className="userprofile-gender">
									<span>GENDER</span>
									<p>{userDetails.gender ? userDetails.gender : "Gender"}</p>
								</div>
								<div className="userprofile-no">
									<span>CONTACT NUMBER</span>
									<p>{ userDetails.mobileNumber ? userDetails.mobileNumber: "Contact Number"}</p>
								</div>
								<div className="userprofile-email">
									<span>EMAIL ADDRESS</span>
									<p>{userDetails.email}</p>
								</div>
							</div>
							<div className="right-myaccount-info">
								<div
									className="change-profileinfo"
									onClick={() => navigate("/edit-userprofile")}
								>
									<img
										src={assets.profile_reset}
										alt=""
									/>
									<p>Change profile information</p>
								</div>
								{/* <div
							className="change-profilepwd"
							onClick={() => navigate("/edit-userprofile")}
						>
							<img
								src={assets.password_reset}
								alt=""
							/>
							<p>Change password</p>
						</div> */}
							</div>
						</div>
					)}
				</>
			}
		</div>
	)
}

export default MyAccount
