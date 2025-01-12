import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/login.css";
import { Link } from "react-router-dom";

export const Login = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="container">
            <div className="row m-5">
                <div className="col">
                    columna 1
                </div>
                <div className="col">
                    <div className="card p-3 border rounded" style={{width: "18rem", margin: "0 auto"}}>
                        <div className="card-body">
                            <form>
                                <div className="mb-1">
                                    <label for="email" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp"/>
                                </div>
                                <div className="mb-1">
                                    <label for="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="password"/>
                                </div>
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary d-grid " style={{margin: "0"}}>Log in</button>
                                </div>

                                {/* <Link to="" className="link-underline">Forgot Password</Link> Falta construir el link de contraserña olvidada */}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
