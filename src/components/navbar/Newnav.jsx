
// import React, { useContext, useEffect, useRef, useState } from "react"
// import { Link, useLocation, useNavigate } from "react-router-dom"
// import "../../styles/navbar.css"
// import { assets } from "../../assets/assets"
// import { IoSearch } from "react-icons/io5"
// import { homeImg } from "../../assets/home/home"
// import { makeApi } from "../../api/callApi"
// import {
// 	subscribeToCartCount,
// 	unsubscribeFromCartCount,
// } from "../../utils/productFunction"
// import NavSearchList from "../navSearchList/NavSearchList"
// import MarqueeComponent from "../SecondHomePage/Marquee/Marquee"

// function Newnavbar() {
// 	const [showNavbar, setShowNavbar] = useState(false)
// 	const [categoryDropdownVisible, setCategoryDropdownVisible] = useState(false)
// 	const [userDatails, setUserDetails] = useState()
// 	const [isloggedIn, setIsloggedIn] = useState(false)
// 	const [totalQuantities, setTotalQuantities] = useState(0)
// 	const [cartUpdated, setCartUpdated] = useState(false)
// 	const [cartCount, setCartCount] = useState(0)
// 	const [isLoading, setIsLoading] = useState(false);
// 	const location = useLocation()
// 	const navigate = useNavigate()
// 	const [moblieMenu, setMobileMenu] = useState(false)
// 	const [openProfile, setOpenProfile] = useState(false)
// 	const [products, setProducts] = useState([])
// 	const [input, setInput] = useState("")
// 	const [allProduct, setAllProduct] = useState([])
// 	const [setsearchloading, setSearchLoading] = useState(false)
// 	const [allcategories, setAllCategories] = useState([])
// 	const [isBottomSectionVisible, setIsBottomSectionVisible] = useState(true);

// 	const fetchCategories = async () => {
// 		// Check if categories are in localStorage and still valid (less than 2 minutes old)
// 		const storedCategories = localStorage.getItem('categories');
// 		const storedTimestamp = localStorage.getItem('categoriesTimestamp');
// 		const currentTime = new Date().getTime(); // Current time in milliseconds

// 		// If categories are in localStorage and within 2 minutes old, use them
// 		if (storedCategories && storedTimestamp && (currentTime - storedTimestamp) < 2 * 60 * 1000) {
// 			setAllCategories(JSON.parse(storedCategories));
// 			console.log("Categories loaded from localStorage.");
// 		} else {
// 			// Otherwise, fetch from the API
// 			try {
// 				const response = await makeApi("/api/get-all-categories", "GET");
// 				const categories = response.data.categories;

// 				// Store the fetched categories in localStorage with the current timestamp
// 				localStorage.setItem('categories', JSON.stringify(categories));
// 				localStorage.setItem('categoriesTimestamp', currentTime.toString());

// 				setAllCategories(categories);
// 				console.log("Categories fetched from API and saved to localStorage.");
// 			} catch (error) {
// 				console.error("Error fetching categories:", error);
// 			}
// 		}
// 	};

// 	const fetchData = async (value) => {
// 		try {
// 			setSearchLoading(true);
// 			const response = await makeApi(
// 				`/api/get-all-products?perPage=1550&page=1`,
// 				"GET"
// 			)
// 			const getProduct = response.data.products
// 			const result = getProduct.filter((product) => {
// 				return (
// 					value &&
// 					product &&
// 					product.name &&
// 					product.name.toLowerCase().includes(value.toLowerCase())
// 				)
// 			})
// 			setAllProduct(getProduct)
// 			setProducts(result)
// 		} catch (error) {
// 			console.error("Error fetching products:", error)
// 		} finally {
// 			setSearchLoading(false);
// 		}
// 	}

// 	const clearSearchInput = () => {
// 		setInput("")
// 		setProducts([])
// 	}

// 	const handleChange = (value) => {
// 		setInput(value)
// 		fetchData(value)
// 	}

// 	const toggleMenu = () => {
// 		setMobileMenu(!moblieMenu)
// 	}

// 	const closeMenu = () => {
// 		setMobileMenu(false)
// 	}

// 	const toggleCategoryDropdown = () => {
// 		setCategoryDropdownVisible(!categoryDropdownVisible)
// 	}

// 	useEffect(() => {
// 		const token = localStorage.getItem("token")
// 		setIsloggedIn(!!token)

// 		const timeoutId = setTimeout(() => {
// 			setShowNavbar(true)
// 		}, 1000)

// 		return () => clearTimeout(timeoutId)
// 	}, [localStorage.getItem("token")])

// 	useEffect(() => {
// 		window.scrollTo(0, 0)
// 	}, [location.pathname])

// 	const searchRef = useRef(null)

// 	const handleClickOutside = (event) => {
// 		if (searchRef.current && !searchRef.current.contains(event.target)) {
// 			setInput("")
// 			setProducts([])
// 		}
// 	}

// 	useEffect(() => {
// 		document.addEventListener("mousedown", handleClickOutside)
// 		return () => document.removeEventListener("mousedown", handleClickOutside)
// 	}, [])

// 	useEffect(() => {
// 		const updateCartCount = (count) => {
// 			setCartCount(count);  // This will directly update the cart count
// 		}
// 		subscribeToCartCount(updateCartCount);  // Subscribe to cart count changes
// 		return () => {
// 			unsubscribeFromCartCount(updateCartCount);  // Unsubscribe on cleanup
// 		}
// 	}, []);

