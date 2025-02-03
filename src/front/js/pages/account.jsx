import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/account.css";
import { Link, useNavigate } from "react-router-dom";
import { SideBar } from "../component/sideBar.jsx";

export const Account = (props) => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [image, setImage] = useState("");
    const [isEditing, setIsEditing] = useState({});

    const uploadImage = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch(`${process.env.BACKEND_URL}api/upload`, {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            if (data) {
                setImage(data); // Asegúrate de que 'imageUrl' sea la propiedad correcta
            }
        } catch (error) {
            console.error("Error al subir la imagen:", error);
        }
    };

    return (
        <div className="container-fluid">
            <div className="row">
                {/* Sidebar */}
                <div className="col-md-3 p-0"> 
                    <SideBar /> 
                </div>
                {/* Main Content */}
                <div className="col-md-9">
                    <div className="row mb-3">
                        <div className="col">
                            <h4>Sección 1</h4>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 d-flex justify-content-center align-items-center flex-column">
                            <img
                                className="profile"
                                src={image || store.profile.image_url || "https://thispersondoesnotexist.com/"}
                                alt="Profile"
                            />
                            <input type="file" onChange={uploadImage} />
                        </div>
                        {/* #columna 2 */}
                        <div className="col-md-4">
                            <div className="row">
                                <h6>Nombre</h6>
                                { isEditing.name ? (
                                    <>
                                        <input 
                                        type="text" 
                                        
                                        />
                                    </>
                                ) : (
                                    <>
                                        <p>{`${store.profile.name || "-"} ${store.profile.lastname || "-"}`}</p>
                                        <button></button>
                                    </>
                                )}
                            </div>
                            <div className="row">
                                <h6>Correo</h6>
                                { isEditing.email ? (
                                    <>
                                        <input 
                                        type="text" 
                                        
                                        />
                                    </>
                                ) : (
                                    <>
                                        <p>{store.profile.email || "N/A"}</p>
                                        <button></button>
                                    </>
                                )}
                            </div>
                            <div className="row">
                                <h6>Apodo</h6>
                                { isEditing.nickname ? (
                                    <>
                                        <input 
                                        type="text" 
                                        
                                        />
                                    </>
                                ) : (
                                    <>
                                        <p>{store.profile.nickname || "N/A"}</p>
                                        <button></button>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="col-md-4">
                            <p>Columna 3</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
