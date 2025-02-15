import React, { useContext, useState } from "react";
import { Context } from "../store/appContext.js";
import "../../styles/useraccountsettings.css";
import { SideBar } from "../component/sideBar.jsx";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import defaultProfile from "../../img/profiledefault.png";

export const UserAccountSettings = () => {
    const { store, actions } = useContext(Context);
    const [image, setImage] = useState(defaultProfile);
    const [isEditing, setIsEditing] = useState({});
    const [formData, setFormData] = useState({
        image_url: "",
        name: "",
        lastname: "",
        birthdate: "",
        nickname: ""
    });


    const toggleEdit = (field) => {
        setIsEditing((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };


    const handleSave = async (field) => {
        const updatedFields = {};

        for (const key in formData) {
            if (formData[key] && formData[key] !== store.profile[key]) {
                updatedFields[key] = formData[key];
            }
        }
        console.log("formData:", formData);
        console.log("updatedFields:", updatedFields);
        if (Object.keys(updatedFields).length === 0) {
            Swal.fire({
                position: "top",
                icon: "info",
                title: "No se realizaron cambios",
                showConfirmButton: false,
                timer: 2000
            });
            return;
        }
        const resp = await actions.updateProfile(formData);

        if (!resp.error) {
            actions.loadProfile();
            toggleEdit(field);
            console.log("FRONT:", resp);
            Swal.fire({
                position: "top",
                icon: "success",
                title: "Usuario actualizado exitosamente",
                showConfirmButton: false,
                timer: 2000
            });
            setFormData({
                image_url: "",
                name: "",
                lastname: "",
                birthdate: "",
                nickname: ""
            });
        } else {
            console.error("FRONT Error al crear un foro:", resp.error);
            Swal.fire({
                position: "top",
                icon: "error",
                title: "Error: " + resp.error,
                showConfirmButton: false,
                timer: 3500
            });
        }
    };

    const uploadImage = async (e) => {
        console.log(e.target.files[0]);
        const formData = new FormData()

        formData.append('image', e.target.files[0])
        console.log(formData.get("image"));

        const response = await actions.uploadPhoto(formData)

        if (response) {
            setImage(response)
            await actions.updateProfile({ avatar_url: response });
        }
        console.log(response);
    }

    return (

        <div className="d-flex align-items-center justify-content-center h-100 p-md-5 p-3 mt-3 mt-md-0">
            <div className="container-fluid bg-white border-container">
                {/* ************************************************ MEMBRESIA ROW************************************************************* */}
                <div className="row px-0 py-4 text-center">
                    <div className="col-md-12 d-flex justify-content-end align-items-center">
                        <h2>Membresia
                            <p>{store.profile.membership || "N/A"}</p>
                            {store.profile.membership?.trim().toLowerCase() === "gratis" ?
                                (<Link to={"/subscription"}><button className="badge rounded-pill bg-primary">Mejora tu plan</button></Link>) :
                                (<span className="badge rounded-pill bg-warning">Plan premium+</span>)
                            }
                        </h2>
                    </div>
                </div>
                {/* ************************************************ FOTO ROW ************************************************************* */}
                <div className="row px-0 py-4 text-center">
                    <div className="col-md-12 ">
                        <div>
                            <img
                                className="profile"
                                src={image || store.profile.avatar_url}
                                alt="Profile"
                            />
                        </div>
                        <div >
                            <label className="btn p-1 rounded-circle shadow-sm edit-btn mt-0" title="Subir foto">
                                <i className="fa-solid fa-upload text-white"></i>
                                <input type="file" className="d-none" onChange={uploadImage} />
                            </label>
                        </div>
                    </div>
                </div>
                {/* ************************************************ INFORMACION PERSONAL ROW ************************************************************* */}
                <div className="row px-0 py-4  text-center">
                    {/* ************************************************ INFORMACION PERSONAL COLUMNA 1 ************************************************************* */}
                    <div className="col-md-6 d-flex flex-column justify-content-center">

                        {/* ************************************************ NAME ************************************************************* */}
                        <div className="border border-2 p-2">
                            <div className="row align-items-center">
                                {/* Columna de datos - más grande */}
                                <div className="col-9 d-flex justify-content-start">
                                    <div>
                                        <h6>Nombre</h6>
                                        {isEditing.name ? (
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="form-control"
                                            />
                                        ) : (
                                            <p>{store.profile.name || "N/A"}</p>
                                        )}
                                    </div>
                                </div>
                                {/* Columna del botón - más pequeña */}
                                <div className="col-3 d-flex justify-content-end">
                                    {isEditing.name ? (
                                        <>
                                            <button
                                                onClick={() => toggleEdit("name")}
                                                className="btn p-1 rounded-circle shadow-sm edit-btn"
                                                title="Cancelar"
                                            >
                                                <i className="fa-solid fa-x text-white"></i>
                                            </button>
                                            <button
                                                onClick={() => handleSave("name")}
                                                className="btn p-1 rounded-circle shadow-sm edit-btn ms-2"
                                                title="Guardar"
                                            >
                                                <i className="fa-solid fa-floppy-disk text-white"></i>
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            onClick={() => toggleEdit("name")}
                                            className="btn p-2 d-flex align-items-center justify-content-center rounded-circle shadow-sm edit-btn"
                                            title="Editar"
                                        >
                                            <i className="fa-solid fa-pencil text-white"></i>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                        {/* ************************************************ EMAIL ************************************************************* */}
                        <div className="border border-2 p-2">
                            <div className="row align-items-center">
                                <div className="col-9 d-flex justify-content-start">
                                    <div>
                                        <div className="text-start">
                                            <h6>Correo</h6>
                                        </div>
                                        <p>{store.profile.email || "N/A"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>


                        {/* ************************************************ NICKNAME ************************************************************* */}
                        <div className="border border-2 p-2">
                            <div className="row align-items-center">
                                {/* Columna de datos - más grande */}
                                <div className="col-9 d-flex justify-content-start">
                                    <div>
                                        <h6>Apodo</h6>
                                        {isEditing.nickname ? (
                                            <input
                                                type="text"
                                                name="nickname"
                                                value={formData.nickname}
                                                onChange={handleChange}
                                                className="form-control"
                                            />
                                        ) : (
                                            <p>{store.profile.nickname || "N/A"}</p>
                                        )}

                                    </div>

                                </div>
                                {/* Columna del botón - más pequeña */}
                                <div className="col-3 d-flex justify-content-end">
                                    {isEditing.nickname ? (
                                        <div className="d-flex flex-column">
                                            <button
                                                title="Cancelar"
                                                onClick={() => toggleEdit("nickname")}
                                                className="btn p-1 rounded-circle shadow-sm edit-btn"
                                            >
                                                <i className="fa-solid fa-x text-white"></i>
                                            </button>
                                            <button
                                                onClick={() => handleSave("nickname")}
                                                title="Guardar"
                                                className="btn p-1 rounded-circle shadow-sm edit-btn mt-2"
                                            >
                                                <i className="fa-solid fa-floppy-disk text-white"></i>
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => toggleEdit("nickname")}
                                            title="Editar"
                                            className="btn p-2 d-flex align-items-center justify-content-center rounded-circle shadow-sm edit-btn"
                                        >
                                            <i className="fa-solid fa-pencil text-white"></i>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* ************************************************ INFORMACION PERSONAL COLUMNA 2 ************************************************************* */}
                    <div className="col-md-6 d-flex flex-column justify-content-center">
                        {/* ************************************************ LASTNAME ************************************************************* */}
                        <div className="border border-2 p-2">
                            <div className="row align-items-center">
                                {/* Columna de datos - más grande */}
                                <div className="col-9 d-flex justify-content-start">
                                    <div>
                                        <h6>Apellido</h6>
                                        {isEditing.lastname ? (
                                            <input
                                                type="text"
                                                name="lastname"
                                                value={formData.lastname}
                                                onChange={handleChange}
                                                className="form-control"
                                            />
                                        ) : (
                                            <p>{store.profile.lastname || "N/A"}</p>
                                        )}

                                    </div>

                                </div>

                                {/* Columna del botón - más pequeña */}
                                <div className="col-3 d-flex justify-content-end">
                                    {isEditing.lastname ? (
                                        <div className="d-flex flex-column">
                                            <button
                                                title="Cancelar"
                                                onClick={() => toggleEdit("lastname")}
                                                className="btn p-1 rounded-circle shadow-sm edit-btn"
                                            >
                                                <i className="fa-solid fa-x text-white"></i>
                                            </button>
                                            <button
                                                onClick={() => handleSave("lastname")}
                                                title="Guardar"
                                                className="btn p-1 rounded-circle shadow-sm edit-btn mt-2"
                                            >
                                                <i className="fa-solid fa-floppy-disk text-white"></i>
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => toggleEdit("lastname")}
                                            title="Editar"
                                            className="btn p-2 d-flex align-items-center justify-content-center rounded-circle shadow-sm edit-btn"
                                        >
                                            <i className="fa-solid fa-pencil text-white"></i>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="border border-2 p-2">
                            {/* ************************************************ BIRTHDATE ************************************************************* */}
                            <div className="row align-items-center">
                                {/* Columna de datos - más grande */}
                                <div className="col-9 d-flex justify-content-start">
                                    <div>
                                        <h6>Fecha de nacimiento</h6>
                                        <div className="text-start">
                                        {isEditing.birthdate ? (
                                            <input
                                                type="date"
                                                name="birthdate"
                                                value={formData.birthdate}
                                                onChange={handleChange}
                                                className="form-control"
                                            />
                                        ) : (
                                            <p>{store.profile.birthdate || "N/A"}</p>
                                        )}
                                        </div>
                                    </div>

                                </div>

                                {/* Columna del botón - más pequeña */}
                                <div className="col-3 d-flex justify-content-end">
                                    {isEditing.birthdate ? (
                                        <div className="d-flex flex-column">
                                            <button
                                                title="Cancelar"
                                                onClick={() => toggleEdit("birthdate")}
                                                className="btn p-1 rounded-circle shadow-sm edit-btn"
                                            >
                                                <i className="fa-solid fa-x text-white"></i>
                                            </button>
                                            <button
                                                onClick={() => handleSave("birthdate")}
                                                title="Guardar"
                                                className="btn p-1 rounded-circle shadow-sm edit-btn mt-2"
                                            >
                                                <i className="fa-solid fa-floppy-disk text-white"></i>
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => toggleEdit("birthdate")}
                                            title="Editar"
                                            className="btn p-2 d-flex align-items-center justify-content-center rounded-circle shadow-sm edit-btn"
                                        >
                                            <i className="fa-solid fa-pencil text-white"></i>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="border border-2 p-2">
                            {/* ************************************************ ROLE ************************************************************* */}
                            <div className="d-flex justify-content-start">
                                <div className="row align-items-center">
                                    <div className="col-9 d-flex justify-content-start">
                                        <div>
                                            <div className="text-start">
                                                <h6>Rol</h6>
                                            </div>
                                            <p>{store.profile.role || "N/A"}</p>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};