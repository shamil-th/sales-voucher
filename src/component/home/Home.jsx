import React, { useEffect, useState } from "react";
import Header from "./Table/Header";
import Table from "./Table/Table";
import HomeCss from "./Home.module.css";
import { useSelector } from "react-redux";

const Home = () => {
  const amount = useSelector((state) => state.vouchers.totalAmt);

  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];

  const [headerVal, setHeaderVal] = useState({
    vr_no: "",
    vr_date: formattedDate,
    ac_name: "",
    ac_amt: amount,
    status: "A",
  });

  useEffect(() => {
    setHeaderVal((prevHeaderVal) => {
      return { ...prevHeaderVal, ac_amt: amount };
    });
  }, [amount]);

  const clearForm = () => {
    setHeaderVal({
      vr_no: "",
      vr_date: formattedDate,
      ac_name: "",
      ac_amt: 0,
      status: "A",
    });
  };


  const printTable = () => {
 
      const printContent = document.getElementById("print-area");
      const originalContents = document.body.innerHTML;
      const newContents = printContent.innerHTML;

      document.body.innerHTML = newContents;
      window.print();
      document.body.innerHTML = originalContents;
  };

  return (
    <div className={HomeCss.home} id="print-area">
      <Header setHeaderVal={setHeaderVal} headerVal={headerVal} />
      <Table headerVal={headerVal} clearForm={clearForm} printTable={printTable} />
    </div>
  );
};

export default Home;
