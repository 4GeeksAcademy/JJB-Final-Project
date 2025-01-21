import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { Link, useNavigate } from "react-router-dom";
import { ForumCard } from "../component/forumCard.jsx";
import "../../styles/colors.css";

export const Forums = () => {
    const { store, actions } = useContext(Context);
    const [modalShows, setModalShows] = useState(false);

    useEffect(() => {
        actions.loadForums();
    }, []);

    const toggleModal = () => {
        setModalShows(!modalShows)
    }
    
    
    return (
        <>
            {store.forums.length > 0 ? <ForumCard/> : <h1> No se encontraron Forums </h1>}
            <div className="container">
                <div className="row">
                    <div className="col d-flex justify-content-center" >
                        <div className="btn" 
                            style={{background: 'var( --primary-color)', color: 'var(--text-color)'}}
                            // onClick={toggleModal}
                            data-bs-toggle="modal" data-bs-target="#myModal">
                            Crear Foro
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade mt-5" id="myModal" tabIndex="-1" aria-labelledby="myModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form className="p-3">
                            <div className="mb-3">
                                <label htmlFor="nameForum" className="form-label">Nombre del Foro</label>
                                <input type="text" className="form-control" id="nameForum" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="contentForum" className="form-label">Descripción</label>
                                <textarea type="text" className="form-control" id="contentForum"/>
                            </div> 
                            <div className="d-grid">
                                <button type="button" className="btn btn-primary btn-block">Crear Foro</button>
                            </div>                           
                        </form>
                    </div>
                </div>
            </div>
        </>

    );
};