// 	const fetchUserDetail = async () => {
// 		try {
// 			setIsLoading(true);
// 			const responce = await makeApi("/api/my-profile", "GET")
// 			setUserDetails(responce.data.user)
// 		} catch (error) {
// 			console.log(error)
// 		} finally {
// 			setIsLoading(false);
// 		}
// 	}

// 	useEffect(() => {
// 		fetchUserDetail()
// 		fetchCategories()
// 	}, [])

// 	const handleCategoryClick = (categoryId) => {
// 		if (!categoryId || categoryId === "") {
// 			navigate(`/product/all-products`);
// 			return;
// 		}
// 		navigate(`/product/all-products?category=${categoryId}`);
// 	};

// 	const formatCategories = () => {
// 		// First try to get categories from localStorage if available
// 		const cachedCategories = localStorage.getItem('cachedCategories');
// 		let categoriesToUse = allcategories;

// 		if (cachedCategories) {
// 			try {
// 				const parsedCategories = JSON.parse(cachedCategories);
// 				// Only use cached categories if they're an array and not empty
// 				if (Array.isArray(parsedCategories) && parsedCategories.length > 0) {
// 					categoriesToUse = parsedCategories;
// 				}
// 			} catch (error) {
// 				console.error('Error parsing cached categories:', error);
// 			}
// 		}

// 		// Add the "Store" category first
// 		const formatted = [
// 			{
// 				name: "STORE",
// 				nav: ""
// 			},
// 		];

// 		const predefinedOrder = [
// 			"Shop",
// 			"PREMIUM COOKIES",
// 			"Savouries",
// 			"Cakes",
// 			"GIFT HAMPERS"
// 		];

// 		// Add the categories from API according to predefined order
// 		if (categoriesToUse && categoriesToUse.length > 0) {
// 			// Sort the categories based on predefined order
// 			predefinedOrder.forEach((categoryName) => {
// 				const category = categoriesToUse.find(cat =>
// 					cat.name.toUpperCase() === categoryName.toUpperCase()
// 				);
// 				if (category) {
// 					formatted.push({
// 						name: category.name.toUpperCase(),
// 						nav: category._id
// 					});
// 				}
// 			});

// 			// Add any remaining categories not in predefined order (optional)
// 			const remainingCategories = categoriesToUse.filter(cat =>
// 				!predefinedOrder.some(name =>
// 					name.toUpperCase() === cat.name.toUpperCase()
// 				)
// 			);

// 			remainingCategories.forEach(category => {
// 				formatted.push({
// 					name: category.name.toUpperCase(),
// 					nav: category._id
// 				});
// 			});
// 		}

// 		return formatted;
// 	};

// 	const handleProfileClick = () => {
// 		if (isloggedIn) {
// 			navigate("/userprofile");
// 		} else {
// 			navigate("/palji-login");
// 		}
// 	};
// 	const handleCartClick = () => {
// 		if (isloggedIn) {
// 			navigate("/cart");
// 		} else {
// 			navigate("/palji-login");
// 		}
// 	};


// 	useEffect(() => {
// 		const handleClickOutside = (event) => {
// 		  const mobileMenu = document.querySelector('.mobile-menu');
// 		  const menuIcon = document.querySelector('.mobile-menu-icon');

// 		  // Check if click is outside mobile menu and not on the menu icon
// 		  if (moblieMenu && 
// 			  !mobileMenu.contains(event.target) && 
// 			  !menuIcon.contains(event.target)) {
// 			closeMenu();
// 		  }
// 		};

// 		// Add event listener when mobile menu is open
// 		if (moblieMenu) {
// 		  document.addEventListener('mousedown', handleClickOutside);
// 		}

// 		return () => {
// 		  document.removeEventListener('mousedown', handleClickOutside);
// 		};
// 	  }, [moblieMenu]);

// 	  const mobileMenuRef = useRef(null);

// 	return (
// 		<>
// 			<div className="main_div_new_haldi_ram">
// 				<div className='main_new_navbar_haldi_ram' >
// 					<div className="top_section_haldiram" >
// 						<div className="left_section_new_nav_haldi_ram" >
// 							<div>
// 								<img
// 									className="center-logo m-1"
// 									src={assets.newlogo}
// 									alt=""
// 									onClick={() => navigate("/")}
// 									style={{ cursor: "pointer" }}
// 								/>
// 							</div>
// 						</div>
// 						<div className="right_section_new_nav_haldi_ram" >
// 							<div className="right_top_section_haldi_ram" >
// 								<div className="right_search_section_haldi_Ram mobile-hide" ref={searchRef}>
// 									<div className='serach_icon_new_nav_haldi' >
// 										<IoSearch className="search_icon_new_nav" />
// 									</div>
// 									<div className="new_search_input_div_haldi_ram" >
// 										<input
// 											type="text"
// 											placeholder="Search here..."
// 											value={input}
// 											onChange={(e) => handleChange(e.target.value)}
// 											className="new_search_input_fileds"
// 										/>
// 									</div>
// 									{input && (
// 										<div className="search-list-result">
// 											<NavSearchList
// 												product={products}
// 												clearSearchInput={clearSearchInput}
// 												input={input}
// 												isLoading={setsearchloading}
// 											/>
// 										</div>
// 									)}
// 								</div>
// 								<div className="right_cart_section_haldi_ram" >
// 									<div
// 										className='cart_section_new_nav_haldi_icons'
// 										onClick={handleCartClick}
// 										style={{ cursor: "pointer", position: "relative" }}
// 									>
// 										<div>
// 											<svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
// 												<path d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z" stroke="#1E1E1E" strokeLinecap="round" strokeLinejoin="round"></path>
// 												<path d="M3 6H21" stroke="#1E1E1E" strokeLinecap="round" strokeLinejoin="round"></path>
// 												<path d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10" stroke="#1E1E1E" strokeLinecap="round" strokeLinejoin="round"></path>
// 											</svg>
// 											{isloggedIn && cartCount > 0 && (
// 												<span className="cart-count-badge">{cartCount}</span>
// 											)}
// 										</div>
// 									</div>
// 									<div 
// 										className="mobile-profile-icon" 
// 										onClick={handleProfileClick}
// 										style={{ cursor: "pointer" }}
// 									>
// 										{userDatails?.userImage ? (
// 											<img
// 												src={userDatails.userImage}
// 												alt="Profile"
// 												className="user_image_hald_ram_header"
// 											/>
// 										) : (
// 											<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
// 												<path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="#1E1E1E" strokeLinecap="round" strokeLinejoin="round"></path>
// 												<path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="#1E1E1E" strokeLinecap="round" strokeLinejoin="round"></path>
// 											</svg>
// 										)}
// 									</div>
// 								</div>
// 								<div className="mobile-menu-icon" onClick={toggleMenu}>
// 									<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
// 										<path d="M3 12H21" stroke="#1E1E1E" strokeLinecap="round" strokeLinejoin="round"></path>
// 										<path d="M3 6H21" stroke="#1E1E1E" strokeLinecap="round" strokeLinejoin="round"></path>
// 										<path d="M3 18H21" stroke="#1E1E1E" strokeLinecap="round" strokeLinejoin="round"></path>
// 									</svg>
// 								</div>
// 							</div>

