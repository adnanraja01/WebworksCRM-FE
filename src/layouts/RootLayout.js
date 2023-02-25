import React from "react";

import "./RootLayout.scss";

import { Outlet } from "react-router-dom";

import { Navbar } from "../components/navbar/Navbar";

export const RootLayout = () => {
  return (
    <div className="flex main_container">
      <Navbar />
      <div className="outlet_container">
        <Outlet />
      </div>
    </div>
  );
};
