import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext.js";
import "../../styles/profile.css";
import "../../styles/invoice.css";

import { Link, useNavigate } from "react-router-dom";
import { SideBar } from "../component/sideBar.jsx";
import { PayPalButton } from "../component/payPalButton.jsx";
import { TermsConditions } from "../component/termsConditions.jsx";

export const Invoice = () => {
  const { store, actions } = useContext(Context);
  const [checkbox, setCheckbox] = useState('');
  const [checkboxChanged, setCheckboxChanged] = useState(false);

  const CheckboxChanged = (e) => {
    const newCheckboxValue = e.target.checked;
    setCheckbox(newCheckboxValue);
    setCheckboxChanged(newCheckboxValue);
};

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
  <div className="row w-100 justify-content-center">
    {/* Main Content */}
    <div className="col-md-5 main-content text-center">
      <TermsConditions />
      <div className="form-check mb-3 d-flex justify-content-center">
        <input
          className="form-check-input fs-5 me-2"
          type="checkbox"
          id="flexCheckDefault"
          onChange={CheckboxChanged}
        />
       <div className="form-check mb-3 center-label">
  <input className="form-check-input fs-5 me-2" type="checkbox" value="" id="flexCheckDefault" onChange={CheckboxChanged} />
  <label className="form-check-label fs-5" htmlFor="flexCheckDefault">
    Acepto los términos y condiciones anteriores
  </label>
</div>

      </div>
      <PayPalButton disabled={!checkboxChanged} />
    </div>
  </div>
</div>

  );
};