// 							<div className="right_bottom_section_haldi_ram desktop-nav" >
// 								{/* show categories */}
// 								<div className='nav_cat_list'>
// 									{formatCategories().map((item, index) => {
// 										const displayName = item.name === "PREMIUM COOKIES" ? "COOKIES" : item.name;

// 										return (
// 											<div className='nav_cat_list_item' key={index}>
// 												<div
// 													className='nav_nav_cat_options'
// 													onClick={() => handleCategoryClick(item.nav)}
// 													style={{ cursor: "pointer" }}
// 												>
// 													{displayName}  
// 												</div>
// 											</div>
// 										)
// 									})}
// 								</div>
// 								{/* user profile  */}
// 								<div
// 									className="right_profile_section_haldi_ram"
// 									onClick={handleProfileClick}
// 									style={{ cursor: "pointer" }}
// 								>
// 									<div>
// 										{userDatails?.userImage ? (
// 											<img
// 												src={userDatails.userImage}
// 												alt="Profile"
// 												className="user_image_hald_ram_header"
// 											/>
// 										) : (
// 											<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
// 												<path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="#1E1E1E" strokeLinecap="round" strokeLinejoin="round"></path>
// 												<path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="#1E1E1E" strokeLinecap="round" strokeLinejoin="round"></path>
// 											</svg>
// 										)}
// 									</div>
// 								</div>
// 							</div>
// 						</div>
// 					</div>

// 					{/* Mobile Menu */}
// 					<div className={`mobile-menu ${moblieMenu ? 'open' : ''}`} ref={mobileMenuRef}>
// 							<div className="mobile-top-section">
// 								<div className="mobile-category-text-navbar" >
// 									All Categories
// 								</div>
// 								<div onClick={closeMenu} >
// 									<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-icon-P1l"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
// 								</div>
// 							</div>
// 						<div className="mobile-menu-content">
// 							<div className="mobile-nav-items">
// 								{formatCategories().map((item, index) => {
// 									const displayName = item.name === "PREMIUM COOKIES" ? "COOKIES" : item.name;
// 									return (
// 										<div
// 											className="mobile-nav-item mobile_category_section"
// 											key={index}
// 											onClick={() => {
// 												handleCategoryClick(item.nav);
// 												closeMenu();
// 											}}
// 										>
// 											<div>
// 											{displayName}
// 											</div>

// 											<div>
// 											<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
// 											</div>
// 										</div>
// 									)
// 								})}
// 							</div>
// 						</div>
// 					</div>

