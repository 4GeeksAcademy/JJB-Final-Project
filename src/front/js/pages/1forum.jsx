import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../../styles/colors.css";

export const ForumDetail = () => {
    const { store, actions } = useContext(Context);
    const [modalShows, setModalShows] = useState(false);
    const [comment, setComment] = useState('');
    const [commentChanged, setCommentChanged] = useState(false);
    // const [key, setKey] = useState(0);
    const { forum_id } = useParams();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log("forum_id", forum_id);
        actions.loadForumDetails(forum_id);
    }, [forum_id]);

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
        setComment("");
        setCommentChanged(false);
    }

    const CommentChanged = (e) => {
        setComment(e.target.value);
        setCommentChanged(true)
    }

    const sendFormComment = async () => {
        console.log("Se manda formulario creacion comentario")
        console.log("comment:", comment)

        const response = await actions.addCommentToForum(forum_id,comment);

        if (response.error) {
            console.error("FRONT Error al agragar un comentario:", response.error);
            alert("Error: " + response.error);

        } else {
            console.log("FRONT:", response);
            setComment("");
            setCommentChanged(false);
            // resetCommentCard(); 
            setModalShows(false);
        }
    }

    // const resetCommentCard = () => {
    //     setKey(prevKey => prevKey + 1);
    // };


    const handleCommentSubmit = async () => {
        if (comment.trim() === "") {
            alert("El comentario no puede estar vacío");
            return;
        }

        setLoading(true);
        const success = await actions.addCommentToForum(forum_id, comment);
        if (success) {
            setComment(""); // Limpiar el campo del comentario
            actions.loadForumDetails(forum_id); // Recargar los comentarios
        }
        setLoading(false);
    };

    if (!store.forumDetails) {
        return <h1>Cargando...</h1>;
    }

    return (
        <div className="container">
            <h1>{store.forumDetails.title}</h1>
            <p>{store.forumDetails.content}</p>
            <p>Creado por: {store.forumDetails.nickname}</p>
            <p>Fecha: {new Date(store.forumDetails.creation_date).toLocaleDateString()}</p>
            <hr />
            <h3>Comentarios</h3>
            {store.forumDetails?.comments?.length > 0 ? (
                store.forumDetails.comments.map((comment, index) => (
                    <div key={index}>
                        <p><strong>{comment.id_user}:</strong> {comment.content}</p>
                    </div>
                ))
            ) : (
                <h1>No se encontraron Comentarios</h1>
            )}

            <hr />

            <button onClick={toggleModal}>Agregar comentario</button>



            {/* <div>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Escribe tu comentario aquí..."
                ></textarea>
                <button onClick={handleCommentSubmit} disabled={loading}>
                    {loading ? "Enviando..." : "Comentar"}
                </button>
            </div> */}

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
                                <label htmlFor="contentForum" className="form-label">Descripción</label>
                                <textarea type="text"
                                    className="form-control"
                                    id="contentForum"
                                    onChange={CommentChanged}
                                    value={comment}
                                />
                            </div>

                            <div className="d-grid">
                                <button type="button"
                                    style={{ background: 'var( --primary-color)', color: 'var(--text-color)' }}
                                    className="btn btn-primary btn-block"
                                    disabled={!commentChanged}
                                    onClick={sendFormComment}
                                >
                                    Crear Comentario
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>



        </div>
    );
};
