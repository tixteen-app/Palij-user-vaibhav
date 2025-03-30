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


import React from "react";
import "./navSearchList.css";
import { Link } from "react-router-dom";

const NavSearchList = ({ product, clearSearchInput, input, isLoading }) => {

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
						<Link
							to={`/product/product-details/${result._id}`}
							className="result-item"
							onClick={clearSearchInput}
							key={id}
						>

							<div className="searched_product_details_div" >
								<div className="searched_product_details_div_img" >
									<img src={result.thumbnail} alt={result.name} className="searched_product_details_img" />
								</div>
								<div className="searched_product_details_div_info" >
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
										<div className="searched_product_details_div_info_btn_view" >View</div>
										<div className="searched_product_details_div_info_btn_cart" >Add to Cart</div>
									</div>
								</div>
							</div>
						</Link>
					))}
				</div>
			)}
		</div>
	);
};

export default NavSearchList;
