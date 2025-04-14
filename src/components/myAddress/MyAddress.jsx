// import React, { useState, useEffect } from "react"
// import "./myAddress.css"
// import { useNavigate } from "react-router"
// import { makeApi } from "../../api/callApi"

// const MyAddress = () => {
//   const [billingAddresses, setBillingAddresses] = useState([])
//   const [shippingAddresses, setShippingAddresses] = useState([])
//   const [deleteProductId, setDeleteProductId] = useState(null)

//   // Handle confirmation of deletion
//    const handleDeleteConfirm = async () => {
//     if (deleteProductId) {
//       if (billingAddresses.some((address) => address._id === deleteProductId)) {
//         await deleteBillingAddress(deleteProductId)
//       } else if (
//         shippingAddresses.some((address) => address._id === deleteProductId)
//       ) {
//         await deleteShippingAddress(deleteProductId)
//       }
//       setDeleteProductId(null)
//     }
//   }

//   // Delete billing address
//   const deleteBillingAddress = async (productId) => {
//     try {
//       const response = await makeApi(
//         `/api/delete-billing-address/${productId}`,
//         "DELETE"
//       )
//       setBillingAddresses(
//         billingAddresses.filter((address) => address._id !== productId)
//       )
//     } catch (error) {
//       console.error("Error deleting billing address:", error)
//     }
//   }

//   // Delete shipping address
//   const deleteShippingAddress = async (productId) => {
//     try {
//       const response = await makeApi(
//         `/api/delete-shiped-address/${productId}`,
//         "DELETE"
//       )
//       setShippingAddresses(
//         shippingAddresses.filter((address) => address._id !== productId)
//       )
//     } catch (error) {
//       console.error("Error deleting shipping address:", error)
//     }
//   }

//   const navigator = useNavigate()

//   // Fetch billing addresses
//   const fetchBillingAddresses = async () => {
//     try {
//       const response = await makeApi("/api/get-my-billing-address", "GET")
//       if (response.data.success) {
//         setBillingAddresses(response.data.billingaddress)
//       }
//     } catch (error) {
//       console.error("Error fetching billing addresses:", error)
//     }
//   }

//   // Fetch shipping addresses
//   const fetchShippingAddresses = async () => {
//     try {
//       const response = await makeApi("/api/get-my-shiped-address", "GET")
//       if (response.data.success) {
//         setShippingAddresses(response.data.shipedaddress)
//       }
//     } catch (error) {
//       console.error("Error fetching shipping addresses:", error)
//     }
//   }

//   useEffect(() => {
//     fetchBillingAddresses()
//     fetchShippingAddresses()
//   }, [])

//   // Handle modal cancel
//   const cancelDelete = () => {
//     setDeleteProductId(null)
//   }

//   // Handle modal confirm delete
//   const confirmDelete = () => {
//     handleDeleteConfirm()
//     setDeleteProductId(null)
//   }

//   return (
//     <div className="myaddress">
//       <div className="userprofile-heading">
//         <h1>MY ADDRESS</h1>
//       </div> 
//       <div className="shipping-billing-address">
//         <p>
//           The following addresses will be used on the checkout page by default.
//         </p>
//         <div className="shipping-billing-flex d-flex justify-content-between">
//           <div className="billing-addressz"> 
//             <h2 className="n_shipp_bill">SHIPPING ADDRESS</h2>
//             <div className="d-flex flex-column gap-2">
//               <button
//                 className="ship_bill_add"
//                 onClick={() => navigator("/shipping-address")}
//               >
//                 Add Shipping Address
//               </button>
//               <div className="shipping_Address_main_div_my_profile">
//                 {shippingAddresses.map((address) => (
//                   <div
//                     key={address._id}
//                     className="billing-address a_shipp_bill"
//                   >
//                     <div className="billing-address-flex">
//                       <h3>SHIPPING ADDRESS</h3>
//                       <div>
//                         <button
//                           onClick={() =>
//                             navigator(`/edit-shipping-address/${address._id}`)
//                           }
//                         >
//                           Edit
//                         </button>
//                         <button onClick={() => setDeleteProductId(address._id)}>
//                           DELETE
//                         </button>
//                       </div>
//                     </div>
//                     <p className="user_Details_my_Address_page" >
//                       {`${address.firstname}, ${address.lastname}, ${address.address}, ${address.city}, ${address.state} ${address.pincode}`}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Custom Delete Confirmation Modal */}
//       {deleteProductId !== null && (
//         <div className="confirmation-dialog">
//           <div className="dialog-content">
//             <h2>Confirm Deletion</h2>
//             <p>Are you sure you want to remove this address?</p>
//             <div className="dialog-buttons_both">
//               <button onClick={confirmDelete} className="confirm-button">
//                 Confirm
//               </button>
//               <button onClick={cancelDelete} className="cancel-button">
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default MyAddress

