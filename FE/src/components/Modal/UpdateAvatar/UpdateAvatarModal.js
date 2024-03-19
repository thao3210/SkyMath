import React, { useState } from "react";
import "./UpdateAvatarModal.css";
import UserService from "../../../services/UserService";

function UpdateAvatarModal({ avatar, onUploadAvatar }) {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageName, setImageName] = useState('');
    const [image, setImage] = useState(null);
    const [updating, setUpdating] = useState(false); // State to track update process

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
                setImageName(file.name);
                setImage(file);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDismiss = () => {
        setSelectedImage(null);
    };

    const handleSave = async () => {
        try {
            setUpdating(true); // Set updating state to true
            const formData = new FormData();
            formData.append('file', image);
            await UserService.updateUserAvatar(formData);
            onUploadAvatar();
        } catch (error) {
            console.error('Error updating user avatar:', error.message);
        } finally {
            setUpdating(false); // Reset updating state to false
        }
    };

    return (
        <div>
            <div className={`modal fade ${updating ? 'updating' : ''}`} id="updateAvatarModal" tabIndex="-1" aria-labelledby="updateAvatarModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="updateAvatarModalLabel">Thay đổi ảnh đại diện</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="px-3 d-flex flex-column align-items-center">
                                {selectedImage ? (
                                    <img src={selectedImage} alt="selected-avatar" className="rounded-circle object-fit-cover avatar-upload-img" />
                                ) : (
                                    <img src={avatar} alt="default-avatar" className="rounded-circle object-fit-cover avatar-upload-img" />
                                )}

                                <label htmlFor="input-file" className="btn btn-outline-dark mt-3">Chọn ảnh đại diện</label>
                                <input type="file" id="input-file" onChange={handleImageChange} hidden />
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary px-4" data-bs-dismiss="modal" onClick={handleDismiss}>Đóng</button>
                            <button type="button" className="btn btn-primary px-4" data-bs-dismiss="modal" onClick={handleSave}>Lưu</button>
                        </div>
                    </div>
                </div>
            </div>

            {updating && (
                <div className="d-flex align-items-center justify-content-center position-fixed top-0 start-0 overlay">
                    <div className="spinner-border text-accent-color"></div>
                </div>
            )}
        </div>
    );
}

export default UpdateAvatarModal;
