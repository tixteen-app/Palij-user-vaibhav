// import React, { useContext, useEffect, useRef, useState } from "react"
// import { Link, useLocation, useNavigate } from "react-router-dom"
// import "../../styles/navbar.css"
// import { assets } from "../../assets/assets"
// import { IoSearch } from "react-icons/io5"
// import { homeImg } from "../../assets/home/home"
// import { makeApi } from "../../api/callApi"
// import {
//   subscribeToCartCount,
//   unsubscribeFromCartCount,
// } from "../../utils/productFunction"
// import NavSearchList from "../navSearchList/NavSearchList"

// function Newnavbar() {
//   const [showNavbar, setShowNavbar] = useState(false)
//   const [categoryDropdownVisible, setCategoryDropdownVisible] = useState(false)
//   const [userDatails, setUserDetails] = useState()
//   const [isloggedIn, setIsloggedIn] = useState(false)
//   const [totalQuantities, setTotalQuantities] = useState(0)
//   const [cartUpdated, setCartUpdated] = useState(false)
//   const [cartCount, setCartCount] = useState(0)
//   const [isLoading, setIsLoading] = useState(false);
//   const location = useLocation()
//   const navigate = useNavigate()
//   const [moblieMenu, setMobileMenu] = useState(false)
//   const [openProfile, setOpenProfile] = useState(false)
//   const [products, setProducts] = useState([])
//   const [input, setInput] = useState("")
//   const [allProduct, setAllProduct] = useState([])
//   const [setsearchloading, setSearchLoading] = useState(false)
//   const [allcategories, setAllCategories] = useState([])
//   const [isBottomSectionVisible, setIsBottomSectionVisible] = useState(true);

//   const fetchCategories = async () => {
//     try {
//       const response = await makeApi("/api/get-all-categories", "GET")
//       setAllCategories(response.data.categories)
//     } catch (error) {
//       console.error("Error fetching categories:", error)
//     }
//   }

//   const fetchData = async (value) => {
//     try {
//       setSearchLoading(true);
//       const response = await makeApi(
//         `/api/get-all-products?perPage=1550&page=1`,
//         "GET"
//       )
//       const getProduct = response.data.products
//       const result = getProduct.filter((product) => {
//         return (
//           value &&
//           product &&
//           product.name &&
//           product.name.toLowerCase().includes(value.toLowerCase())
//         )
//       })
//       setAllProduct(getProduct)
//       setProducts(result)
//     } catch (error) {
//       console.error("Error fetching products:", error)
//     } finally {
//       setSearchLoading(false);
//     }
//   }

//   const clearSearchInput = () => {
//     setInput("")
//     setProducts([])
//   }

//   const handleChange = (value) => {
//     setInput(value)
//     fetchData(value)
//   }

//   const toggleMenu = () => {
//     setMobileMenu(!moblieMenu)
//   }

//   const closeMenu = () => {
//     setMobileMenu(false)
//   }

//   const toggleCategoryDropdown = () => {
//     setCategoryDropdownVisible(!categoryDropdownVisible)
//   }

//   useEffect(() => {
//     const token = localStorage.getItem("token")
//     setIsloggedIn(!!token)

//     const timeoutId = setTimeout(() => {
//       setShowNavbar(true)
//     }, 1000)

//     return () => clearTimeout(timeoutId)
//   }, [localStorage.getItem("token")])

//   useEffect(() => {
//     window.scrollTo(0, 0)
//   }, [location.pathname])

//   const searchRef = useRef(null)

//   const handleClickOutside = (event) => {
//     if (searchRef.current && !searchRef.current.contains(event.target)) {
//       setInput("")
//       setProducts([])
//     }
//   }

//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside)
//     return () => document.removeEventListener("mousedown", handleClickOutside)
//   }, [])

//   useEffect(() => {
//     const updateCartCount = (count) => {
//       setCartCount(count);  // This will directly update the cart count
//     }

//     subscribeToCartCount(updateCartCount);  // Subscribe to cart count changes

//     return () => {
//       unsubscribeFromCartCount(updateCartCount);  // Unsubscribe on cleanup
//     }
//   }, []);