// import React, { useState, useEffect } from "react";
// import "./myAddress.css";
// import { useNavigate } from "react-router";
// import { makeApi } from "../../api/callApi";

// const MyAddress = () => {
//   const [billingAddresses, setBillingAddresses] = useState([]);
//   const [shippingAddresses, setShippingAddresses] = useState([]);
//   const [deleteProductId, setDeleteProductId] = useState(null);
//   const navigator = useNavigate();

//   const handleDeleteConfirm = async () => {
//     if (!deleteProductId) return;

//     try {
//       if (billingAddresses.some((address) => address._id === deleteProductId)) {
//         await makeApi(`/api/delete-billing-address/${deleteProductId}`, "DELETE");
//         setBillingAddresses(billingAddresses.filter((address) => address._id !== deleteProductId));
//       } else if (shippingAddresses.some((address) => address._id === deleteProductId)) {
//         await makeApi(`/api/delete-shiped-address/${deleteProductId}`, "DELETE");
//         setShippingAddresses(shippingAddresses.filter((address) => address._id !== deleteProductId));
//       }
//     } catch (error) {
//       console.error("Error deleting address:", error);
//     } finally {
//       setDeleteProductId(null);
//     }
//   };

//   const fetchAddresses = async () => {
//     try {
//       const [billingResponse, shippingResponse] = await Promise.all([
//         makeApi("/api/get-my-billing-address", "GET"),
//         makeApi("/api/get-my-shiped-address", "GET")
//       ]);

//       if (billingResponse.data.success) {
//         setBillingAddresses(billingResponse.data.billingaddress);
//       }
//       if (shippingResponse.data.success) {
//         setShippingAddresses(shippingResponse.data.shipedaddress);
//       }
//     } catch (error) {
//       console.error("Error fetching addresses:", error);
//     }
//   };

//   useEffect(() => {
//     fetchAddresses();
//   }, []);

//   return (
//     <div className="myaddress-container">
//       <div className="address-header">
//         <h1>MY ADDRESS</h1>
//       </div> 
      
//       <div className="address-content">
//         <p className="address-description">
//           The following addresses will be used on the checkout page by default.
//         </p>
        
//         <div className="address-sections">
//           <div className="address-section"> 
//             <h2>SHIPPING ADDRESS</h2>
//             <div className="address-actions">
//               <button
//                 className="add-address-btn"
//                 onClick={() => navigator("/shipping-address")}
//               >
//                 Add Shipping Address
//               </button>
              
//               <div className="address-list">
//                 {shippingAddresses.map((address) => (
//                   <div key={address._id} className="address-card">
//                     <div className="address-card-header">
//                       <h3>SHIPPING ADDRESS</h3>
//                       <div className="address-card-actions">
//                         <button onClick={() => navigator(`/edit-shipping-address/${address._id}`)}>
//                           Edit
//                         </button>
//                         <button onClick={() => setDeleteProductId(address._id)}>
//                           Delete
//                         </button>
//                       </div>
//                     </div>
//                     <p className="address-details">
//                       {`${address.firstname}, ${address.lastname}, ${address.address}, ${address.city}, ${address.state} ${address.pincode}`}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Delete Confirmation Modal */}
//       {deleteProductId && (
//         <div className="confirmation-modal">
//           <div className="modal-content">
//             <h2>Confirm Deletion</h2>
//             <p>Are you sure you want to remove this address?</p>
//             <div className="modal-actions">
//               <button onClick={handleDeleteConfirm} className="confirm-btn">
//                 Confirm
//               </button>
//               <button onClick={() => setDeleteProductId(null)} className="cancel-btn">
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyAddress;

