import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { Link, useNavigate } from "react-router-dom";
import { ForumCard } from "../component/forumCard.jsx";
import "../../styles/colors.css";

export const Forums = () => {
    const { store, actions } = useContext(Context);
    const [modalShows, setModalShows] = useState(false);
    // variables del form para crear un foro
    const [forumName, setForumName] = useState('');
    const [forumContent, setForumContent] = useState('');
    const [forumNameChanged, setForumNameChanged] = useState(false);
    const [forumContentChanged, setForumContentChanged] = useState(false);

    useEffect(() => {
        actions.loadForums();
    }, []);

    const toggleModal = () => {
        setModalShows(!modalShows)
    }

    const ForumNameChanged = (e) => {
        setForumName(e.target.value);
        setForumNameChanged(true)
    }

    const ForumContentChanged = (e) => {
        setForumContent(e.target.value);
        setForumContentChanged(true)
    }
    
    const sendFormForum = async () => {
        console.log("Se manda formulario creacion foro")
        console.log("forumName:", forumName)
        console.log("forumContent:", forumContent)

        const response = await actions.sendFormForum(forumName, forumContent);

        // if (store.userToken) {
        //     console.log("FRONT:", response);
        //     console.log("store.userToken:", store.userToken);
        //     alert("Inicio de sesión exitoso");
        //     navigate("/profile");

        // } else {
        //     console.error("FRONT Error al iniciar sesión:", response.error);
        //     if (response.status == 404) {
        //         console.log("response.status:", response.status);
        //         setFailedAttempts((prev) => prev + 1);    
        //         if (failedAttempts + 1>= 3) {
        //             setShowModal(true);
        //         } 
        //     }
        //     alert("Error: " + response.error);
        // }
    }
        
    const forumFormChanged = forumNameChanged && forumContentChanged;
    
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
                                <input type="text" className="form-control" id="nameForum" onChange={ForumNameChanged}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="contentForum" className="form-label">Descripción</label>
                                <textarea type="text" className="form-control" id="contentForum" onChange={ForumContentChanged}/>
                            </div> 
                            <div className="d-grid">
                                <button type="button" 
                                    style={{background: 'var( --primary-color)', color: 'var(--text-color)'}}
                                    className="btn btn-primary btn-block"
                                    disabled={!forumFormChanged}
                                    onClick={sendFormForum}
                                >
                                    Crear Foro
                                </button>
                            </div>                           
                        </form>
                    </div>
                </div>
            </div>
        </>

    );
};
