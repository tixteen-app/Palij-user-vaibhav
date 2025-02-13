import React, { useEffect, useState } from "react"
import { assets } from "../../../assets/assets.js"
import "./header.css"
import Loader from "../loader/Loader.jsx"
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/navigation"
import { Autoplay, Pagination, Navigation } from "swiper/modules"

const Header = () => {
	const [isloading, setIsLoading] = useState(true)
	const [animate, setAnimate] = useState(false)
	useEffect(() => {
		const fakeDataFetch = () => {
			setTimeout(() => {
				setIsLoading(false)
			}, 2000)
		}
		setAnimate(true)
		fakeDataFetch()
	}, [])
	return (
		// <div className={`header ${animate ? "initial" : ""}`}>
		// 	<h1>
		// 		Heaven<span>lyBake</span>
		// 	</h1>
		// 	<div className="cup-cakes">
		// 		<img
		// 			src={assets.cup_cakes}
		// 			alt=""
		// 		/>
		// 	</div>
		// </div>
		<div className="homebanner2">
			{/* <img
				src={assets.homeBanner2}
				alt=""
			/> */}
			<Swiper
				navigation={true}
				modules={[Autoplay, Navigation]}
				loop={true}
				autoplay={{
					delay: 2500,
					disableOnInteraction: false,
				}}
				className="mySwiper"
			>
				<SwiperSlide>
					{" "}
					<img
						src={assets.homeBanner4}
						alt=""
					/>
				</SwiperSlide>
				<SwiperSlide>
					<img
						src={assets.homeBanner2}
						alt=""
					/>
				</SwiperSlide>
				<SwiperSlide>
					{" "}
					<img
						src={assets.homeBanner3}
						alt=""
					/>
				</SwiperSlide>

			</Swiper>
		</div>
	)
}

export default Header
