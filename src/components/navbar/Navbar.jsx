
import React, { useContext, useEffect, useRef, useState } from "react"
import user_icon from "../../assets/Male User.png"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { assets } from "../../assets/assets"
import { IoSearch } from "react-icons/io5"
import { HiMiniShoppingBag } from "react-icons/hi2"
import { GiHamburgerMenu } from "react-icons/gi"
import { ShopContext } from "../../context/ShopContext"
import { FaRegHeart } from "react-icons/fa"
import { makeApi } from "../../api/callApi"
import NavSearchList from "../navSearchList/NavSearchList"
import ProfileDropdown from "../profileDropdown/ProfileDropdown"
import { IoClose } from "react-icons/io5"
import { FaTimes } from "react-icons/fa"

import {
	subscribeToCartCount,
	unsubscribeFromCartCount,
} from "../../utils/productFunction"

import "./navbar.css"
import { homeImg } from "../../assets/home/home"
import Newnavbar from "./Newnav"

const Navbar = () => {
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
	const [categories, setCategories] = useState([])
	const [setsearchloading, setSearchLoading] = useState(false)

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
		async function fetchCategories() {
			try {
				const response = await makeApi("/api/get-all-categories", "GET")
				if (response.status === 200) {
					setCategories(response.data.categories)
				}
			} catch (error) {
				console.log("Error fetching categories:", error)
			}
		}
		fetchCategories()
	}, [])

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
	}, [])

	return showNavbar ? (
		// <div className="navbar">
		<div className="navbar">
			<Newnavbar/>
		</div>
	) : null
}

export default Navbar