import React, { useState, useEffect } from "react";
import "./myAddress.css";
import { useNavigate } from "react-router";
import { makeApi } from "../../api/callApi";

const MyAddress = () => {
  const [billingAddresses, setBillingAddresses] = useState([]);
  const [shippingAddresses, setShippingAddresses] = useState([]);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const navigate = useNavigate();

  const handleDeleteConfirm = async () => {
    if (!deleteProductId) return;

    try {
      if (billingAddresses.some((address) => address._id === deleteProductId)) {
        await makeApi(`/api/delete-billing-address/${deleteProductId}`, "DELETE");
        setBillingAddresses(billingAddresses.filter((address) => address._id !== deleteProductId));
      } else if (shippingAddresses.some((address) => address._id === deleteProductId)) {
        await makeApi(`/api/delete-shiped-address/${deleteProductId}`, "DELETE");
        setShippingAddresses(shippingAddresses.filter((address) => address._id !== deleteProductId));
      }
    } catch (error) {
      console.error("Error deleting address:", error);
    } finally {
      setDeleteProductId(null);
    }
  };

  const fetchAddresses = async () => {
    try {
      const [billingResponse, shippingResponse] = await Promise.all([
        makeApi("/api/get-my-billing-address", "GET"),
        makeApi("/api/get-my-shiped-address", "GET")
      ]);

      if (billingResponse.data.success) {
        setBillingAddresses(billingResponse.data.billingaddress);
      }
      if (shippingResponse.data.success) {
        setShippingAddresses(shippingResponse.data.shipedaddress);
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const renderAddressCard = (address, isShipping = true) => (
    <div key={address._id} className="new_home_page_address-card">
      <div className="new_home_page_address-header">
        {/* <span className="new_home_page_address-name">{address.addressType || (isShipping ? "Shipping" : "Billing")}</span> */}
        {address.isDefault && <span className="new_home_page_default-badge">Default</span>}
      </div>
      <p className="new_home_page_address-details m-0">
        <b > {`${address.firstname || ''} ${address.lastname || ''}`}</b>
        <br />
        {address.address}
        {address.landmark && `, ${address.landmark}`}
        <br />
        {`${address.city || ''}, ${address.state || ''} ${address.pincode || ''}`}
        <br />
        {address.mobileNumber && `Phone: +91 ${address.mobileNumber}`}
      </p>
      <div className="new_home_page_address-actions">
        <button 
          className="new_home_page_edit-btn"
          onClick={() => navigate(isShipping ? `/edit-shipping-address/${address._id}` : `/edit-billing-address/${address._id}`)}
        >
          Edit
        </button>
        <button 
          className="new_home_page_delete-btn"
          onClick={() => setDeleteProductId(address._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );

  return (
    <div className="new_home_page_tab-content new_home_page_address-tab">
      <div className="new_home_page_section-title">
        <h2>Saved Addresses</h2>
      </div>

      {shippingAddresses.length > 0 && (
        <div div className="d-flex flex-wrap gap-5">
          {/* <h3>Shipping Addresses</h3> */}
          {shippingAddresses.map(address => renderAddressCard(address, true))}
        </div>
      )}

   
      <button 
        className="new_home_page_add-address-btn"
        onClick={() => navigate("/shipping-address")}
      >
        Add New Address
      </button>

      {/* Delete Confirmation Modal */}
      {deleteProductId && (
        <div className="confirmation-modal">
          <div className="modal-content">
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to remove this address?</p>
            <div className="modal-actions">
              <button onClick={handleDeleteConfirm} className="confirm-btn">
                Confirm
              </button>
              <button onClick={() => setDeleteProductId(null)} className="cancel-btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAddress;