import React, { useEffect, useState } from 'react';
import "../../styles/product/allproduct.css";
import { IoIosHeart } from "react-icons/io";
import { makeApi } from '../../api/callApi.tsx';
import AddIcon from "../../Images/order/add_icon_green.png"
import RemoveIcon from "../../Images/order/remove_icon_red.png"
import Primaryloader from '../loaders/primaryloader.jsx';
import Heartloader from '../loaders/hearloader.jsx';
import HorizotalLoader from '../loaders/horizotalLoader.jsx';
import { Link } from "react-router-dom"
import UserProfileSidebar from './sidebar.jsx';

function Mywhislist({ search, category, minPrice, maxPrice }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [wishlistItems, setWishlistItems] = useState([]);
    const [watchlistProducts, setWatchlistProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [ResultPerPage, setResultPerPage] = useState(20);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [toalProduct, setToalProduct] = useState(0);
    const [AllProductLoader, setAllProductLoader] = useState(false);
    const [AddTocartLoader, setAddTocartLoader] = useState(false);
    const [AddToWishlistLoader, setAddToWishlistLoader] = useState(false);
    const [IsLogin, setIsLogin] = useState(false)
    const [showPopup, setShowPopup] = useState(false);


    useEffect(() => {
        const token = localStorage.getItem("token")

        if (token) {
            setIsLogin(true)
        } else {
            setIsLogin(false)
        }

    }, [localStorage.getItem("token")])

    const fetchProduct = async () => {
        try {
            setAllProductLoader(true);
            const response = await makeApi(`/api/get-all-products`, "GET");
            setProducts(response.data.products);
            setToalProduct(response.data.totalProducts);

        } catch (error) {
            console.log(error);
        } finally {
            setAllProductLoader(false);
        }
    };
    useEffect(() => {
        const a = Math.ceil(toalProduct / ResultPerPage);
        setTotalPages(a);
    }, [products, ResultPerPage]);
    const fetchCart = async () => {
        try {
            const response = await makeApi("/api/my-cart", "GET");
            setCartItems(response.data.orderItems.map(item => ({
                productId: item.productId._id,
                quantity: item.quantity
            })));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                setAddToWishlistLoader(true);
                const response = await makeApi("/api/get-my-wishlist", "GET");
                setWatchlistProducts(response.data.wishlist)
                const wishlistIds = response.data.wishlist.filter(item => item.products !== null).map(item => item.products._id);
                setWishlistItems(wishlistIds);
            } catch (error) {
                console.log(error);
            } finally {
                setAddToWishlistLoader(false);
            }
        };

        fetchWishlist();
    }, []);

    useEffect(() => {
        fetchProduct();
        fetchCart();
    }, [search, category, minPrice, maxPrice, currentPage, ResultPerPage]);

    const isInCart = (productId) => {
        return cartItems.some(item => item.productId === productId);
    };
    const closePopup = () => {
        setShowPopup(false);
    };


    const toggleWishlist = async (id) => {
        if (!IsLogin) {
            setShowPopup(true);
        } else {
            try {
                setAddToWishlistLoader(true);
                const method = "POST";
                const endpoint = `/api/create-wishlist/${id}`;
                const data = await makeApi(endpoint, method);
                setWishlistItems(prevState => {
                    if (prevState.includes(id)) {
                        return prevState.filter(itemId => itemId !== id);
                    } else {
                        return [...prevState, id];
                    }
                });
            } catch (error) {
                console.log(error);
            } finally {
                setAddToWishlistLoader(false);
            }
        }

    };

    const addToCart = async (productId) => {
        if (!IsLogin) {
            setShowPopup(true);
        } else {
            try {
                setAddTocartLoader(true);
                const method = "POST";
                const endpoint = "/api/add-to-cart";
                const data = await makeApi(endpoint, method, {
                    productId, "quantity": 1,
                    "shippingPrice": 0
                });
                setCartItems(prevState => {
                    const existingItem = prevState.find(item => item.productId === productId);
                    if (existingItem) {
                        return prevState.map(item => {
                            if (item.productId === productId) {
                                return { ...item, quantity: item.quantity + 1 };
                            }
                            return item;
                        });
                    } else {
                        return [...prevState, { productId, quantity: 1 }];
                    }
                });
            } catch (error) {
                console.log(error.response.data);
            } finally {
                fetchCart();
                setAddTocartLoader(false);
            }
        }
    };

    const removeFromCart = async (productId) => {
        try {
            setAddTocartLoader(true);
            const method = "POST";
            const endpoint = "/api/remove-from-cart";
            const data = await makeApi(endpoint, method, { productId });
            setCartItems(prevState => prevState.filter(item => item.productId !== productId));

        } catch (error) {
            console.log(error);
        } finally {
            fetchCart();
            setAddTocartLoader(false);
        }
    };

    const getProductQuantity = (productId) => {
        const cartItem = cartItems.find(item => item.productId === productId);
        return cartItem ? cartItem.quantity : 0;
    };
    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
        <div className="d-flex">
            <div className="my_wishlist_mobile_view" >
                <UserProfileSidebar />
            </div>
            
            <div className='top_parent_div_all_product' >
                {AllProductLoader ? <div className="All_Product_loader">
                    <div className='' >
                        <Primaryloader />
                    </div>
                </div> :

                    <div className="">
                        <div className="main_all_product_div">
                            {watchlistProducts.map((product, index) => {
                                return <div className="product_div_all_product_parent" key={index}>
                                    <div className="product_div_all_product">
                                        <Link to={`/product/product-details/${product.products._id}`} >
                                            <div>
                                                <img src={product.products.thumbnail} alt="product" className="all_product_product_thumbnail" />
                                            </div>
                                        </Link>
                                        <div className="product_name_and_price">
                                            <div>{product.products.name}</div>
                                            <div>₹{product.products.PriceAfterDiscount}</div>
                                        </div>
                                        <div className="Add_to_cart_and_watchlist_button">
                                            <>
                                                {isInCart(product.products._id) ? (
                                                    <div className='Add_to_cart_and_watchlist_child'>
                                                        {AddTocartLoader ? <div> <HorizotalLoader /> </div> :
                                                            <div className="cart-quantity">
                                                                <img src={RemoveIcon} alt="AddIcon" className='Icon_add_to_cart' onClick={() => removeFromCart(product.products._id)} />
                                                                <span>{getProductQuantity(product.products._id)}</span>
                                                                <img src={AddIcon} alt="AddIcon" className='Icon_add_to_cart' onClick={() => addToCart(product.products._id)} />
                                                            </div>
                                                        }
                                                    </div>
                                                ) : (
                                                    <div>
                                                        {AddTocartLoader ? <div> <HorizotalLoader /> </div> : <div className="Add_to_cart_button" onClick={() => addToCart(product.products._id)}>Add to Cart</div>}
                                                    </div>
                                                )}
                                            </>


                                            <div className='Add_to_cart_and_watchlist_child'>
                                                {AddToWishlistLoader ? <div className='heart_loader_all_product' > <Heartloader /></div> : <IoIosHeart
                                                    className={`watchlist-icon pointer-event ${wishlistItems.includes(product.products._id) ? "wishlist-active" : ""}`}
                                                    onClick={() => toggleWishlist(product.products._id)}
                                                />}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            })}
                        </div>
                        {/* <div className="pagination">
                            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                                (pageNumber) => (
                                    <button
                                        key={pageNumber}
                                        className={pageNumber === currentPage ? "active" : ""}
                                        onClick={() => handlePageClick(pageNumber)}
                                    >
                                        {pageNumber}
                                    </button>
                                )
                            )}
                        </div> */}
                    </div>
                }
            </div>

            </div>
        </>

    );
}

export default Mywhislist;
