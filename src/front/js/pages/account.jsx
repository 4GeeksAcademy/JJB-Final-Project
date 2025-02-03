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
        avatar_url: "",
        name: "",
        lastname: "",
        birthdate: "",
        nickname: ""

    });

    // Función para activar/desactivar edición
    const toggleEdit = (field) => {
        setIsEditing((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    // Manejar cambios en el input
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Simular guardado
    const handleSave = async (field) => {
        console.log(`Guardando ${field}:`, formData[field]);
        console.log(`formData:`, formData);
        const resp = await actions.updateProfile(formData);

        toggleEdit(field);
        setFormData({
            name: "",
            lastname: "",
            nickname: "",
            birthdate: ""
        });
        if (resp.error) {
            console.error("FRONT Error al crear un foro:", response.error);
            Swal.fire({
                position: "top",
                icon: "error",
                title: "Error: " + resp.error,
                showConfirmButton: false,
                timer: 3500
            });

        } else {
            console.log("FRONT:", resp);
            Swal.fire({
                position: "top",
                icon: "success",
                title: "Usuario actualizado exitosamente:",
                showConfirmButton: false,
                timer: 2000
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
                        <h2>Membresia {store.profile.membership === "free" ? (<span className="badge text-bg-primary">New</span>) : (<span className="badge text-bg-primary">noNew</span>) }</h2>
                        <p>{store.profile.membership || "N/A"}</p>
                    </div>
                    <div className="row">
                        {/* Columna 1 */}
                        <div className="col-md-4 d-flex justify-content-center align-items-center flex-column">
                            <img
                                className="profile"
                                src={image || store.profile.image_url || "https://thispersondoesnotexist.com/"}
                                alt="Profile"
                            />
                            <input type="file" />
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
                                            <button onClick={() => handleSave("name")}>Guardar</button>
                                        ) : (
                                            <button onClick={() => toggleEdit("name")}><i class="fa-solid fa-pencil"></i></button>
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
                                            <button onClick={() => handleSave("nickname")}>Guardar</button>
                                        ) : (
                                            <button onClick={() => toggleEdit("nickname")}><i class="fa-solid fa-pencil"></i></button>
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
                                            <button onClick={() => handleSave("lastname")}>Guardar</button>
                                        ) : (
                                            <button onClick={() => toggleEdit("lastname")}><i class="fa-solid fa-pencil"></i></button>
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
                                                    type="text"
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
                                            <button onClick={() => handleSave("birthdate")}>Guardar</button>
                                        ) : (
                                            <button onClick={() => toggleEdit("birthdate")}><i class="fa-solid fa-pencil"></i></button>
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
