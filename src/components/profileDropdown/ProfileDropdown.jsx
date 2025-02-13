import React from "react"
import "./profileDropdown.css"
import { Link } from "react-router-dom"

const ProfileDropdown = ({ openProfile, setOpenProfile }) => {
	const toggleProfile = () => {
		setOpenProfile(!openProfile)
	}
	const closeProfile = () => {
		setOpenProfile(false)
	}
	const handleLogout = () => {
		localStorage.removeItem("token")
		window.location.replace("/")
	}

	return (
		<div className="profile-dropdown">
			<ul>
				<li onClick={closeProfile} className="btn btn-primary" >
					<Link to="/userprofile">Profile</Link>
				</li>
				<li onClick={closeProfile}>
					{localStorage.getItem("token") ? (
						<button
							onClick={() => {
								localStorage.removeItem("token")
								window.location.replace("/")
							}}
							className="btn btn-danger"
						>
							Logout
						</button>
					) : (
						<Link to="/Signup" className="btn btn-success" >Login</Link>
					)}
				</li>
			</ul>
		</div>
	)
}

export default ProfileDropdown
