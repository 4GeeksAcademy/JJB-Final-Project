import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/profile.css";

export const Profile = () => {
    const { store } = useContext(Context);

    return (
        <div className="d-flex align-items-center justify-content-center vh-100">
            <div className="container bg-white border-container">
                <div className="row px-0 py-4 text-center">
                    {/* Imagen */}
                    <div className="col-md-12 d-flex justify-content-center align-items-center">
                        <img
                            className="profile-avatar"
                            src={store.profile.avatar_url}
                            alt="Profile"
                        />
                    </div>


                </div>

                <div className="row px-0 py-4  text-center">


                    {/* Información Personal */}
                    <div className="col-md-6 d-flex flex-column justify-content-center">
                        <h3>Nombre completo</h3>
                        <p>{`${store.profile.name || "-"} ${store.profile.lastname || "-"}`}</p>
                        <h3>Cumpleaños</h3>
                        <p>{store.profile.birthdate || "N/A"}</p>
                        <h3>Correo</h3>
                        <p>{store.profile.email || "N/A"}</p>
                    </div>

                    {/* Más Información */}
                    <div className="col-md-6 d-flex flex-column justify-content-center">
                        <h3>Rol</h3>
                        <p>{store.profile.role || "N/A"}</p>
                        <h3>Apodo</h3>
                        <p>{store.profile.nickname || "N/A"}</p>
                        <h3>Membresía</h3>
                        <p>{store.profile.membership || "N/A"}</p>
                    </div>
                </div>


            </div>
        </div>
    );
};
