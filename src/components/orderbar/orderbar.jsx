import React, { useState } from "react"
import "./orderbar.css"

function Orderbar({ activeOptionName }) {
	// const [activeOption, setActiveOption] = useState('CART');

	// const handleOptionClick = (option) => {
	//   setActiveOption(option);
	// };
	const activeOption = activeOptionName
	return (
		<>
			<div className="main_orderbar_div">
				<div className={activeOption === "CART" ? "active" : ""}>CART</div>
				{/* <div className="orderbar_line"> */}
				<hr className="orderbar-hr" />
				{/* </div> */}
				<div className={activeOption === "CHECKOUT" ? "active" : ""}>
					CHECKOUT
				</div>
				{/* <div className="orderbar_line"> */}
				<hr className="orderbar-hr" />
				{/* </div> */}
				<div className={activeOption === "PAYMENT" ? "active" : ""}>
					PAYMENT
				</div>
			</div>
		</>
	)
}

export default Orderbar
