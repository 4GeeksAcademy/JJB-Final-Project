import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/profile.css";

export const SideBar = () => {
    const { store } = useContext(Context);
    const [profileImage, setProfileImage] = useState(store.profile.image || "https://via.placeholder.com/100");

    useEffect(() => {
        if (store.profile.image) {
            setProfileImage(store.profile.image); // Actualiza la imagen cuando cambie en el store
        }
    }, [store.profile.image]); // Escucha cambios en la imagen

    return (
        <div className="sidebar d-flex flex-column" style={{ height: '100vh', width: '100%' }}>
            <ul className="menu-list flex-grow-1">
                <li className="d-flex align-items-center mb-3">
                    <div className="me-2">
                        <img className="sidebar-profile-image" src={profileImage} alt="Profile" />
                    </div>
                    <div className="flex-grow-1">
                        <p className="nickname mb-0">{store.profile.nickname || "Apodo"}</p>
                        <p className="email mb-0">{store.profile.email || "Correo"}</p>
                    </div>
                </li>
                <li>Favoritos</li>
                <li>Pagos</li>
            </ul>

            <ul className="menu-list">
                <li className="mb-1"> 
                    <Link to={"/account"}>Cuenta / Editar perfil</Link>
                </li>
            </ul>
        </div>
    );
};
