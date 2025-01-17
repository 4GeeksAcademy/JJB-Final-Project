import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const ResetPassword = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="text-center mt-5">
            <h1>Aqui se resetea la password</h1>
            <Link to="/">Regresar</Link>
        </div>
    );
};
