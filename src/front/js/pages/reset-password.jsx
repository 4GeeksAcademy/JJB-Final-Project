import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export const ResetPassword = () => {
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
            <div className="container">
                <div className="row m-5 border p-md-5">
                    <div className="col-12 col-md-6 d-flex justify-content-md-end justify-content-center mb-3">
                        <div className="card p-md-3" style={{ width: "18rem" }}>
                            <div className="card-body">
                                <h1 className="text-end">Recupera</h1>
                                <p className="mb-4 text-end fs-3">tu contraseña</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 d-flex justify-content-md-start justify-content-center">
                        <div className="card p-md-3 border rounded" style={{ width: "18rem" }}>
                            <div className="card-body">
                                <form>
                                    <div className="mb-1">
                                        <label htmlFor="email" className="form-label">Correo:</label>
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
                                            className="btn btn-primary"
                                            type="button"
                                            disabled={!emailChanged}
                                            onClick={sendForm}
                                        >
                                            Recuperar contraseña
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
