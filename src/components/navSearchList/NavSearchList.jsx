import React from "react";
import "./navSearchList.css";
import { Link } from "react-router-dom";

const NavSearchList = ({ product, clearSearchInput, input, isLoading }) => {

	return (
		<div className="nav-search-list">
			{/* Close Button */}
			<button className="close-btn" onClick={clearSearchInput}>
				&times;
			</button>

			{isLoading ? (
				<div className="loading p-3">Loading...</div>
			) : input && product.length === 0 ? (
				<p className="no-products">No products found</p>
			) : (
				product.map((result, id) => (
					<Link
						to={`/product/product-details/${result._id}`}
						className="result-item"
						onClick={clearSearchInput}
						key={id}
					>
						<img src={result.thumbnail} alt={result.name} />
						<div className="result-info">
							<h3>{result.name}</h3>
							{/* <p>₹{result.price}</p> */}
							{/* <p>₹{result.price}</p> */}
							<p>₹{result.size[0].FinalPrice}</p>

						</div>
					</Link>
				))
			)}
		</div>
	);
};

export default NavSearchList;
