import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { Link, useNavigate } from "react-router-dom";
import { ForumCard } from "../component/forumCard.jsx";
import "../../styles/colors.css";

export const Forums = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.loadForums();
    }, []);

    const showModal = () => {
        
    }
    
    
    return (
        <>
            {store.forums.length > 0 ? <ForumCard/> : <h1> No se encontraron Forums </h1>}
            <div className="container">
                <div className="row">
                    <div className="col d-flex justify-content-center" >
                        <div className="btn" 
                            style={{background: 'var( --primary-color)', color: 'var(--text-color)'}}
                            onClick={showModal}
                            >
                            Crear Foro
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};
