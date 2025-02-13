
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react'
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from 'swiper/modules'
import "../../../styles/Home/besatSaller.css"
import { Link } from 'react-router-dom';
import LoginPopup from '../../Auth/LoginPopup';
import { makeApi } from '../../../api/callApi.tsx';
import AddIcon from "../../../Images/order/add_icon_green.png"
import RemoveIcon from "../../../Images/order/remove_icon_red.png"
import HorizotalLoader from '../../loaders/horizotalLoader.jsx';
import Primaryloader from '../../loaders/primaryloader.jsx';




function BesatSaller() {
    const [slidesPerView, setSlidesPerView] = useState(3);
    const [sliderGap, setSliderGap] = useState(20);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [AllProductLoader, setAllProductLoader] = useState(false);
    const [AddTocartLoader, setAddTocartLoader] = useState(false);
    const [IsLogin, setIsLogin] = useState(false)
    const [showPopup, setShowPopup] = useState(false);



    // get data
    const fetchProduct = async () => {
        try {
            setAllProductLoader(true);
            const response = await makeApi(`/api/get-all-products?&perPage=10&IsOutOfStock=false`, "GET");
            setProducts(response.data.products);
        } catch (error) {
            console.log(error);
        } finally {
            setAllProductLoader(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token")

        if (token) {
            setIsLogin(true)
        } else {
            setIsLogin(false)
        }

    }, [localStorage.getItem("token")])
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
    const isInCart = (productId) => {
        return cartItems.some(item => item.productId === productId);
    };

    const getProductQuantity = (productId) => {
        const cartItem = cartItems.find(item => item.productId === productId);
        return cartItem ? cartItem.quantity : 0;
    };


    // action 

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
    const closePopup = () => {
        setShowPopup(false);
    };
    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;
            if (screenWidth <= 500) {
                setSlidesPerView(1.3);
            } else if (screenWidth <= 900) {
                setSlidesPerView(2.5);
            } else if (screenWidth <= 1024) {
                setSlidesPerView(3);
                setSliderGap(15)
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [])
    useEffect(() => {
        fetchProduct();
        fetchCart();

    }, []);




    return (
        <>
            {showPopup &&

                <div className='bg-black' >
                    <LoginPopup onClose={closePopup} />
                </div>

            }

            <div className='Our_collection_main_div  bestSaller_main' >
                {/* Main Heading */}
                <div className='Main_Home_heading text-center' >BEST SELLERS</div>

                {/* Swiper */}
                <div>
                {AllProductLoader ? <div className="All_Product_loader">
                    <div className='' >
                        <Primaryloader />
                    </div>
                </div> :
                    <Swiper
                        slidesPerView={slidesPerView}
                        spaceBetween={sliderGap}
                        slidesPerGroup={1}
                        loop={true}
                        loopFillGroupWithBlank={true}
                        navigation={true}
                        className="mySwiper main_Best_Saller_swiper"
                        modules={[Navigation]}
                    >
                        {products.map((product, index) => (
                            <SwiperSlide key={index} className='main_swiper_slide_our_collection' >
                                <div className='main_our_collection_swiper_options' >
                                    <img src={product.thumbnail} alt={`ImageNumber ${index + 1}`} className='Best_saller_slider_images' />
                                    <div className='bestSaller_details' >
                                        <div>{product.name}</div>
                                        <div>₹{product.PriceAfterDiscount}</div>
                                        {/* <div className='Add_to_cart_button' >Add to Cart</div> */}
                                        <div className="Add_to_cart_and_watchlist_button">
                                            <>
                                                {isInCart(product._id) ? (
                                                    <div className='Add_to_cart_and_watchlist_child'>
                                                        {AddTocartLoader ? <div> <HorizotalLoader /> </div> :
                                                            <div className="cart-quantity">
                                                                <img src={RemoveIcon} alt="AddIcon" className='Icon_add_to_cart' onClick={() => removeFromCart(product._id)} />
                                                                <span>{getProductQuantity(product._id)}</span>
                                                                <img src={AddIcon} alt="AddIcon" className='Icon_add_to_cart' onClick={() => addToCart(product._id)} />
                                                            </div>
                                                        }
                                                    </div>
                                                ) : (
                                                    <div>
                                                        {AddTocartLoader ? <div> <HorizotalLoader /> </div> : <div className="Add_to_cart_button" onClick={() => addToCart(product._id)}>Add to Cart</div>}
                                                    </div>
                                                )}
                                            </>



                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                }
                  
                </div>
                <div className='view_more_button_div' >
                    <Link to={"/product/all-products"} className='css-for-link-tag' >

                        <div className='click_buttons view_more_button_home_page' >VIEW MORE </div>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default BesatSaller