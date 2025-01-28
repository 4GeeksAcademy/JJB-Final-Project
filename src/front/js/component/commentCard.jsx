import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/commentCard.css";
export const CommentCard = (props) => {
    const { store, actions } = useContext(Context);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editedContent, setEditedContent] = useState("");

    const handleEditClick = (index, currentContent) => {
        setEditingIndex(index);
        setEditedContent(currentContent);
    };

    const handleSaveClick = (index) => {
        //actions.updateComment(index, editedContent, props.forum); 
        setEditingIndex(null);
        setEditedContent("");
    };

    const handleDeleteClick = (index) => {
        //actions.deleteComment(index, props.forum); 
        setEditingIndex(null);
        setEditedContent("");
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
                                        <i class="fa-solid fa-trash"></i>
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


