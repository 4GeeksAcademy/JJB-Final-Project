import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { Link, useNavigate } from "react-router-dom";
import { ForumCard } from "../component/forumCard.jsx";
import { ImageUploader } from "../component/imageUploader.jsx";
import { Modal } from "../component/modal.jsx";
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
    const [isUploading, setIsUploading] = useState(false);


    useEffect(() => {
        const loadForums = async () => {
            const resp = await actions.loadForums();
            if (resp.error_access_token) {
                console.log("resp:", resp);
                navigate('/');
            }
        };
        loadForums();

    }, []);

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


    const forumFormChanged = forumNameChanged && forumContentChanged;

    return (
        <div className="px-md-5 px-4">

            {store.forums.length > 0 ?
                <div className="container my-5">
                    <div className="row g-4">

                        {store.forums.map((item, index) => {
                            return (
                                <ForumCard key={index} forum={item} />
                            )
                        })}
                    </div></div>
                : <div className="w-100 d-flex justify-content-center mt-5 flex-grow-1">
                    <div className="alert alert-warning p-4 rounded shadow-sm col-md-8 col-lg-6 w-100 text-center" role="alert">
                        <h4 className="alert-heading">No se encontraron foros</h4>
                        <p>Parece que aún no hay foros disponibles. ¡Anímate a crear el primero!</p>
                    </div>
                </div>
            }
            <div className="container w-75">
                <div className="row">
                    <div className="col-12 d-flex justify-content-center">
                        <button
                            className="btn col-12 col-md-6 col-lg-4"
                            style={{ background: 'var(--primary-color)', color: 'var(--text-color)' }}
                            onClick={toggleModal}
                        >
                            Crear Foro
                        </button>
                    </div>
                </div>
            </div>


            <Modal show={modalShows} onClose={toggleModal}>
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
                        {/* Uso del componente ImageUploader */}
                        <ImageUploader
                            onUploadComplete={(response) => setImage(response)}
                            uploadFunction={actions.uploadPhoto}
                            isUploading={isUploading}
                            setIsUploading={setIsUploading}
                        />
                    </div>
                    <div className="d-grid">
                        <button type="button"
                            style={{ background: 'var( --primary-color)', color: 'var(--text-color)' }}
                            className="btn btn-primary btn-block"
                            disabled={!forumFormChanged || isUploading}
                            onClick={sendFormForum}
                        >
                            Crear Foro
                        </button>
                    </div>
                </form>
            </Modal>
        </div>

    );
};
