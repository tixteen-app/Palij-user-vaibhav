import React from "react"

const BannerSlide = ({ bannerInfo }) => {
	return (
		<div>
			<div className="slide banner-flex">
				<div className="left-banner">
					<div className="banner-info">
						<div className="title">
							<h2>{bannerInfo.title}</h2>
							<p>{bannerInfo.subTitle}</p>
						</div>
						<p className="content">{bannerInfo.content}</p>
					</div>
					<div className="cart5">
						<button>Add Cart</button>
					</div>
				</div>
				<div className="right-banner">
					<img
						src={bannerInfo.banner_Image}
						alt=""
					/>
				</div>
			</div>
		</div>
	)
}

export default BannerSlide
