import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/commentCard.css";
import Swal from "sweetalert2";

export const CommentCard = (props) => {
    const { store, actions } = useContext(Context);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editedContent, setEditedContent] = useState("");

    const handleEditClick = (id_comment, currentContent) => {
        setEditingIndex(id_comment);
        setEditedContent(currentContent);
    };

    const handleSaveClick = (id_comment) => {

        const resp = actions.updateComment(id_comment, editedContent, props.forum); 
        handleResponse(resp);
        console.log("handleSaveClick, id_comment", id_comment, " props.forum",  props.forum)
        setEditingIndex(null);
        setEditedContent("");
    };

    const handleDeleteClick = (id_comment) => {
        const resp = actions.deleteComment(id_comment); 
        handleResponse(resp);
        console.log("handleDeleteClick, id_comment", id_comment)
        setEditingIndex(null);
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
                                        editingIndex === comment.id_comment ? (
                                            <button
                                                className="btn btn-primary"
                                                onClick={() => handleSaveClick(comment.id_comment)}
                                            >
                                                Guardar
                                            </button>
                                        ) : (
                                            <button
                                                className="btn btn-secondary"
                                                onClick={() => handleEditClick(comment.id_comment, comment.content)}
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
                                        onClick={() => handleDeleteClick(comment.id_comment)}
                                    >
                                        <i className="fa-solid fa-trash"></i>
                                    </button>                                                                                
                                )}
                            </div>
                        </div>
                        <div className="card-body">
                            {editingIndex === comment.id_comment ? (
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


