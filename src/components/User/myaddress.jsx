
import React, { useState, useEffect } from 'react';
import { makeApi } from '../../api/callApi.tsx';
import UserProfileSidebar from './sidebar.jsx';
import { Link } from 'react-router-dom';
import "../../styles/User/myaddress.css";
import Primaryloader from '../loaders/primaryloader.jsx';
import BackButton from '../backButton.jsx';

function Myaddress() {
    const [shippingAddresses, setShippingAddresses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [showDeletePopup, setShowDeletePopup] = useState(false);

    const fetchShippingAddresses = async () => {
        try {
            setLoading(true);
            const response = await makeApi("/api/get-my-shiped-address", "GET");
            setShippingAddresses(response.data.shipedaddress);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching shipping addresses: ", error);
            setLoading(false);
        }
    }

    const handleDeleteClick = (addressId) => {
        setSelectedAddress(addressId);
        setShowDeletePopup(true);
    }

    const confirmDelete = async () => {
        try {
            await makeApi(`/api/delete-shiped-address/${selectedAddress}`, "DELETE");
            // After deletion, fetch the updated list of addresses
            fetchShippingAddresses();
        } catch (error) {
            console.error("Error deleting shipping address: ", error);
        } finally {
            setSelectedAddress(null);
            setShowDeletePopup(false);
        }
    }

    useEffect(() => {
        fetchShippingAddresses();
    }, []);

    return (
        <div>
            <div className='top_parent_div_all_product' >
                {loading ? <div className="All_Product_loader">
                    <div className='' >
                        <Primaryloader />
                    </div>
                </div> :
                    <div className="d-flex">
                        <div className="my_wishlist_mobile_view">
                            <UserProfileSidebar />
                        </div>
                        <div className="hide_for_pc_screen" >
                            <BackButton pageLocation="/user/user-profile" />
                        </div>
                        <div className="shipping-address-container mt-5 pt-5">
                            <div className="shipping-address-title">Shipping Address</div>
                            <div className="shipping-address-list">
                                {loading && <div className='w-100 d-flex justify-content-center' >
                                    <Primaryloader /></div>}
                                {!loading && shippingAddresses.map((address, index) => (
                                    <div className='my_billing_address_details_main_input_div'>
                                        <div key={index} className="address-item">
                                            <label htmlFor={`address-${index}`} className="address-label">
                                                {`${address.firstname} ${address.lastname}, ${address.address}, ${address.city}, ${address.state}, ${address.country}`}
                                            </label>
                                        </div>
                                        <div className='select_button_my_address_div'>
                                            <div>
                                                <Link to={`/user/address/edit-address/${address._id}`}>
                                                    <div>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                                            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                                                        </svg>
                                                    </div>
                                                </Link>
                                            </div>
                                            <div>
                                                <svg onClick={() => handleDeleteClick(address._id)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className='d-flex justify-content-center p-5'>
                                <Link to={"/user/address/add-address"} className='css-for-link-tag'>
                                    <div className='click_buttons_second'>Add more</div>
                                </Link>
                            </div>
                        </div>
                    </div>
                }
            </div>

            {showDeletePopup && (
                <div className="delete-popup">
                    <div className="delete-popup-content">
                        <h3>Are you sure you want to delete this address?</h3>
                        <div className="delete-popup-buttons">
                            <button onClick={confirmDelete}>Delete</button>
                            <button onClick={() => setShowDeletePopup(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Myaddress;
