import React, { useState, useEffect } from "react";
import "./UpdateUserModal.css";
import UserService from "../../../services/UserService";

function UpdateUserModal({ userInfo, onUpdateUserInfo }) {
    const [updatedUserInfo, setUpdatedUserInfo] = useState({
        fullName: "",
        dateOfBirth: "",
        phoneNumber: ""
    });

    useEffect(() => {
        setUpdatedUserInfo({
            fullName: userInfo.fullName,
            dateOfBirth: userInfo.dateOfBirth ? formatDate(userInfo.dateOfBirth) : "",
            phoneNumber: userInfo.phoneNumber
        });
    }, [userInfo]);

    const formatDate = (dateString) => {
        const [day, month, year] = dateString.split('-');
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    };

    const handleSave = async () => {
        try {
            await UserService.updateUserInfo(updatedUserInfo);
            onUpdateUserInfo();
        } catch (error) {
            console.log(error);
        }
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setUpdatedUserInfo((prevUserInfo) => ({
            ...prevUserInfo,
            [id]: value,
        }));
    };

    return (
        <div className="modal fade" id="updateUserModal" tabIndex="-1" aria-labelledby="updateUserModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="updateUserModalLabel">Chỉnh sửa thông tin cá nhân</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form className="px-3">
                            <div className="mb-3">
                                <label htmlFor="fullname" className="form-label">Tên</label>
                                <input type="text" className="form-control" id="fullName" value={updatedUserInfo.fullName} onChange={handleInputChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="dateOfBirth" className="form-label">Ngày sinh</label>
                                <input type="date" className="form-control" id="dateOfBirth" value={updatedUserInfo.dateOfBirth} onChange={handleInputChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="phoneNumber" className="form-label">Số điện thoại</label>
                                <input type="text" className="form-control" id="phoneNumber" value={updatedUserInfo.phoneNumber} onChange={handleInputChange} />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary px-4" data-bs-dismiss="modal" >Đóng</button>
                        <button type="button" className="btn btn-primary px-4" onClick={handleSave} data-bs-dismiss="modal">Lưu</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default UpdateUserModal;
