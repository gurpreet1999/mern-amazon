import React, { useState } from 'react'
import MetaData from '../Layout/MetaData'
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./ResetPassword.css"

const ResetPassword = () => {


  const {token}=useParams()

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
  

const resetpass=async(token,password,confirmPassword)=>{

  const {data}=await axios.put(`http://localhost:5000/api/v1/password/reset/${token}`,{password,confirmPassword},{
    headers:{
    "Content-Type":"application/json"
    },
    withCredentials:true
  })
  console.log(data)

}

const resetPasswordSubmit=(e)=>{
e.preventDefault()

resetpass(token,password,confirmPassword)



}


  return (
   <>
     <MetaData title="Change Password" />
          <div className="resetPasswordContainer">
            <div className="resetPasswordBox">
              <h2 className="resetPasswordHeading">Update Profile</h2>

              <form
                className="resetPasswordForm"
                onSubmit={resetPasswordSubmit}
              >
                <div>
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="resetPasswordBtn"
                />
              </form>
            </div>
          </div>
   
   
   </>
  )
}

export default ResetPassword