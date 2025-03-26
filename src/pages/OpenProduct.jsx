import React, { useContext, useEffect } from "react"
import ProductDisplay from "../components/productDisplay/ProductDisplay"
import { ShopContext } from "../context/ShopContext"
import { useParams } from "react-router"

const OpenProduct = () => {
	const { all_product } = useContext(ShopContext)
	const { productId } = useParams()
	const pro = all_product
	console.log(all_product)
	useEffect(() => {
		// Fetch data if all_product is not available
		if (!all_product.length) {
			// Fetch data here
		}
	}, [all_product])
	// console.log("this is prodidplsy", pro)
	const product = all_product.find((e) => e._id === productId)
	if (!product) {
		return <div>Loading...</div>
	}
	return (
		<div className="openProduct">
			<ProductDisplay product={product} />
		</div>
	)
}

export default OpenProduct
