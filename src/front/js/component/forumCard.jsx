import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/forum.css";
import FavoriteButton from "../component/FavoriteButton.jsx";



export const ForumCard = ({ forum, user }) => {
    
    const { store, actions } = useContext(Context);
    console.log(store.forums);
    
    return (
        
                    <div className="col-md-4">
                        <div className="card h-100">
                            <div className="card-body d-flex flex-column">
                                {forum.image_url && (
                                    <img className="mb-3 card-img-top" src={forum.image_url} alt={forum.title} />
                                )}
                                <h5 className="card-title">{forum.title}</h5>
                                <p className="card-text">{forum.content}</p>
                               
                                <FavoriteButton
                id_forum={forum.id_forum} // ID del foro
                id_advertising={null}     // Si es para publicidad, pasas el ID de la publicidad
            />

                                
                                {/* Botón siempre al final */}
                                <Link to={`/forum/${forum.id_forum}`} 
                                    className="btn btn-secondary mt-auto ">
                                        Entrar
                                </Link>
                            </div>
                            <div className="card-footer text-muted">
                                {forum.creation_date}
                            </div>
                        </div>
                    </div>
                
    );
};







