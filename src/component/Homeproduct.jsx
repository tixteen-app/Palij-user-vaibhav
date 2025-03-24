

import "../styles/homenew/homeprodcut.css";
import React, { useState , useEffect } from 'react';
import LoginPopup from "../components/LoginPopup/LoginPopup";
import { addToCart,removeFromCart,fetchCart } from "../utils/productFunction";
import { makeApi } from "../api/callApi";

function Homeproduct() {


    
      const [AllProductLoader, setAllProductLoader] = useState(false);
      const [products, setProducts] = useState([]);
      console.log(products);
      const [IsLogin, setIsLogin] = useState(false)
      const [showPopup, setShowPopup] = useState(false)
      const [cartItems, setCartItems] = useState([])
      const [quantityLoading, setQuantityLoading] = useState({});
      const [productLoaders, setProductLoaders] = useState({})
      const [AddTocartLoader, setAddTocartLoader] = useState({})
      const [completeCart, setCompleteCart] = useState([]);
    
    
    
      useEffect(() => {
        const token = localStorage.getItem("token")
        setIsLogin(!!token)
      }, [localStorage.getItem("token")])
    
      const fetchProduct = async () => {
        try {
          setAllProductLoader(true);
          const categoriesResponse = await makeApi(`/api/get-all-categories`, "GET");
          const categories = categoriesResponse.data.categories;
    
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
      }
    
      const handleCategoryClick = () => {
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
            <div className="homeproduct_container_main_div" >
                {/* top heading */}
                <div className="homeproduct_top_heading_div" >
                    Best Seller
                </div>
                {/* products */}
                <div className="homeproduct_product_main_div" >
                    {products.slice(0, 4).map((product) => (
                        <div key={product.id} className="homeproduct_product_sub_div" >
                            {/* image */}
                            <div className="homeproduct_product_div_image" >
                                <img src={product.thumbnail} alt={product.name} />
                            </div>
                            {/* details */}
                            <div className="homeproduct_product_div_details" >
                                <div>
                                    <div className="bold_details_homeproduct" >{product.name}</div>
                                    {/* <div>{product.description}</div> */}
                                </div>
                                <div className="bold_details_homeproduct">
                                    {product.weight}
                                </div>
                            </div>
                            {/* add to cart options */}
                            <div className="homeproduct_product_div_addtocart" >
                                <div>
                                    <span className="Rs_text_homeproduct" >Rs.</span><span className="price_text_homeproduct">{product.price}</span><span className="original_text_homeproduct" >Rs.{product.originalPrice}</span><span className="discount_text_homeproduct" >-10%</span>
                                </div>
                                <div>
                                    <div className="homeproduct_product_div_addtocart_Add_button" >ADD</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Homeproduct;
