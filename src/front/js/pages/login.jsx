import React, { useContext, useState, useEffect} from "react";
import { Context } from "../store/appContext";
import "../../styles/login.css";
import { Link, useNavigate  } from "react-router-dom";
import Swal from 'sweetalert2'

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
                if (failedAttempts + 1>= 3) {
                    triggerResetAlert();
                }else {
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
        navigate("/reset-password");
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
        <div className="container">
            <div className="row m-5 border p-md-5">
                <div className="col-12 col-md-6 d-flex justify-content-md-end justify-content-center mb-3">
                    <div className="card p-md-3" style={{ width: "18rem" }}>
                        <div className="card-body">
                            <h1 className="text-end">Aún no</h1>
                            <p className="mb-4 text-end fs-3">eres parte del cambio?</p>
                            <div className="d-grid">
                                <Link to={"/register"} className="btn btn-primary d-grid" style={{ margin: "0" }}>
                                    Registrarse
                                </Link>
                            </div>
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
                                <div className="mb-1">
                                    <label htmlFor="password" className="form-label">Contraseña:</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        onChange={PasswordChanged}
                                        required
                                    />
                                </div>
                                <div className="d-grid">
                                    <button
                                        className="btn btn-primary"
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
            </div>
        </div>
        </>

    );
};
