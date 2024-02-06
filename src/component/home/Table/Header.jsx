import React from "react";
import HeaderCss from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setVoucherNo } from "../../../features/vouchers/vocherSlice";

const Header = ({setHeaderVal, headerVal}) => {
  const amount = useSelector((state) => state.vouchers.totalAmt);

  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];


  let dispatch = useDispatch();

  const voucherHeader = (e) => {
    setHeaderVal({ ...headerVal, [e.target.name]: e.target.value });
    if (e.target.name === 'vr_no') {
      dispatch(setVoucherNo(e.target.value));
    }
  };
  return (
    <div className={HeaderCss.header}>
      <div className={HeaderCss.field}>
        <label htmlFor="vr_no">Voucher No:</label>
        <input
          type="number"
          name="vr_no"
          placeholder="voucher number"
          onChange={voucherHeader}
        />
      </div>
      <div className={HeaderCss.field}>
        <p id="vr_date">Date: </p>
        <p className={HeaderCss.static}>{formattedDate}</p>
      </div>
      <div className={HeaderCss.field}>
        <label htmlFor="status">Status</label>
        <select name="status" id="status" onChange={voucherHeader}>
          <option value="A">Active</option>
          <option value="I">Inactive</option>
        </select>
      </div>
      <div className={HeaderCss.field}>
        <label htmlFor="acName">Account Name:</label>
        <input
          type="text"
          name="ac_name"
          placeholder="account name"
          onChange={voucherHeader}
        />
      </div>
      <div className={HeaderCss.field}>
        <p>Amount:</p>
        <p className={HeaderCss.static}>{amount?amount:0}</p>
      </div>
    </div>
  );
};

export default Header;