// 					<div className="new_nav_bottom_section_haldi_ram" >
// 						<MarqueeComponent />
// 					</div>
// 				</div>
// 			</div>
// 		</>
// 	)
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

	// Profile sidebar timeout reference
	const profileTimeoutRef = useRef(null);

	const fetchCategories = async () => {
		const storedCategories = localStorage.getItem('categories');
		const storedTimestamp = localStorage.getItem('categoriesTimestamp');
		const currentTime = new Date().getTime();

		if (storedCategories && storedTimestamp && (currentTime - storedTimestamp) < 2 * 60 * 1000) {
			setAllCategories(JSON.parse(storedCategories));
		} else {
			try {
				const response = await makeApi("/api/get-all-categories", "GET");
				const categories = response.data.categories;
				localStorage.setItem('categories', JSON.stringify(categories));
				localStorage.setItem('categoriesTimestamp', currentTime.toString());
				setAllCategories(categories);
			} catch (error) {
				console.error("Error fetching categories:", error);
			}
		}
	};

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
			setCartCount(count);
		}
		subscribeToCartCount(updateCartCount);
		return () => {
			unsubscribeFromCartCount(updateCartCount);
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

	const formatCategories = () => {
		const cachedCategories = localStorage.getItem('cachedCategories');
		let categoriesToUse = allcategories;

		if (cachedCategories) {
			try {
				const parsedCategories = JSON.parse(cachedCategories);
				if (Array.isArray(parsedCategories) && parsedCategories.length > 0) {
					categoriesToUse = parsedCategories;
				}
			} catch (error) {
				console.error('Error parsing cached categories:', error);
			}
		}

		const formatted = [
			{
				name: "STORE",
				nav: ""
			},
		];

		const predefinedOrder = [
			"Shop",
			"PREMIUM COOKIES",
			"Savouries",
			"Cakes",
			"GIFT HAMPERS"
		];

		if (categoriesToUse && categoriesToUse.length > 0) {
			predefinedOrder.forEach((categoryName) => {
				const category = categoriesToUse.find(cat =>
					cat.name.toUpperCase() === categoryName.toUpperCase()
				);
				if (category) {
					formatted.push({
						name: category.name.toUpperCase(),
						nav: category._id
					});
				}
			});

			const remainingCategories = categoriesToUse.filter(cat =>
				!predefinedOrder.some(name =>
					name.toUpperCase() === cat.name.toUpperCase()
				)
			);

			remainingCategories.forEach(category => {
				formatted.push({
					name: category.name.toUpperCase(),
					nav: category._id
				});
			});
		}

		return formatted;
	};

	const handleProfileClick = () => {
		if (window.innerWidth <= 768) {
			// Mobile - toggle on click
			setOpenProfile(!openProfile);
		}
		// Desktop - handled by hover
	};

	const handleProfileHover = () => {
		if (window.innerWidth > 768) {
			// Desktop - show on hover
			clearTimeout(profileTimeoutRef.current);
			setOpenProfile(true);
		}
	};

	const handleProfileLeave = () => {
		if (window.innerWidth > 768) {
			// Desktop - hide after delay
			profileTimeoutRef.current = setTimeout(() => {
				setOpenProfile(false);
			}, 300);
		}
	};

	const handleProfileSidebarEnter = () => {
		// Cancel hiding when mouse enters sidebar
		clearTimeout(profileTimeoutRef.current);
	};

	const handleProfileSidebarLeave = () => {
		if (window.innerWidth > 768) {
			// Hide sidebar when mouse leaves
			profileTimeoutRef.current = setTimeout(() => {
				setOpenProfile(false);
			}, 300);
		}
	};

	const handleCartClick = () => {
		if (isloggedIn) {
			navigate("/cart");
		} else {
			navigate("/palji-login");
		}
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			const mobileMenu = document.querySelector('.mobile-menu');
			const menuIcon = document.querySelector('.mobile-menu-icon');
			const profileIcon = document.querySelector('.profile-icon-container');
			const profileSidebar = document.querySelector('.profile-sidebar');

			if (moblieMenu &&
				!mobileMenu.contains(event.target) &&
				!menuIcon.contains(event.target)) {
				closeMenu();
			}

			// Close profile sidebar when clicking outside (mobile)
			if (openProfile && window.innerWidth <= 768 &&
				!profileIcon?.contains(event.target) &&
				!profileSidebar?.contains(event.target)) {
				setOpenProfile(false);
			}
		};

		if (moblieMenu || openProfile) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			clearTimeout(profileTimeoutRef.current);
		};
	}, [moblieMenu, openProfile]);

	const mobileMenuRef = useRef(null);
	const profileSidebarRef = useRef(null);

	const handelogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	}
	const handelloginclick =() => {
	
	navigate("/palji-login")
}

	return (
		<>
			<div className="main_div_new_haldi_ram">
				<div className='main_new_navbar_haldi_ram' >
					<div className="top_section_haldiram" >
						<div className="left_section_new_nav_haldi_ram" >
							<div>
								<img
									className="center-logo m-1"
									src={assets.newlogo}
									alt=""
									onClick={() => navigate("/")}
									style={{ cursor: "pointer" }}
								/>
							</div>
						</div>
						<div className="right_section_new_nav_haldi_ram" >
							<div className="right_top_section_haldi_ram" >
								<div className="right_search_section_haldi_Ram mobile-hide" ref={searchRef}>
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
									{input && (
										<div className="search-list-result">
											<NavSearchList
												product={products}
												clearSearchInput={clearSearchInput}
												input={input}
												isLoading={setsearchloading}
											/>
										</div>
									)}
								</div>
								<div className="right_cart_section_haldi_ram" >
									<div
										className='cart_section_new_nav_haldi_icons'
										onClick={handleCartClick}
										style={{ cursor: "pointer", position: "relative" }}
									>
										<div>
											<svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z" stroke="#1E1E1E" strokeLinecap="round" strokeLinejoin="round"></path>
												<path d="M3 6H21" stroke="#1E1E1E" strokeLinecap="round" strokeLinejoin="round"></path>
												<path d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10" stroke="#1E1E1E" strokeLinecap="round" strokeLinejoin="round"></path>
											</svg>
											{isloggedIn && cartCount > 0 && (
												<span className="cart-count-badge">{cartCount}</span>
											)}
										</div>
									</div>
									<div
										className="profile-icon-container user_profile_for_mobile_view_icon"
										onClick={handleProfileClick}
										onMouseEnter={handleProfileHover}
										onMouseLeave={handleProfileLeave}
										style={{ cursor: "pointer" }}
									>
										{userDatails?.userImage ? (
											<img
												src={userDatails.userImage}
												alt="Profile"
												className="user_image_hald_ram_header"
											/>
										) : (
											<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="#1E1E1E" strokeLinecap="round" strokeLinejoin="round"></path>
												<path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="#1E1E1E" strokeLinecap="round" strokeLinejoin="round"></path>
											</svg>
										)}
									</div>
								</div>
								<div className="mobile-menu-icon" onClick={toggleMenu}>
									<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M3 12H21" stroke="#1E1E1E" strokeLinecap="round" strokeLinejoin="round"></path>
										<path d="M3 6H21" stroke="#1E1E1E" strokeLinecap="round" strokeLinejoin="round"></path>
										<path d="M3 18H21" stroke="#1E1E1E" strokeLinecap="round" strokeLinejoin="round"></path>
									</svg>
								</div>
							</div>

							<div className="right_bottom_section_haldi_ram desktop-nav" >
								<div className='nav_cat_list'>
									{formatCategories().map((item, index) => {
										const displayName = item.name === "PREMIUM COOKIES" ? "COOKIES" : item.name;

										return (
											<div className='nav_cat_list_item' key={index}>
												<div
													className='nav_nav_cat_options'
													onClick={() => handleCategoryClick(item.nav)}
													style={{ cursor: "pointer" }}
												>
													{displayName}
												</div>
											</div>
										)
									})}
								</div>
								<div
									className="right_profile_section_haldi_ram profile-icon-container"
									onClick={handleProfileClick}
									onMouseEnter={handleProfileHover}
									onMouseLeave={handleProfileLeave}
									style={{ cursor: "pointer" }}
								>
									<div>
										{userDatails?.userImage ? (
											<img
												src={userDatails.userImage}
												alt="Profile"
												className="user_image_hald_ram_header"
											/>
										) : (
											<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="#1E1E1E" strokeLinecap="round" strokeLinejoin="round"></path>
												<path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="#1E1E1E" strokeLinecap="round" strokeLinejoin="round"></path>
											</svg>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Mobile Menu */}
					<div className={`mobile-menu ${moblieMenu ? 'open' : ''}`} ref={mobileMenuRef}>
						<div className="mobile-top-section">
							<div className="mobile-category-text-navbar" >
								All Categories
							</div>
							<div onClick={closeMenu} >
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-icon-P1l"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
							</div>
						</div>
						<div className="mobile-menu-content">
							<div className="mobile-nav-items">
								{formatCategories().map((item, index) => {
									const displayName = item.name === "PREMIUM COOKIES" ? "COOKIES" : item.name;
									return (
										<div
											className="mobile-nav-item mobile_category_section"
											key={index}
											onClick={() => {
												handleCategoryClick(item.nav);
												closeMenu();
											}}
										>
											<div>
												{displayName}
											</div>

											<div>
												<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
											</div>
										</div>
									)
								})}
							</div>
						</div>
					</div>

					{/* Profile Sidebar */}
					<div
						className={`profile-sidebar ${openProfile ? 'open' : ''}`}
						ref={profileSidebarRef}
						onMouseEnter={handleProfileSidebarEnter}
						onMouseLeave={handleProfileSidebarLeave}
					>
						<div className="profile-sidebar-header">
							{userDatails?.userImage ? (
								<img
									src={userDatails.userImage}
									alt="Profile"
									className="profile-sidebar-image"
								/>
							) : (
								<div className="profile-sidebar-default-icon">
									<svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="#1E1E1E" strokeLinecap="round" strokeLinejoin="round"></path>
										<path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="#1E1E1E" strokeLinecap="round" strokeLinejoin="round"></path>
									</svg>
								</div>
							)}
							<h3>{userDatails?.firstName || "Welcome"}</h3>
							<p>{userDatails?.email || ""}</p>
						</div>
						{isloggedIn ? (
						<div className="profile-sidebar-links">
							<Link to="/userprofile" className="profile-sidebar-link" onClick={() => setOpenProfile(false)}>
								<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" stroke="#1E1E1E" strokeLinecap="round" strokeLinejoin="round"></path>
									<path d="M6 20C6 17.7909 7.79086 16 10 16H14C16.2091 16 18 17.7909 18 20" stroke="#1E1E1E" strokeLinecap="round" strokeLinejoin="round"></path>
								</svg>
								My Profile
							</Link>

							<Link to="/userprofile/myorders" className="profile-sidebar-link" onClick={() => setOpenProfile(false)}>
								<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M9 5H21" stroke="#1E1E1E" strokeLinecap="round" strokeLinejoin="round"></path>
									<path d="M9 12H21" stroke="#1E1E1E" strokeLinecap="round" strokeLinejoin="round"></path>
									<path d="M9 19H21" stroke="#1E1E1E" strokeLinecap="round" strokeLinejoin="round"></path>
									<path d="M5 5L5.01 5" stroke="#1E1E1E" strokeLinecap="round" strokeLinejoin="round"></path>
									<path d="M5 12L5.01 12" stroke="#1E1E1E" strokeLinecap="round" strokeLinejoin="round"></path>
									<path d="M5 19L5.01 19" stroke="#1E1E1E" strokeLinecap="round" strokeLinejoin="round"></path>
								</svg>
								My Orders
							</Link>

							<Link to="/userprofile/myaddress" className="profile-sidebar-link" onClick={() => setOpenProfile(false)}>
								<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="#1E1E1E" strokeLinecap="round" strokeLinejoin="round"></path>
									<path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#1E1E1E" strokeLinecap="round" strokeLinejoin="round"></path>
								</svg>
								My Addresses
							</Link>


							<div className="auth-section">
								{isloggedIn ? (
									<div
										className="profile-sidebar-link logout-link"

										onClick={handelogout}
									>
										<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="#1E1E1E" strokeLinecap="round" strokeLinejoin="round"></path>
											<path d="M16 17L21 12L16 7" stroke="#1E1E1E" strokeLinecap="round" strokeLinejoin="round"></path>
											<path d="M21 12H9" stroke="#1E1E1E" strokeLinecap="round" strokeLinejoin="round"></path>
										</svg>
										Logout
									</div>
								) : (
									// <button
									// 	onClick={() => navigate("/palji-login")}
									// 	className="login-btn"
									// >
									// 	Login
									// </button>
									<div
										className="profile-sidebar-link logout-link"

										onClick={handelogout}
									>
										<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="#1E1E1E" strokeLinecap="round" strokeLinejoin="round"></path>
											<path d="M16 17L21 12L16 7" stroke="#1E1E1E" strokeLinecap="round" strokeLinejoin="round"></path>
											<path d="M21 12H9" stroke="#1E1E1E" strokeLinecap="round" strokeLinejoin="round"></path>
										</svg>
										Logout
									</div>
								)}
							</div>

						</div>
						) : (
							<>
							<div className="profile-sidebar-link logout-link" onClick={handelloginclick}>
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="#1E1E1E" strokeLinecap="round" strokeLinejoin="round"></path>
    <path d="M16 17L21 12L16 7" stroke="#1E1E1E" strokeLinecap="round" strokeLinejoin="round"></path>
    <path d="M21 12H9" stroke="#1E1E1E" strokeLinecap="round" strokeLinejoin="round"></path>
  </svg>
  Login
</div>
							</>
						)}
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
// import MarqueeComponent from "../SecondHomePage/Marquee/Marquee"

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

//   // Profile sidebar timeout reference
//   const profileTimeoutRef = useRef(null);

//   const fetchCategories = async () => {
//     const storedCategories = localStorage.getItem('categories');
//     const storedTimestamp = localStorage.getItem('categoriesTimestamp');
//     const currentTime = new Date().getTime();

//     if (storedCategories && storedTimestamp && (currentTime - storedTimestamp) < 2 * 60 * 1000) {
//       setAllCategories(JSON.parse(storedCategories));
//     } else {
//       try {
//         const response = await makeApi("/api/get-all-categories", "GET");
//         const categories = response.data.categories;
//         localStorage.setItem('categories', JSON.stringify(categories));
//         localStorage.setItem('categoriesTimestamp', currentTime.toString());
//         setAllCategories(categories);
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }
//     }
//   };

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
//   }, [])

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
//       setCartCount(count);
//     }
//     subscribeToCartCount(updateCartCount);
//     return () => {
//       unsubscribeFromCartCount(updateCartCount);
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
//     if (isloggedIn) {
//       fetchUserDetail();
//     }
//     fetchCategories()
//   }, [isloggedIn])

//   const handleCategoryClick = (categoryId) => {
//     if (!categoryId || categoryId === "") {
//       navigate(`/product/all-products`);
//       return;
//     }
//     navigate(`/product/all-products?category=${categoryId}`);
//   };

//   const formatCategories = () => {
//     const cachedCategories = localStorage.getItem('cachedCategories');
//     let categoriesToUse = allcategories;

//     if (cachedCategories) {
//       try {
//         const parsedCategories = JSON.parse(cachedCategories);
//         if (Array.isArray(parsedCategories) && parsedCategories.length > 0) {
//           categoriesToUse = parsedCategories;
//         }
//       } catch (error) {
//         console.error('Error parsing cached categories:', error);
//       }
//     }

//     const formatted = [
//       {
//         name: "STORE",
//         nav: ""
//       },
//     ];

//     const predefinedOrder = [
//       "Shop",
//       "PREMIUM COOKIES",
//       "Savouries",
//       "Cakes",
//       "GIFT HAMPERS"
//     ];

//     if (categoriesToUse && categoriesToUse.length > 0) {
//       predefinedOrder.forEach((categoryName) => {
//         const category = categoriesToUse.find(cat =>
//           cat.name.toUpperCase() === categoryName.toUpperCase()
//         );
//         if (category) {
//           formatted.push({
//             name: category.name.toUpperCase(),
//             nav: category._id
//           });
//         }
//       });

//       const remainingCategories = categoriesToUse.filter(cat =>
//         !predefinedOrder.some(name =>
//           name.toUpperCase() === cat.name.toUpperCase()
//         )
//       );

//       remainingCategories.forEach(category => {
//         formatted.push({
//           name: category.name.toUpperCase(),
//           nav: category._id
//         });
//       });
//     }

//     return formatted;
//   };

//   const handleProfileClick = () => {
//     if (window.innerWidth <= 768) {
//       // Mobile - toggle on click
//       setOpenProfile(!openProfile);
//     }
//     // Desktop - handled by hover
//   };

//   const handleProfileHover = () => {
//     if (window.innerWidth > 768) {
//       // Desktop - show on hover
//       clearTimeout(profileTimeoutRef.current);
//       setOpenProfile(true);
//     }
//   };

//   const handleProfileLeave = () => {
//     if (window.innerWidth > 768) {
//       // Desktop - hide after delay
//       profileTimeoutRef.current = setTimeout(() => {
//         setOpenProfile(false);
//       }, 300);
//     }
//   };

//   const handleProfileSidebarEnter = () => {
//     // Cancel hiding when mouse enters sidebar
//     clearTimeout(profileTimeoutRef.current);
//   };

//   const handleProfileSidebarLeave = () => {
//     if (window.innerWidth > 768) {
//       // Hide sidebar when mouse leaves
//       profileTimeoutRef.current = setTimeout(() => {
//         setOpenProfile(false);
//       }, 300);
//     }
//   };

//   const handleCartClick = () => {
//     if (isloggedIn) {
//       navigate("/cart");
//     } else {
//       navigate("/palji-login");
//     }
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       const mobileMenu = document.querySelector('.mobile-menu');
//       const menuIcon = document.querySelector('.mobile-menu-icon');
//       const profileIcon = document.querySelector('.profile-icon-container');
//       const profileSidebar = document.querySelector('.profile-sidebar');
      
//       if (moblieMenu && 
//           !mobileMenu.contains(event.target) && 
//           !menuIcon.contains(event.target)) {
//         closeMenu();
//       }
      
//       // Close profile sidebar when clicking outside (mobile)
//       if (openProfile && window.innerWidth <= 768 &&
//           !profileIcon?.contains(event.target) &&
//           !profileSidebar?.contains(event.target)) {
//         setOpenProfile(false);
//       }
//     };
  
//     if (moblieMenu || openProfile) {
//       document.addEventListener('mousedown', handleClickOutside);
//     }
  
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//       clearTimeout(profileTimeoutRef.current);
//     };
//   }, [moblieMenu, openProfile]);

//   const mobileMenuRef = useRef(null);
//   const profileSidebarRef = useRef(null);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setIsloggedIn(false);
//     setUserDetails(null);
//     setOpenProfile(false);
//     window.location.reload(); // Refresh the page
//   };

//   const handleLogin = () => {
//     navigate("/palji-login");
//   };

//   return (
//     <>
//       <div className="main_div_new_haldi_ram">
//         <div className='main_new_navbar_haldi_ram' >
//           <div className="top_section_haldiram" >
//             <div className="left_section_new_nav_haldi_ram" >
//               <div>
//                 <img
//                   className="center-logo m-1"
//                   src={assets.newlogo}
//                   alt=""
//                   onClick={() => navigate("/")}
//                   style={{ cursor: "pointer" }}
//                 />
//               </div>
//             </div>
//             <div className="right_section_new_nav_haldi_ram" >
//               <div className="right_top_section_haldi_ram" >
//                 <div className="right_search_section_haldi_Ram mobile-hide" ref={searchRef}>
//                   <div className='serach_icon_new_nav_haldi' >
//                     <IoSearch className="search_icon_new_nav" />
//                   </div>
//                   <div className="new_search_input_div_haldi_ram" >
//                     <input
//                       type="text"
//                       placeholder="Search here..."
//                       value={input}
//                       onChange={(e) => handleChange(e.target.value)}
//                       className="new_search_input_fileds"
//                     />
//                   </div>
//                   {input && (
//                     <div className="search-list-result">
//                       <NavSearchList
//                         product={products}
//                         clearSearchInput={clearSearchInput}
//                         input={input}
//                         isLoading={setsearchloading}
//                       />
//                     </div>
//                   )}
//                 </div>
//                 <div className="right_cart_section_haldi_ram" >
//                   <div
//                     className='cart_section_new_nav_haldi_icons'
//                     onClick={handleCartClick}
//                     style={{ cursor: "pointer", position: "relative" }}
//                   >
//                     <div>
//                       <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <path d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z" stroke="#1E1E1E" strokeLinecap="round" strokeLinejoin="round"></path>
//                         <path d="M3 6H21" stroke="#1E1E1E" strokeLinecap="round" strokeLinejoin="round"></path>
//                         <path d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10" stroke="#1E1E1E" strokeLinecap="round" strokeLinejoin="round"></path>
//                       </svg>
//                       {isloggedIn && cartCount > 0 && (
//                         <span className="cart-count-badge">{cartCount}</span>
//                       )}
//                     </div>
//                   </div>
//                   {isloggedIn ? (
//                     <div 
//                       className="profile-icon-container user_profile_for_mobile_view_icon"
//                       onClick={handleProfileClick}
//                       onMouseEnter={handleProfileHover}
//                       onMouseLeave={handleProfileLeave}
//                       style={{ cursor: "pointer" }}
//                     >
//                       {userDatails?.userImage ? (
//                         <img
//                           src={userDatails.userImage}
//                           alt="Profile"
//                           className="user_image_hald_ram_header"
//                         />
//                       ) : (
//                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                           <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="#1E1E1E" strokeLinecap="round" strokeLinejoin="round"></path>
//                           <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="#1E1E1E" strokeLinecap="round" strokeLinejoin="round"></path>
//                         </svg>
//                       )}
//                     </div>
//                   ) : (
//                     <div 
//                       className="login-button"
//                       onClick={handleLogin}
//                       style={{ cursor: "pointer" }}
//                     >
//                       <span>Login</span>
//                     </div>
//                   )}
//                 </div>
//                 <div className="mobile-menu-icon" onClick={toggleMenu}>
//                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M3 12H21" stroke="#1E1E1E" strokeLinecap="round" strokeLinejoin="round"></path>
//                     <path d="M3 6H21" stroke="#1E1E1E" strokeLinecap="round" strokeLinejoin="round"></path>
//                     <path d="M3 18H21" stroke="#1E1E1E" strokeLinecap="round" strokeLinejoin="round"></path>
//                   </svg>
//                 </div>
//               </div>
  
//               <div className="right_bottom_section_haldi_ram desktop-nav" >
//                 <div className='nav_cat_list'>
//                   {formatCategories().map((item, index) => {
//                     const displayName = item.name === "PREMIUM COOKIES" ? "COOKIES" : item.name;
  
//                     return (
//                       <div className='nav_cat_list_item' key={index}>
//                         <div
//                           className='nav_nav_cat_options'
//                           onClick={() => handleCategoryClick(item.nav)}
//                           style={{ cursor: "pointer" }}
//                         >
//                           {displayName}  
//                         </div>
//                       </div>
//                     )
//                   })}
//                 </div>
//                 {isloggedIn ? (
//                   <div
//                     className="right_profile_section_haldi_ram profile-icon-container"
//                     onClick={handleProfileClick}
//                     onMouseEnter={handleProfileHover}
//                     onMouseLeave={handleProfileLeave}
//                     style={{ cursor: "pointer" }}
//                   >
//                     <div>
//                       {userDatails?.userImage ? (
//                         <img
//                           src={userDatails.userImage}
//                           alt="Profile"
//                           className="user_image_hald_ram_header"
//                         />
//                       ) : (
//                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                           <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="#1E1E1E" strokeLinecap="round" strokeLinejoin="round"></path>
//                           <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="#1E1E1E" strokeLinecap="round" strokeLinejoin="round"></path>
//                         </svg>
//                       )}
//                     </div>
//                   </div>
//                 ) : (
//                   <div
//                     className="right_profile_section_haldi_ram login-button"
//                     onClick={handleLogin}
//                     style={{ cursor: "pointer" }}
//                   >
//                     <span>Login</span>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
  
//           {/* Mobile Menu */}
//           <div className={`mobile-menu ${moblieMenu ? 'open' : ''}`} ref={mobileMenuRef}>
//             <div className="mobile-top-section">
//               <div className="mobile-category-text-navbar" >
//                 All Categories
//               </div>
//               <div onClick={closeMenu} >
//                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-icon-P1l"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
//               </div>
//             </div>
//             <div className="mobile-menu-content">
//               <div className="mobile-nav-items">
//                 {formatCategories().map((item, index) => {
//                   const displayName = item.name === "PREMIUM COOKIES" ? "COOKIES" : item.name;
//                   return (
//                     <div
//                       className="mobile-nav-item mobile_category_section"
//                       key={index}
//                       onClick={() => {
//                         handleCategoryClick(item.nav);
//                         closeMenu();
//                       }}
//                     >
//                       <div>
//                       {displayName}
//                       </div>
  
//                       <div>
//                       <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
//                       </div>
//                     </div>
//                   )
//                 })}
//               </div>
//             </div>
//           </div>

//           {/* Profile Sidebar */}
//           {isloggedIn && (
//             <div 
//               className={`profile-sidebar ${openProfile ? 'open' : ''}`}
//               ref={profileSidebarRef}
//               onMouseEnter={handleProfileSidebarEnter}
//               onMouseLeave={handleProfileSidebarLeave}
//             >
//               <div className="profile-sidebar-header">
//                 {userDatails?.userImage ? (
//                   <img
//                     src={userDatails.userImage}
//                     alt="Profile"
//                     className="profile-sidebar-image"
//                   />
//                 ) : (
//                   <div className="profile-sidebar-default-icon">
//                     <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                       <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="#1E1E1E" strokeLinecap="round" strokeLinejoin="round"></path>
//                       <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="#1E1E1E" strokeLinecap="round" strokeLinejoin="round"></path>
//                     </svg>
//                   </div>
//                 )}
//                 <h3>{userDatails?.firstName || "Welcome"}</h3>
//                 <p>{userDatails?.email || ""}</p>
//               </div>
              
//               <div className="profile-sidebar-links">
//                 <Link to="/userprofile" className="profile-sidebar-link" onClick={() => setOpenProfile(false)}>
//                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" stroke="#1E1E1E" strokeLinecap="round" strokeLinejoin="round"></path>
//                     <path d="M6 20C6 17.7909 7.79086 16 10 16H14C16.2091 16 18 17.7909 18 20" stroke="#1E1E1E" strokeLinecap="round" strokeLinejoin="round"></path>
//                   </svg>
//                   My Profile
//                 </Link>
                
//                 <Link to="/userprofile/myorders" className="profile-sidebar-link" onClick={() => setOpenProfile(false)}>
//                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M9 5H21" stroke="#1E1E1E" strokeLinecap="round" strokeLinejoin="round"></path>
//                     <path d="M9 12H21" stroke="#1E1E1E" strokeLinecap="round" strokeLinejoin="round"></path>
//                     <path d="M9 19H21" stroke="#1E1E1E" strokeLinecap="round" strokeLinejoin="round"></path>
//                     <path d="M5 5L5.01 5" stroke="#1E1E1E" strokeLinecap="round" strokeLinejoin="round"></path>
//                     <path d="M5 12L5.01 12" stroke="#1E1E1E" strokeLinecap="round" strokeLinejoin="round"></path>
//                     <path d="M5 19L5.01 19" stroke="#1E1E1E" strokeLinecap="round" strokeLinejoin="round"></path>
//                   </svg>
//                   My Orders
//                 </Link>
                
//                 <Link to="/userprofile/myaddress" className="profile-sidebar-link" onClick={() => setOpenProfile(false)}>
//                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="#1E1E1E" strokeLinecap="round" strokeLinejoin="round"></path>
//                     <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#1E1E1E" strokeLinecap="round" strokeLinejoin="round"></path>
//                   </svg>
//                   My Addresses
//                 </Link>
//                 <div 
//                   className="profile-sidebar-link logout-link"
//                   onClick={handleLogout}
//                 >
//                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="#1E1E1E" strokeLinecap="round" strokeLinejoin="round"></path>
//                     <path d="M16 17L21 12L16 7" stroke="#1E1E1E" strokeLinecap="round" strokeLinejoin="round"></path>
//                     <path d="M21 12H9" stroke="#1E1E1E" strokeLinecap="round" strokeLinejoin="round"></path>
//                   </svg>
//                   Logout
//                 </div>
//               </div>
//             </div>
//           )}
  
//           <div className="new_nav_bottom_section_haldi_ram" >
//             <MarqueeComponent />
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default Newnavbar