import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import "./productDetails.css"
import { makeApi } from "../../api/callApi"

const ProductDetails = () => {
	const { productdetails } = useParams()
	const [product, setProduct] = useState(null)
	console.log("this is product id", productdetails)

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				// setLoading(true)
				const response = await makeApi(
					`/api/get-single-product/${productdetails}`,
					"GET"
				)
				setProduct(response.data.product)
			} catch (error) {
				console.error("Error fetching product details:", error)
			}
		}
		fetchProduct()
	}, [productdetails])

	return (
		<div className="productDisplay">
			<div className="product-display-left">
				<div className="productdisplay-img-list">
					{/* {props.product.image.map((item, i) => {
						return (
							<img
								src={props.product.thumbnail}
								alt=""
							/>
						)
					})} */}
					<img
						src={""}
						alt=""
					/>{" "}
					<img
						src={""}
						alt=""
					/>{" "}
					<img
						src={""}
						alt=""
					/>{" "}
					<img
						src={""}
						alt=""
					/>
				</div>
				<div className="productdisplay-img">
					<img
						src={""}
						alt=""
						className="productdisplay-main-img"
					/>
				</div>
			</div>
			<div className="product-display-right">
				<h1>{product?.name}</h1>
				<h2>{"subtitle"}</h2>
				<p>{"desc"}</p>
				<div className="productdisplay-addtocart">
					<div className="productdisplay-item-cart">
						{/* <div className="productdisplay-food-item-counter">
							<img
								onClick={() => removeFromCart(props.id)}
								src={assets.add_icon_red}
								alt=""
							/>
							<p className="productdisplay-cart-item-no">
								{cartItems[props.id]}
							</p>
							<img
								onClick={() => addToCart(props.id)}
								src={assets.add_icon_green}
								alt=""
							/>
						</div> */}
						{/* <div className="productdisplay-whislist">
							<IoIosHeart />
						</div> */}
					</div>
				</div>

				<div className="productdisplay-item-cart">
					<button>Add to cart</button>
				</div>
				<button>BUY NOW</button>
			</div>
		</div>
	)
}

export default ProductDetails
