import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { ForumCard } from "../component/forumCard.jsx";
import FavoriteButton from "../component/FavoriteButton.jsx";
import "../../styles/favorites.css"; // Archivo de estilos específico para esta página

export const Favorites = () => {
    const { store } = useContext(Context);

    return (
        <div className="favorites-container">
            <h1 className="section-title">Foros Favoritos</h1>
            <div className="container my-4">
                <div className="row g-4">
                    {store.favorites
                        .filter(item => item.type === "forum")
                        .map((item, index) => (
                            <ForumCard key={index} forum={item.data} />
                        ))}
                </div>
            </div>

            <h1 className="section-title">Publicidades Favoritas</h1>
            <div className="container my-4">
                <div className="row g-4">
                    {store.favorites
                        .filter(item => item.type === "advertising")
                        .map((item, index) => (
                            <div key={index} className="col-md-4">
                                <div className="card favorite-ad-card">
                                    <div className="card-body">
                                        <img 
                                            className="advertising-image img-fluid rounded" 
                                            src={item.data.image_url} 
                                            alt={item.data.title} 
                                        />
                                        <h5 className="card-title">{item.data.title}</h5>
                                        <p className="card-text">{item.data.content}</p>
                                        <FavoriteButton 
                                            id_forum={null} 
                                            id_advertising={item.data.id_advertising} 
                                        />
                                    </div>
                                    <div className="card-footer text-muted text-center">
                                        {item.data.creation_date}
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};
