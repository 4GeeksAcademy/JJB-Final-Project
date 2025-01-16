import React, { useContext, useState, useEffect} from "react";
import { Context } from "../store/appContext";
import "../../styles/login.css";
import { Link } from "react-router-dom";

export const Profile = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="container-fluid">
          <div className="row">
            {/* Sidebar */}
            <div className="col-md-3 sidebar" style={{ backgroundColor: "#ffe6e6", height: "100vh", paddingTop: "20px" }}>
              <div className="text-center mb-4">
                <div
                  className="profile-image"
                  style={{
                    width: "150px",
                    height: "150px",
                    backgroundColor: "#ffe6e6",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "50%",
                    margin: "0 auto",
                    fontSize: "50px",
                    color: "#333",
                  }}
                >
                  A
                </div>
                <h6 className="mt-2">Nickname</h6>
                <p>Email</p>
              </div>
              <div className="list-group">
                <a href="#" className="list-group-item">
                  Favorites
                </a>
                <a href="#" className="list-group-item">
                  Payments
                </a>
                <a href="#" className="list-group-item">
                  Subscription
                </a>
                <a href="#" className="list-group-item">
                  Edit Profile
                </a>
                <a href="#" className="list-group-item">
                  Account
                </a>
              </div>
            </div>
            {/* Main Content */}
            <div className="col-md-9 main-content" style={{ padding: "30px" }}>
              <div className="row">
                <div className="col-md-4 text-center">
                  <div
                    className="profile-image"
                    style={{
                      width: "150px",
                      height: "150px",
                      backgroundColor: "#ffe6e6",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "50%",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="80"
                      height="80"
                      fill="currentColor"
                      className="bi bi-person"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                      <path
                        fillRule="evenodd"
                        d="M8 9a5 5 0 0 0-4.546 2.914C4.99 13.14 6.346 14 8 14s3.01-.86 4.546-2.086A5 5 0 0 0 8 9zm0 1c-1.657 0-3 1.343-3 3 0 .795.316 1.519.828 2.047.527.544 1.236.953 2.172.953.937 0 1.645-.41 2.172-.953.512-.528.828-1.252.828-2.047 0-1.657-1.343-3-3-3z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="profile-info">
                    <h5>Full Name</h5>
                    <p>Name and lastname</p>
                    <h5>Birthdate</h5>
                    <p>01/01/2000</p>
                    <h5>Email</h5>
                    <p>test@gmail.com</p>
                    <h5>Role</h5>
                    <p>Usuario</p>
                    <h5>Nickname</h5>
                    <p>testing</p>
                    <h5>Membership</h5>
                    <p>Free</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
};
