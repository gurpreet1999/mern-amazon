import React, { useState } from 'react'
import MetaData from '../Layout/MetaData'
import "./ForgotPassword.css"

import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import axios from 'axios';





const ForgotPassword = () => {


    const [email, setEmail] = useState("");

    const forgotpass=async(email)=>{

    const {data}=  await axios.post("http://localhost:5000/api/v1/password/forget",{
        email
      },{
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true
      })

    }

const forgotPasswordSubmit=(e)=>{
    e.preventDefault();
    forgotpass(email)
    

}


  return (
   <>
   
   <MetaData title="Forgot Password" />
          <div className="forgotPasswordContainer">
            <div className="forgotPasswordBox">
              <h2 className="forgotPasswordHeading">Forgot Password</h2>

              <form
                className="forgotPasswordForm"
                onSubmit={forgotPasswordSubmit}
              >
                <div className="forgotPasswordEmail">
                  <MailOutlinedIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <input
                  type="submit"
                  value="Send"
                  className="forgotPasswordBtn"
                />
              </form>
            </div>
          </div>
   
   
   </>
  )
}

export default ForgotPassword