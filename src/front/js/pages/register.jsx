import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";

import "../../styles/login.css";

export const Register = () => {
    const { actions } = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [emailChanged, setEmailChanged] = useState(false);
    const [passwordChanged, setPasswordChanged] = useState(false);
    const [nicknameChanged, setNicknameChanged] = useState(false);

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

        if (store.userToken) {
            console.log("FRONT:", response);
            console.log("store.userToken:", store.userToken);
            alert("Inicio de sesión exitoso");
        } else {
            console.error("FRONT Error al iniciar sesión:", response.error);
            alert("Error: " + response.error);
        }
    }

    const emailPasswordNicknameChanged = emailChanged && passwordChanged && nicknameChanged;

    return (
        <>
            <div class="py-5" id="login">
                <div class="row justify-content-center">
                    <div class="col-lg-4 d-none d-sm-block" id="register">
                        <div class="text-md-center p-5 mt-5">
                            <h1 class="display-4 fw-bold lh-1 nav-primary-item my-5">Conviertete en miembro</h1>
                            <p class="lead text-black fs-3 mb-5">y disfruta de todos los beneficios</p>
                        </div>
                    </div>
                    <div class="col-lg-4 col-12 bg-white">
                        <div class="row justify-content-center">
                            <div class="col-lg-10 col-11">
                                <form id="formLogin" action="/login" method="POST" class="my-5 border border-1 py-4 px-3 px-lg-4 shadow-lg">
                                    <div class=" d-flex justify-content-center">
                                        {/* en la siguiente linea va el logo */}
                                        <img class="mb-4" src="" alt="" width="80"
                                            height="80"/>
                                    </div>
                                    <div class="form mb-3 fs-5">
                                        <label for="email">Email</label>
                                        <input type="text" class="form-control fs-5" id="email" name="email"
                                            placeholder="Ingresar email" onChange={EmailChanged}/>
                                    </div>
                                    <div class="form mb-3 fs-5">
                                        <label for="pass">Contraseña</label>
                                        <input type="password" class="form-control fs-5" id="pass" name="pass"
                                            placeholder="Ingresar contraseña" onChange={PasswordChanged}/>
                                    </div>
                                    <div class="form mb-5 fs-5">
                                        <label for="nickname">Nickname</label>
                                        <input type="text" class="form-control fs-5" id="nickname" name="nickname"
                                            placeholder="Ingresar un nickname" onChange={NicknameChanged}/>
                                    </div>
                                    
                                    <button class="w-100 btn btn-lg btn-dark" type="submit" disabled={!emailPasswordNicknameChanged}
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
