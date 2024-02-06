import React from "react";
import Home from "./home/Home";
import Aside from "./home/Aside/Aside";
import '../App.css'

const Layout = () => {
  return (
    <div className="layout">
      <Aside/>
      <Home/>
    </div>
  );
};

export default Layout;
