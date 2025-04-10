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
				name: "Store",
				nav: ""
			}
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

	useEffect(() => {
		// Function to handle scroll event
		const handleScroll = () => {
			if (window.scrollY > 200) {
				setIsBottomSectionVisible(false); // Hide the section after scrolling 200px
			} else {
				setIsBottomSectionVisible(true); // Show the section when scrolled back above 200px
			}
		};

		// Add scroll event listener
		window.addEventListener('scroll', handleScroll);

		// Cleanup on component unmount
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<>
			<div className='main_new_navbar_haldi' >
				<div className='top_new_navbar_scroll_haldi' >
					<MarqueeComponent />
				</div>
				<div className='second_new_navbar_haldi' >
					<div className='search_section_new_nav_haldi'>
						<div className="new_search_input_div" >
							<div>
								<input
									type="text"
									placeholder="Search here..."
									// value={input}
									// onChange={(e) => handleChange(e.target.value)}
									className="new_search_input_fileds"
								/>
							</div>
							<div className='serach_icon_new_nav_haldi' >
								<IoSearch className="search_icon_new_nav" />
							</div>
						</div>
						<div>

						</div>
					</div>
					<div className='logo_section_new_nav_haldi'>
						<div>
							<img className="center-logo m-1" src={assets.newlogo} alt="" onClick={() => navigate("/")} style={{cursor:"pointer"}}  />
						</div>
					</div>
					<div className='cart_section_new_nav_haldi'>
						<div className='cart_section_new_nav_haldi_icons' >
							<div>
								<img src={homeImg.cart} alt="" className="cart-icon m-0"   />
							</div>
							<div>
								<img
									// onClick={() => navigate(isloggedIn ? "/userprofile" : "/palji-login")}
									src={homeImg.profile}
									alt=""
									// style={{ width: "40px", height: "40px", borderRadius: "50%" }}
									className='profile_icon_new_nav_haldi'
								/>
							</div>
						</div>
					</div>
				</div>
				<div>
					{isBottomSectionVisible && (
						<div className='new_nav_bottom_section'>
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
						</div>
					)}
				</div>

			</div>


		</>
	)
}

export default Newnavbar