import { configureStore } from "@reduxjs/toolkit";
import voucherReducer from "./features/vouchers/vocherSlice";

export default configureStore ({
    reducer: {
        vouchers: voucherReducer,
    },
});