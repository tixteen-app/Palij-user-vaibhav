// import React, { useState } from "react"
import { assets } from "../../assets/assets"
import "./aboutUs.css"

const AboutUs = () => {
	// const [collaps,setCollaps] = useState(false)
	return (
		<div className="about-container">
			{/* <div className="aboutus">
				<h1>
					ABOU<span>T US</span>
				</h1>
				<div className="cup-cakes">
					<img
						src={assets.about_cake}
						alt=""
					/>
				</div>
			</div> */}
			<div className="aboutus2">
				<img
					src={assets.aboutLandingbanner1}
					alt=""
				/>
			</div>
			<div className="company-history">
				<h1>company history</h1>
				<p>
					Our story begins in the early days of 1983 when Sardar Tarlochan Singh
					Ji first stepped into the food industry with a vision to create
					something extraordinary. With a deep-rooted passion for baking, he
					founded Palji Bakery in 1993, starting as a modest home bakery store.
					From those humble beginnings, Palji Bakery has flourished into a
					beloved establishment known for its dedication to excellence. Sardar
					Tarlochan Singh Ji's commitment to quality and taste laid the
					foundation for what would become a cherished family legacy. <br />
					<br /> Today, with his son and grandson carrying forward his vision,
					Palji Bakery continues to uphold the values instilled by its founder.
					Our vegetarian bakery products are crafted with the same love and
					attention to detail that defined our early days. Despite our growth
					and expansion, we remain committed to delivering the best in taste and
					hygiene. Each product is prepared with freshly harvested raw materials
					under strict hygienic surveillance, ensuring that every bite is a
					testament to our commitment to excellence. Thank you for joining us on
					this journey. At Palji Bakery, we invite you to experience the magic
					of our delicious treats, crafted with care and passion since the early
					days of our inception.
				</p>
			</div>
			<div className="ours">
				<div className="our-values">
					<h2>OUR VALUES</h2>
					<div className="valued-features">
						<div>
							<img
								src={assets.our_value1}
								alt="QUALITY"
							/>
							<p>QUALITY</p>
						</div>
						<div>
							<img
								src={assets.our_value2}
								alt="FRESHNESS IMG"
							/>
							<p>FRESHNESS</p>
						</div>
						<div>
							<img
								src={assets.our_value3}
								alt="HYGIENE IMG"
							/>
							<p>HYGIENE</p>
						</div>
						<div>
							<img
								src={assets.our_value4}
								alt="customer satisfaction IMG"
							/>
							<p> CUSTOMER SATISFACTION </p>
						</div>
						<div>
							<img
								src={assets.our_value5}
								alt=" innovation IMG"
							/>
							<p> INNOVATION </p>
						</div>
					</div>
				</div>
				<div className="our-mission">
					<h2>OUR MISSION</h2>
					<p>
						Our mission is to delight customers with the finest bakery products,
						crafted with care and served with passion. We grow responsibly,
						build lasting relationships, and inspire joy in every bite. Thank
						you for joining us on this delicious journey at Palji Bakery.
					</p>
				</div>
			</div>
		</div>
	)
}

export default AboutUs
