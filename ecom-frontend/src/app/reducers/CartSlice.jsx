import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  products: [],
  pagination: {
    currentPage: 1,
    totalPage: 0,
    productsPerPage: 6,
  },
  cart: [],
  totalAmmount: 0,
  order: [],
};

const CartSlice = createSlice({
  name: "CartAndOrder",
  initialState: initialState,
  reducers: {
    allProducts: (state, action) => {
      state.products = action.payload.products;
      state.pagination.totalPage = action.payload.totalPages;
      state.totalProducts = action.payload.totalCount;
    },

    handlePagination: (state, action) => {
      state.pagination.currentPage = action.payload;
    },

    fetchCart: (state, action) => {
      console.log(action.payload, "total cart products");
      state.cart = action.payload;
      state.totalAmmount = action.payload?.reduce((total, product) => {
        return (total += Number(product.price) * Number(product.quantity));
      }, 0);
    },
    addToCart: (state, action) => {
      console.log(action.payload, "action payload");
      const { price, productId } = action.payload;

      let item = state.cart.findIndex(
        (product) => product.productId === productId
      );

      if (item !== -1) {
        state.cart[item].quantity += 1;
        state.totalAmmount += Number(price);
      } else state.cart.push(action.payload);
    },
    removeProduct: (state, action) => {
      let item = state.cart.findIndex((p) => p.productId === action.payload);
      console.log(item, "dkjjfhkdj");
      if (item !== -1) {
        state.totalAmmount -= Number(state.cart[item].price);
        state.cart.splice(item, 1);
      }
    },
    removeFromCart: (state, action) => {
      console.log(action.payload, "remove form cart");
      const { price, productId } = action.payload;
      const itemIndex = state.cart.findIndex(
        (product) => product.productId === productId
      );

      if (itemIndex !== -1) {
        if (state.cart[itemIndex].quantity > 1) {
          state.cart[itemIndex].quantity -= 1;
          state.totalAmmount -= Number(price);
        } else {
          state.cart.splice(itemIndex, 1);
          state.totalAmmount -= Number(price);
        }
      }
    },
    resetCartState: () => initialState,
  },
});

export const {
  allProducts,
  fetchCart,
  addToCart,
  removeFromCart,
  removeProduct,
  handlePagination,
  resetCartState,
} = CartSlice.actions;
export default CartSlice.reducer;