//   const fetchUserDetail = async () => {
//     try {
//       setIsLoading(true);
//       const responce = await makeApi("/api/my-profile", "GET")
//       setUserDetails(responce.data.user)
//     } catch (error) {
//       console.log(error)
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   useEffect(() => {
//     fetchUserDetail()
//     fetchCategories()
//   }, [])

//   const handleCategoryClick = (categoryId) => {
//     if (!categoryId || categoryId === "") {
//       navigate(`/product/all-products`);
//       return;
//     }
//     navigate(`/product/all-products?category=${categoryId}`);
//   };

//   // Format categories for navigation
//   const formatCategories = () => {
//     // Add the "Store" category first
//     const formatted = [
//       {
//         name: "Store",
//         nav: ""
//       }
//     ];

//     // Add other categories from API
//     if (allcategories && allcategories.length > 0) {
//       allcategories.forEach(category => {
//         formatted.push({
//           name: category.name.toUpperCase(),
//           nav: category._id
//         });
//       });
//     }

//     return formatted;
//   };

//   useEffect(() => {
//     // Function to handle scroll event
//     const handleScroll = () => {
//       if (window.scrollY > 200) {
//         setIsBottomSectionVisible(false); // Hide the section after scrolling 200px
//       } else {
//         setIsBottomSectionVisible(true); // Show the section when scrolled back above 200px
//       }
//     };

//     // Add scroll event listener
//     window.addEventListener('scroll', handleScroll);

//     // Cleanup on component unmount
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   return (
//     <>
//       <div className='new_nav_main_div'>
//         <div className='new_nav_top_section'>
//           <div className='new_navar_left_logo' onClick={() => navigate("/")}>
//             <img
//               className="center-logo m-1"
//               src={assets.newlogo}
//               alt=""
//             />
//           </div>
//           <div className='new_navar_center_searchbar'>
// <div className="new_search_input_div" >
//   <IoSearch className="search_icon_new_nav" />
//   <input 
//     type="text" 
//     placeholder="Search"
//     value={input}
//     onChange={(e) => handleChange(e.target.value)}
//     className="new_search_input_fileds" 
//   />
// </div>
//             {input && (
//               <div className="search-list-result">
//                 <NavSearchList
//                   product={products}
//                   clearSearchInput={clearSearchInput}
//                   input={input}
//                   isLoading={setsearchloading}
//                 />
//               </div>
//             )}
//           </div>
//           <div className='new_navar_right_funciton'>
//             <div>
//               <Link to={isloggedIn ? "/cart" : "/palji-login"}>
//                 <div className="nav-cart p-0">
//                   {isloggedIn === true && <span className="cart-no">{cartCount}</span>}
//                   <img src={homeImg.cart} alt="" className="cart-icon m-0" />
//                 </div>
//               </Link>
//             </div>
//             <div>
//               {userDatails?.userImage ? (
//                 <img
//                   src={userDatails?.userImage}
//                   alt=""
//                   style={{ width: "40px", height: "40px", borderRadius: "50%" }}
//                   onClick={() => navigate(isloggedIn ? "/userprofile" : "/palji-login")}
//                 />
//               ) : (
// <img
//   onClick={() => navigate(isloggedIn ? "/userprofile" : "/palji-login")}
//   src={homeImg.profile}
//   alt=""
//   style={{ width: "40px", height: "40px", borderRadius: "50%" }}
// />
//               )}
//             </div>
//           </div>
//         </div>
// {isBottomSectionVisible && (
//   <div className='new_nav_bottom_section'>
//     <div className='nav_cat_list'>
//       {formatCategories().map((item, index) => {
//         return (
//           <div className='nav_cat_list_item' key={index}>
//             <div 
//               className='nav_nav_cat_options' 
//               onClick={() => handleCategoryClick(item.nav)}
//             >
//               {item.name}
//             </div>
//           </div>
//         )
//       })}
//     </div>
//   </div>
// )}
//       </div>
//     </>
//   )
// }

// export default Newnavbar

import React, { useContext, useEffect, useRef, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import "../../styles/navbar.css"
import { assets } from "../../assets/assets"
import { IoSearch } from "react-icons/io5"
import { homeImg } from "../../assets/home/home"
import { makeApi } from "../../api/callApi"
import {
	subscribeToCartCount,
	unsubscribeFromCartCount,
} from "../../utils/productFunction"
import NavSearchList from "../navSearchList/NavSearchList"
import MarqueeComponent from "../SecondHomePage/Marquee/Marquee"

function Newnavbar() {
	const [showNavbar, setShowNavbar] = useState(false)
	const [categoryDropdownVisible, setCategoryDropdownVisible] = useState(false)
	const [userDatails, setUserDetails] = useState()
	const [isloggedIn, setIsloggedIn] = useState(false)
	const [totalQuantities, setTotalQuantities] = useState(0)
	const [cartUpdated, setCartUpdated] = useState(false)
	const [cartCount, setCartCount] = useState(0)
	const [isLoading, setIsLoading] = useState(false);
	const location = useLocation()
	const navigate = useNavigate()
	const [moblieMenu, setMobileMenu] = useState(false)
	const [openProfile, setOpenProfile] = useState(false)
	const [products, setProducts] = useState([])
	const [input, setInput] = useState("")
	const [allProduct, setAllProduct] = useState([])
	const [setsearchloading, setSearchLoading] = useState(false)
	const [allcategories, setAllCategories] = useState([])
	const [isBottomSectionVisible, setIsBottomSectionVisible] = useState(true);

	const fetchCategories = async () => {
		try {
			const response = await makeApi("/api/get-all-categories", "GET")
			setAllCategories(response.data.categories)
		} catch (error) {
			console.error("Error fetching categories:", error)
		}
	}

	const fetchData = async (value) => {
		try {
			setSearchLoading(true);
			const response = await makeApi(
				`/api/get-all-products?perPage=1550&page=1`,
				"GET"
			)
			const getProduct = response.data.products
			const result = getProduct.filter((product) => {
				return (
					value &&
					product &&
					product.name &&
					product.name.toLowerCase().includes(value.toLowerCase())
				)
			})
			setAllProduct(getProduct)
			setProducts(result)
		} catch (error) {
			console.error("Error fetching products:", error)
		} finally {
			setSearchLoading(false);
		}
	}

	const clearSearchInput = () => {
		setInput("")
		setProducts([])
	}

	const handleChange = (value) => {
		setInput(value)
		fetchData(value)
	}

	const toggleMenu = () => {
		setMobileMenu(!moblieMenu)
	}

	const closeMenu = () => {
		setMobileMenu(false)
	}

	const toggleCategoryDropdown = () => {
		setCategoryDropdownVisible(!categoryDropdownVisible)
	}

	useEffect(() => {
		const token = localStorage.getItem("token")
		setIsloggedIn(!!token)

		const timeoutId = setTimeout(() => {
			setShowNavbar(true)
		}, 1000)

		return () => clearTimeout(timeoutId)
	}, [localStorage.getItem("token")])

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [location.pathname])

	const searchRef = useRef(null)

	const handleClickOutside = (event) => {
		if (searchRef.current && !searchRef.current.contains(event.target)) {
			setInput("")
			setProducts([])
		}
	}

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside)
		return () => document.removeEventListener("mousedown", handleClickOutside)
	}, [])

	useEffect(() => {
		const updateCartCount = (count) => {
			setCartCount(count);  // This will directly update the cart count
		}

		subscribeToCartCount(updateCartCount);  // Subscribe to cart count changes

		return () => {
			unsubscribeFromCartCount(updateCartCount);  // Unsubscribe on cleanup
		}
	}, []);

	const fetchUserDetail = async () => {
		try {
			setIsLoading(true);
			const responce = await makeApi("/api/my-profile", "GET")
			setUserDetails(responce.data.user)
		} catch (error) {
			console.log(error)
		} finally {
			setIsLoading(false);
		}
	}

	useEffect(() => {
		fetchUserDetail()
		fetchCategories()
	}, [])

	const handleCategoryClick = (categoryId) => {
		if (!categoryId || categoryId === "") {
			navigate(`/product/all-products`);
			return;
		}
		navigate(`/product/all-products?category=${categoryId}`);
	};

	// Format categories for navigation
	const formatCategories = () => {
		// Add the "Store" category first
		const formatted = [
			{
				name: "STORE",
				nav: ""
			},
		];

		// Add other categories from API
		if (allcategories && allcategories.length > 0) {
			allcategories.forEach(category => {
				formatted.push({
					name: category.name.toUpperCase(),
					nav: category._id
				});
			});
		}

		return formatted;
	};



	return (
		<>
		<div className="main_div_new_haldi_ram">
			<div className='main_new_navbar_haldi_ram' >
				<div className="top_section_haldiram" >
					<div className="left_section_new_nav_haldi_ram" >
						<div>
							<img className="center-logo m-1" src={assets.newlogo} alt="" onClick={() => navigate("/")} style={{ cursor: "pointer" }} />
						</div>
					</div>
					<div className="right_section_new_nav_haldi_ram" >
						<div className="right_top_section_haldi_ram" >
							<div className="right_search_section_haldi_Ram" >
								<div className='serach_icon_new_nav_haldi' >
									<IoSearch className="search_icon_new_nav" />
								</div>
								<div className="new_search_input_div_haldi_ram" >
									<input
										type="text"
										placeholder="Search here..."
										value={input}
										onChange={(e) => handleChange(e.target.value)}
										className="new_search_input_fileds"
									/>
								</div>
							</div>
							<div className="right_cart_section_haldi_ram" >
								<div className='cart_section_new_nav_haldi_icons' >
									<div>
										{/* <img
											src={homeImg.cart}
											alt=""
											className="cart-icon m-0"
										/> */}
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z" stroke="#1E1E1E" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3 6H21" stroke="#1E1E1E" stroke-linecap="round" stroke-linejoin="round"></path><path d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10" stroke="#1E1E1E" stroke-linecap="round" stroke-linejoin="round"></path></svg>
									</div>
								</div>

							</div>
						</div>


						<div className="right_bottom_section_haldi_ram" >
							{/* show categories */}
							<div className='nav_cat_list'>
								{formatCategories().map((item, index) => {
									return (
										<div className='nav_cat_list_item' key={index}>
											<div
												className='nav_nav_cat_options'
												onClick={() => handleCategoryClick(item.nav)}
											>
												{item.name}
											</div>
										</div>
									)
								})}
							</div>
							{/* user profile  */}
							<div className="right_profile_section_haldi_ram" >
								<div>
									<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="#1E1E1E" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="#1E1E1E" stroke-linecap="round" stroke-linejoin="round"></path></svg>
								</div>
							</div>
						</div>
					</div>

				</div>

				<div className="new_nav_bottom_section_haldi_ram" >
					<MarqueeComponent />
				</div>
			</div>
		</div>
		</>
	)
}

export default Newnavbar