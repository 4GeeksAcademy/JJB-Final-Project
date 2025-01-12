import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/login.css";

export const Login = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="container">
            <dix className="row m-5">
                <dix className="col">
                    columna 1
                </dix>
                <dix className="col">
                    <div className="card" style={{width: "18rem", margin: "0 auto"}}>
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="#" className="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                </dix>
            </dix>
        </div>
    );
};
