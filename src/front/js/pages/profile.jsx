import React, { useContext, useState, useEffect} from "react";
import { Context } from "../store/appContext";
import "../../styles/profile.css";
import { Link} from "react-router-dom";

export const Profile = (props) => {
    const { store, actions } = useContext(Context);
	  console.log(store.profile);

    useEffect(() => {
      actions.loadProfile(store.profile.email);
    }, []);

    return (
        <div className="container-fluid">
          <div className="row">
            {/* Sidebar */}
            <div className="col-md-3 sidebar">
              <div className="text-center mb-4">
                <div className="profile-icon">
                  <span className="icon-initial">A</span>
                </div>
                <p className="nickname">{store.profile.nickname}</p>
                <p className="email">{store.profile.email}</p>
              </div>
              <ul className="menu-list">
                <li>Favorites</li>
                <li>Payments</li>
                <li>Subscription</li>
                <li>Edit Profile</li>
                <li>Account</li>
              </ul>
            </div>
    
            {/* Main Content */}
            <div className="col-md-9 main-content">
              <div className="row align-items-center">
                <div className="col-md-4">
                  <div className="profile-image">
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
                  <div className="profile-info text-start">
                    <div className="row mb-3">
                      <div className="col-6">
                        <h6>Full Name</h6>
                        <p>{store.profile.name + " " + store.profile.lastname}</p>
                      </div>
                      <div className="col-6">
                        <h6>Birthdate</h6>
                        <p>{store.profile.birthdate}</p>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-6">
                        <h6>Email</h6>
                        <p>{store.profile.email}</p>
                      </div>
                      <div className="col-6">
                        <h6>Role</h6>
                        <p>{store.profile.role}</p>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-6">
                        <h6>Nickname</h6>
                        <p>{store.profile.nickname}</p>
                      </div>
                      <div className="col-6">
                        <h6>Membership</h6>
                        <p>{store.profile.membership}</p>
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
