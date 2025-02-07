import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/profile.css";
import { Link, useNavigate } from "react-router-dom";
import { SideBar } from "../component/sideBar.jsx";
import { PayPalButton } from "../component/payPalButton.jsx";
import { TermsConditions } from "../component/termsConditions.jsx";

export const Payments = () => {
  const { store, actions } = useContext(Context);
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 p-0">
          <SideBar />
        </div>
        <div className="col-2">

        </div>
        {/* Main Content */}
        <div className="col-md-5 main-content">
          <TermsConditions />
          <PayPalButton />
        </div>
        <div className="col-2">

        </div>
      </div>
    </div>
  );
};
