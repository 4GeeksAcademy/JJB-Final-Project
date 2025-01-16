import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";

import "../../styles/login.css";

export const Register = () => {

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
                                        <label for="user">Email</label>
                                        <input type="text" class="form-control fs-5" id="user" name="user"
                                            placeholder="Ingresar email"/>
                                    </div>
                                    <div class="form mb-3 fs-5">
                                        <label for="pass">Contraseña</label>
                                        <input type="password" class="form-control fs-5" id="pass" name="pass"
                                            placeholder="Ingresar contraseña"/>
                                    </div>
                                    <div class="form mb-5 fs-5">
                                        <label for="nickname">Nickname</label>
                                        <input type="text" class="form-control fs-5" id="nickname" name="nickname"
                                            placeholder="Ingresar un nickname"/>
                                    </div>
                                    
                                    <button class="w-100 btn btn-lg btn-dark" type="submit">Registrarse</button>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};
