import { useState } from "react"
import { toast } from "react-toastify"
import { makeApi } from "../api/callApi"

const useCoupon = () => {
	const [couponCode, setCouponCode] = useState("")
	const [appliedCoupon, setAppliedCoupon] = useState(null)
	const [couponDiscount, setCouponDiscount] = useState(0)

	const applyCoupon = async (code) => {
		try {
			const response = await makeApi(
				`/api/get-coupan-by-coupancode/${code}`,
				"GET"
			)
			if (response?.data?.coupan !== null) {
				setAppliedCoupon(response.data.coupan)
				setCouponDiscount(response.data.coupan.discountPercentage)
				toast.success("Coupon applied successfully!")
			} else {
				toast.error("Coupon Code is Invalid")
			}
		} catch (error) {
			console.error("Error applying coupon: ", error)
			toast.error("Failed to apply coupon")
		}
	}

	const removeCoupon = async () => {
		try {
			await makeApi("/api/remove-coupon", "POST")
			setAppliedCoupon(null)
			setCouponCode("")
			setCouponDiscount(0)
			toast.success("Coupon removed successfully!")
		} catch (error) {
			console.error("Error removing coupon: ", error)
			toast.error("Failed to remove coupon")
		}
	}

	return {
		couponCode,
		setCouponCode,
		appliedCoupon,
		couponDiscount,
		applyCoupon,
		removeCoupon,
	}
}

export default useCoupon
