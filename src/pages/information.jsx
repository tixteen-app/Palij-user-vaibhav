import React from 'react'
import { Route, Routes } from "react-router"
import BillingAddress from '../components/Information/billingAdress'
import ShippingAddress from '../components/Information/shippingAddress'


function Information() {
    return (
        <div>
            <Routes>
                <Route
                    path="/billing-address"
                    element={<BillingAddress />}
                />
                <Route path="/shipping-address" element={<ShippingAddress />} />

            </Routes>
        </div>
    )
}

export default Information