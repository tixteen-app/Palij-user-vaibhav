// import React from "react";
// import "./navSearchList.css";
// import { Link } from "react-router-dom";

// const NavSearchList = ({ product, clearSearchInput, input, isLoading }) => {

// 	return (
// 		<div className="nav-search-list"> 
// 			{/* Close Button */} 
// 			<button className="close-btn" onClick={clearSearchInput}>
// 				&times;
// 			</button>

// 			{isLoading ? (
// 				<div className="loading p-3">Loading...</div>
// 			) : input && product.length === 0 ? (
// 				<p className="no-products">No products found</p>
// 			) : (
// 				product.map((result, id) => (
// 					<Link
// 						to={`/product/product-details/${result._id}`}
// 						className="result-item"
// 						onClick={clearSearchInput}
// 						key={id}
// 					>
// 						<img src={result.thumbnail} alt={result.name} />
// 						<div className="result-info">
// 							<div>{result.name}</div>
// 							<p>₹{result.size[0].FinalPrice}</p>
// 						</div>
// 					</Link>
// 				))
// 			)}
// 		</div>
// 	);
// };

// export default NavSearchList;


import React, { useEffect, useState } from "react";
import "./navSearchList.css";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCart, removeFromCart } from "../../utils/productFunction";

const NavSearchList = ({ product, clearSearchInput, input, isLoading }) => {
		const navigate = useNavigate();
	
	const [cartItems, setCartItems] = useState([]);
	const [quantityLoading, setQuantityLoading] = useState({});
	const [IsLogin, setIsLogin] = useState(false);
	const [showPopup, setShowPopup] = useState(false);
	const [fetchCartLoader, setFetchCartLoader] = useState();
	const [productLoaders, setProductLoaders] = useState({});
	const [completeCart, setCompleteCart] = useState([]);
	const [AddTocartLoader, setAddTocartLoader] = useState({});


	useEffect(() => {
		fetchCart(setCartItems);
	}, []);
	useEffect(() => {
		const token = localStorage.getItem("token");
		setIsLogin(!!token);
	}, []);

	const fetchCartItems = async () => {
		try {
			await fetchCart(setCartItems, setCompleteCart, setAddTocartLoader);
		} catch (error) {
			console.error("Error fetching cart items:", error);
		}
	};

	const handleIncreaseQuantity = async (productId, size) => {
		if (!IsLogin) {
			console.log("====1")
			setShowPopup(true);
			return;
		}
		const cartItem = cartItems.find(item => item.productId === productId && item.size === size._id);
		try {
			setQuantityLoading(prev => ({ ...prev, [productId]: true }));
			await addToCart(productId, setIsLogin, setShowPopup, fetchCartItems, setCartItems, setProductLoaders, size._id);
		} catch (error) {
			console.error("Error increasing quantity:", error);
		} finally {
			setQuantityLoading(prev => ({ ...prev, [productId]: false }));
		}
	};

	const handleDecreaseQuantity = async (productId, size) => {
		const cartItem = cartItems.find(item => item.productId === productId && item.size === size._id);
		if (cartItem && cartItem.quantity > 0) {
			try {
				setQuantityLoading(prev => ({ ...prev, [productId]: true }));
				await removeFromCart(productId, setProductLoaders, setCartItems, fetchCartItems, size._id);
			} catch (error) {
				console.error("Error decreasing quantity:", error);
			} finally {
				setQuantityLoading(prev => ({ ...prev, [productId]: false }));
			}
		}
	};

	function handleNavigate(id) {
        navigate(`/product/product-details/${id}`);
    }

	return (
		<div className="nav-search-list">
			{/* Close Button */}
			{/* <button className="close-btn" onClick={clearSearchInput}>
				&times;
			</button> */}

			{isLoading ? (
				<div className="loading p-3">Loading...</div>
			) : input && product.length === 0 ? (
				<p className="no-products">No products found</p>
			) : (
				<div className="main_search_result_div" >
					{product.map((result, id) => (
						<div
							className="result-item"
							key={id}
						>

							<div className="searched_product_details_div" >
								<div className="searched_product_details_div_img" >
									<img src={result.thumbnail} alt={result.name} className="searched_product_details_img" />
								</div>
								<div className="searched_product_details_div_info " >
									<div className="searched_product_details_div_info_name" >
										{/* <div>{result.name}</div> */}
										<div>{result.name.split(' ').slice(0, 2).join(' ')}</div>

										<div>
											{result.size.length > 0 &&
												<>
													₹{result.size[0].FinalPrice}
												</>
											}
										</div>
									</div>
									<div className="searched_product_details_div_info_btn" >
										<div className="searched_product_details_div_info_btn_view_for_desk" onClick={() => handleNavigate(result._id)} >View</div>

										<div className="searched_product_details_div_info_btn_cart_for_desk " >
											{cartItems.some(cartItem => cartItem.productId === result._id && cartItem.size === result.size[0]._id) ? (
												<div className="homeproduct_addtocart_and_quantity_div_for_desktop homeproduct_addtocart_and_quantity_div_for_Search ">
													<div>
														<svg
															xmlns="http://www.w3.org/2000/svg"
															onClick={() => handleDecreaseQuantity(result._id, result.size[0])}

															fill="currentColor"
															className="bi bi-dash text-white search_bar_add_button"
															style={{ cursor: "pointer" }}
															viewBox="0 0 16 16"
														>
															<path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
														</svg>
													</div>

													<div style={{ minWidth: "20px", textAlign: "center" }}>
														{quantityLoading[result._id] ? (
															<div >
																<div className="loader_for_home_page loader_for_search_bar "></div>
															</div>
														) : (
															<div className="" >
																{cartItems.find(cartItem => cartItem.productId === result._id && cartItem.size === result.size[0]._id)?.quantity || 0}
															</div>
														)}
													</div>

													<div>
														<svg
															xmlns="http://www.w3.org/2000/svg"
															onClick={() => handleIncreaseQuantity(result._id, result.size[0])}
															fill="currentColor"
															className="bi bi-plus text-white search_bar_add_button"
															style={{ cursor: "pointer" }}
															viewBox="0 0 16 16"
														>
															<path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
														</svg>
													</div>
												</div>
											) : (
												<div className="w-100" >

													<div
														className="searched_product_details_div_info_btn_cart"
														onClick={() => handleIncreaseQuantity(result._id, result.size[0])}
													>
														{quantityLoading[result._id] ? (
															<div className="loader_for_home_page"></div>
														) : (
															"ADD"
														)}
													</div>
												</div>
											)}

										</div>
									</div>
								</div>
							</div>

						</div>

					))}
				</div>
			)}
		</div>
	);
};

export default NavSearchList;
