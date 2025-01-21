import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { Link, useNavigate } from "react-router-dom";
import { ForumCard } from "../component/forumCard.jsx";

export const Forums = () => {

    return (
        <>
            <ForumCard />
        </>

    );
};
