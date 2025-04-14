"use client"

import { useState } from "react"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile")

  return (
    <div className="new_home_page_profile-container mt-5"  >
     
      {/* Main Content */}
      <main style={{marginTop:"80px"}} className="new_home_page_main-content">
        <div className="new_home_page_tabs-container">
          <div className="new_home_page_tabs-list">
            <button 
              className={`new_home_page_tab-trigger ${activeTab === "profile" ? "new_home_page_active" : ""}`}
              onClick={() => setActiveTab("profile")}
            >
              Profile
            </button>
            <button 
              className={`new_home_page_tab-trigger ${activeTab === "orders" ? "new_home_page_active" : ""}`}
              onClick={() => setActiveTab("orders")}
            >
              Orders
            </button>
            <button 
              className={`new_home_page_tab-trigger ${activeTab === "address" ? "new_home_page_active" : ""}`}
              onClick={() => setActiveTab("address")}
            >
              Address
            </button>
          </div>

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="new_home_page_tab-content new_home_page_profile-tab">
              <div className="new_home_page_section-title">
                <h2>Personal Information</h2>
              </div>

              <div className="new_home_page_profile-image-container">
                <div className="new_home_page_profile-image-wrapper">
                  <div className="new_home_page_profile-image">
                  </div>
                  <button className="new_home_page_change-profile-btn">
                    <span>Change profile information</span>
                  </button>
                </div>
              </div>

              <div className="new_home_page_profile-form">
                <div className="new_home_page_form-group">
                  <label>NAME</label>
                  <input type="text" defaultValue="harmanjot singh" />
                </div>

                <div className="new_home_page_form-group">
                  <label>DATE OF BIRTH</label>
                  <input type="date" placeholder="Date Of Birth" />
                </div>

                <div className="new_home_page_form-group">
                  <label>GENDER</label>
                  <input type="text" placeholder="Gender" />
                </div>

                <div className="new_home_page_form-group">
                  <label>CONTACT NUMBER</label>
                  <input type="tel" placeholder="Phone Number" />
                </div>

                <div className="new_home_page_form-group">
                  <label>EMAIL</label>
                  <input type="email" placeholder="Email Address" />
                </div>

                <button className="new_home_page_save-btn">Save Changes</button>
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === "orders" && (
            <div className="new_home_page_tab-content new_home_page_orders-tab">
              <div className="new_home_page_section-title">
                <h2>My Orders</h2>
              </div>

              {[1, 2].map((order) => (
                <div key={order} className="new_home_page_order-card">
                  <div className="new_home_page_order-header">
                    <span className="new_home_page_order-number">Order #{order}23456</span>
                    <span className={`new_home_page_order-status ${order === 1 ? "new_home_page_delivered" : "new_home_page_processing"}`}>
                      {order === 1 ? "Delivered" : "Processing"}
                    </span>
                  </div>
                  <div className="new_home_page_order-details">
                    <p>Date: {order === 1 ? "12 Apr 2023" : "10 Apr 2023"}</p>
                    <p>Items: {order === 1 ? "3" : "2"} products</p>
                    <p>Total: ₹{order === 1 ? "1,250" : "850"}</p>
                  </div>
                  <button className="new_home_page_view-details-btn">
                    View Details
                  </button>
                </div>
              ))}

              <button className="new_home_page_view-all-orders-btn">
                View All Orders
              </button>
            </div>
          )}

          {/* Address Tab */}
          {activeTab === "address" && (
            <div className="new_home_page_tab-content new_home_page_address-tab">
              <div className="new_home_page_section-title">
                <h2>My Addresses</h2>
              </div>

              <div className="new_home_page_address-card">
                <div className="new_home_page_address-header">
                  <span className="new_home_page_address-name">Home</span>
                  <span className="new_home_page_default-badge">Default</span>
                </div>
                <p className="new_home_page_address-details">
                  Harmanjot Singh
                  <br />
                  123 Main Street, Apartment 4B
                  <br />
                  New Delhi, 110001
                  <br />
                  Phone: +91 98765 43210
                </p>
                <div className="new_home_page_address-actions">
                  <button className="new_home_page_edit-btn">
                    Edit
                  </button>
                  <button className="new_home_page_delete-btn">
                    Delete
                  </button>
                </div>
              </div>

              <div className="new_home_page_address-card">
                <div className="new_home_page_address-header">
                  <span className="new_home_page_address-name">Office</span>
                </div>
                <p className="new_home_page_address-details">
                  Harmanjot Singh
                  <br />
                  456 Business Park, Tower B, Floor 5<br />
                  Gurugram, 122001
                  <br />
                  Phone: +91 98765 43210
                </p>
                <div className="new_home_page_address-actions">
                  <button className="new_home_page_edit-btn">
                    Edit
                  </button>
                  <button className="new_home_page_delete-btn">
                    Delete
                  </button>
                </div>
              </div>

              <button className="new_home_page_add-address-btn">Add New Address</button>
            </div>
          )}
        </div>
      </main>

     

      <style jsx>{`
       
      `}</style>
    </div>
  )
}