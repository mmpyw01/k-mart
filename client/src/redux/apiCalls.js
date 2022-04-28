import { loginFailure, loginStart, loginSuccess,addOrderStart,addOrderSuccess,addOrderFailure,updateStart,
  updateSuccess, 
  updateFailure,registerStart,registerSuccess,registerFailure } from "./userRedux";
import { publicRequest, userRequest } from "../requestMethods";
import { 
  getCardFailure, 
  getCardStart, 
  getCardSuccess,
  deleteCardStart,
  deleteCardSuccess,
  deleteCardFailure,
  updateCardStart,
  updateCardSuccess,
  updateCardFailure,
  addCardStart,
  addCardSuccess,
  addCardFailure
} from "./cardRedux";
import { getOrderFailure, getOrderStart, getOrderSuccess } from "./orderRedux";
import { setToken } from './../requestMethods';

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const getCards = async (dispatch) => {
  dispatch(getCardStart());
  try {
    const res = await publicRequest.get("/cards");
    dispatch(getCardSuccess(res.data));
  } catch (err) {
    dispatch(getCardFailure());
  }
};

export const getUserCard = async (userId) => {
  //dispatch(getOrderStart());
  try {
    const res = await publicRequest.get(`/orders/trade/${userId}`);
    //dispatch(getOrderSuccess(res.data));
  } catch (err) {
    //dispatch(getOrderFailure());
  }
};

export const getUserOrder = async (userId) => {
  //dispatch(getOrderStart());
  try {
    const res = await publicRequest.get(`/orders/${userId}`);
    //dispatch(getOrderSuccess(res.data));
  } catch (err) {
    //dispatch(getOrderFailure());
  }
};

export const getOrder = async (dispatch) => {
  dispatch(getOrderStart());
  try {
    const res = await publicRequest.get("/products");
    dispatch(getOrderSuccess(res.data));
  } catch (err) {
    dispatch(getOrderFailure());
  }
};

export const deleteCard = async (id, dispatch) => {
  dispatch(deleteCardStart());
  try {
    //const res = await userRequest.delete("`/cards/${id}`");
    dispatch(deleteCardSuccess(id));
  } catch (err) {
    dispatch(deleteCardFailure());
  }
};

export const updateCard = async (id, card, dispatch) => {
  dispatch(updateCardStart());
  try {
    console.log("update")
    const res = await userRequest.put(`/cards/${id}`, card);
    dispatch(updateCardSuccess({ id, card }));
    console.log("updateSuccess")
  } catch (err) {
    dispatch(updateCardFailure());
    console.log("updateFailure")
  }
};

export const addCard = async (card, dispatch) => {
  dispatch(addCardStart());
  try {
    const res = await userRequest.post(`/cards`, card);
    dispatch(addCardSuccess(res.data));
  } catch (err) {
    dispatch(addCardFailure());
  }
};

export const addOrder = async (order, dispatch) => {
  console.log("order", order)
  //console.log("dispatch",dispatch)

  dispatch((addOrderStart));

  try {
    console.log("try")
    //setToken()
    const res = await publicRequest.post(`/orders`, order);
    dispatch(addOrderSuccess(res));
    console.log("fin")
  } catch (err) {
    dispatch(addOrderFailure());
    console.log("Failed add order")
  }

};

export const update = async (user, dispatch) => {
  dispatch((updateStart()));
  try {
    console.log("try")
    setToken()
    const res = await userRequest.put(`/users/${user.userid}`, user);
    dispatch(updateSuccess(res));
    console.log("fin")
  } catch (err) {
    dispatch(updateFailure());
    console.log("Failed updated")
  }
};

export const register = async (dispatch, user) => {
  dispatch(registerStart());
  try {
    console.log("try")
    const res = await publicRequest.post("/auth/register", user);
    dispatch(registerSuccess(res.data));
    console.log("fin")
  } catch (err) {
    dispatch(registerFailure());
    console.log("Failed register")
  }
};

export const createConversations = async (pair) => {
  console.log("pair create", pair)
  //console.log("dispatch",dispatch)

  //dispatch((addConversationsStart()));

  try {
    console.log("try")
    setToken()
    const res = await userRequest.post(`/conversations`, pair);
    //dispatch(addConversationsSuccess(res));
    console.log("fin createConversation",res)
    return res
  } catch (err) {
    //dispatch(addConversationsFailure());
    console.log("Failed create conversations")
  }

};


export const checkConversations = async (pair) => {
  console.log("pair check", pair)

  try {
    console.log("try")
    setToken()
    const res = await userRequest.get(`/conversations/find/${pair.senderId}/${pair.receiverId}`);
    console.log("fin checkConversation",res)
    return res
  } catch (err) {
    console.log("Failed go create conversations")
  }

};

export const getUserByUsername = async (username) => {
  try {
    const res = await userRequest.get(`/users/find/username/${username}`);
    console.log(res)
    return res
  } catch (err) {
    console.log(err)
  }
};