
import "../styles/homenew/homeprodcut.css";
import React, { useState, useEffect } from 'react';
import LoginPopup from "../components/LoginPopup/LoginPopup";
import { addToCart, removeFromCart, fetchCart } from "../utils/productFunction";
import { makeApi } from "../api/callApi";
import { assets } from "../assets/assets";
import SkeletonLoader from "../components/products/SkeletonLoader";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";


function Homesavery() {
    const navigate = useNavigate();

    const [AllProductLoader, setAllProductLoader] = useState(false);
    const [products, setProducts] = useState([]);
    const [IsLogin, setIsLogin] = useState(false)
    const [showPopup, setShowPopup] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [quantityLoading, setQuantityLoading] = useState({});
    const [productLoaders, setProductLoaders] = useState({})
    const [AddTocartLoader, setAddTocartLoader] = useState({})
    const [completeCart, setCompleteCart] = useState([]);
    const [categories, setCategories] = useState([]);
    const [hoveredProduct, setHoveredProduct] = useState(null);


    useEffect(() => {
        const token = localStorage.getItem("token")
        setIsLogin(!!token)
    }, [localStorage.getItem("token")])

    const fetchProduct = async () => {
        try {
            setAllProductLoader(true);
            const categoriesResponse = await makeApi(`/api/get-all-categories`, "GET");
            const categories = categoriesResponse.data.categories;
            setCategories(categories);

            if (categories.length > 0) {
                const categoryId = categories[2]._id;
                const response = await makeApi(
                    `/api/get-all-products-by-category/${categoryId}`,
                    "GET"
                );
                setProducts(response.data.products);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setAllProductLoader(false);
        }
    };

    useEffect(() => {
        fetchProduct();
        fetchCart(setCartItems, setCompleteCart, setAddTocartLoader);
        fetchCartItems()
    }, []);

    function handleNavigate(id) {
        navigate(`/product/product-details/${id}`);
    }

    const handleCategoryClick = () => {
        navigate(`/product/all-products?category=${categories[1]._id}`);
    };

    const fetchCartItems = async () => {
        try {
            await fetchCart(setCartItems, setCompleteCart, setAddTocartLoader);
        } catch (error) {
            console.error("Error fetching cart items:", error);
        }
    };
    const handleIncreaseQuantity = async (productId, size) => {
        if (!IsLogin) {
            setShowPopup(true);
            return;
        }
        const cartItem = cartItems.find(item => item.productId === productId && item.size === size._id);

        try {
            setQuantityLoading(prev => ({ ...prev, [productId]: true }));
            await addToCart(productId, setIsLogin, setShowPopup, fetchCartItems, setCartItems, setProductLoaders, size._id);
        } catch (error) {
            console.error("Error increasing quantity:", error);
        } finally {
            setQuantityLoading(prev => ({ ...prev, [productId]: false }));
        }
    };


    const handleDecreaseQuantity = async (productId, size) => {
        const cartItem = cartItems.find(item => item.productId === productId && item.size === size._id);
        if (cartItem && cartItem.quantity > 0) {
            try {
                setQuantityLoading(prev => ({ ...prev, [productId]: true }));
                await removeFromCart(productId, setProductLoaders, setCartItems, fetchCartItems, size._id);
            } catch (error) {
                console.error("Error decreasing quantity:", error);
            }
            finally {
                setQuantityLoading(prev => ({ ...prev, [productId]: false }));
            }
        }
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    return (
        <>
            {showPopup && <LoginPopup onClose={closePopup} />}
            {AllProductLoader ?
                <div className="p-1">
                    <SkeletonLoader cards={4} />
                </div> :
                <>
                    <div className="homeproduct_container_main_div" >
                        {/* top heading */}
                        <div className="homeproduct_top_heading_div homeproduct_top_heading_div_for_Savory" >
                            <div>Savouries</div>
                            <div>
                                <div className="homeproduct_top_heading_div_viewall" onClick={handleCategoryClick}>VIEW ALL <img src={assets.brownArrow} alt="" className="homeproduct_top_heading_div_arrow" />
                                </div>
                            </div>
                        </div>
                        {/* products */}
                        <div className="homeproduct_product_main_div" >
                            {products.slice(0, 4).map((product) => (
                                <div key={product.id} className="homeproduct_product_sub_div" >
                                    {/* image */}
                                    <motion.div
                                        className="homeproduct_product_div_image"
                                        whileHover={{ scale: 1.03 }}
                                        onMouseEnter={() => setHoveredProduct(product._id)}
                                        onMouseLeave={() => setHoveredProduct(null)}
                                    >
                                        <motion.img
                                            key={hoveredProduct === product._id ? "main" : "thumb"}
                                            src={hoveredProduct === product._id ? product.image[0] : product.thumbnail}
                                            alt={product.name}
                                            onClick={() => handleNavigate(product._id)}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </motion.div>
                                    {/* details */}
                                    <div className="homeproduct_product_div_details" >
                                        <div>
                                            {/* <div className="bold_details_homeproduct" >{product.name}</div> */}
                                            <div className="bold_details_homeproduct">
                                                {product.name.split(' ').slice(0, 3).join(' ')}
                                            </div>

                                            <div className="homeproduct_product_div_details_category" >{product.category.name}</div>

                                        </div>
                                        <div className="bold_details_homeproduct">
                                            {/* {product.weight} */}
                                            {product.size.length > 0 &&
                                                <>
                                                    {/* {product.size[0].size}{product.size[0].sizetype} */}
                                                    <>
                                                        <span className="">{product.size[0].size}</span>
                                                        {product.size[0].sizetype.toLowerCase() === "gram" ? " g" :
                                                            product.size[0].sizetype.toUpperCase() === "KG" ? " Kg" :
                                                                product.size[0].sizetype}
                                                    </>
                                                </>

                                            }
                                        </div>
                                    </div>
                                    {/* add to cart options */}
                                    <div className="homeproduct_product_div_addtocart" >
                                        <div>


                                            {product.size && product.size.length > 0 && (
                                                <>
                                                    <span className="Rs_text_homeproduct">₹ </span>
                                                    <span className="price_text_homeproduct">{product.size[0].FinalPrice}</span>

                                                    {product.size[0].price - product.size[0].FinalPrice > 1 && (
                                                        <>
                                                            <span className="original_text_homeproduct">₹{product.size[0].price}</span>
                                                            <span className="discount_text_homeproduct">
                                                                -{Math.round(((product.size[0].price - product.size[0].FinalPrice) / product.size[0].price) * 100)}%
                                                            </span>
                                                        </>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                        <div>
                                            {cartItems.some(cartItem => cartItem.productId === product._id && cartItem.size === product.size[0]._id) ? (
                                                <div className="homeproduct_addtocart_and_quantity_div">
                                                    <div>
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            onClick={() => handleDecreaseQuantity(product._id, product.size[0])}
                                                            width="30"
                                                            height="30"
                                                            fill="currentColor"
                                                            className="bi bi-dash text-black"
                                                            style={{ cursor: "pointer" }}
                                                            viewBox="0 0 16 16"
                                                        >
                                                            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
                                                        </svg>
                                                    </div>

                                                    <div style={{ minWidth: "20px", textAlign: "center" }}>
                                                        {quantityLoading[product._id] ? (
                                                            <div className="loader_for_home_page"></div>
                                                        ) : (
                                                            <div>
                                                                {cartItems.find(cartItem => cartItem.productId === product._id && cartItem.size === product.size[0]._id)?.quantity || 0}
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div>
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            onClick={() => handleIncreaseQuantity(product._id, product.size[0])}
                                                            width="30"
                                                            height="30"
                                                            fill="currentColor"
                                                            className="bi bi-plus text-black"
                                                            style={{ cursor: "pointer" }}
                                                            viewBox="0 0 16 16"
                                                        >
                                                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div
                                                    className="homeproduct_product_div_addtocart_Add_button"
                                                    onClick={() => handleIncreaseQuantity(product._id, product.size[0])}
                                                >
                                                    {quantityLoading[product._id] ? (
                                                        <div className="loader_for_home_page"></div>
                                                    ) : (
                                                        "ADD"
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            }
        </>
    );
}

export default Homesavery;
