import React from 'react'
import { Route, Routes } from "react-router"
import MyAccount from '../components/User/profile'
import MyOrders from '../components/User/Myorder'
import Mywhislist from '../components/User/mywhislist'
import Myaddress from '../components/User/myaddress'
import OrderDetailsPage from '../components/User/orderdetails'
import ShippingAddress from '../components/Information/shippingAddress'
import EditAddress from '../components/User/editAddress'
import Ecombar from '../components/Header/ecombar'
import UserProfileForMobile from '../components/User/mainMobilepageuserPofile'
import EditUserProfile from '../components/User/editprofile'


function User() {
    return (
        <div>
            <Routes>
                <Route
                    path="/profile"
                    element={<MyAccount />}
                />
                <Route
                    path="/userprofile"
                    element={<MyAccount />}
                />
                <Route
                path="/update-user"
                element={<EditUserProfile />}
                />
                <Route
                    path='/my-orders'
                    element={<MyOrders />}
                />
                <Route
                    path='/my-wishlist'
                    element={<Mywhislist />}
                />
                <Route
                    path='/my-address'
                    element={<Myaddress />}
                />
                <Route
                    path='/my-orders/order-details/:orderId'
                    element={<OrderDetailsPage />}
                />

                {/* address */}
                <Route
                    path='/address/add-address'
                    element={<ShippingAddress />}
                />
                <Route
                    path='/address/edit-address/:addressId'
                    element={<EditAddress />}
                />
                <Route path='/user-profile' element={<UserProfileForMobile />} />
            </Routes>
            <Ecombar/>

        </div>
    )
}

export default User