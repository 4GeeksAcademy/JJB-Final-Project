import React, { useContext, useState, useEffect} from "react";
import { Context } from "../store/appContext";
import "../../styles/profile.css";
import { Link, useNavigate } from "react-router-dom";

export const Profile = (props) => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [image,setImage] = useState("")
	  console.log(store.profile);

    useEffect( () => {
        const loadProfile = async () => {
            const resp = await actions.loadProfile();
            if (resp.error_access_token) {
                console.log("resp:", resp);
                navigate('/');
            }
        };
        loadProfile();

    }, []);

    const uploadImage = async (e) => {
      console.log(e.target.files[0]);
      const formData = new FormData()

      formData.append('image', e.target.files[0])
      console.log(formData.get("image"));
      
      const response = await fetch(process.env.BACKEND_URL + "api/upload",{
        method: "POST",
        body: formData,
        header: {
          "Content-Type":"multipart/formdata"
        }
      })

      const data = await response.json()
      if (data){
        setImage(data)
      }
      console.log(data);
      
  
      

    }

    return (
        <div className="container-fluid">
          <div className="row">
            {/* Sidebar */}
            <div className="col-md-3 sidebar">
              <div className="text-center mb-4">
                <div className="profile-icon">
                <img src={image} alt="Avatar" className="profile-avatar" />

                  <span className="icon-initial">A</span>
                </div>
                <p className="nickname">{store.profile.nickname}</p>
                <p className="email">{store.profile.email}</p>
              </div>
              <ul className="menu-list">
                <li>Favoritos</li>
                <li>Pagos</li>
                <li>Suscripción</li>
                <li>Editar Perfil</li>
                <li>Cuenta</li>
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
                        <h6>Nombre completo</h6>
                        <p>{store.profile.name + " " + store.profile.lastname}</p>
                      </div>
                      <div className="col-6">
                        <h6>Cumpleaños</h6>
                        <p>{store.profile.birthdate}</p>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-6">
                        <h6>Correo</h6>
                        <p>{store.profile.email}</p>
                      </div>
                      <div className="col-6">
                        <h6>Rol</h6>
                        <p>{store.profile.role}</p>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-6">
                        <h6>Apodo</h6>
                        <p>{store.profile.nickname}</p>
                      </div>
                      <div className="col-6">
                        <h6>Membresia</h6>
                        <p>{store.profile.membership}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <input type="file" onChange={uploadImage}/>
          <img src={image}/>
        </div>
      );
};
