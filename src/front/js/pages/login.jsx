import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/login.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import logo from "../../img/logo_shespace_navbar.png";

export const Login = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailChanged, setEmailChanged] = useState(false);
    const [passwordChanged, setPasswordChanged] = useState(false);
    const [failedAttempts, setFailedAttempts] = useState(0);
    const navigate = useNavigate();

    const EmailChanged = (e) => {
        setEmail(e.target.value);
        setEmailChanged(true)
    }

    const PasswordChanged = (e) => {
        setPassword(e.target.value);
        setPasswordChanged(true)
    }

    const sendForm = async () => {
        console.log("Se manda formulario")
        console.log("email:", email)
        console.log("password:", password)
        console.log("failedAttempts:", failedAttempts)

        const response = await actions.sendFormLogin(email, password);

        if (response.ok) {
            console.log("FRONT:", response);
            console.log("store.userToken:", store.userToken);
            Swal.fire({
                position: "top",
                icon: "success",
                title: "Inicio de sesión exitoso",
                showConfirmButton: false,
                timer: 2000
            });
            navigate("/profile");

        } else {
            console.error("FRONT Error al iniciar sesión:", response.error);
            if (response.status == 404) {
                console.log("response.status:", response.status);
                setFailedAttempts((prev) => prev + 1);
                if (failedAttempts + 1 >= 3) {
                    triggerResetAlert();
                } else {
                    Swal.fire({
                        position: "top",
                        icon: "error",
                        title: "Error: " + response.error,
                        showConfirmButton: false,
                        timer: 3500
                    });
                }
            } else {
                Swal.fire({
                    position: "top",
                    icon: "error",
                    title: "Error: " + response.error,
                    showConfirmButton: false,
                    timer: 3500
                });
            }
        }
    }

    const handleResetPassword = () => {
        Swal.fire({
            position: "top",
            icon: "success",
            title: "Redirigiendo para reestablecer contraseña",
            showConfirmButton: false,
            timer: 1500
        });
        navigate("/forgot-password");
    };

    const triggerResetAlert = () => {
        Swal.fire({
            icon: "warning",
            title: "Intentos fallidos",
            text: "Has alcanzado el número máximo de intentos fallidos para iniciar sesión. ¿Deseas restablecer tu contraseña?",
            showCancelButton: true,
            confirmButtonText: "Reestablecer contraseña",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                handleResetPassword();
            }
        });
    };

    const passEmailChanged = emailChanged && passwordChanged;

    return (
        <>
            <div className="fluid-container">
                <div className="row justify-content-center gap-3 mt-5">
                    <div className="col-md-4 border rounded shadow-sm px-3 px-lg-4 ">
                        <div className="d-flex flex-column h-100">
                            <div className="text-center text-md-end p-5 mt-5">
                                <h1 className="display-4 fw-bold mb-3">Aún no</h1>
                                <p className="mb-4 fs-3 ">eres parte del cambio?</p>
                            </div>
                            <div className="d-grid mt-auto mb-4">
                                <Link to={"/register"} className="btn-link fs-5 " >
                                    Registrarse
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 border rounded shadow-sm py-4 px-3 px-lg-4 ">
                        <div className="d-flex justify-content-center">
                            <img className="mb-4" src={logo} alt="" width="80" height="80" />
                        </div>
                        <form>
                            <div className="mb-3 fs-5">
                                <label htmlFor="email" className="form-label">Correo:</label>
                                <input
                                    type="email"
                                    className="form-control fs-5"
                                    id="email"
                                    placeholder="nombre@ejemplo.com"
                                    onChange={EmailChanged}
                                    required
                                />
                            </div>
                            <div className="mb-3 fs-5">
                                <label htmlFor="password" className="form-label">Contraseña:</label>
                                <input
                                    type="password"
                                    className="form-control fs-5"
                                    id="password"
                                    onChange={PasswordChanged}
                                    required
                                />
                            </div>
                            <div className="d-grid mt-auto">
                                <button
                                    className="mt-2 fs-5"
                                    type="button"
                                    disabled={!passEmailChanged}
                                    onClick={sendForm}
                                >
                                    Iniciar Sesión
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>

    );
};
