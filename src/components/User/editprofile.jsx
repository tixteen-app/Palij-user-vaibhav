import React, { useState, useEffect } from "react"
import "../../styles/User/editprofile.css"
import { useNavigate } from "react-router-dom"
import { makeApi } from "../../api/callApi.tsx"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import axios from "axios"
import Primaryloader from "../loaders/primaryloader.jsx"
import BackButton from "../backButton.jsx"

const EditUserProfile = () => {
    const navigate = useNavigate()
    const [AllProductLoader, setAllProductLoader] = useState(false);
    const [userUpdating, setUserUpdating] = useState(false)
    const [mobileNumberChanged, setMobileNumberChanged] = useState(false)
    const [editData, setEditData] = useState({
        firstName: "",
        lastName: "",
        gender: "",
        dateofbirth: "",
        // city: "",
        email: "",
        mobileNumber: "",
        userImage: "",
    })
    console.log("---------------------", editData)
    // Fetch existing user details on component mount
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                setAllProductLoader(true);

                const response = await makeApi("/api/my-profile", "GET")
                const user = response.data.user
                setEditData({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    gender: user.gender,
                    // dateofbirth: user?.dateofbirth(0, 10),
                    email: user.email,
                    mobileNumber: user.mobileNumber.toString(),
                    userImage: user.userImage,
                })
            } catch (error) {
                console.log(error)
            } finally {
                setAllProductLoader(false);
            }
        }
        fetchUserDetails()
    }, [])

    const onChangeHandler = (event) => {
        setEditData({
            ...editData,
            [event.target.name]: event.target.value,
        })
        if (event.target.name === "mobileNumber") {
            setMobileNumberChanged(true)
        }
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault()
        try {
            const userDataToUpdate = { ...editData }
            console.log("mobileNumberChanged", mobileNumberChanged)
            if (!mobileNumberChanged) {
                delete userDataToUpdate.mobileNumber
            }
            // show error if mobile number is less than 10 digits
            if (mobileNumberChanged) {
                if (editData.mobileNumber.length < 10) {
                    toast.error("Please enter valid mobile number")
                    return
                }
            }
            //  call api
            setUserUpdating(true)
            const response = await makeApi(
                "/api/update-user",
                "PUT",
                userDataToUpdate
            )
            toast.success(response.data.message, {
                onClose: () => {
                    navigate("/user/userprofile")
                },
            })
        } catch (error) {
            console.log("Error updating user details:", error.response.data.message)
            toast.error(error.response.data.message)
        } finally {
            setUserUpdating(false)
        }
    }
    const handleProfileUpload = async (event, index) => {
        try {
            const file = event.target.files[0]

            // if (file.type.startsWith("image/")) {
            if (file) {
                console.log(file)

                const compressedFile = await file

                const data = new FormData()
                data.append("file", compressedFile)
                data.append("upload_preset", "ou1fk438")

                await axios
                    .post(
                        `https://api.cloudinary.com/v1_1/dyl3gzm7d/image/upload`,

                        data
                    )
                    .then((response) => {
                        if (response.status === 200) {
                            const imageURL = response.data.url
                            // setFormData({ ...formData, screenshot: imageURL });
                            //  setUserProfile(imageURL);
                            setEditData({
                                ...editData,
                                userImage: imageURL,
                            })
                        }
                    })
            }
        } catch (error) {
            console.log("image upload error", error)
        }
    }
    return (
        <>
            <ToastContainer autoClose={1000} />
            <div className='top_parent_div_all_product' >
                {AllProductLoader ? <div className="All_Product_loader">
                    <div className='' >
                        <Primaryloader />
                    </div>
                </div> :
                    <div>
                        <div className="hide_for_pc_screen" >
                            <BackButton pageLocation="/user/userprofile" />
                        </div>

                        <div className="editUserProfile">
                            <form
                                action=""
                                className="edit-form"
                                onSubmit={onSubmitHandler}
                            >
                                <div className="edit-about-section">
                                    <div className="file-input">
                                        <div>
                                            <input
                                                id="file"
                                                type="file"
                                                onChange={(e) => handleProfileUpload(e)}
                                                // required
                                                className="p-5"
                                            />
                                        </div>
                                        <div>
                                            <img
                                                src={editData?.userImage}
                                                alt="profile"
                                            />
                                        </div>
                                    </div>

                                    <div className="about-edit-btn">
                                        <h2>About</h2>
                                    </div>

                                    <div className="edit-username">
                                        <input
                                            type="text"
                                            placeholder="First Name"
                                            name="firstName"
                                            value={editData.firstName}
                                            onChange={onChangeHandler}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Last Name"
                                            name="lastName"
                                            value={editData.lastName}
                                            onChange={onChangeHandler}
                                        />
                                    </div>

                                </div>
                                <div className="edit-contacts">
                                    <h2>Contacts</h2>
                                    <div className="edit-email">
                                        <label htmlFor="">Email</label>
                                        <input
                                            type="email"
                                            placeholder="Johndeo@gmail.com"
                                            name="email"
                                            value={editData.email}
                                            onChange={onChangeHandler}
                                            //   can not be changed
                                            disabled
                                        />
                                    </div>
                                    <div className="edit-pno">
                                        <label htmlFor="">Phone number</label>
                                        <input
                                            type="number"
                                            placeholder="Phone Number"
                                            name="mobileNumber"
                                            value={editData.mobileNumber}
                                            onChange={onChangeHandler}
                                        />
                                    </div>
                                </div>
                                {userUpdating ? <div className="w-100 d-flex justify-content-center" >

                                    <Primaryloader />
                                </div> :
                                    <button
                                        type="submit"
                                        className="edit-save-btn"
                                    >
                                        Update
                                    </button>

                                }
                            </form>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default EditUserProfile
