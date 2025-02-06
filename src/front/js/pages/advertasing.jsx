import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { Link, useNavigate } from "react-router-dom";
import { AdvertisingCard } from "../component/advertisingCard.jsx";
import { Modal } from "../component/modal.jsx";
import { ImageUploader } from "../component/imageUploader.jsx"; 
import Swal from 'sweetalert2'
import "../../styles/colors.css";
import "../../styles/advertasing.css";


export const Advertising = () => {
    const { store, actions } = useContext(Context);
    const [modalShows, setModalShows] = useState(false);
    const navigate = useNavigate();
    const [advertisingName, setAdvertisingName] = useState('');
    const [advertisingContent, setAdvertisingContent] = useState('');
    const [advertisingNameChanged, setAdvertisingNameChanged] = useState(false);
    const [advertisingContentChanged, setAdvertisingContentChanged] = useState(false);
    const [advertisingImagedChanged, setAdvertisingImagedChanged] = useState(false);
    const [image, setImage] = useState("")
    const [isUploading, setIsUploading] = useState(false); 

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

    const AdvertisingNameChanged = (e) => {
        setAdvertisingName(e.target.value);
        setAdvertisingNameChanged(true)
    }

    const AdvertisingContentChanged = (e) => {
        setAdvertisingContent(e.target.value);
        setAdvertisingContentChanged(true)
    }
    const AdvertisingImagedChanged = (image) => {
        setImage(image);
        setAdvertisingImagedChanged(true)
    }

    const toggleModal = () => {
        console.log("toggleModal:", modalShows);
        setModalShows(!modalShows);
        setAdvertisingName("");
        setAdvertisingContent("");
        setAdvertisingNameChanged(false);
        setAdvertisingContentChanged(false);
    }

    const sendFormAdvertising = async () => {
        console.log("Se manda formulario creacion publicidad");
        console.log("advertisingName:", advertisingName);
        console.log("advertisingContent:", advertisingContent);
        console.log("advertisingImage_url:", image); // La URL de la imagen


        const response = await actions.sendFormAdvertising(advertisingName, advertisingContent, image);
        console.log(store.Advertising);

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
            setAdvertisingImagedChanged(false);
            setImage("");
        }
    }


    const resetAdvertisingCard = () => {
        setKey(prevKey => prevKey + 1);
    };

    const advertisingFormChanged = advertisingNameChanged && advertisingContentChanged && advertisingImagedChanged;

    return (
        <>
            {store.advertising.length > 0 ? <AdvertisingCard key={key} /> : <h1> No se encontro publicidad </h1>}
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

            <Modal show={modalShows} onClose={toggleModal}>
                <form className="p-3">
                    <div className="mb-3">
                        <label htmlFor="nameForum" className="form-label">Publicidad</label>
                        <input
                            type="text"
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

                    {/* Sección de carga de imagen */}
                    <div className="mb-3">
                        <label htmlFor="imageInput" className="form-label">Imagen</label>

                        {/* Input para cargar imagen */}
                        <ImageUploader 
                            onUploadComplete={(response) => AdvertisingImagedChanged(response)}
                            uploadFunction={actions.uploadPhoto}
                            isUploading={isUploading}
                            setIsUploading={setIsUploading}
                        />
                    </div>

                    {/* Si ya existe una imagen, muestra la vista previa */}
                    {/*image && image.secure_url && (
                        <div className="mb-3">
                            <label className="form-label">Imagen Actual:</label>
                            <img
                                className="img-fluid"
                                src={image.secure_url}
                                alt="Vista previa de la imagen"
                                style={{ maxHeight: '200px', objectFit: 'cover' }}
                            />
                            <div className="mt-2">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setImage(null)} // Esto borra la imagen actual para reemplazarla
                                >
                                    Cambiar Imagen
                                </button>
                            </div>
                        </div>
                    )*/}

                    <div className="d-grid">
                        <button
                            type="button"
                            style={{ background: 'var(--primary-color)', color: 'var(--text-color)' }}
                            className="btn btn-primary btn-block"
                            disabled={!advertisingFormChanged || isUploading}
                            onClick={sendFormAdvertising}
                        > Crear Publicidad
                        </button>
                    </div>
                </form>
            </Modal>
        </>

    );
};
