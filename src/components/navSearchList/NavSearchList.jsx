
// import React from "react"
// import "./navSearchList.css"
// import { Link } from "react-router-dom"

// const NavSearchList = ({ product, clearSearchInput, input }) => {
// 	return (
// 		<div className="nav-search-list">
// 			<div className="nav-result-list">
// 				{input && product.length === 0 ? (
// 					<p className="no-products">Product is not there</p>
// 				) : (
// 					product.map((result, id) => (
// 						<Link
// 							to={`/product/product-details/${result._id}`}
// 							className="result-list"
// 							onClick={clearSearchInput}
// 							key={id}
// 						>
// 							<img
// 								src={result.thumbnail}
// 								alt={result.name}
// 							/>
// 							<h1>{result.name}</h1>
// 						</Link>
// 					))
// 				)}
// 			</div>
// 		</div>
// 	)
// }


// export default NavSearchList




// import React from "react";
// import "./navSearchList.css";
// import { Link } from "react-router-dom";

// const NavSearchList = ({ product, clearSearchInput, input, isLoading }) => {
// 	return (
// 		<div className="nav-search-list">
// 			{isLoading ? (
// 				<div className="loading">Loading...</div>
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
// 							<h3>{result.name}</h3>
// 							<p>₹{result.price}</p>
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
			<button className="close-btn" onClick={clearSearchInput}>
				&times;
			</button>

			{isLoading ? (
				<div className="loading">Loading...</div>
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
