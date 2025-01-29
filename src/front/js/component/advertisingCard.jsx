import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/forum.css";
import Swal from "sweetalert2";

export const AdvertisingCard = () => {
    const { store, actions } = useContext(Context);
    // const [editedIdAdvertising, setEditedIdAdvertising] = useState(null);
    // const [editedContent, setEditedContent] = useState("");

    // const handleEditClick = (id_advertising, currentContent) => {
    //     setEditedIdAdvertising(id_advertising);
    //     setEditedContent(currentContent);
    // };

    // const handleSaveClick = (id_advertising) => {
    //     const resp = actions.updateAdvertising(id_advertising, editedContent);
    //     handleResponse(resp);
    //     console.log("handleSaveClick, id_advertising", id_advertising)
    //     setEditedIdAdvertising(null);
    //     setEditedContent("");
    // };

    const handleDeleteClick = (id_advertising) => {
        const resp = actions.deleteAdvertising(id_advertising);
        handleResponse(resp);
        console.log("handleDeleteClick, id_advertising", id_advertising)
        setEditedIdAdvertising(null);
        setEditedContent("");
    };

    const handleResponse = async (resp) => {
        if (resp.error) {
            Swal.fire({
                position: "top",
                icon: "error",
                title: "Error: " + resp.error,
                showConfirmButton: false,
                timer: 3500
            });
        } else {
            Swal.fire({
                position: "top",
                icon: "success",
                title: resp.msg,
                showConfirmButton: false,
                timer: 2000
            });
        }
    };



    return (
        <div className="container my-5">
            <div className="row g-4">
                {store.advertising.map((item, index) => (
                    <div key={index} className="col-md-4">
                        <div className="card h-100">
                            <div className="card-body">
                                <h5 className="card-title">{item.title}</h5>
                                <p className="card-text">
                                    {item.content}
                                </p>
                            </div>
                            <div className="card-footer d-flex justify-content-between">

                                <div className="text-muted">
                                    {item.creation_date}
                                </div>


                            <div>
                                {item.nickname === store.profile.nickname && (
                                    <button
                                    className="btn btn-secondary"
                                        onClick={() => handleDeleteClick(item.id_advertising)}
                                    >
                                        <i className="fa-solid fa-trash"></i>
                                    </button>                                                                                
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







