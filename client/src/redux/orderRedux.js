import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name: "order",
    initialState: {
        isFetching: false,
        error: false,
    },
    reducers: {
        addOrderStart: (state) => {
            console.log("Start")
        },

        addOrderSuccess: (state, action) => {
            console.log("Success",action.payload);

        },
        addOrderFailure: (state) => {
            state.error = true;
        },
        getOrderStart: (state) => {
            state.isFetching = true
            state.error = false
        },
        getOrderSuccess: (state) => {
            state.isFetching = false
        },
        getOrderFailure: (state) => {
            state.isFetching = false
            state.error = true
        },

    },

});

export const { addOrderStart,addOrderSuccess,addOrderFailure,getOrderStart,getOrderFailure,getOrderSuccess } = orderSlice.actions;
export default orderSlice.reducer;