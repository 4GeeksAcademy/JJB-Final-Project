import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export const ForgotPassword = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState('');
    const [emailChanged, setEmailChanged] = useState(false);
    const EmailChanged = (e) => {
        setEmail(e.target.value);
        setEmailChanged(true)
    }

    const sendForm = async () => {
        console.log("Se manda formulario reseteo de contrasena")
        console.log("email:", email)

        const response = await actions.forgotPassword(email);

        if (!response.error) {
            console.log("FRONT:", response);
            Swal.fire({
                position: "top",
                icon: "success",
                title: response.msg,
                showConfirmButton: false,
                timer: 2000
            });
            // navigate("/profile");

        } else {
            console.error("FRONT Error al resetear contrasena:", response.error);
            Swal.fire({
                position: "top",
                icon: "error",
                title: "Error: " + response.error,
                showConfirmButton: false,
                timer: 3500
            });

        }
    }

    return (
        <>
            
            <div className="fluid-container">
                <div className="row justify-content-center gap-3 mt-5">
                    <div className="col-md-4 border rounded shadow-sm px-3 px-lg-4 ">
                        <div className="text-md-end text-center p-md-5 mt-1">
                            <h1 className="display-4 fw-bold mb-3">Recupera</h1>
                            <p className="mb-4 fs-3">tu contraseña</p>
                        </div>
                    </div>
                    <div className="col-md-4 border rounded shadow-sm py-4 px-3 px-lg-4 ">
                        <div className="d-flex justify-content-center">
                            <form>
                                <div className="mb-3 fs-5">
                                    <label htmlFor="email" className="form-label">Ingresa tu Correo:</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        placeholder="nombre@ejemplo.com"
                                        onChange={EmailChanged}
                                        required
                                    />
                                </div>
                                <div className="d-grid">
                                    <button
                                        className="btn"
                                        type="button"
                                        disabled={!emailChanged}
                                        onClick={sendForm}
                                    >
                                        Recuperar contraseña
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center mt-5">
                <Link to="/" className="btn-link">Regresar</Link>
            </div>


        </>

    );
};
