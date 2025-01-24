import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/commentCard.css";
export const CommentCard = () => {
    const { store, actions } = useContext(Context);
    return (
        <div className="container my-5">
            <div className="d-flex flex-column gap-4">
                {store.forumDetails.comments.map((comment, index) => (
                    <div key={index} className="card">
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


