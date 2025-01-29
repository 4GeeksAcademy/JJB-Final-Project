import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import Swal from "sweetalert2";
import "../../styles/commentCard.css";

export const CommentCard = ({ forum, toggleModal }) => {
    const { store, actions } = useContext(Context);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editedContent, setEditedContent] = useState("");
    const [showReplies, setShowReplies] = useState({});

    const toggleReplies = (commentId) => {
        setShowReplies(prevState => ({
            ...prevState,
            [commentId]: !prevState[commentId] 
        }));
    };

    const handleEditClick = (id_comment, currentContent) => {
        setEditingIndex(id_comment);
        setEditedContent(currentContent);
    };

    const handleSaveClick = async (id_comment) => {
        const resp = await actions.updateComment(id_comment, editedContent, forum); 
        handleResponse(resp);
        setEditingIndex(null);
        setEditedContent("");
    };

    const handleDeleteClick = async (id_comment) => {
        const confirm = await Swal.fire({
            position: "top",
            icon: "question",
            title: "¿Segura que deseas eliminar este comentario?",
            showConfirmButton: true,
            showCancelButton:true,
        })
        if(confirm.isConfirmed){
            const resp = await actions.deleteComment(id_comment); 
            handleResponse(resp);
            setEditingIndex(null);
            setEditedContent("");
        }
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
                title: resp.msg,
                showConfirmButton: false,
                timer: 2000
            });
        }
    };

    const renderComments = (comments) => {
        return comments.map((comment) => (
            <div key={comment.id_comment} className="card mb-3">
                <div className="card-header d-flex">
                    <h5 className="card-title flex-grow-1">{comment.nickname}</h5>
                    {comment.nickname === store.profile.nickname && (
                        <>
                            {editingIndex === comment.id_comment ? (
                                <button className="btn btn-primary me-2" onClick={() => handleSaveClick(comment.id_comment)}>
                                    Guardar
                                </button>
                            ) : (
                                <button className="btn btn-secondary me-2" onClick={() => handleEditClick(comment.id_comment, comment.content)}>
                                    Editar
                                </button>
                            )}
                            <button className="btn btn-danger" onClick={() => handleDeleteClick(comment.id_comment)}>
                                <i className="fa-solid fa-trash"></i>
                            </button>
                        </>
                    )}
                </div>
                <div className="card-body">
                    {editingIndex === comment.id_comment ? (
                        <textarea className="form-control" value={editedContent} onChange={(e) => setEditedContent(e.target.value)} />
                    ) : (
                        <p className="card-text">{comment.content}</p>
                    )}
                </div>
                <div className="card-footer text-muted d-flex">
                    <div className="flex-grow-1">
                        {comment.children && comment.children.length > 0 && (
                            <button className="btn btn-link" onClick={() => toggleReplies(comment.id_comment)}>
                                {showReplies[comment.id_comment] ? "Ocultar respuestas" : `Ver respuestas (${comment.children.length})`}
                            </button>
                        )}
                        <button className="btn btn-link" onClick={() => toggleModal(comment.id_comment)}>
                            Responder
                        </button>
                    </div>
                    <div>{comment.creation_date}</div>
                </div>

                {showReplies[comment.id_comment] && comment.children && comment.children.length > 0 && (
                    <div className="ms-4 replies" >
                        {renderComments(comment.children)}
                    </div>
                )}
            </div>
        ));
    };

    return (
        <div className="container my-5">
            <div className="d-flex flex-column gap-4">
                {store.forumDetails.comments && store.forumDetails.comments.length > 0 && renderComments(store.forumDetails.comments)}
            </div>
        </div>
    );
};
