import React, { useEffect, useState } from 'react';
import Header from './component/Layout/Header/Header';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import WebFont from "webfontloader";
import Footer from './component/Layout/Footer/Footer';
import Home from './component/home/Home';
import ProductDetail from './component/Product/ProductDetail';
import Product from './component/Product/Product';
import Search from './component/Product/Search';
import LoginSignUp from './component/User/LoginSignUp';
import Profile from './component/User/Profile';
import { store } from './redux/Store';
import { loadUser } from './redux/slice/authSlice';
import { useSelector } from 'react-redux';

import UserOptions from "./component/Layout/Header/UserOptions";
import ProtectedRoute from './component/Route/ProtectedRoute';
import UpdateProfile from './component/User/UpdateProfile';
import UpdatePassword from './component/User/UpdatePassword';
import ForgotPassword from './component/User/ForgotPassword';
import ResetPassword from './component/User/ResetPassword';
import Dashboard from './component/Admin/Dashboard';
import Cart from './component/Cart/Cart';
import Shipping from './component/Cart/Shipping';
import ConfirmOrder from './component/Cart/ConfirmOrder';
import Payment from './component/Cart/Payment';
import axios from 'axios';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripeWrapper from './component/Cart/StripeWrapper';
import OrderSuccess from './component/Cart/OrderSuccess';
import MyOrders from './component/Order/MyOrder';

const App = () => {

  const [stripeLoading,setStripeLoading]=useState("")


 
 const [stripeApiKey,setStripeKey]=useState("")

 async function getStripeKey(){
  setStripeLoading(true)
 const {data}= await axios.get("http://localhost:5000/api/v1/stripeapikey",{
  withCredentials:true
 })
 console.log(data)
setStripeKey(data.stripeApiKey)
setStripeLoading(false)

 }


useEffect(()=>{



store.dispatch(loadUser())
    getStripeKey()

},[])



const {isAuthentiated,user,loading}=useSelector(state=>state.user)
  return (
    <>
    {
      loading && stripeLoading  ?<h1>"loading"</h1>:<Router>
      <Header/>
      {isAuthentiated && <UserOptions user={user} />}
    

     
      
      <Routes>
      
      
      <Route path={"/"}  element={<Home/>} />
      <Route path={"product/:id"}  element={<ProductDetail/>} />
      <Route path={"product"}  element={<Product/>} />
      <Route path={"product/:keyword"}  element={<Product/>} />
      <Route path={"login"}  element={<LoginSignUp/>} />
      <Route path={"search"}  element={<Search/>} />
      
      <Route  path='/profile' element={<ProtectedRoute isAuthenticated={isAuthentiated}  isAdmin={user?.role} adminRoute={false} ><Profile/></ProtectedRoute>}   />
      
      <Route  path='updateprofile' element={<UpdateProfile/>}   />
      
      <Route  path='updatepassword' element={<UpdatePassword/> }  />
      <Route  path='forgetpassword' element={<ForgotPassword/>}   />
      <Route  path='/password/reset/:token' element={<ResetPassword/>}   />
      <Route  path='/cart' element={<Cart/>}   />
      <Route  path='/shipping' element={<Shipping/>}   />
      <Route  path='/order/confirm' element={<ConfirmOrder/>}   />

       
       
       <Route path="/process/payment" element={stripeApiKey ? <StripeWrapper stripeApiKey={stripeApiKey}/>:""} />
     

       <Route  path='/success' element={<OrderSuccess/>}   />
       <Route  path='/orders' element={<MyOrders/>}   />
      </Routes>
      
      
      
      <Footer/>
      </Router>
    }


</>
  )
}

export default App