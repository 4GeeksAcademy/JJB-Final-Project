import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { useParams } from "react-router-dom";
import { CommentCard } from "../component/commentCard.jsx";
import Swal from "sweetalert2";
import "../../styles/colors.css";

export const AdvertisingDetail = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="container">
            <h1>{store.advertisingDetail.title}</h1>
            <p>{store.advertisingDetail.content}</p>
            <p>Creado por: {store.advertisingDetail.nickname}</p>
            <p>Fecha: {new Date(store.advertisingDetail.creation_date).toLocaleDateString()}</p>
        </div>
    );
};
