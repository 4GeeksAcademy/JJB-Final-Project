import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/forums.css";
import { Link, useNavigate } from "react-router-dom";

export const Forums = () => {

    const forums = [
        {
            title: "Forum Title 1",
            body: "This is the body of Forum 1. Here you can add main takeaway points, quotes, anecdotes, or even a very short story. The content is detailed and hardcoded for this example.",
            footer: "Created by User A"
        },
        {
            title: "Forum Title 2",
            body: "This is the body of Forum 2. Feel free to customize this text with relevant details about the topic or group associated with this forum.",
            footer: "Created by User B"
        },
        {
            title: "Forum Title 3",
            body: "This is the body of Forum 3. You can add important notes, discussion topics, or any other relevant content.",
            footer: "Created by User C"
        },
        {
            title: "Forum Title 4",
            body: "This is the body of Forum 4. Provide users with helpful context or key points to encourage interaction.",
            footer: "Created by User D"
        }
    ];

    // Function to generate forum cards dynamically
    function renderForums() {
        const forumContainer = document.getElementById('forum-container');
        forums.forEach(forum => {
            const col = document.createElement('div');
            col.className = 'col-md-4';

            col.innerHTML = `
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">${forum.title}</h5>
            <p class="card-text">${forum.body}</p>
          </div>
          <div class="card-footer text-muted">
            ${forum.footer}
          </div>
          <button class="btn btn-secondary m-3">Join</button>
        </div>
      `;

            forumContainer.appendChild(col);
        });
    }

    // Render forums on page load
    document.addEventListener('DOMContentLoaded', renderForums);

    return (
        <>
            <main className="container my-5">
                <div id="forum-container" class="row g-4">
                </div>
                <div className="text-center mt-4">
                    <button className="btn btn-primary">Create Forum</button>
                </div>
            </main>

        </>

    );
};
