import React from "react"
import { Link, useNavigate } from "react-router-dom"
import "./cartCalculation.css"
import useCoupon from "../../hook/coupanHook"
// import useCoupon from "../hook/coupanHook"

function CartCalculation({
	tax,
	shipping,
	CoupanApplied,
	total,
	Final,
	ButtonName,
	disabled,
}) {
	const formatNumber = (number) => {
		return Math.round(number).toString()
	}

	const {
		couponCode,
		setCouponCode,
		appliedCoupon,
		couponDiscount,
		applyCoupon,
		removeCoupon,
	} = useCoupon()
	const navigate = useNavigate()
	return (
		<>
			<div className="right-checkoutpayment cart-billing">
				{/* <div className="cart-promocode">
					<h2>HAVE A COUPON ?</h2>
					<div className="cart-promocode-input">
						<input
							type="text"
							placeholder="COUPON CODE"
							value={couponCode}
							onChange={(e) => setCouponCode(e.target.value)}
							disabled={appliedCoupon !== null}
						/>
						{appliedCoupon ? (
							<button onClick={removeCoupon}>REMOVE</button>
						) : (
							<button onClick={(e) => applyCoupon(couponCode)}>APPLY</button>
						)}
					</div>
				</div> */}
				<div className="cart-order-summary">
					<h2>order summary</h2>
					<div className="cart-billing-charges">
						<div className="cart-billing-subtotal">
							<p>SUBTOTAL</p>
							<p>₹{formatNumber(Final)}</p>
						</div>
						<div className="cart-billing-discount">
							<p>DISCOUNT</p>
							<p>{appliedCoupon ? couponDiscount : 0}%</p>
						</div>
						{/* <div className="cart-billing-tax">
							<p>TAX</p>
							<p> 5%</p>
						</div> */}
						<div className="cart-billing-shipping">
							<p>SHIPPING</p>
							<p> {formatNumber(shipping)}</p>
						</div>
						<div className="cart-billing-shipping">
							<b>TOTAL</b>
							<b>₹{formatNumber(Final)}</b>
						</div>
					</div>
					{/* <Link
						to="/cart/checkout/"
						className="css-for-link-tag"
					>
						<div className="cart_calculation_button">{ButtonName}</div>
					</Link> */}
					<button
						className="cart_calculation_button"
						disabled={disabled} // Apply the disabled attribute
						style={{ opacity: disabled ? 0.5 : 1 }}
						onClick={() => navigate("/cart/checkout/")}
					>
						{ButtonName}
					</button>
					<hr />
					{/* <p className="cart-delivery-day">
						Delivery In <span>4 to 5 Days</span>
					</p> */}
				</div>
			</div>

			<div></div>
		</>
	)
}

export default CartCalculation
{
	/* <div className="right-checkoutpayment cart-billing"> */
}
