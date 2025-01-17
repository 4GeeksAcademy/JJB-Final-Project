import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const ResetPassword = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="text-center mt-5">
            <h1>Aqui se resetea la password</h1>

        </div>
    );
};
