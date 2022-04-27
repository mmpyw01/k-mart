import { createSlice } from "@reduxjs/toolkit";

export const cardSlice = createSlice({
  name: "card",
  initialState: {
    cards: [],
    isFetching: false,
    error: false,
  },
  reducers: {
       //GET ALL
      getCardStart: (state) => {
        state.isFetching = true;
        state.error = false;
      },
      getCardSuccess: (state, action) => {
        state.isFetching = false;
        state.cards = action.payload;
      },
      getCardFailure: (state) => {
        state.isFetching = false;
        state.error = true;
      },
       //DELETE
      deleteCardStart: (state) => {
        state.isFetching = true;
        state.error = false;
      },
      deleteCardSuccess: (state, action) => {
        state.isFetching = false;
        state.cards.splice(
          state.cards.findIndex((item) => item._id === action.payload),
          1
        );
      },
      deleteCardFailure: (state) => {
        state.isFetching = false;
        state.error = true;
      },
        //UPDATE
      updateCardStart: (state) => {
        state.isFetching = true;
        state.error = false;
      },
      updateCardSuccess: (state, action) => {
        state.isFetching = false;
        state.cards[
          state.cards.findIndex((item) => item._id === action.payload.id)
        ] = action.payload.card;
      },
      updateCardFailure: (state) => {
        state.isFetching = false;
        state.error = true;
      },
      //UPDATE
      addCardStart: (state) => {
        state.isFetching = true;
        state.error = false;
      },
      addCardSuccess: (state, action) => {
        state.isFetching = false;
        state.cards.push(action.payload);
      },
      addCardFailure: (state) => {
        state.isFetching = false;
        state.error = true;
      },
  },
});

export const {
    getCardStart,
    getCardSuccess,
    getCardFailure,
    deleteCardStart,
    deleteCardSuccess,
    deleteCardFailure,
    updateCardStart,
    updateCardSuccess,
    updateCardFailure,
    addCardStart,
    addCardSuccess,
    addCardFailure,
  } = cardSlice.actions;
  
export default cardSlice.reducer;