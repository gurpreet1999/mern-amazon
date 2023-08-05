import React, { useEffect, useState } from 'react'
import MetaData from '../Layout/MetaData'
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../redux/slice/authSlice';
import FaceIcon from '@mui/icons-material/Face';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import "./UpdateProfile.css"


const UpdateProfile = () => {


  const dispatch=useDispatch()
  const {user}=useSelector((state)=>state.user)

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("/Profile.png");




const updateProfileSubmit=(e)=>{
e.preventDefault()

const myForm=new FormData()
myForm.set("name",name)
myForm.set("email",email)
myForm.set("file",avatar)

dispatch(updateProfile(myForm))


}

const updateProfileDataChange=(e)=>{

    const fileReader=new FileReader()
    setAvatar(e.target.files[0])
fileReader.readAsDataURL()


fileReader.onload=()=>{
if(fileReader.readyState===2){
    setAvatarPreview(fileReader.result)
    
}
}


}

useEffect(()=>{
if(user){
    setName(user.name)
    setEmail(user.email)
    setAvatarPreview(user.avatar.url)
}

},[user])

  return (
    <>

<MetaData title="Update Profile" />
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Update Profile</h2>

              <form
                className="updateProfileForm"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="updateProfileName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="updateProfileEmail">
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

                <div id="updateProfileImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="updateProfileBtn"
                />
              </form>
            </div>
          </div>


    </>
  )
}

export default UpdateProfile