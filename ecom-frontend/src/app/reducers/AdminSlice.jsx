import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  products: [],
  pagination: {
    currentPage: 1,
    totalPage: 0,
    productsPerPage: 6,
  },
  totalProducts: 0,
};

const AdminSlice = createSlice({
  name: "adminslice",
  initialState: initialState,
  reducers: {
    storeProductData: (state, action) => {
      state.products = action.payload.products;
      state.pagination.totalPage = action.payload.totalPages;
      state.totalProducts = action.payload.totalCount;
    },
    deleteProduct: (state, action) => {
      console.log(action.payload, "payload");
      const { productId } = action.payload;
      const product = state.products.findIndex((prod) => prod._id == productId);
      console.log(product, "delete from slice");

      if (product !== -1) {
        state.products.splice(product, 1);
      }
    },
    handlePagination: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
    resetAdminState: () => initialState,
  },
});
export const {
  storeProductData,
  handlePagination,
  resetAdminState,
  deleteProduct,
} = AdminSlice.actions;
export default AdminSlice.reducer;
