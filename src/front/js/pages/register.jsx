import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'


import "../../styles/login.css";
import logo from "../../img/logo_shespace_navbar.png";

export const Register = () => {
    const { actions } = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [checkbox, setCheckbox] = useState('');
    const [emailChanged, setEmailChanged] = useState(false);
    const [passwordChanged, setPasswordChanged] = useState(false);
    const [nicknameChanged, setNicknameChanged] = useState(false);
    const [checkboxChanged, setCheckboxChanged] = useState(false);
    const navigate = useNavigate();

    const EmailChanged = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        setEmailChanged(newEmail !== "");
    };

    const PasswordChanged = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        setPasswordChanged(newPassword !== "");
    };
    
    const NicknameChanged = (e) => {
        const newNickname = e.target.value;
        setNickname(newNickname);
        setNicknameChanged(newNickname !== ""); 
    };
    
    const CheckboxChanged = (e) => {
        const newCheckboxValue = e.target.checked;
        setCheckbox(newCheckboxValue);
        setCheckboxChanged(newCheckboxValue);
    };

    const sendForm = async () => {
        console.log("Se manda formulario")
        console.log("email:", email)
        console.log("password:", password)
        console.log("nickname:", nickname)
        console.log("checkbox:", checkbox)

        const response = await actions.registerUser(email, password, nickname, checkbox);

        if (response.status) {
            Swal.fire({
                position: "top",
                icon: "success",
                title: "Registro exitoso",
                showConfirmButton: false,
                timer: 2000
            });
            navigate("/");
        } else {
            console.error("FRONT Error al registrar usuario:", response.error);
            Swal.fire({
                position: "top",
                icon: "error",
                title: "Error: " + response.error,
                showConfirmButton: false,
                timer: 3500
            });
        }
    }

    const emailPasswordNicknameChanged = emailChanged && passwordChanged && nicknameChanged && checkboxChanged;

    return (
        <>
            <div className="py-5" id="login">
                <div className="row justify-content-center">
                    <div className="col-lg-4 d-none d-sm-block" id="register">
                        <div className="text-md-center p-5 mt-5">
                            <h1 className="display-4 fw-bold lh-1 nav-primary-item my-5">Conviertete en socia</h1>
                            <p className="lead text-black fs-3 mb-5">y disfruta de todos los beneficios</p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-12 bg-white">
                        <div className="row justify-content-center">
                            <div className="col-lg-10 col-11">
                                <form id="formLogin" action="/login" method="POST" className="my-5 border border-1 py-4 px-3 px-lg-4 shadow-lg">
                                    <div className=" d-flex justify-content-center">
                                        {/* en la siguiente linea va el logo */}
                                        <img className="mb-4" src={logo} alt="" width="80"
                                            height="80" />
                                    </div>
                                    <div className="form mb-3 fs-5">
                                        <label htmlFor="email">Correo:</label>
                                        <input type="text" className="form-control fs-5" id="email" name="email"
                                            placeholder="Ingresar un correo" onChange={EmailChanged} />
                                    </div>
                                    <div className="form mb-3 fs-5">
                                        <label htmlFor="pass">Contraseña:</label>
                                        <input type="password" className="form-control fs-5" id="pass" name="pass"
                                            placeholder="Ingresar contraseña" onChange={PasswordChanged} />
                                    </div>
                                    <div className="form mb-3 fs-5">
                                        <label htmlFor="nickname">Apodo:</label>
                                        <input type="text" className="form-control fs-5" id="nickname" name="nickname"
                                            placeholder="Ingresar un nickname" onChange={NicknameChanged} />
                                    </div>

                                    <div className="form-check mb-3 d-flex justify-content-center">
                                        <input className="form-check-input fs-5 me-2" type="checkbox" value="" id="flexCheckDefault" onChange={CheckboxChanged}/>
                                            <label className="form-check-label fs-5" htmlFor="flexCheckDefault">
                                                Soy mayor de edad
                                            </label>
                                    </div>

                                    <button className="w-100 btn btn-lg btn-dark" type="button" disabled={!emailPasswordNicknameChanged}
                                        onClick={sendForm}>Registrarse</button>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center mt-5">
                <Link to="/">Regresar</Link>
            </div>
        </>

    );
};
