import React, { useContext, useState, useEffect} from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/login.css";
import { Link } from "react-router-dom";

export const Login = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailChanged, setEmailChanged] = useState(false);
    const [passwordChanged, setPasswordChanged] = useState(false);

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

        const response = await actions.sendFormLogin(email, password);

        if (store.userToken) {
            console.log("FRONT:", response);
            console.log("store.userToken:", store.userToken);
            alert("Inicio de sesión exitoso");
        } else {
            console.error("FRONT Error al iniciar sesión:", response.error);
            alert("Error: " + response.error);
        }
        

    }

    const passEmailChanged = emailChanged && passwordChanged;

    return (
        <div className="container">
            <div className="row m-5 border p-md-5">
                <div className="col-12 col-md-6 d-flex justify-content-md-end justify-content-center mb-3">
                    <div className="card p-md-3" style={{ width: "18rem" }}>
                        <div className="card-body">
                            <h1 className="text-center">Not yet</h1>
                            <p className="mb-5 text-end fs-3">a member?</p>
                            <div className="d-grid">
                                <button type="submit" className="btn btn-primary d-grid" style={{ margin: "0" }}>
                                    Sign In
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6 d-flex justify-content-md-start justify-content-center">
                    <div className="card p-md-3 border rounded" style={{ width: "18rem" }}>
                        <div className="card-body">
                            <form>
                                <div className="mb-1">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        placeholder="name@example.com"
                                        onChange={EmailChanged}
                                        required
                                    />
                                </div>
                                <div className="mb-1">
                                    <label htmlFor="password" className="form-label">Password</label>
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
                                        Log in
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
};
