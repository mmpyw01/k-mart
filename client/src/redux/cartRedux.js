import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      const product = action.payload;
      console.log(action.payload)
      console.log("asdasd");

      //กรองเอาไอดีเหมือนกันก่อน
      let selfProductId = state.products.filter(x => x._id === product._id)
      //กรองเอาไซส์
      let selfProductSize = selfProductId.filter(x => x.size === product.size)
      //หาตัวที่สีตรงกัน
      let selfProduct = selfProductSize.find(x => x.color === product.color)

      // let selfProduct = state.products.find(x => x._id === product._id)


      if (selfProduct) {
        console.log("dup")
        state.quantity += 0;
        selfProduct.quantity += product.quantity;
        state.products.length = state.products.length;
        state.total += action.payload.price * action.payload.quantity;

      } else {
        state.quantity += 1;
        state.products.push(action.payload);
        state.total += action.payload.price * action.payload.quantity;
      }

      // state.quantity = 0;
      // state.products = [];
      // state.total = 0;


    },
    updateProduct: (state, action) => {
      console.log("asdasd", action);
      console.log("first", action.payload.product._id)
      const product = action.payload.product;

      //กรองเอาไอดีเหมือนกันก่อน
      let selfProductId = state.products.filter(x => x._id === product._id)
      //กรองเอาไซส์
      let selfProductSize = selfProductId.filter(x => x.size === product.size)
      console.log("selfProductSize",state.products)
      //หาตัวที่สีตรงกัน
      let selfProduct = selfProductSize.find(x => x.color === product.color)


      console.log("action");
      if (action.payload.toDo === "dec") {
        if (product.quantity === 1) {
          state.quantity -= 1;
          state.products.pop(product);
          state.total -= product.price;
        }
        else {
          console.log("if 1 else")
          state.quantity -= 0;
          state.products.length = state.products.length;
          selfProduct.quantity -= 1;
          state.total -= product.price;
        }

      } else if (action.payload.toDo === "inc") {

        console.log("selfProduct", selfProduct)
        console.log("Product", product)


        state.quantity += 0;
        selfProduct.quantity += 1;

        //selfProduct.quantity = product.quantity
        state.products.length = state.products.length
        state.total += action.payload.price * action.payload.quantity;

      } else {
        console.log("ERROR @cartRedux")
      }


    },
    resetProduct: (state) => {
      // console.log("beforeReset",state.products)
      state.quantity = 0;
      state.products = [];
      state.total = 0;
      // console.log("afterReset",state.products)
      console.log("resetProduct")
    },
  },

});

export const { addProduct, updateProduct, resetProduct } = cartSlice.actions;
export default cartSlice.reducer;