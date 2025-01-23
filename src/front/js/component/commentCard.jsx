import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/commentCard.css";
export const CommentCard = () => {
    const { store, actions } = useContext(Context);
    return (
        <div className="container my-5">
            <div className="row g-4">
                {store.comments.map((item, index) => (
                    <div key={index} className="col-md-4">
                        <div className="card h-100">
                            <div className="card-body">
                                <h5 className="card-title">{item.title}</h5>
                                <p className="card-text">
                                    {item.content}
                                </p>
                                <Link to={`/comment/${item.id_comment}`} className="btn btn-secondary">Entrar</Link>
                            </div>
                            <div className="card-footer text-muted">
                                {item.creation_date}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


