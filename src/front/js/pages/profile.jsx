import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/profile.css";
import { Link, useNavigate } from "react-router-dom";
import { SideBar } from "../component/sideBar.jsx";

export const Profile = (props) => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [image, setImage] = useState("");

    return (
      <div className="container-fluid">
          <div className="row">    
              {/* Main Content */}
              <div className="col-md-9 main-content">
                  <div className="row align-items-center">
                      <div className="col-md-4 d-flex justify-content-center">
                          <div className="profile-image">
                              <img
                                  className="profile-avatar"
                                  src={store.profile.avatar_url}
                                  alt="Profile"
                              />
                          </div>
                      </div>
  
                      <div className="col-md-8">
                          <div className="profile-info text-start">
                              <div className="row mb-3">
                                  <div className="col-6">
                                      <h6>Nombre completo</h6>
                                      <p>{`${store.profile.name || "-"} ${store.profile.lastname || "-"}`}</p>
                                  </div>
                                  <div className="col-6">
                                      <h6>Cumpleaños</h6>
                                      <p>{store.profile.birthdate || "N/A"}</p>
                                  </div>
                              </div>
  
                              <div className="row mb-3">
                                  <div className="col-6">
                                      <h6>Correo</h6>
                                      <p>{store.profile.email || "N/A"}</p>
                                  </div>
                                  <div className="col-6">
                                      <h6>Rol</h6>
                                      <p>{store.profile.role || "N/A"}</p>
                                  </div>
                              </div>
  
                              <div className="row mb-3">
                                  <div className="col-6">
                                      <h6>Apodo</h6>
                                      <p>{store.profile.nickname || "N/A"}</p>
                                  </div>
                                  <div className="col-6">
                                      <h6>Membresía</h6>
                                      <p>{store.profile.membership || "N/A"}</p>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  );  
};
