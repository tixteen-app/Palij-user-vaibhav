import React, { useState } from "react"
import "../../../styles/Home/uptoDate/uptodate.css"
import { ToastContainer, toast } from "react-toastify";
import { makeApi } from '../../../api/callApi.tsx';
function Uptodate() {
  
	const [email, setEmail] = useState("")

	const handleSubmit = async (event) => {
		event.preventDefault()
		if (!email) {
			toast.error("Please fill email")
			return
		}
		try {
			const response = await makeApi("/api/create-subscribe", "POST", { email })
			 if(response.data.success === true){
				toast.success(response.data.message, {
					onClose: () => {
						setEmail("")
					}
				})
			}
		} catch (error) {
			toast.error(error.response.data.message)
			console.error("Error sending data:", error.response.data.message)
		}
	}

  return (
    <>
    <ToastContainer/>
    <div className='uptodate_main_div' >
        <div className='Main_Home_heading'>Stay up-to-date</div>
        <div className='uptodate_sub_div' >
            <div className='uptodate_input_div' >
                <input type='email' placeholder='Email Address' className='uptodate_input'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                
                />
            </div>
            <div className='uptodate_Subscribe_buttons' onClick={(e) => handleSubmit(e)} >
                Subscribe
            </div>
        </div>
    </div>
    </>
  )
}

export default Uptodate