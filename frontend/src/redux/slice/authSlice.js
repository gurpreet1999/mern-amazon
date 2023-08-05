import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { myurl } from "./api";

const initialState = {
  user:undefined,
  isAuthentiated: false,
  loading:false
};

export const userLogin = createAsyncThunk("user/loginuser", async (dataa,{rejectWithValue}) => {
  try {
    let email = dataa.loginEmail;
    let password = dataa.loginPassword;

    console.log(dataa);
    const config = {
      headers: {
        "Content-type": "application/json",

        withCredentials: true,
      },
    };
    const { data } = await axios.post(
      `${myurl}/login`,
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );

    console.log(data);
    return data;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const userRegister = createAsyncThunk(
  "user/registeruser",
  async (formdata,{rejectWithValue}) => {
    try {
      console.log(formdata);
      const config = {
        headers: { "Content-type": "multipart/form-data" },
        withCredentials: true,
      };
      const { data } = await axios.post(`${myurl}/register`, formdata, config);
      console.log(data);
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const loadUser = createAsyncThunk(
  "user/loaduser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${myurl}/me`, {
        withCredentials: true,
      });

      console.log(data)
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const logout = createAsyncThunk("user/logout", async () => {
  const { data } = await axios.get(`${myurl}/logout`, {
    withCredentials: true,
  });

  return data;
});


export const updateProfile=createAsyncThunk("user/updateprofile",async(formdata)=>{

const {data}=await axios.put(`${myurl}/me/update`,formdata,{
    headers:{
"Content-Type":"multipart/form-data"
    },
    withCredentials:true
})
return data
})



const authSlice = createSlice({
  name: "loggedInUser",
  initialState,
  reducers: {},
  extraReducers: {
    [userLogin.fulfilled]: (state, action) => {
      return action.payload.user;
    },
    [userRegister.fulfilled]: (state, action) => {
      return {
        user: action.payload.user,
        isAuthentiated: true,
      };
    },
    [loadUser.pending]: (state, action) => {
       
return {
    ...state,
    loading:true
}
        
      
    },
    [loadUser.fulfilled]: (state, action) => {
        return {
            ...state,
          user:action.payload.user,
          isAuthentiated:true,
          loading:false,
        }
      
    },
    [loadUser.rejected]: (state, action) => {
      return {
        user: undefined,
        isAuthentiated: false,
        loading:false
      };
    },

    [logout.fulfilled]: (state, action) => {
      return {
        user: undefined,
        isAuthentiated: false,
      };
    },
    [updateProfile.fulfilled]: (state, action) => {
        return {
            loading:false,
          user: action.payload.user,
          isAuthentiated: true,
        };
      },
  },
});

export default authSlice.reducer;
