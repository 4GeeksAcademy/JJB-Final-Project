import React, { useState,useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/commentCard.css";

export const FavoriteButton = ({id_forum, id_advertising }) => {
    const { store, actions } = useContext(Context);
    const [isFavorite, setIsFavorite] = useState(null) 
    console.log(id_forum);
    
    const handleClick = async ()=>{
        const result = await actions.onToggleFavorite(id_forum, id_advertising)

    }
      

    useEffect(() => {
        if(id_forum){
            const result = store.favorites.some(item => item.data?.id_forum == id_forum)
            console.log(result);
            
            if (result){
                setIsFavorite(result)
            } else{

                setIsFavorite(false)
            }
        }
        if(id_advertising){
            const result = store.favorites.some(item => item.data?.id_advertising == id_advertising)
            if (result){
                setIsFavorite(result)
            } else{
                
                setIsFavorite(false)
            }
        }
    }, [id_forum, id_advertising, store.favorites])
    return (
        <button 
            onClick={handleClick} 
            style={{ border: "none", background: "none", cursor: "pointer" }}>
            {isFavorite ? "❤️" : "🤍"} 
        </button>
    );
};


export default FavoriteButton
