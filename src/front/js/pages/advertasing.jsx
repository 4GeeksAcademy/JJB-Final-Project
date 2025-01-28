import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { Link, useNavigate } from "react-router-dom";
import { ForumCard } from "../component/forumCard.jsx";
import Swal from 'sweetalert2'
import "../../styles/colors.css";

export const Advertising = () => {
    const { store, actions } = useContext(Context);
    const [modalShows, setModalShows] = useState(false);
    const navigate = useNavigate();
    const [advertisingName, setAdvertisingName] = useState('');
    const [advertisingContent, setAdvertisingContent] = useState('');
    const [advertisingNameChanged, setAdvertisingNameChanged] = useState(false);
    const [advertisingContentChanged, setAdvertisingContentChanged] = useState(false);
    const [key, setKey] = useState(0);

    useEffect(() => {
        const loadAdvertising = async () => {
            const resp = await actions.loadAdvertising();
            if (resp.error_access_token) {
                console.log("resp:", resp);
                navigate('/');
            }
        };
        loadAdvertising();

    }, []);


    useEffect(() => {
        const modalElement = document.getElementById("myModal");
        const backdrop = document.createElement("div");

        backdrop.className = "modal-backdrop fade";

        if (modalShows) {
            modalElement.classList.add("show", "d-block");
            modalElement.setAttribute("aria-hidden", "false");

            document.body.appendChild(backdrop);
            setTimeout(() => backdrop.classList.add("show"), 10);
        } else {
            modalElement.classList.remove("show", "d-block");
            modalElement.setAttribute("aria-hidden", "true");

            const existingBackdrop = document.querySelector(".modal-backdrop");
            if (existingBackdrop) {
                existingBackdrop.classList.remove("show");
                setTimeout(() => existingBackdrop.remove(), 150);
            }
        }
    }, [modalShows]);

    const AdvertisingNameChanged = (e) => {
        setAdvertisingName(e.target.value);
        setAdvertisingNameChanged(true)
    }

    const AdvertisingContentChanged = (e) => {
        setAdvertisingContent(e.target.value);
        setAdvertisingContentChanged(true)
    }

    const toggleModal = () => {
        console.log("toggleModal:", modalShows)
        setModalShows(!modalShows)
        setAdvertisingName("");
        setAdvertisingContent("");
        setAdvertisingNameChanged(false);
        setAdvertisingContentChanged(false);
    }

    const sendFormAdvertising = async () => {
        console.log("Se manda formulario creacion publicidad")
        console.log("advertisingName:", advertisingName)
        console.log("advertisingContent:", advertisingContent)

        const response = await actions.sendFormAdvertising(advertisingName, advertisingContent);

        if (response.error) {
            console.error("FRONT Error al crear una publicidad:", response.error);
            Swal.fire({
                position: "top",
                icon: "error",
                title: "Error: " + response.error,
                showConfirmButton: false,
                timer: 3500
            });

        } else {
            console.log("FRONT:", response);
            Swal.fire({
                position: "top",
                icon: "success",
                title: "Publicidad creada exitosamente",
                showConfirmButton: false,
                timer: 2000
            });
            setAdvertisingName("");
            setAdvertisingContent("");
            setAdvertisingNameChanged(false);
            setAdvertisingContentChanged(false);
            resetAdvertisingCard();
            setModalShows(false);
        }
    }

    const resetAdvertisingCard = () => {
        setKey(prevKey => prevKey + 1);
    };

    const advertisingFormChanged = advertisingNameChanged && advertisingContentChanged;

    return (
        <>
            {store.forums.length > 0 ? <ForumCard key={key} /> : <h1> No se encontraron Forums </h1>}
            <div className="container">
                <div className="row">
                    <div className="col d-flex justify-content-center" >
                        <div className="btn"
                            style={{ background: 'var( --primary-color)', color: 'var(--text-color)' }}
                            onClick={toggleModal}
                        >
                            Crear Publicidad
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade mt-5"
                id="myModal"
                tabIndex="-1"
                aria-labelledby="myModalLabel"
                aria-hidden="true"
                role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button"
                                className="btn-close"
                                onClick={toggleModal}
                            ></button>
                        </div>


                        <form className="p-3">
                            <div className="mb-3">
                                <label htmlFor="nameForum" className="form-label">Publicidad</label>
                                <input type="text"
                                    className="form-control"
                                    id="nameForum"
                                    onChange={AdvertisingNameChanged}
                                    value={advertisingName}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="contentForum" className="form-label">Descripción</label>
                                <textarea
                                    className="form-control"
                                    id="contentForum"
                                    rows="1"
                                    onInput={(e) => {
                                        e.target.style.height = "auto";
                                        e.target.style.height = `${e.target.scrollHeight}px`;
                                    }}
                                    style={{ overflow: "hidden", resize: "none" }}
                                    onChange={AdvertisingContentChanged}
                                ></textarea>
                            </div>

                            <div className="d-grid">
                                <button type="button"
                                    style={{ background: 'var( --primary-color)', color: 'var(--text-color)' }}
                                    className="btn btn-primary btn-block"
                                    disabled={!advertisingFormChanged}
                                    onClick={sendFormAdvertising}
                                >
                                    Crear Publicidad
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>

    );
};
