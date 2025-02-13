

import React, { useState, useEffect } from "react"
import "./myAddress.css"
import { useNavigate } from "react-router"
import { makeApi } from "../../api/callApi"
import ConfirmationModal from "../../AdminComponents/product/admindeleteproduct"

const MyAddress = () => {
	const [billingAddresses, setBillingAddresses] = useState([])
	const [shippingAddresses, setShippingAddresses] = useState([])
	const [deleteProductId, setDeleteProductId] = useState(null)

	const handleDeleteConfirm = async () => {
		if (deleteProductId) {
			if (billingAddresses.some((address) => address._id === deleteProductId)) {
				await deleteBillingAddress(deleteProductId)
			} else if (
				shippingAddresses.some((address) => address._id === deleteProductId)
			) {
				await deleteShippingAddress(deleteProductId)
			}
			setDeleteProductId(null)
		}
	}

	const deleteBillingAddress = async (productId) => {
		try {
			const response = await makeApi(
				`/api/delete-billing-address/${productId}`,
				"DELETE"
			)
			setBillingAddresses(
				billingAddresses.filter((address) => address._id !== productId)
			)
		} catch (error) {
			console.error("Error deleting billing address:", error)
		}
	}

	const deleteShippingAddress = async (productId) => {
		try {
			const response = await makeApi(
				`/api/delete-shiped-address/${productId}`,
				"DELETE"
			)
			setShippingAddresses(
				shippingAddresses.filter((address) => address._id !== productId)
			)
		} catch (error) {
			console.error("Error deleting shipping address:", error)
		}
	}

	const navigator = useNavigate()

	const fetchBillingAddresses = async () => {
		try {
			const response = await makeApi("/api/get-my-billing-address", "GET")
			if (response.data.success) {
				setBillingAddresses(response.data.billingaddress)
			}
		} catch (error) {
			console.error("Error fetching billing addresses:", error)
		}
	}

	const fetchShippingAddresses = async () => {
		try {
			const response = await makeApi("/api/get-my-shiped-address", "GET")
			if (response.data.success) {
				setShippingAddresses(response.data.shipedaddress)
			}
		} catch (error) {
			console.error("Error fetching shipping addresses:", error)
		}
	}

	useEffect(() => {
		fetchBillingAddresses()
		fetchShippingAddresses()
	}, [])

	return (
		<div className="myaddress">
			<div className="userprofile-heading">
				<h1>MY ADDRESS</h1>
			</div>
			<div className="shipping-billing-address">
				<p>
					The following addresses will be used on the checkout page by default.
				</p>
				<div className="shipping-billing-flex d-flex justify-content-between">

					<div className="billing-addressz">
						<h2 className="n_shipp_bill">SHIPPING ADDRESS</h2>
						<div className="d-flex flex-column gap-5">
							<button
								className="ship_bill_add"
								onClick={() => navigator("/shipping-address")}
							>
								Add Shipping Address
							</button>
							{shippingAddresses.map((address) => (
								<div
									key={address._id}
									className="billing-address a_shipp_bill"
								>
									<div className="billing-address-flex">
										<h3>SHIPPING ADDRESS</h3>
										<div>
											<button
												onClick={() =>
													navigator(`/edit-shipping-address/${address._id}`)
												}
											>
												Edit
											</button>
											<button onClick={() => setDeleteProductId(address._id)}>
												DELETE
											</button>
										</div>
									</div>
									<p>
										{`${address.firstname}, ${address.lastname}, ${address.address}, ${address.city}, ${address.state} ${address.pincode}`}
									</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
			<ConfirmationModal
				isOpen={deleteProductId !== null}
				onClose={() => setDeleteProductId(null)}
				onConfirm={handleDeleteConfirm}
			/>
		</div>
	)
}

export default MyAddress
