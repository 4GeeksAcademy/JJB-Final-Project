import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import Swal from "sweetalert2";
import "../../styles/forum.css";

export const AdvertisingCard = () => {
    const { store, actions } = useContext(Context);
    const [editedIdAdvertising, setEditedIdAdvertising] = useState(null);
    const [editedTitle, setEditedTitle] = useState("");
    const [editedContent, setEditedContent] = useState("");

    const handleEditClick = (id_advertising, currentTitle, currentContent) => {
        setEditedIdAdvertising(id_advertising);
        setEditedTitle(currentTitle);
        setEditedContent(currentContent);
    };

    const handleSaveClick = async (id_advertising) => {
        const resp = await actions.updateAdvertising(id_advertising, editedTitle, editedContent);
        handleResponse(resp);
        setEditedIdAdvertising(null);
        setEditedTitle("");
        setEditedContent("");
    };

    const handleDeleteClick = async (id_advertising) => {
        const result = await Swal.fire({
            title: "¿Estás seguro?",
            text: "No podrás recuperar esta publicidad después de eliminarla.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        });

        if (result.isConfirmed) {
            const resp = await actions.deleteAdvertising(id_advertising);
            handleResponse(resp);
        }
    };

    const handleResponse = async (resp) => {
        if (!resp || resp.error) {
            Swal.fire({
                position: "top",
                icon: "error",
                title: "Error: " + (resp?.error || "Error desconocido"),
                showConfirmButton: false,
                timer: 3500,
            });
        } else {
            Swal.fire({
                position: "top",
                icon: "success",
                title: resp.msg || "Acción realizada con éxito",
                showConfirmButton: false,
                timer: 2000,
            });
        }
    };

    return (
        <div className="container my-5">
            <div className="row g-4">
                {store.advertising?.map((item, index) => (
                    <div key={index} className="col-md-4">
                        <div className="card h-100">
                            <div className="card-body">
                                {editedIdAdvertising === item.id_advertising ? (
                                    <>
                                        <input

                                            type="text"
                                            className="form-control mb-2"
                                            value={editedTitle}
                                            onChange={(e) => setEditedTitle(e.target.value)}
                                            placeholder="Editar título"
                                        />
                                        <textarea
                                            className="form-control"
                                            value={editedContent}
                                            onChange={(e) => setEditedContent(e.target.value)}
                                            placeholder="Editar contenido"
                                        />
                                    </>
                                ) : (
                                    <>
                                        <img className="advertising-image img-fluid" src={item.image_url} alt="Publicidad" />
                                        <h5 className="card-title">{item.title}</h5>
                                        <p className="card-text">{item.content}</p>
                                    </>
                                )}
                            </div>
                            <div className="card-footer d-flex justify-content-between">
                                <div className="text-muted">{item.creation_date}</div>
                                <div>
                                    {item.nickname === store.profile?.nickname && (
                                        <div className="card-footer d-flex justify-content-between">
                                            {editedIdAdvertising === item.id_advertising ? (
                                                <button
                                                    className="btn btn-primary me-2"
                                                    onClick={() => handleSaveClick(item.id_advertising)}
                                                >
                                                    Guardar
                                                </button>
                                            ) : (
                                                <button
                                                    className="btn btn-secondary me-2"
                                                    onClick={() =>
                                                        handleEditClick(item.id_advertising, item.title, item.content)
                                                    }
                                                >
                                                    Editar
                                                </button>
                                            )}
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => handleDeleteClick(item.id_advertising)}
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
