import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/commentCard.css";
export const CommentCard = (props) => {
    const { store, actions } = useContext(Context);


    const handleEditClick = (index, currentContent) => {
        setEditingIndex(index);
        setEditedContent(currentContent);
    };

    const handleSaveClick = (index) => {
        actions.updateComment(index, editedContent, props.forum); 
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
                            <div className="">
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
                        <div className="card-body">
                            <h5 className="card-title">{comment.nickname}</h5>
                            <p className="card-text">
                                {comment.content}
                            </p>
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


