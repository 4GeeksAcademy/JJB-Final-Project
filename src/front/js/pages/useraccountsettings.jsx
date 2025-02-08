import React, { useContext, useState } from "react";
import { Context } from "../store/appContext.js";
import "../../styles/useraccountsettings.css";
import { SideBar } from "../component/sideBar.jsx";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const UserAccountSettings = () => {
    const { store, actions } = useContext(Context);
    const [image, setImage] = useState("");
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
        <div className="container-fluid mt-5 mt-md-0">
            <div className="row">
                {/* Main Content */}
                <div className="col-md-9 ">
                    <div className="row mb-3">
                        <h2>Membresia
                            {store.profile.membership?.trim().toLowerCase() === "gratis" ?
                            (<Link to={"/subscription"}><button className="badge rounded-pill bg-primary">Mejora tu plan</button></Link>):
                                (<span className="badge rounded-pill bg-warning">Plan premium+</span>)
                            }
                        </h2>
                        <p>{store.profile.membership || "N/A"}</p>
                    </div>
                    <div className="row">
                        {/* Columna 1 */}
                        <div className="col-md-4 d-flex justify-content-center align-items-center flex-column">
                            <img
                                className="profile"
                                src={image || store.profile.avatar_url}
                                alt="Profile"
                            />
                            <label className="btn p-1 rounded-circle shadow-sm edit-btn mt-2" title="Subir foto">
                                <i className="fa-solid fa-upload"></i>
                                <input type="file" className="d-none" onChange={uploadImage} />
                            </label>
                        </div>

                        {/* Columna 2 */}
                        <div className="col-md-4">
                            <div className="row">
                                <div className="d-flex">
                                    <div className="flex-grow-1">
                                        <h6>Nombre</h6>
                                        {isEditing.name ? (
                                            <>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                />

                                            </>
                                        ) : (
                                            <>
                                                <p>{store.profile.name || "N/A"}</p>

                                            </>
                                        )}
                                    </div>
                                    <div className="d-flex justify-content-center align-items-center">
                                        {isEditing.name ? (
                                            <>
                                                <div className="d-flex flex-column">
                                                    <button
                                                        onClick={() => toggleEdit("name")}
                                                        className={`btn p-1 rounded-circle shadow-sm edit-btn ${isEditing.name ? "" : "d-none"}`}
                                                        title="Cancelar"
                                                    >
                                                        <i className="fa-solid fa-x"></i>
                                                    </button>
                                                    <button onClick={() => handleSave("name")}
                                                        className="btn p-1 rounded-circle shadow-sm edit-btn mt-2"
                                                        title="Guardar"
                                                    >
                                                        <i className="fa-solid fa-floppy-disk"></i>
                                                    </button>
                                                </div>

                                            </>
                                        ) : (
                                            <button onClick={() => toggleEdit("name")}
                                                className="edit btn p-2 d-flex align-items-center justify-content-center rounded-circle shadow-sm edit-btn"
                                                title="Editar"
                                            ><i className="fa-solid fa-pencil "></i></button>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <h6>Correo</h6>
                                <p>{store.profile.email || "N/A"}</p>
                            </div>

                            <div className="row">
                                <div className="d-flex">
                                    <div className="flex-grow-1">
                                        <h6>Apodo</h6>
                                        {isEditing.nickname ? (
                                            <>
                                                <input
                                                    type="text"
                                                    name="nickname"
                                                    value={formData.nickname}
                                                    onChange={handleChange}
                                                />

                                            </>
                                        ) : (
                                            <>
                                                <p>{store.profile.nickname || "N/A"}</p>

                                            </>
                                        )}
                                    </div>
                                    <div className="d-flex justify-content-center align-items-center">
                                        {isEditing.nickname ? (
                                            <>
                                                <div className="d-flex flex-column">
                                                    <button
                                                        title="Cancelar"
                                                        onClick={() => toggleEdit("nickname")}
                                                        className={`btn p-1 rounded-circle shadow-sm edit-btn ${isEditing.nickname ? "" : "d-none"}`}
                                                    >
                                                        <i className="fa-solid fa-x"></i>
                                                    </button>
                                                    <button onClick={() => handleSave("nickname")}
                                                        title="Guardar"
                                                        className="btn p-1 rounded-circle shadow-sm edit-btn mt-2"
                                                    >
                                                        <i className="fa-solid fa-floppy-disk"></i>
                                                    </button>
                                                </div>
                                            </>
                                        ) : (
                                            <button onClick={() => toggleEdit("nickname")}
                                                title="Editar"
                                                className="edit btn btn-outline-secondary p-2 d-flex align-items-center justify-content-center rounded-circle shadow-sm edit-btn "
                                            ><i className="fa-solid fa-pencil "></i></button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Columna 3 */}
                        <div className="col-md-4">
                            <div className="row">
                                <div className="d-flex">
                                    <div className="flex-grow-1">
                                        <h6>Apellido</h6>
                                        {isEditing.lastname ? (
                                            <>
                                                <input
                                                    type="text"
                                                    name="lastname"
                                                    value={formData.lastname}
                                                    onChange={handleChange}
                                                />

                                            </>
                                        ) : (
                                            <>
                                                <p>{store.profile.lastname || "N/A"}</p>

                                            </>
                                        )}
                                    </div>
                                    <div className="d-flex justify-content-center align-items-center">
                                        {isEditing.lastname ? (
                                            <>
                                                <div className="d-flex flex-column">
                                                    <button
                                                        title="Cancelar"
                                                        onClick={() => toggleEdit("lastname")}
                                                        className={`btn p-1 rounded-circle shadow-sm edit-btn ${isEditing.lastname ? "" : "d-none"}`}
                                                    >
                                                        <i className="fa-solid fa-x"></i>
                                                    </button>
                                                    <button onClick={() => handleSave("lastname")}
                                                        title="Guardar"
                                                        className="btn p-1 rounded-circle shadow-sm edit-btn mt-2"
                                                    >
                                                        <i className="fa-solid fa-floppy-disk"></i>
                                                    </button>
                                                </div>
                                            </>
                                        ) : (
                                            <button onClick={() => toggleEdit("lastname")}
                                                title="Editar"
                                                className="edit btn btn-outline-secondary p-2 d-flex align-items-center justify-content-center rounded-circle shadow-sm edit-btn "
                                            ><i className="fa-solid fa-pencil "></i></button>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="d-flex">
                                    <div className="flex-grow-1">
                                        <h6>Cumpleaños</h6>
                                        {isEditing.birthdate ? (
                                            <>
                                                <input
                                                    type="date"
                                                    name="birthdate"
                                                    value={formData.birthdate}
                                                    onChange={handleChange}
                                                />

                                            </>
                                        ) : (
                                            <>
                                                <p>{store.profile.birthdate || "N/A"}</p>

                                            </>
                                        )}
                                    </div>
                                    <div className="d-flex justify-content-center align-items-center">
                                        {isEditing.birthdate ? (
                                            <>
                                                <div className="d-flex flex-column">
                                                    <button
                                                        title="Cancelar"
                                                        onClick={() => toggleEdit("birthdate")}
                                                        className={`btn p-1 rounded-circle shadow-sm edit-btn ${isEditing.birthdate ? "" : "d-none"}`}
                                                    >
                                                        <i className="fa-solid fa-x"></i>
                                                    </button>
                                                    <button onClick={() => handleSave("birthdate")}
                                                        title="Guardar"
                                                        className="btn p-1 rounded-circle shadow-sm edit-btn mt-2"
                                                    >
                                                        <i className="fa-solid fa-floppy-disk"></i>
                                                    </button>
                                                </div>
                                            </>
                                        ) : (
                                            <button onClick={() => toggleEdit("birthdate")}
                                                title="Editar"
                                                className="edit btn btn-outline-secondary p-2 d-flex align-items-center justify-content-center rounded-circle shadow-sm edit-btn "
                                            ><i className="fa-solid fa-pencil "></i></button>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <h6>Rol</h6>
                                <p>{store.profile.role || "N/A"}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};