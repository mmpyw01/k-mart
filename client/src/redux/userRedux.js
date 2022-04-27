import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
    name: "user",
    initialState: {
      currentUser : null,
      isFetching: false,
      error:false
    },
    reducers: {
      loginStart:(state)=>{
        state.isFetching=true
      },
      loginSuccess:(state,action)=>{
        state.isFetching=false;
        state.currentUser=action.payload
      },
      loginFailure:(state)=>{
        state.isFetching=false;
        state.error=true
      },
      addOrderStart:(state)=>{
        state.isFetching=true
      },
      addOrderSuccess:(state,action)=>{
        state.isFetching=false;
        state.currentUser=action.payload
      },
      addOrderFailure:(state)=>{
        state.isFetching=false;
        state.error=true
      },
      updateStart: (state) => {
        state.isFetching = true
      },
      updateSuccess: (state, action) => {
        state.isFetching = false;
        //state.currentUser = action.payload;
      },
      updateFailure: (state) => {
        state.isFetching = false;
        state.error = true;
      },
      registerStart: (state) => {
        state.isFetching = true
      },
      registerSuccess: (state, action) => {
        state.isFetching = false;
        //state.currentUser = action.payload;
      },
      registerFailure: (state) => {
        state.isFetching = false;
        state.error = true;
      },
    },
  });
  
  export const { loginStart,loginSuccess,loginFailure,addOrderStart,addOrderSuccess,addOrderFailure,updateStart,updateSuccess,updateFailure,registerStart,registerSuccess,registerFailure } = userSlice.actions;
  export default userSlice.reducer;