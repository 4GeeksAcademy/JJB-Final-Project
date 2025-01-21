import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { Link, useNavigate } from "react-router-dom";
import { ForumCard } from "../component/forumCard.jsx";

export const Forums = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.loadForums();
    }, []);
    
    return (
        <>
            {store.forums.lengh > 0 ? <ForumCard/> : <h1> No se encontraron Forums </h1>}
        </>

    );
};
