import React from "react";
import TableCss from "./Table.module.css";

const TableFooter = ({ handleAddRow, totalAmount }) => {
  return (
  
      <tr className={TableCss.total_row}>
        <td></td>
        <td>
          <button onClick={handleAddRow} className={TableCss.add_item}>
            Add New Item
          </button>
        </td>
        <td></td>
        <td></td>
        <td></td>
        <td>Total</td>
        <td>{totalAmount>0?totalAmount:0}</td>
        <td></td>
      </tr>
 
  );
};

export default TableFooter;
