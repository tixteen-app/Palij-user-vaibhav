import React, { useState, useEffect } from "react"
import "./myAddress.css"
import { useNavigate } from "react-router"
import { makeApi } from "../../api/callApi"

const MyAddress = () => {
  const [billingAddresses, setBillingAddresses] = useState([])
  const [shippingAddresses, setShippingAddresses] = useState([])
  const [deleteProductId, setDeleteProductId] = useState(null)

  // Handle confirmation of deletion
  const handleDeleteConfirm = async () => {
    if (deleteProductId) {
      if (billingAddresses.some((address) => address._id === deleteProductId)) {
        await deleteBillingAddress(deleteProductId)
      } else if (
        shippingAddresses.some((address) => address._id === deleteProductId)
      ) {
        await deleteShippingAddress(deleteProductId)
      }
      setDeleteProductId(null)
    }
  }

  // Delete billing address
  const deleteBillingAddress = async (productId) => {
    try {
      const response = await makeApi(
        `/api/delete-billing-address/${productId}`,
        "DELETE"
      )
      setBillingAddresses(
        billingAddresses.filter((address) => address._id !== productId)
      )
    } catch (error) {
      console.error("Error deleting billing address:", error)
    }
  }

  // Delete shipping address
  const deleteShippingAddress = async (productId) => {
    try {
      const response = await makeApi(
        `/api/delete-shiped-address/${productId}`,
        "DELETE"
      )
      setShippingAddresses(
        shippingAddresses.filter((address) => address._id !== productId)
      )
    } catch (error) {
      console.error("Error deleting shipping address:", error)
    }
  }

  const navigator = useNavigate()

  // Fetch billing addresses
  const fetchBillingAddresses = async () => {
    try {
      const response = await makeApi("/api/get-my-billing-address", "GET")
      if (response.data.success) {
        setBillingAddresses(response.data.billingaddress)
      }
    } catch (error) {
      console.error("Error fetching billing addresses:", error)
    }
  }

  // Fetch shipping addresses
  const fetchShippingAddresses = async () => {
    try {
      const response = await makeApi("/api/get-my-shiped-address", "GET")
      if (response.data.success) {
        setShippingAddresses(response.data.shipedaddress)
      }
    } catch (error) {
      console.error("Error fetching shipping addresses:", error)
    }
  }

  useEffect(() => {
    fetchBillingAddresses()
    fetchShippingAddresses()
  }, [])

  // Handle modal cancel
  const cancelDelete = () => {
    setDeleteProductId(null)
  }

  // Handle modal confirm delete
  const confirmDelete = () => {
    handleDeleteConfirm()
    setDeleteProductId(null)
  }

  return (
    <div className="myaddress">
      <div className="userprofile-heading">
        <h1>MY ADDRESS</h1>
      </div> 
      <div className="shipping-billing-address">
        <p>
          The following addresses will be used on the checkout page by default.
        </p>
        <div className="shipping-billing-flex d-flex justify-content-between">
          <div className="billing-addressz"> 
            <h2 className="n_shipp_bill">SHIPPING ADDRESS</h2>
            <div className="d-flex flex-column gap-2">
              <button
                className="ship_bill_add"
                onClick={() => navigator("/shipping-address")}
              >
                Add Shipping Address
              </button>
              <div className="shipping_Address_main_div_my_profile">
                {shippingAddresses.map((address) => (
                  <div
                    key={address._id}
                    className="billing-address a_shipp_bill"
                  >
                    <div className="billing-address-flex">
                      <h3>SHIPPING ADDRESS</h3>
                      <div>
                        <button
                          onClick={() =>
                            navigator(`/edit-shipping-address/${address._id}`)
                          }
                        >
                          Edit
                        </button>
                        <button onClick={() => setDeleteProductId(address._id)}>
                          DELETE
                        </button>
                      </div>
                    </div>
                    <p className="p-1" >
                      {`${address.firstname}, ${address.lastname}, ${address.address}, ${address.city}, ${address.state} ${address.pincode}`}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Delete Confirmation Modal */}
      {deleteProductId !== null && (
        <div className="confirmation-dialog">
          <div className="dialog-content">
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to remove this address?</p>
            <div className="dialog-buttons_both">
              <button onClick={confirmDelete} className="confirm-button">
                Confirm
              </button>
              <button onClick={cancelDelete} className="cancel-button">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MyAddress
