import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link, useParams,useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const ResetPassword = () => {
    const { store, actions } = useContext(Context);
    const { token } = useParams();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("password", password)
        console.log("confirmPassword", confirmPassword)
        if (password !== confirmPassword) {
            Swal.fire({
                icon: "error",
                title: "Las contraseñas no coinciden",
                timer: 3000,
                showConfirmButton: false,
                position: "top"
            });
            return;
        }

        const response = await actions.resetPassword(token, password);

        if (!response.error) {
            Swal.fire({
                icon: "success",
                title: response.msg,
                timer: 2000,
                showConfirmButton: false,
                position: "top"
            });
            navigate("/");
        } else {
            Swal.fire({
                icon: "error",
                title: "Error: " + response.error,
                timer: 3500,
                showConfirmButton: false,
                position: "top"
            });
        }
    };

    return (
        <>
            <div className="container">
                <div className="row m-5 border p-md-5">
                    <div className="col-12 col-md-6 d-flex justify-content-md-end justify-content-center mb-3">
                        <div className="card p-md-3" style={{ width: "18rem" }}>
                            <div className="card-body">
                                <h1 className="text-end">Introduce</h1>
                                <p className="mb-4 text-end fs-3">tu nueva contraseña</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 d-flex justify-content-md-start justify-content-center">
                        <div className="card p-md-3 border rounded" style={{ width: "18rem" }}>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Nueva Contraseña:</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña:</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="confirmPassword"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="d-grid">
                                        <button
                                            className="btn btn-primary"
                                            type="submit"
                                            disabled={!password || !confirmPassword}
                                        >
                                            Enviar Contraseña
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className="card-footer">
                                <Link to="/">Regresar</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};
