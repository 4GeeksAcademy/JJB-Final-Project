import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../../styles/colors.css";

export const ForumDetail = () => {
    const { store, actions } = useContext(Context);
    const { forum_id } = useParams();
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log("forum_id", forum_id);

        actions.loadForumDetails(forum_id);
    }, [forum_id]);


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
            <div>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Escribe tu comentario aquí..."
                ></textarea>
                <button onClick={handleCommentSubmit} disabled={loading}>
                    {loading ? "Enviando..." : "Comentar"}
                </button>
            </div>
        </div>
    );
};
