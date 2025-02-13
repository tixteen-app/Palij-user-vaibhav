import React, { useState } from "react"
import Cart from "../pages/Cart"

const TestingCart = () => {
	const [test, setTest] = useState("1")
	return (
		<div style={{ paddingTop: "150px" }}>
			{test === "1" && <Cart />}
			{test === "2" && <Checkout />}
			{test === "3" && "3"}
		</div>
	)
}

export default TestingCart
