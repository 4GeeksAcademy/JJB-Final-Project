import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/forum.css";
export const ForumCard = () => {
    const { store, actions } = useContext(Context);
    return (
        <div className="container my-5">
            <div className="row g-4">
                {store.forums.map((item, index) => (
                    <div key={index} className="col-md-4">
                        <div className="card h-100">
                            <div className="card-body d-flex flex-column">
                                {item.image_url && (
                                    <img className="mb-3 card-img-top" src={item.image_url} alt={item.title} />
                                )}
                                <h5 className="card-title">{item.title}</h5>
                                <p className="card-text">{item.content}</p>
                                
                                {/* Botón siempre al final */}
                                <Link to={`/forum/${item.id_forum}`} 
                                    className="btn btn-secondary mt-auto ">
                                        Entrar
                                </Link>
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







