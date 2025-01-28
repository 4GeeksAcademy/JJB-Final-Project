import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { useParams } from "react-router-dom";
import { CommentCard } from "../component/commentCard.jsx";
import Swal from "sweetalert2";
import "../../styles/colors.css";

export const ForumDetail = () => {
    const { store, actions } = useContext(Context);
    const [modalShows, setModalShows] = useState(false);
    const [comment, setComment] = useState("");
    const [commentChanged, setCommentChanged] = useState(false);
    const { forum_id } = useParams();


    useEffect(() => {
        const loadForumDetails = async () => {
            const resp = await actions.loadForumDetails(forum_id);
            if (resp.error) {
                console.log("resp:", resp);
                navigate('/');
            }
        };
        loadForumDetails();

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
        setModalShows(!modalShows);
        setComment("");
        setCommentChanged(false);
    };

    const CommentChanged = (e) => {
        setComment(e.target.value);
        setCommentChanged(true);
    };

    const sendFormComment = async () => {
        const response = await actions.addCommentToForum(forum_id, comment);

        if (response.error) {
            Swal.fire({
                position: "top",
                icon: "error",
                title: "Error: " + response.error,
                showConfirmButton: false,
                timer: 3500
            });
        } else {
            Swal.fire({
                position: "top",
                icon: "success",
                title: "Comentario creado exitosamente",
                showConfirmButton: false,
                timer: 2000
            });

            setComment("");
            setCommentChanged(false);
            setModalShows(false);
            await actions.loadForumDetails(forum_id);
        }
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
            <button onClick={toggleModal}>Agregar comentario</button>
            {store.forumDetails?.comments?.length > 0 ? (
                <CommentCard forum={forum_id} />
            ) : (
                <h1>No se encontraron Comentarios</h1>
            )}
            <hr />


            <div
                className="modal fade mt-5"
                id="myModal"
                tabIndex="-1"
                aria-labelledby="myModalLabel"
                aria-hidden="true"
                role="dialog"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button
                                type="button"
                                className="btn-close"
                                onClick={toggleModal}
                            ></button>
                        </div>
                        <form className="p-3">
                            <div className="mb-3">
                                <label htmlFor="contentForum" className="form-label">
                                    Comentario
                                </label>
                                <textarea
                                    type="text"
                                    className="form-control"
                                    id="contentForum"
                                    onChange={CommentChanged}
                                    value={comment}
                                />
                            </div>
                            <div className="d-grid">
                                <button
                                    type="button"
                                    style={{
                                        background: "var(--primary-color)",
                                        color: "var(--text-color)"
                                    }}
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
