import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getItems,
  postVoucher,
  setTotalAmt,
} from "../../../features/vouchers/vocherSlice";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import TableFooter from "./TableFooter";
import TableCss from "./Table.module.css";

const Table = ({ headerVal, clearForm, printTable }) => {
  const items = useSelector((state) => state.vouchers.items);
  const voucherNo = useSelector((state) => state.vouchers.voucherNo);
  const statusAlert = useSelector((state) => state.vouchers.status);
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState([
    {
      vr_no: voucherNo,
      sr_no: 1,
      item_code: "",
      item_name: "",
      description: "",
      qty: 0,
      rate: 0,
    },
  ]);

  useEffect(() => {
    setTableData((prevTableData) => {
      return prevTableData.map((row) => {
        return { ...row, vr_no: voucherNo };
      });
    });
  }, [voucherNo]);

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  const handleAddRow = () => {
    const newRow = {
      vr_no: voucherNo,
      sr_no: tableData.length + 1,
      item_code: "",
      item_name: "",
      description: "",
      qty: 0,
      rate: 0,
    };
    setTableData([...tableData, newRow]);
  };

  const handleRemoveRow = (index) => {
    const updatedData = [...tableData];
    updatedData.splice(index, 1);
    setTableData(updatedData);
    calculateTotal(updatedData);
  };

  const handleItemCodeChange = (index, itemCode) => {
    const updatedData = [...tableData];
    updatedData[index].item_code = itemCode;
    const matchingItem = items.find((item) => item.item_code === itemCode);
    if (matchingItem) {
      updatedData[index].item_name = matchingItem.item_name;
    }
    setTableData(updatedData);
  };

  const handleItemNameChange = (index, itemName) => {
    const updatedData = [...tableData];
    updatedData[index].item_name = itemName;
    const matchingItem = items.find((item) => item.item_name === itemName);
    if (matchingItem) {
      updatedData[index].item_code = matchingItem.item_code;
    }
    setTableData(updatedData);
  };

  const handleInputChange = (index, key, value) => {
    const updatedData = [...tableData];
    updatedData[index][key] = value;
    if (key === "qty" || key === "rate") {
      updatedData[index].amount =
        updatedData[index].qty * updatedData[index].rate;
    }
    setTableData(updatedData);
    calculateTotal(updatedData);
  };

  const calculateTotal = (data) => {
    const total = data.reduce((acc, curr) => acc + curr.amount, 0);
    dispatch(setTotalAmt(total));
  };

  const handleSave = () => {

    if (!validateData()) {
      return; 
    }

    const detailTableWithoutAmount = tableData.map(
      ({ amount, ...rest }) => rest
    );

    const dataToPost = {
      header_table: headerVal,
      detail_table: detailTableWithoutAmount,
    };

    dispatch(postVoucher(dataToPost));
    if(statusAlert==="success"){
      alert('successfully created')
    }
  };

  const handleClear = () => {
    setTableData([
      {
        vr_no: voucherNo,
        sr_no: 1,
        item_code: "",
        item_name: "",
        description: "",
        qty: 0,
        rate: 0,
      },
    ]);
    clearForm();
  };

  const handlePrint = () => {
    printTable();
  };

  const validateData = () => {

    const isEmpty = tableData.some(
      (row) =>
        row.item_code.trim() === "" ||
        row.item_name.trim() === "" ||
        row.qty === 0 ||
        row.rate === 0
    );

    if (isEmpty) {
      alert("Please fill in all fields.");
      return false; 
    }

    return true; 
  };

  const totalAmount = tableData.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className={TableCss.detail_table}>
      <p className={TableCss.table_title}>Item Details</p>
      <table>
        <TableHeader />
        <tbody>
          {tableData.map((row, index) => (
            <TableRow
              key={index}
              row={row}
              index={index}
              handleItemCodeChange={handleItemCodeChange}
              handleItemNameChange={handleItemNameChange}
              handleInputChange={handleInputChange}
              handleRemoveRow={handleRemoveRow}
            />
          ))}
          <TableFooter
            handleAddRow={handleAddRow}
            totalAmount={totalAmount}
          />
        </tbody>
      </table>
      <div className={TableCss.buttons}>
        <button onClick={handleSave}>
          <span className="material-symbols-outlined">done</span>Save
        </button>
        <button onClick={handlePrint}>
          <span className="material-symbols-outlined">print</span>Print
        </button>
        <button onClick={handleClear}>
          <span className="material-symbols-outlined">clear_all</span>Clear Table
        </button>
      </div>
    </div>
  );
};

export default Table;
