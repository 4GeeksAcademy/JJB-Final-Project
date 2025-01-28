import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/commentCard.css";
import Swal from "sweetalert2";

export const CommentCard = (props) => {
    const { store, actions } = useContext(Context);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editedContent, setEditedContent] = useState("");

    const handleEditClick = (index, currentContent) => {
        setEditingIndex(index);
        setEditedContent(currentContent);
    };

    const handleSaveClick = (index) => {
        
        const resp = actions.updateComment(index, editedContent, props.forum); 
        handleResponse(resp);
        console.log("handleSaveClick, index", index, " props.forum",  props.forum)
        setEditingIndex(null);
        setEditedContent("");
    };

    const handleDeleteClick = (index) => {
        //const resp = actions.deleteComment(index, props.forum); 
        //handleResponse(resp);
        console.log("handleDeleteClick, index", index, " props.forum",  props.forum)
        setEditingIndex(null);
        setEditedContent("");
    };

    const handleResponse = (resp) => {
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
                title: "Comentario editado exitosamente",
                showConfirmButton: false,
                timer: 2000
            });
        }
    };
    

    return (
        <div className="container my-5">
            <div className="d-flex flex-column gap-4">
                {store.forumDetails.comments.map((comment, index) => (
                    <div key={index} className="card">
                        <div className="card-header d-flex">
                            <h5 className="card-title flex-grow-1">{comment.nickname}</h5>
                            <div className="me-1">
                                <div>
                                    {comment.nickname === store.profile.nickname && (
                                        editingIndex === index ? (
                                            <button
                                                className="btn btn-primary"
                                                onClick={() => handleSaveClick(index)}
                                            >
                                                Guardar
                                            </button>
                                        ) : (
                                            <button
                                                className="btn btn-secondary"
                                                onClick={() => handleEditClick(index, comment.content)}
                                            >
                                                Editar
                                            </button>
                                        )
                                        
                                    )}
                                </div>

                            </div>
                            <div>
                                {comment.nickname === store.profile.nickname && (
                                    <button
                                    className="btn btn-secondary"
                                        onClick={() => handleDeleteClick(index)}
                                    >
                                        <i className="fa-solid fa-trash"></i>
                                    </button>                                                                                
                                )}
                            </div>
                        </div>
                        <div className="card-body">
                            {editingIndex === index ? (
                                <textarea
                                    className="form-control"
                                    value={editedContent}
                                    onChange={(e) => setEditedContent(e.target.value)}
                                />
                            ) : (
                                <p className="card-text">{comment.content}</p>
                            )}
                        </div>
                        <div className="card-footer text-muted">
                            {comment.creation_date}
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );
};


