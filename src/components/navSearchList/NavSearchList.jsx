
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
		clearSearchInput();
	}

	return (
		<div className="nav-search-list" >
			{isLoading ? (
				<div className="loading p-3">Loading...</div>
			) : input && product.length === 0 ? (
				<p className="no-products">No products found</p>
			) : (
				<div className="main_search_div_for_baki" >
					<div className="main_search_title_for_baking" >
						Products
					</div>
					<div className="main_search_result_div_for_baking" >
						{product.map((result, id) => (
							<div
								className="result-item_for_bak"
								key={id}
								onClick={() => handleNavigate(result?._id)}
							>
								<div className="searched_product_details_div_img" >
									<img src={result?.thumbnail} alt={result?.name} className="searched_product_details_img_for_bakingo" />
								</div>
								<div className="searched_product_details_div_info_for_baking" >
									<div className="searched_product_details_div_info_name_for_baking" >{result?.name}</div>
									{/* price */}
									<div className="searched_product_details_div_info_price_for_baking" >
										{result?.size && result?.size.length > 0 && (
											<>
												<span className="Rs_text_homeproduct_search_bakingo"> ₹</span>
												<span className="price_text_homeproduct_serach_bakingo">{result?.size[0].FinalPrice}</span>
												{/* {result?.size[0].price - result?.size[0].FinalPrice > 1 && (
													<>
														<span className="original_text_homeproduct ps-1">₹{result?.size[0].price}</span>
														<span className="discount_text_homeproduct">
															-{Math.round(((result?.size[0].price - result?.size[0].FinalPrice) / product.size[0].price) * 100)}%
														</span>
													</>
												)} */}
											</>
										)}
									</div>
								</div>

							</div>

						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default NavSearchList;
