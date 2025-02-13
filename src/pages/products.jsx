import React from "react"
import { Route, Routes } from "react-router"
// import ProductSidebar from "../components/products/slidebar/sidebar"
import ProductSidebar from "../components/products/slidebar/sidebar"

import ProductDetails from "../components/products/productDetails"
import '../styles/product/products.css'
import Ecombar from "../components/Header/ecombar"

function Product() {
	return (
		<div
			className="all-products-route"

		>
			<Routes>
				<Route
					path="/sidebar"
					element={<ProductSidebar />}
				/>

				<Route
					path="/all-products"
					element={<ProductSidebar />}
				/>
				{/* product details */}
				<Route
					path="/product-details/:productId"
					element={<ProductDetails />}
				/>
			</Routes>
			{/* <Ecombar /> */}
		</div>
	)
}

export default Product
