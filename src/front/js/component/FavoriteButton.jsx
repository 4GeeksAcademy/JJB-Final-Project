import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/commentCard.css";

export const FavoriteButton = ({ id_User, id_Forum, id_Advertising }) => {
    const { store, actions } = useContext(Context);
    
    // Verificar si este foro está en favoritos
    const isFavorite = store.favorites.includes(id_Forum);  

    const handleClick = async () => {
        try {
            const response = await fetch(`${process.env.BACKEND_URL}api/favorites`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id_user: id_User,
                    id_forum: id_Forum,
                    id_advertising: id_Advertising
                })
            });

            if (response.ok) {
                // Cambiar el estado local
                if (isFavorite) {
                    actions.removeFavorite(id_Forum); // Eliminar si ya está en favoritos
                } else {
                    actions.addFavorite(id_Forum); // Agregar si no está
                }
            }
        } catch (error) {
            console.error("Error al cambiar el estado de favorito:", error);
        }
    };

    return (
        <button 
            onClick={handleClick} 
            style={{ border: "none", background: "none", cursor: "pointer" }}>
            {isFavorite ? "❤️" : "🤍"} 
        </button>
    );
};


export default FavoriteButton
