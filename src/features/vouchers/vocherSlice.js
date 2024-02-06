import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// post voucher
export const postVoucher = createAsyncThunk(
  "vouchers/postVoucher",
  async (data) => {
    console.log('data', data)
    try {
      const response = await axios.post(
        "http://5.189.180.8:8010/header/multiple",
        data
      );
      if (!response.data) {
        throw new Error("cannot post voucher");
      }
      console.log('data',response.data)
      return response.data;
    } catch (error) {
      console.error("somethig went wrong", error);
    }
  }
);

// retrive items and items code
export const getItems = createAsyncThunk("vouchers/getItems", async () => {
  try {
    const response = await axios.get("http://5.189.180.8:8010/item");
    if (!response.data) {
      throw new Error("canot retrive items");
    }
    return response.data;
  } catch (error) {
    console.error("something went wrong while retriving data", error);
  }
});

const initialState = {
  vouchers: [],
  items: [],
  status: [],
  totalAmt: "",
  voucherNo: "",
};
export const voucherSlice = createSlice({
  name: "vouchers",
  initialState,
  reducers: {
    setTotalAmt:(state,action) => {
      state.totalAmt = action.payload;
    },
    setVoucherNo:(state,action) => {
      state.voucherNo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postVoucher.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(getItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      });
  },
});

export const {setTotalAmt, setVoucherNo, setDetails} = voucherSlice.actions
export default voucherSlice.reducer;
