import React, { useState } from 'react';

export const ImageUploader = ({ onUploadComplete, uploadFunction, isUploading, setIsUploading }) => {

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await uploadFunction(formData);
            if (!response.error) {
                onUploadComplete(response);
            } else {
            console.error("Error al cargar la imagen:", response.error);
            }
        } catch (error) {
            console.error("Error al cargar la imagen:", error);
        }
        setIsUploading(false);
    };

    return (
    <div>
        <input
        type="file"
        className="form-control"
        onChange={handleUpload}
        />
        {isUploading && (
        <div className="d-flex justify-content-center mt-2">
            <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
            </div>
        </div>
        )}
    </div>
    );
};

