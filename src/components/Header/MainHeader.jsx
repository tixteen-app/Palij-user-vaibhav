// import React from 'react'
// import PCHeaer from './PCHeaer'

// function MainHeader() {
//   return (
//     <div>
//         <PCHeaer/>
//     </div>
//   )
// }

// export default MainHeader
import React from "react"
// import Navbar from "./navbar";
import PCHeaer from "./PCHeaer"
// import "../../styles/header/mainHeader.css"
import "../../pages/CSS/header/mainHeader.css"

import SmallNavbar from "./MobileHeader"

// import SmallNavbar from "./VerticalNavbar";

function MainHeader() {
	return (
		<>
			<div className="">
				{/* navbar for small screen */}
				<div className="navbar_for_small_scree main_header_for_small_nav">
					<SmallNavbar />
				</div>

				{/* for big screen navbar */}
				<div className="navbar_for_big_screen">
					<PCHeaer />
				</div>
			</div>
		</>
	)
}

export default MainHeader
