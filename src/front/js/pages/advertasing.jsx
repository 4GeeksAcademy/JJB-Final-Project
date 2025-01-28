import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { Link, useNavigate } from "react-router-dom";
import { ForumCard } from "../component/forumCard.jsx";
import Swal from 'sweetalert2'
import "../../styles/colors.css";

export const Advertising = () => {
    const { store, actions } = useContext(Context);
   
    return (
        <>
        {store.forums.length > 0 ? <ForumCard key={key}/> : <h1> No se encontraron Forums </h1>}
        <div className="container">
                <div className="row">
                    <div className="col d-flex justify-content-center" >
                        <div className="btn" 
                            style={{background: 'var( --primary-color)', color: 'var(--text-color)'}}
                            // onClick={toggleModal}
                            >
                            Crear Publicidad
                        </div>
                    </div>
                </div>
            </div>
           
        </>

    );
};
