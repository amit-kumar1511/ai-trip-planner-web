import React from "react";
import Header from "../src/components/custom/Header"
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet /> {/* Ye jahan child route render hoga */}
    </>
  );
};

export default MainLayout;
