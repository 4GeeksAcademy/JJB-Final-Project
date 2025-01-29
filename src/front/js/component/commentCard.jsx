import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import Swal from "sweetalert2";
import "../../styles/commentCard.css";

export const CommentCard = ({ forum, toggleModal }) => {
    const { store, actions } = useContext(Context);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editedContent, setEditedContent] = useState("");

    const handleEditClick = (id_comment, currentContent) => {
        setEditingIndex(id_comment);
        setEditedContent(currentContent);
    };

    const handleSaveClick = (id_comment) => {
        const resp = actions.updateComment(id_comment, editedContent, forum); 
        handleResponse(resp);
        setEditingIndex(null);
        setEditedContent("");
    };

    const handleDeleteClick = (id_comment) => {
        const resp = actions.deleteComment(id_comment); 
        handleResponse(resp);
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

    const renderComments = (comments) => {
        return comments.map((comment) => (
            <div key={comment.id_comment} className="card mb-3">
                <div className="card-header d-flex">
                    <h5 className="card-title flex-grow-1">{comment.nickname} --- {comment.id_comment}</h5>
                    {comment.nickname === store.profile.nickname && (
                        <>
                            {editingIndex === comment.id_comment ? (
                                <button
                                    className="btn btn-primary me-2"
                                    onClick={() => handleSaveClick(comment.id_comment)}
                                >
                                    Guardar
                                </button>
                            ) : (
                                <button
                                    className="btn btn-secondary me-2"
                                    onClick={() => handleEditClick(comment.id_comment, comment.content)}
                                >
                                    Editar
                                </button>
                            )}
                            <button
                                className="btn btn-danger"
                                onClick={() => handleDeleteClick(comment.id_comment)}
                            >
                                <i className="fa-solid fa-trash"></i>
                            </button>
                        </>
                    )}
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
                <div className="card-footer text-muted d-flex">
                    <button className="btn btn-link flex-grow-1" onClick={() => toggleModal(comment.id_comment)}>
                        Responder
                    </button>
                    <div>{comment.creation_date}</div>
                </div>
                {comment.children && comment.children.length > 0 && (
                    <div className="ms-4">
                        {renderComments(comment.children)}
                    </div>
                )}
            </div>
        ));
    };

    return (
        <div className="container my-5">
            <div className="d-flex flex-column gap-4">
                {store.forumDetails.comments &&
                    store.forumDetails.comments.length > 0 &&
                    renderComments(store.forumDetails.comments)}
            </div>
        </div>
    );
};
