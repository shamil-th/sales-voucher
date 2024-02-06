import React from "react";
import AsideCss from "./Aside.module.css";

const Aside = () => {
  return (
    <div className={AsideCss.aside}>
      <div className={AsideCss.logo}></div>
      <div className={AsideCss.nav_links}>
        <ul className={AsideCss.navbar}>
          <li>
            <span className="material-symbols-outlined">home</span>Dashboard
          </li>
          <li>
            <span className="material-symbols-outlined">analytics</span>
            Transactions
          </li>
          <li className={AsideCss.active}>
            <span className="material-symbols-outlined">receipt_long</span>
            Invoices
          </li>
          <li>
            <span className="material-symbols-outlined">settings</span>Settings
          </li>
        </ul>
        <ul className={AsideCss.footer}>
          <li>
            <span className="material-symbols-outlined">live_help</span>Help
          </li>
          <li>
            <span className="material-symbols-outlined">logout</span>Logout
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Aside;
