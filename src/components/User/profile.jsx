
import React, { useEffect, useState } from "react"
import "../../styles/User/profile.css"
import UserProfileSidebar from "./sidebar"
import { makeApi } from "../../api/callApi.tsx"
import BackButton from "../backButton.jsx"
import Primaryloader from "../loaders/primaryloader.jsx"
import { Link } from "react-router-dom"

const MyAccount = () => {
    const [userDatails, setUserDetails] = useState()
    const [AllProductLoader, setAllProductLoader] = useState(false);

    const fetchUserDetail = async () => {
        try {
            setAllProductLoader(true);

            const responce = await makeApi("/api/my-profile", "GET")
            setUserDetails(responce.data.user)
        } catch (error) {
            console.log(error)
        } finally {
            setAllProductLoader(false);
        }
    }

    useEffect(() => {
        fetchUserDetail()
    }, [])


    return (
        <>

            <div className='top_parent_div_all_product' >
                {AllProductLoader ? <div className="All_Product_loader">
                    <div className='' >
                        <Primaryloader />
                    </div>
                </div> :

                    <div className="d-flex">
                        <div className="my_wishlist_mobile_view" >
                            <UserProfileSidebar />
                        </div>
                        <div className="hide_for_pc_screen" >
                            <BackButton pageLocation="/user/user-profile" />
                        </div>
                        <div className="myaccount w-100">
                            {/* <div className="userprofile-heading my_wishlist_mobile_view">
                    <h1>PERSONAL INFORMATION</h1>
                </div> */}
                            {/* {userDatails && ( */}
                            <div className="myaccount-info userprofile-info-css">

                                <div className="left-myaccount-info">
                                    <img
                                        src={userDatails?.userImage}
                                        alt=""
                                    />
                                    <div className="userprofilename">
                                        <span>NAME</span>
                                        {/* <p>{userDatails.firstName + " " + userDatails.lastName}</p> */}
                                        <p>{userDatails?.firstName} {userDatails?.lastName}</p>
                                    </div>
                                
                                    <div className="userprofile-no">
                                        <span>CONTACT NUMBER</span>
                                        {/* <p>{userDatails.mobileNumber}</p> */}
                                        <p>{userDatails?.mobileNumber}</p>
                                    </div>
                                    <div className="userprofile-email">
                                        <span>EMAIL ADDRESS</span>
                                        {/* <p>{userDatails.email}</p> */}
                                        <p>{userDatails?.email}</p>
                                    </div>
                                </div>
                                <div className="right-myaccount-info">
                                    <div>
                                        <Link to={"/user/update-user"} className="css-for-link-tag text-black" >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                                            </svg>
                                        </Link>
                                    </div>                           </div>
                            </div>
                            {/* )} */}
                        </div>

                    </div>
                }
            </div>
        </>
    )
}

export default MyAccount
