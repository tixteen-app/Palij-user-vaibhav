import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../../styles/User/mainMobilepageuserPofile.css"
import { makeApi } from '../../api/callApi.tsx';
import Primaryloader from "../loaders/primaryloader.jsx"

const UserProfileForMobile = () => {
  const history = useNavigate();
  const [userDatails, setUserDetails] = useState();
  const [AllProductLoader, setAllProductLoader] = useState(false);

  const fetchUserDetail = async () => {
    try {
      setAllProductLoader(true);

      const responce = await makeApi("/api/my-profile", "GET");
      setUserDetails(responce.data.user);
    } catch (error) {
      console.log(error);
    } finally {
      setAllProductLoader(false);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    history("/product/all-products");
  }

  useEffect(() => {
    fetchUserDetail();
  }, []);

  return (
    <>
      <div className='top_parent_div_all_product' >
        {AllProductLoader ? (
          <div className="All_Product_loader">
            <div className=''>
              <Primaryloader />
            </div>
          </div>
        ) : (
          <div className="UserProfileForMobile_container">
            <div className="top-bar">
              <div className="user-info">
                <img src={userDatails?.userImage} alt="User Avatar" className="avatar" loading='lazy' />
                <span className="username">Hi, {userDatails?.firstName}</span>
              </div>
            </div>
            <div className="menu">
              <ul>
                <li><Link to="/user/userprofile">My Profile</Link></li>
                <li><Link to="/user/my-address">Saved Address</Link></li>
                <li><Link to="/user/my-wishlist">My Wishlist</Link></li>
                <li><Link to="/user/my-orders">My Orders</Link></li>
                <li className='logout_button_mobile' ><button onClick={handleLogout} className='text-danger py-3' ><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-box-arrow-in-left" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M10 3.5a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 1 1 0v2A1.5 1.5 0 0 1 9.5 14h-8A1.5 1.5 0 0 1 0 12.5v-9A1.5 1.5 0 0 1 1.5 2h8A1.5 1.5 0 0 1 11 3.5v2a.5.5 0 0 1-1 0z"/>
                  <path fillRule="evenodd" d="M4.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H14.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708z"/>
                </svg> Logout</button></li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default UserProfileForMobile;
