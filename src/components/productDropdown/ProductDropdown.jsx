import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { makeApi } from "../../api/callApi"

const ProductDropdown = () => {
	const [categories, setCategories] = useState([])

	useEffect(() => {
		async function fetchCategories() {
			try {
				const response = await makeApi("/api/get-all-categories", "GET")
				if (response.status === 200) {
					setCategories(response.data.categories)
				}
			} catch (error) {
				console.log("Error fetching categories:", error)
			}
		}
		fetchCategories()
	}, [])
	// console.log(categories)

	return (
		<div className="product-dropdown">
			{" "}
			<ul className="drop-down-menu">
				{categories.map((item, id) => {
					return (
						<li className="dropdown-li">
							<Link to="/products">{item.name}</Link>
						</li>
					)
				})}
			</ul>
		</div>
	)
}

export default ProductDropdown
