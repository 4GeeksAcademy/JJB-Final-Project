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
           
        </>

    );
};
