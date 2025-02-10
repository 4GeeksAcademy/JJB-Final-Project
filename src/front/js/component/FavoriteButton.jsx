import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import Swal from "sweetalert2";
import "../../styles/commentCard.css";


const FavoriteButton = ({ id_User, id_Forum, id_Advertising, isFavorite, onToggleFavorite }) => {
    const [favorite, setFavorite] = useState(isFavorite);

    const handleClick = async () => {
        try {
            const response = await fetch(`${process.env.BACKEND_URL}api/favorites`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id_user: idUser, id_forum: idForum, id_advertising: idAdvertising })
            });

            if (response.ok) {
                setFavorite(!favorite);
                onToggleFavorite && onToggleFavorite();
            }
        } catch (error) {
            console.error("Error al cambiar el estado de favorito:", error);
        }
    };

    return (
        <button onClick={handleClick} style={{ border: "none", background: "none", cursor: "pointer" }}>
            {favorite ? "❤️" : "🤍"} 
        </button>
    );
};

export default FavoriteButton;
