import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Necesitarás tener axios instalado (npm install axios)

export const Favorites = () => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Función para obtener los favoritos
        const fetchFavorites = async () => {
            const token = localStorage.getItem('jwt_token');  // Obtener el token JWT desde el almacenamiento local
            if (!token) {
                setError('No se encontró el token de autenticación');
                setLoading(false);
                return;
            }

            try {
                // Realizar la solicitud GET a tu API de favoritos
                const response = await axios.get('/api/favorites', {
                    headers: {
                        Authorization: `Bearer ${token}`,  // Enviar el token en el encabezado
                    },
                });
                setFavorites(response.data);  // Guardar los favoritos obtenidos
                setLoading(false);  // Cambiar el estado de carga a false
            } catch (err) {
                setError('Hubo un error al cargar los favoritos');
                setLoading(false);  // Cambiar el estado de carga a false en caso de error
            }
        };

        fetchFavorites();
    }, []);

    // Mostrar "Loading..." mientras se obtienen los datos
    if (loading) {
        return <div>Loading...</div>;
    }

    // Si hay un error, mostrarlo
    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="favorites-page">
            <h2>Tus Favoritos</h2>
            {favorites.length === 0 ? (
                <p>No tienes favoritos aún.</p>
            ) : (
                <div className="favorites-list">
                    {favorites.map((favorite) => (
                        <div key={favorite.id_favorite} className="favorite-item">
                            {favorite.type === 'forum' ? (
                                <div className="favorite-forum">
                                    <h3>{favorite.data.title}</h3>
                                    <p>{favorite.data.content}</p>
                                    <a href={`/forum/${favorite.data.id_forum}`}>Ver foro</a>
                                </div>
                            ) : (
                                <div className="favorite-ad">
                                    <h3>{favorite.data.title}</h3>
                                    <p>{favorite.data.content}</p>
                                    <a href={`/advertising/${favorite.data.id_advertising}`}>Ver anuncio</a>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
