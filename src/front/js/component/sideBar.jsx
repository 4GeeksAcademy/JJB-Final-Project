import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/sidebar.css";

export const SideBar = () => {
    const { store } = useContext(Context);
    const [show, setShow] = useState(false);
    const [profileImage, setProfileImage] = useState(store.profile.avatar_url);

    useEffect(() => {
        if (store.profile.avatar_url) {
            setProfileImage(store.profile.avatar_url); 
        }
    }, [store.profile.avatar_url]);

    return (
        <>

            <div className="sidebar d-none d-md-block">
                <ul className="menu-list flex-grow-1">
                    <li className="">
                        <Link className="d-flex align-items-center mb-3 text-inherit" to={"/profile"}>
                            <div className="me-2">
                                <img className="sidebar-profile-image" src={profileImage} alt="Profile" />
                            </div>
                            <div className="flex-grow-1">
                                <p className="nickname mb-0 ">{store.profile.nickname || "Apodo"}</p>
                                <p className="email mb-0">{store.profile.email || "Correo"}</p>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link className="text-inherit" to={"/favorites"}>Favoritos</Link>
                    </li>
                    <li className="mb-1"> 
                        <Link className="text-inherit" to={"/invoices"}>Pagos</Link>
                    </li>
                </ul>

                <ul className="menu-list">
                    <li className="mb-1"> 
                        <Link className="text-inherit" to={"/accountsettings"}>Cuenta / Editar perfil</Link>
                    </li>
                </ul>
            </div>

            <button
                className="btn btn-secondary d-md-none position-fixed top-1 start-0 m-3"
                data-bs-toggle="offcanvas"
                data-bs-target="#sidebarMenu"
                style={{ fontSize: '1rem', padding: '0.5rem 1rem' }}
            >
                ☰ Menú
            </button>


            <div 
                className="offcanvas offcanvas-start d-md-none sidebar-responsive" 
                tabIndex="-1" 
                id="sidebarMenu"
                aria-labelledby="sidebarMenuLabel"
                style={{ backgroundColor: "var(--card-bg-color)" }}
            >
                <div className="offcanvas-header" >
                    <h5 className="offcanvas-title fs-1" id="sidebarMenuLabel">Menú</h5>
                    <button 
                        type="button" 
                        className="btn-close" 
                        data-bs-dismiss="offcanvas" 
                        aria-label="Cerrar"
                    ></button>
                </div>
                <div className="offcanvas-body">
                    <ul className="menu-list ">
                        <li><Link className="text-inherit" to={"/favorites"} >Favoritos</Link></li>
                        <li><Link className="text-inherit" to={"/invoices"}  >Pagos</Link></li>
                        <li><Link className="text-inherit" to={"/accountsettings"} >Cuenta / Editar perfil</Link></li>
                    </ul>
                </div>
            </div>
        </>
    );
};
