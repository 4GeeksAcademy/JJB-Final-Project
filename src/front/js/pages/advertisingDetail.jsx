import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { useParams } from "react-router-dom";
import { CommentCard } from "../component/commentCard.jsx";
import Swal from "sweetalert2";
import "../../styles/colors.css";

export const AdvertisingDetail = () => {
    const { store, actions } = useContext(Context);
    
    return (
      <>
      
      </>
    );
};
