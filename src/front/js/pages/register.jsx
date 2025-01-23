import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate  } from "react-router-dom";


import "../../styles/login.css";
import logo from "../../img/logo_shespace_navbar.png";

export const Register = () => {
    const { actions } = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [emailChanged, setEmailChanged] = useState(false);
    const [passwordChanged, setPasswordChanged] = useState(false);
    const [nicknameChanged, setNicknameChanged] = useState(false);
    const navigate = useNavigate();

    const EmailChanged = (e) => {
        setEmail(e.target.value);
        setEmailChanged(true)
    }

    const PasswordChanged = (e) => {
        setPassword(e.target.value);
        setPasswordChanged(true)
    }

    const NicknameChanged = (e) => {
        setNickname(e.target.value);
        setNicknameChanged(true)
    }

    const sendForm = async () => {
        console.log("Se manda formulario")
        console.log("email:", email)
        console.log("password:", password)
        console.log("nickname:", nickname)

        const response = await actions.registerUser(email, password, nickname);

        if (response.status) {
            navigate("/");
        } else {
            console.error("FRONT Error al registrar usuario:", response.error);
            alert("Error: " + response.error);
        }
    }

    const emailPasswordNicknameChanged = emailChanged && passwordChanged && nicknameChanged;

    return (
        <>
            <div className="py-5" id="login">
                <div className="row justify-content-center">
                    <div className="col-lg-4 d-none d-sm-block" id="register">
                        <div className="text-md-center p-5 mt-5">
                            <h1 className="display-4 fw-bold lh-1 nav-primary-item my-5">Conviertete en miembra</h1>
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
                                            height="80"/>
                                    </div>
                                    <div className="form mb-3 fs-5">
                                        <label htmlFor="email">Correo</label>
                                        <input type="text" className="form-control fs-5" id="email" name="email"
                                            placeholder="Ingresar un correo" onChange={EmailChanged}/>
                                    </div>
                                    <div className="form mb-3 fs-5">
                                        <label htmlFor="pass">Contraseña</label>
                                        <input type="password" className="form-control fs-5" id="pass" name="pass"
                                            placeholder="Ingresar contraseña" onChange={PasswordChanged}/>
                                    </div>
                                    <div className="form mb-5 fs-5">
                                        <label htmlFor="nickname">Apodo</label>
                                        <input type="text" className="form-control fs-5" id="nickname" name="nickname"
                                            placeholder="Ingresar un nickname" onChange={NicknameChanged}/>
                                    </div>
                                    
                                    <button className="w-100 btn btn-lg btn-dark" type="button" disabled={!emailPasswordNicknameChanged}
                                    onClick={sendForm}>Registrarse</button>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};
