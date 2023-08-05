
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { myurl } from "./api";

const initialState={
products:[],

}


export const fetchProducts=createAsyncThunk("product/fetchproduct",async(keyword="",currentPage,price=[0,25000],category="",rating)=>{
try{
console.log("he;p")
const response=await axios.get(`${myurl}/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`)
console.log(response)
return response.data


}
catch(err){

}
})






const productSlice=createSlice({
name:"product",
initialState,
reducers:{},
extraReducers:{
    [fetchProducts.fulfilled]:(state,action)=>{
        return action.payload
     },
    
}
})


export default productSlice.reducer



