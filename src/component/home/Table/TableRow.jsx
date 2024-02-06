import React from "react";
import { useSelector } from "react-redux";
import TableCss from "./Table.module.css";

const TableRow = ({ row, index, handleItemCodeChange, handleItemNameChange, handleInputChange, handleRemoveRow }) => {
  const items = useSelector((state) => state.vouchers.items);

  return (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>
        <select
          value={row.item_code}
          onChange={(e) => handleItemCodeChange(index, e.target.value)}
        >
          <option value="">Select Item Code</option>
          {items.map((item) => (
            <option key={item.item_code} value={item.item_code}>
              {item.item_code}
            </option>
          ))}
        </select>
      </td>
      <td>
        <select
          value={row.item_name}
          onChange={(e) => handleItemNameChange(index, e.target.value)}
        >
          <option value="">Select Item Name</option>
          {items.map((item) => (
            <option key={item.item_code} value={item.item_name}>
              {item.item_name}
            </option>
          ))}
        </select>
      </td>
      <td>
        <input
          type="text"
          value={row.description}
          placeholder="Description"
          onChange={(e) =>
            handleInputChange(index, "description", e.target.value)
          }
        />
      </td>
      <td>
        <input
          type="number"
          value={row.qty}
          onChange={(e) =>
            handleInputChange(index, "qty", parseInt(e.target.value))
          }
        />
      </td>
      <td>
        <input
          type="number"
          value={row.rate}
          onChange={(e) =>
            handleInputChange(index, "rate", parseFloat(e.target.value))
          }
        />
      </td>
      <td>{row.amount ? row.amount : 0}</td>
      <td className={TableCss.remove_row}>
       {index>0 && <button
          onClick={() => handleRemoveRow(index)}
          className={TableCss.remove}
        >
          <span className="material-symbols-outlined">delete</span>
        </button>}
      </td>
    </tr>
  );
};

export default TableRow;
