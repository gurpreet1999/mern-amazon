import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { myurl } from "./api";

const initialState = {
  cartitem: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
    shippingInfo:localStorage.getItem("shippingInfo")?JSON.parse(localStorage.getItem("shippingInfo")):{}
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = action.payload;
      console.log(item);

      const deatilToBeAddedToCart={
              product:item._id,
              name: item.name,
              price:item.price,
              image: item.images[0].url,
              stock: item.Stock,
              
      }

      const existingIndex = state.cartitem.findIndex((i) => i.product === item._id);

      console.log(existingIndex);

      if (existingIndex >= 0) {
        state.cartitem[existingIndex] = {
          ...state.cartitem[existingIndex],
          quantity: state.cartitem[existingIndex].quantity + 1,
        };
      } else {
        let tempProduct = { ...deatilToBeAddedToCart, quantity: 1 };
       
        state.cartitem.push(tempProduct);
       
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartitem));
    },

    increaseQuantityOfCartItem(state,action){
     
        const id=action.payload;
        console.log(action.payload)

        const item=state.cartitem.findIndex((i)=>i._id===id)

        console.log(item)

        state.cartitem[item]={
            ...state.cartitem[item],
            quantity:state.cartitem[item].quantity+1
        }

        localStorage.setItem("cartItems",JSON.stringify(state.cartitem))

       },
    decreaseQuantityOfCartItem(state,action){
        const itemId=action.payload

        const item=state.cartitem.findIndex((i)=>i._id===itemId)

        state.cartitem[item]={
            ...state.cartitem[item],
            quantity:state.cartitem[item].quantity-1
        }

        localStorage.setItem("cartItems",JSON.stringify(state.cartitem))
    },
    removeItemFromCart(state,action){

        const itemId=action.payload

        const item=state.cartitem.findIndex((i)=>i._id===itemId)

        console.log(item)

        state.cartitem.splice(item,1)

        localStorage.setItem("cartItems",JSON.stringify(state.cartitem))


         
    },

    clearCart(state,action){

state.cartitem=[]

localStorage.setItem("cartItems",JSON.stringify(state.cartitem))

    }
    ,addShippingInfo(state,action){
        localStorage.setItem("shippingInfo",JSON.stringify(action.payload))
       return {
        ...state.cartitem,
        shippingInfo:action.payload

       }
     

    }
  },

  extraReducers: {},
});

export const {addShippingInfo,addToCart,increaseQuantityOfCartItem,decreaseQuantityOfCartItem,clearCart,removeItemFromCart } = cartSlice.actions;

export default cartSlice.reducer;
