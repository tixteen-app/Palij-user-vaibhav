import React from "react"
import { Link } from "react-router-dom"
import "../../../styles/order/cart/cartCalculation.css"
function CartCalculation({
	tax,
	shipping,
	CoupanApplied,
	total,
	Final,
	ButtonName,
}) {
	const formatNumber = (number) => {
		return Math.round(number).toString()
	}
	return (
		<>
			<div className="cart_calculation_main_div">
				<div>ORDER SUMMARY</div>
				<div className="cart_calculation_div">
					{/* name */}
					<div className="cart_calculation_name_value">
						<div>SUB TOTAL</div>
						<div>DISCOUNT</div>
						<div>TAX</div>
						<div>SHIPPING</div>
						<div>TOTAL</div>
					</div>
					{/* value */}
					<div className="cart_calculation_name_value">
						<div>₹ {formatNumber(Final)}</div>
						<div>₹ 0.00</div>
						<div> 5%</div>
						<div>₹ {formatNumber(shipping)}</div>
						<div>₹ {formatNumber(total)}</div>
					</div>
				</div>
				<Link
					to="/userprofile/myorders"
					className="css-for-link-taga"
				>
					<div className="proced_to_payment_button">{ButtonName}</div>
				</Link>
			</div>
			<div></div>
		</>
	)
}

export default CartCalculation
