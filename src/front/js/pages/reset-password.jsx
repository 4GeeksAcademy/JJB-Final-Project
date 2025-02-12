import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link, useParams, useNavigate } from "react-router-dom";
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
            <div className="fluid-container">
                <div className="row justify-content-center gap-3 mt-5">
                    <div className="col-md-4 border rounded shadow-sm px-3 px-lg-4 py-5">
                        <div className="text-md-end text-center p-md-5 mt-1">
                            <h1 className="display-4 fw-bold mb-3">Introduce</h1>
                            <p className="mb-4 fs-3">tu nueva contraseña</p>
                        </div>

                    </div>
                    <div className="col-md-4 border rounded shadow-sm py-4 px-3 px-lg-4 ">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3 fs-5">
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
                            <div className="mb-3 fs-5">
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
                                    className="btn "
                                    type="submit"
                                    disabled={!password || !confirmPassword}
                                >
                                    Enviar Contraseña
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="text-center mt-5">
                <Link to="/" className="btn-link">Regresar</Link>
            </div>
        </>

    );
};
