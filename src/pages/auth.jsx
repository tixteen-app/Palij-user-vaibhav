import React from 'react'
import { Route, Routes } from "react-router"
import Login from '../components/Auth/login'
import Signup from '../components/Auth/singup'


function Auth() {
    return (
        <div>
            <Routes>
                <Route
                    path="/login"
                    element={<Login />}
                />
                <Route
                    path="/signup"
                    element={<Signup />}
                />
               


            </Routes>
        </div>
    )
}

export default Auth