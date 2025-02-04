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
        lastname: store.profile.lastname ,
        birthdate: store.profile.birthdate ,
        nickname: store.profile.nickname ,

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
        // if field
        console.log(`Guardando ${field}:`, formData[field]);
        console.log(`formData:`, formData);
        const resp = await actions.updateProfile(formData);

        toggleEdit(field);
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
            actions.loadProfile();
            console.log("FRONT:", resp);
            Swal.fire({
                position: "top",
                icon: "success",
                title: "Usuario actualizado exitosamente",
                showConfirmButton: false,
                timer: 2000
            });
        }
    };

    const EditableField = ({ label, name, value }) => (
        <div className="d-flex align-items-center">
            <div className="flex-grow-1">
                <h6>{label}</h6>
                {isEditing[name] ? (
                    <>
                    {console.log("formData", formData[name])}
                    <input type={`${name === 'birthdate' ? "date": "text"}`} name={name} value={formData[name]} onChange={handleChange} />
                    </>
                ) : (
                    <p>{value || "N/A"}</p>
                )}
            </div>
            <div className="d-flex flex-column">
                <button
                    onClick={() =>toggleEdit(name)}
                    className={`btn p-2 rounded-circle shadow-sm edit-btn ${isEditing[name] ? "" : "d-none"}`}
                >
                    <i className="fa-solid fa-x"></i>
                </button>
                <button
                    onClick={() => isEditing[name] ? handleSave(name) : toggleEdit(name)}
                    className={`btn p-2 rounded-circle shadow-sm edit-btn mt-2`}
                >
                    <i className={`fa-solid fa-${isEditing[name] ? "floppy-disk" : "pencil"}`}></i>
                </button>
            </div>
        </div>
    );
    
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
                                src={image || store.profile.image_url || "https://thispersondoesnotexist.com/"}
                                alt="Profile"
                            />
                            <input type="file" />
                        </div>
                        {/* Columna 2 */}
                        <div className="col-md-4">
                            <div className="row">
                                <EditableField label="Nombre" name="name" value={store.profile.name} />
                            </div>
                            <div className="row">
                                <h6>Correo</h6>
                                <p>{store.profile.email || "N/A"}</p>
                            </div>
                            <div className="row">
                                <EditableField label="Apodo" name="nickname" value={store.profile.nickname} />
                            </div>
                        </div>

                        {/* Columna 3 */}
                        <div className="col-md-4">
                            <div className="row">
                                <EditableField label="Apellido" name="lastname" value={store.profile.lastname} />
                            </div>
                            <div className="row">
                                <EditableField label="Cumpleaños" name="birthdate" value={store.profile.birthdate} />
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

