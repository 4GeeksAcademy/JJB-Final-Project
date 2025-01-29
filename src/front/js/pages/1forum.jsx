import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { useParams, useNavigate } from "react-router-dom";
import { CommentCard } from "../component/commentCard.jsx";
import Swal from "sweetalert2";
import "../../styles/colors.css";

export const ForumDetail = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const { forum_id } = useParams();

    const [isEditing, setIsEditing] = useState(false);
    const [modalShows, setModalShows] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [comment, setComment] = useState("");
     const [image,setImage] = useState("")
    const [commentChanged, setCommentChanged] = useState(false);

    const uploadImage = async (e) => {
        console.log(e.target.files[0]);
        const formData = new FormData()

        formData.append('image', e.target.files[0])
        console.log(formData.get("image"));

        const response = await fetch(process.env.BACKEND_URL + "api/upload", {
            method: "POST",
            body: formData,
            header: {
                "Content-Type": "multipart/formdata"
            }
        })

        const data = await response.json()
        if (data) {
            setImage(data)
        }
        console.log(data);




    }


    // Carga los detalles del foro
    useEffect(() => {
        const loadForumDetails = async () => {
            const resp = await actions.loadForumDetails(forum_id);
            if (resp.error) {
                console.log("resp:", resp);
                navigate("/");
            } else {
                setTitle(resp.title);
                setContent(resp.content);
            }
        };
        loadForumDetails();
    }, [forum_id]);

    // Modal de comentarios
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

    // Editar foro
    const handleEdit = async () => {
        const updatedForum = await actions.updateForum(forum_id, { title, content });
        if (!updatedForum.error) {
            Swal.fire({
                position: "top",
                icon: "success",
                title: "Foro actualizado exitosamente",
                showConfirmButton: false,
                timer: 2000
            });
            setIsEditing(false);
            actions.loadForumDetails(forum_id); // Recarga el foro actualizado
        } else {
            Swal.fire({
                position: "top",
                icon: "error",
                title: "Error al actualizar el foro",
                showConfirmButton: false,
                timer: 3500
            });
        }
    };

    // Eliminar foro
    const handleDelete = async () => {
        const confirm = await Swal.fire({
            position: "top",
            icon: "question",
            title: "¿Segura que deseas eliminar este foro?",
            showConfirmButton: true,
            showCancelButton: true,
        })
        if (confirm.isConfirmed) {
            const result = await actions.deleteForum(forum_id);
            if (!result.error) {
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: "Foro eliminado exitosamente",
                    showConfirmButton: false,
                    timer: 2000
                });
                navigate("/forums"); // Redirige después de eliminar
            } else {
                Swal.fire({
                    position: "top",
                    icon: "error",
                    title: "Error al eliminar el foro",
                    showConfirmButton: false,
                    timer: 3500
                });
            }
        }

    };

    if (!store.forumDetails) {
        return <h1>Cargando...</h1>;
    }

    return (
        <div className="container">
            <h1>Detalles del Foro</h1>
            {!isEditing ? (
                <div>
                    <h2>{title}</h2>
                    <p>{content}</p>
                    <img src={image} />
                    <p>Creado por: {store.forumDetails.nickname}</p>
                    <p>Fecha: {new Date(store.forumDetails.creation_date).toLocaleDateString()}</p>
                    <button className="btn me-3" style={{ background: "var(--accent-color)", color: "var(--text-color)" }} onClick={() => setIsEditing(true)}>
                        Editar Foro
                    </button>
                    <button className="btn" style={{ background: "var(--primary-color)", color: "var(--text-color)" }} onClick={handleDelete}>
                        <i className="fa-solid fa-trash"></i>
                    </button>
                </div>
            ) : (
                <form>
                    <div className="mb-3">
                        <label htmlFor="forumTitle" className="form-label">Título</label>
                        <input
                            type="text"
                            className="form-control"
                            id="forumTitle"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="forumContent" className="form-label">Contenido</label>
                        <textarea
                            className="form-control"
                            id="forumContent"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>
                    <input type="file" onChange={uploadImage} />
                    <button className="btn me-3" style={{ background: "var(--secondary-color)", color: "var(--text-color)" }} onClick={handleEdit}>
                        Guardar Cambios
                    </button>
                    <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>
                        Cancelar
                    </button>
                </form>
            )}

            <hr />
            <h3>Comentarios</h3>
            <button onClick={toggleModal}>Agregar comentario</button>
            {store.forumDetails?.comments?.length > 0 ? (
                <CommentCard forum={forum_id} />
            ) : (
                <h1>No se encontraron Comentarios</h1>
            )}
            <hr />

            {/* Modal para comentarios */}
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
                                <label htmlFor="contentForum" className="form-label">Comentario</label>
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
