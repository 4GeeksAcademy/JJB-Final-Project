import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/account.css";
import { SideBar } from "../component/sideBar.jsx";
import Swal from "sweetalert2";

export const Account = () => {
    const { store, actions } = useContext(Context);
    const [image, setImage] = useState("");
    const [isEditing, setIsEditing] = useState({});
    const [formData, setFormData] = useState({
        image_url: store.profile.image_url,
        name: store.profile.name,
        lastname: store.profile.lastname,
        birthdate: store.profile.birthdate,
        nickname: store.profile.nickname,

    });

    // Función para activar/desactivar edición
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

    // Simular guardado
    const handleSave = async (field) => {
        console.log("formData:", formData);
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
        } else {
            console.error("FRONT Error al crear un foro:", response.error);
            Swal.fire({
                position: "top",
                icon: "error",
                title: "Error: " + resp.error,
                showConfirmButton: false,
                timer: 3500
            });
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
                        <h2>Membresia
                            {store.profile.membership?.trim().toLowerCase() === "free" ?
                                (<span className="badge rounded-pill bg-primary">Mejora tu plan</span>) :
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
                                src={image || store.profile.image_url}
                                alt="Profile"
                            />
                            <label className="btn p-1 rounded-circle shadow-sm edit-btn" title="Subir foto">
                                <i className="fa-solid fa-upload"></i>
                                <input type="file" className="d-none" />
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