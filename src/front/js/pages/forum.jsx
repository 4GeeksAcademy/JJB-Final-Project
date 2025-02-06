import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { Link, useNavigate } from "react-router-dom";
import { ForumCard } from "../component/forumCard.jsx";
import Swal from 'sweetalert2'
import "../../styles/colors.css";

export const Forums = () => {
    const { store, actions } = useContext(Context);
    const [modalShows, setModalShows] = useState(false);
    const navigate = useNavigate();
    // variables del form para crear un foro
    const [forumName, setForumName] = useState('');
    const [forumContent, setForumContent] = useState('');
    const [forumNameChanged, setForumNameChanged] = useState(false);
    const [forumContentChanged, setForumContentChanged] = useState(false);
    const [key, setKey] = useState(0);
    const [image, setImage] = useState("")

    
    useEffect( () => {
        const loadForums = async () => {
            const resp = await actions.loadForums();
            if (resp.error_access_token) {
                console.log("resp:", resp);
                navigate('/');
            }
        };
        loadForums();

    }, []);

    useEffect(() => {
        const modalElement = document.getElementById("myModal");
        const backdrop = document.createElement("div");

        backdrop.className = "modal-backdrop fade"; 

        if (modalShows) {
            modalElement.classList.add("show", "d-block");
            modalElement.setAttribute("aria-hidden", "false");

            document.body.appendChild(backdrop);
            setTimeout(() => backdrop.classList.add("show"), 10);
        } else {
            modalElement.classList.remove("show", "d-block");
            modalElement.setAttribute("aria-hidden", "true");

            const existingBackdrop = document.querySelector(".modal-backdrop");
            if (existingBackdrop) {
                existingBackdrop.classList.remove("show");
                setTimeout(() => existingBackdrop.remove(), 150); 
            }
        }
    }, [modalShows]);

    const toggleModal = () => {
        console.log("toggleModal:", modalShows)
        setModalShows(!modalShows)
        setForumName(""); 
        setForumContent(""); 
        setForumNameChanged(false); 
        setForumContentChanged(false);
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
        console.log("image:", image)

        const response = await actions.sendFormForum(forumName, forumContent, image);

        if (response.error) {
            console.error("FRONT Error al crear un foro:", response.error);
            Swal.fire({
                position: "top",
                icon: "error",
                title: "Error: " + response.error,
                showConfirmButton: false,
                timer: 3500
            });

        } else {
            
            console.log("FRONT:", response);
            Swal.fire({
                position: "top",
                icon: "success",
                title: "Foro creado exitosamente",
                showConfirmButton: false,
                timer: 2000
            });
            setForumName(""); 
            setForumContent(""); 
            setForumNameChanged(false); 
            setForumContentChanged(false);
            resetForumCard(); 
            setModalShows(false);
            setImage("")
        }
    }

    const resetForumCard = () => {
        setKey(prevKey => prevKey + 1);
    };

    const uploadImage = async (e) => {
        console.log(e.target.files[0]);
        const formData = new FormData()

        formData.append('image', e.target.files[0])
        console.log(formData.get("image"));

        const response = await actions.uploadPhoto(formData)

        if (!response.error) {
            setImage(response)
        }
    }
        
    const forumFormChanged = forumNameChanged && forumContentChanged;
    
    return (
        <>
            {store.forums.length > 0 ? <ForumCard key={key}/> : <h1> No se encontraron Forums </h1>}
            <div className="container">
                <div className="row">
                    <div className="col d-flex justify-content-center" >
                        <div className="btn" 
                            style={{background: 'var( --primary-color)', color: 'var(--text-color)'}}
                            onClick={toggleModal}
                            >
                            Crear Foro
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade mt-5" 
                id="myModal" 
                tabIndex="-1" 
                aria-labelledby="myModalLabel" 
                aria-hidden="true"  
                role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button"
                                className="btn-close" 
                                onClick={toggleModal}
                            ></button>
                        </div>
                        <form className="p-3">
                            <div className="mb-3">
                                <label htmlFor="nameForum" className="form-label">Nombre del Foro</label>
                                <input type="text" 
                                    className="form-control" 
                                    id="nameForum" 
                                    onChange={ForumNameChanged}
                                    value={forumName}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="contentForum" className="form-label">Descripción</label>
                                <textarea type="text" 
                                    className="form-control" 
                                    id="contentForum" 
                                    onChange={ForumContentChanged}
                                    value={forumContent}
                                    />
                            </div> 
                            <div className="mb-3">
                                <label htmlFor="imageInput" className="form-label">Imagen (opcional)</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="imageInput"
                                    onChange={uploadImage}
                                />
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
