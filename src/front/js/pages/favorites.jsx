import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/forum.css";
import { ForumCard } from "../component/forumCard.jsx";



export const Favorites = () => {
    
    const { store, actions } = useContext(Context);
    console.log(store.forums);
    
    return (
        <>
        <h1>Foros</h1>
        <div className="container my-5">
            <div className="row g-4">
                {store.favorites.length > 0 && store.favorites.map((item, index) => {
    if(item.type == "forum"){
         return <ForumCard key={index} forum={item.data}/>
    }
                   })}
            </div>
        </div>
        <h1>Publicidades</h1>
        
        </>
    );
};







