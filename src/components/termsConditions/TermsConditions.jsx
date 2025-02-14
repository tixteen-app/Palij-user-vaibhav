import { Link } from "react-router-dom"
import { assets } from "../../assets/assets"
import styles from "./termsConditions.module.css"
import { GoDotFill } from "react-icons/go"

const termsConditions = () => {
	return (
		<div className={styles.termcontainer}>
			<section className={styles.termsection}>
				<h1>TERMS AND CONDITIONS</h1>
				<img
					src={assets.pieceOfCake}
					alt="Piece of cake"
				/>
			</section>
			<div className={styles.termContent}>
				<div className={styles.termIntroduce}>
					<span>Introduction</span>
					<p> By using our site, you agree to these terms and conditions.</p>
				</div>
				<div className={styles.alltermsAndConditions}>
					<div>
						<span>1. Use of the Website</span>
						<li>Use the site for lawful purposes only.</li>
					</div>
					<div>
						<span>2. Orders</span>
						<div>
							<li>Confirm you are legally capable of making a purchase.</li>
							<li>
								Orders are subject to availability and price confirmation.
							</li>
						</div>
					</div>
					<div>
						<span>3. Pricing and Payment</span>
						<div>
							{" "}
							<li>Prices include applicable taxes.</li>
							<li>Payment is required at the time of placing the order.</li>
						</div>
					</div>
					<div>
						<span>4. Delivery</span>
						<div>
							{" "}
							<li>
								We aim to deliver within the indicated timeframe, but delivery
								times are not guaranteed.
							</li>
							<li>Delivery costs are calculated at checkout.</li>
						</div>
					</div>
					<div>
						<span>5. Returns and Refunds</span>
						<div>
							{" "}
							<li>
								Due to the perishable nature of our products, bakery items are
								non-returnable and non-refundable.
							</li>
							<li>
								If you receive damaged or defective items, contact us within 24
								hours for a possible replacement.
							</li>
						</div>
					</div>
					<div>
						<span>6. Product Quality</span>
						<div>
							{" "}
							<li>
								Our products are made with the highest standards of quality and
								hygiene.
							</li>
							<li>We use freshly harvested raw materials.</li>
						</div>
					</div>
					<div>
						<span>7. Intellectual Property</span>
						<div>
							{" "}
							<li>
								All content on this site, including text, graphics, logos, and
								images, is owned by Palji Bakery.
							</li>
							<li>
								Reproduction or use of any content without permission is
								prohibited.
							</li>
						</div>
					</div>
					<div>
						<span>8. Limitation of Liability</span>
						<div>
							<li>
								Palji Bakery is not liable for any loss or damage arising from
								the use of our site or products.
							</li>
							<li>
								Our liability is limited to the maximum extent permitted by law.
							</li>
						</div>
					</div>
					<div>
						<span>9. Privacy Policy</span>
						<li>
							{" "}
							Your use of the site is also governed by our <Link to="/privacy-policy" style={{ color: "blue", textDecoration: "underline" }}>
								Privacy Policy.
							</Link>
						</li>
					</div>
					<div>
						<span>10. Changes to Terms</span>
						<li>
							We may update these terms at any time. Check this page regularly
							for updates.
						</li>
					</div>
					<div>
						<span>11. Governing Law</span>
						<div>
							{" "}
							<li>These terms are governed by the laws of Punjab, India.</li>
							<li>
								Any disputes will be resolved in the courts of Punjab, India.
							</li>
						</div>
					</div>
				</div>
				<div className={styles.termContectInfo}>
					<span>Contact Information</span>
					<p>For questions, contact us at:</p>
					<div>
						<li>
							Email:{" "}
							<a href="mailto:paljibakery@gmail.com">paljibakery@gmail.com</a>
						</li>
						<li>
							Phone:{" "}
							<div>
								{" "}
								<a href="tel:+917901706000">+91 7901706000</a>, <br />
								<a href="tel:+919814367260">+91 9814367260</a>
							</div>
						</li>
					</div>
				</div>
			</div>
		</div>
	)
}

export default termsConditions
