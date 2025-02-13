import React from 'react'
import { Route, Routes } from "react-router"
// import ProductSidebar from '../components/products/slidebar/sidebar'
// import Allproduct from '../components/products/allproduct'
import MainCart from '../components/order/cart/mainCart'
import Checkout from '../components/order/checkout/checkout'
import Ecombar from '../components/Header/ecombar'


function Order() {
    return (
        <div>
            <Routes>
                <Route
                    path="/my-cart"
                    element={<MainCart />}
                />
                <Route
                    path="/checkout"
                    element={<Checkout />}
                />
            
            </Routes>
            <Ecombar/>
        </div>
    )
}

export default Order