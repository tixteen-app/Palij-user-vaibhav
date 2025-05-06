// import React, { useContext, useState } from "react"
// import "./CSS/shopCategory.css"
// import { ShopContext } from "../context/ShopContext"

// import Item from "../components/item/Item"

// const ShopCategory = (props) => {
// 	const { all_product } = useContext(ShopContext)
// 	const [AllProductLoader, setAllProductLoader] = useState(false)
// 	const [toalProduct, setToalProduct] = useState(0)

// 	const [products, setProducts] = useState([])
// 	const fetchProduct = async () => {
// 		try {
// 			setAllProductLoader(true)
// 			const response = await makeApi(
// 				`/api/get-all-products?name=${search}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}&page=${currentPage}&perPage=${ResultPerPage}&IsOutOfStock=false`,
// 				"GET"
// 			)
// 			setProducts(response.data.products)
// 			setToalProduct(response.data.totalProducts)
// 		} catch (error) {
// 			console.log(error)
// 		} finally {
// 			setAllProductLoader(false)
// 		}
// 	}
// 	// console.log(all_product)
// 	// console.log("this is", props.products)
// 	return (
// 		<div className="ShopCategory-container">
// 			<h1>{props.categories.name}</h1>
// 			<div className="shopcategory-products">
// 				{Array.isArray(props.products) &&
// 					props.products.map((item, i) => {
// 						return (
// 							<Item
// 								key={item._id}
// 								id={item._id}
// 								name={item.name}
// 								image={item.thumbnail}
// 								old_price={item.price}
// 								new_price={item.PriceAfterDiscount}
// 							/>
// 						)
// 					})}
// 				{/* <Item /> */}
// 			</div>
// 		</div>
// 	)	
// }

// export default ShopCategory
