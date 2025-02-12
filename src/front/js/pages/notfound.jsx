import React from "react";
import logo from "../../img/logo_shespace.png";
import "../../styles/colors.css";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="position-relative d-flex align-items-center justify-content-center vh-100 bg-background text-text ">
      <img className="position-absolute w-100 h-100" src={logo} alt="Logo" style={{ opacity: 0.2, objectFit: 'cover' }} />
      
      <div className="position-relative text-center p-4 bg-card-bg-color rounded-3 shadow-lg">
        <h1 className="display-1 fw-bold text-primary-color">404</h1>
        <p className="fs-3 fw-semibold text-secondary-color mt-3">Oops! Parece que te perdiste.</p>
        <p className="mt-2 fs-5">No te preocupes, te ayudamos a encontrar el camino de vuelta.</p>
        <Link to="/" className="btn btn-lg btn-link ">
          Volver a inicio
        </Link>
      </div>
    </div>
  );
}
