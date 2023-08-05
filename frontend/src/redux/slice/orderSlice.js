import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { myurl } from "./api";

const initialState={
myorder:[],

}


export const createOrder= createAsyncThunk("order/createorder",async(order)=>
{

const {data}=await axios.post(`${myurl}/order/new`,order,{

    headers:{
        "Content-Type":"application/json"

    },
    withCredentials:true

})

console.log(data)



return data.order
})



export const fetchMyOrder= createAsyncThunk("order/fetchmyorder",async()=>
{

const {data}=await axios.get(`${myurl}/orders/me`,{

   
    withCredentials:true

})

console.log(data)

return data.orders


})




const orderSlice=createSlice({
name:"order",
initialState,
reducers:{},
extraReducers:{
    [createOrder.fulfilled]:(state,action)=>{
       


 
    },
    [fetchMyOrder.fulfilled]:(state,action)=>{
        
   state.myorder=action.payload

   }
    
}
})


export default orderSlice.reducer



