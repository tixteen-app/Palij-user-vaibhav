import React from "react"
import BannerImage from "../../Images/Home/banner/home_banner.png"
import "../../styles/Home/banner.css"
function AboutBanner() {
	return (
		<>
			<div className="Home_page_banner_main_div">
				<img
					src={BannerImage}
					alt="Banner"
					className="home_page_banner_image"
				/>
			</div>
		</>
	)
}

export default AboutBanner
