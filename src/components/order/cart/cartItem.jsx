import React, { useEffect, useState } from 'react'
import "../../../styles/order/cart/cartItem.css"
import { makeApi } from '../../../api/callApi.tsx'
import CartCalculation from './cartCalculation.jsx'
import Orderbar from '../orderbar/orderbar.jsx'
import Primaryloader from '../../loaders/primaryloader.jsx'
import AddIcon from "../../../Images/order/add_icon_green.png"
import RemoveIcon from "../../../Images/order/remove_icon_red.png"
import HorizotalLoader from '../../loaders/horizotalLoader.jsx'
import EMPTYCARTImage from "../../../Images/order/empty-cart.svg"
function CartItem() {
    const [cartItem, setCartItem] = useState([])
    const [loading, setLoading] = useState(false);
    const [cartPoductList, setCartProductList] = useState([])
    const [IscartEmpty, setIsCartEmpty] = useState(false)
    const [AllProductLoader, setAllProductLoader] = useState(false);
    const [AddTocartLoader, setAddTocartLoader] = useState(false);

    const fetchCartItem = async () => {
        try {
            setAllProductLoader(true)
            const response = await makeApi("/api/my-cart", "GET")

            setCartItem(response.data)
            if(response.data.orderItems.length === 0){
                setIsCartEmpty(true)
            }
            setCartProductList(response.data.orderItems)
        } catch (error) {
            console.log(error)
            if (error.response.data.message === "Cart not found") {
                setIsCartEmpty(true)
            }

        } finally {
            setAllProductLoader(false)
        }
    }

    const removeFromCart = async (productId) => {
        try {
            setAddTocartLoader(true);
            const method = "POST";
            const endpoint = "/api/remove-from-cart";
            const data = await makeApi(endpoint, method, { productId });
            // setCartItems(prevState => prevState.filter(item => item.productId !== productId));

        } catch (error) {
            console.log(error);
        } finally {
            fetchCartItem()
            setAddTocartLoader(false);
        }
    };
    const addToCart = async (productId) => {
        try {
            setAddTocartLoader(true);
            const method = "POST";
            const endpoint = "/api/add-to-cart";
            const data = await makeApi(endpoint, method, {
                productId, "quantity": 1,
                "shippingPrice": 0
            });

        } catch (error) {
            console.log(error);
        } finally {
            fetchCartItem()
            setAddTocartLoader(false);
        }

    }
    useEffect(() => {
        fetchCartItem()
    }, [])
    return (
        <>
            {AllProductLoader ? <div className="All_Product_loader">
                <div className='' >
                    <Primaryloader />
                </div>
            </div>
                :
                <div>
                    {IscartEmpty && <div className='empty_cart_div'>
                        {/* <img src='https://assets.materialup.com/uploads/16e7d0ed-140b-4f86-9b7e-d9d1c04edb2b/preview.png' className='NO_cart_image' /> */}
                        <img src={EMPTYCARTImage} alt=" No cart " className='NO_cart_image' />
                    </div>}
                    {!IscartEmpty &&
                        <div>
                            <div>
                                <Orderbar activeOptionName="CART" />
                            </div>
                            <div className='cart_item_main_div' >
                                {/* product details */}
                                {/* haader */}
                                <div className='cart_item_header' >
                                    <div></div>

                                    <div>Product Name:</div>
                                    <div>Price:</div>
                                    <div>Qty:</div>
                                    <div>Total</div>
                                </div>
                                {/* details */}
                                {cartPoductList && cartPoductList.map((item,index) => (
                                    <div className='cart_item_details_parent_div' key={index} >
                                        <div className='cart_item_details' >
                                            <div>
                                                <img src={item.productId.thumbnail} alt=' product ' className='cart_item_image' />
                                            </div>
                                            <div> {item.productId.name} </div>
                                            <div> ₹ {item.productId.price} </div>
                                            {/* <div className="cart-quantity">
                                                <button onClick={() => removeFromCart(item.productId._id)}>-</button>
                                                <span>{item.quantity}</span>
                                                <button onClick={() => addToCart(item.productId._id)}>+</button>
                                            </div> */}
                                            {AddTocartLoader ? <div className='Add_to_cart_and_watchlist_child' > <HorizotalLoader /> </div> :
                                                <div className="cart-quantity  cart_add_remmove_section_cart_page ">
                                                    <img src={RemoveIcon} alt="AddIcon" className='Icon_add_to_cart_main_cart_page' onClick={() => removeFromCart(item.productId._id)} />
                                                    {/* <button onClick={() => removeFromCart(product._id)}>-</button> */}
                                                    <span> {item.quantity} </span>
                                                    {/* <button onClick={() => addToCart(product._id)}>+</button> */}
                                                    <img src={AddIcon} alt="AddIcon" className='Icon_add_to_cart_main_cart_page' onClick={() => addToCart(item.productId._id)} />
                                                </div>
                                            }
                                            {/* <div> {item.quantity} </div> */}
                                            <div> ₹ {item.totalPrice} </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {/* calculation */}
                            <div className='cart_calculation_main_div_cartItem ' >
                                <CartCalculation tax={cartItem.taxPrice} shipping={cartItem.shippingPrice} total={cartItem.totalPrice} CoupanApplied={cartItem.Iscoupanapplied} Final={cartItem.TotalProductPrice} ButtonName="PROCEED TO CHECKOUT" />
                            </div>

                        </div>
                    }
                </div>
            }
        </>
    )
}

export default CartItem