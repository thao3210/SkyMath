import React, { useEffect, useState } from "react";
import Diamond from '../../assets/images/diamond.png';
import Reward from '../../assets/images/reward.png';
import Medal from '../../assets/images/medal.png';
import './Profile.css';
import UpdateUserModal from "../../components/Modal/UpdateUser/UpdateUserModal";
import UpdateAvatarModal from "../../components/Modal/UpdateAvatar/UpdateAvatarModal";
import UserService from "../../services/UserService";

const Profile = () => {
    const [userInfoData, setUserInfoData] = useState([]);

    const fetchUserInfo = async () => {
        try {
            const response = await UserService.getUserInformation();
            if (response.status === 200) {
                const formattedUserInfo = { ...response.data, dateOfBirth: formatDate(response.data.dateOfBirth) };
                setUserInfoData(formattedUserInfo);
            } else {
                console.error("Error user info response status", response.status)
            }
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        fetchUserInfo();
    }, []);

    const formatDate = (day) => {
        const date = new Date(day);
        const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
        return formattedDate;
    }

    return (
        <div className="bg-light">
            <div className="container px-5 py-5">
                <h1 className="d-lg-none d-md-none d-sm-block d-block">Hồ sơ học sinh</h1>
                <div className="d-lg-flex d-md-flex">
                    <div className="">
                        <h1 className="invisible d-lg-block d-md-block d-sm-none d-none">Hồ sơ học sinh</h1>
                        <div className="d-flex flex-column align-items-center">
                            <div>
                                <img src={userInfoData.avatar} alt="profileImg" className="object-fit-cover rounded-circle profile-img" />

                            </div>
                            <div className="pt-3">
                                <button
                                    className="d-flex align-items-center justify-content-center btn btn-sm btn-outline-dark px-4 mb-3"
                                    data-bs-toggle="modal"
                                    data-bs-target="#updateAvatarModal"
                                >
                                    Thay đổi
                                    <i className="fa-solid fa-pen-to-square m-0 ps-2"></i>
                                </button>
                                <UpdateAvatarModal
                                    avatar={userInfoData.avatar}
                                    onUploadAvatar={fetchUserInfo}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <h1 className="d-lg-block d-md-block d-sm-none d-none">Hồ sơ học sinh</h1>

                        <div className="d-flex flex-lg-row flex-md-column flex-sm-column flex-column justify-content-between gap-3">

                            <div className="col bg-white border rounded-4 px-4 py-4">
                                <h3 className="title-profile">Thông tin cá nhân</h3>
                                <div className="pt-3 ps-4">
                                    <table className="table text-profile">
                                        <tr>
                                            <th className="pb-2 col-4">Họ Tên:</th>
                                            <td className="pb-2">{userInfoData.fullName}</td>
                                        </tr>
                                        <tr>
                                            <th className="pb-2 col-4">Ngày sinh:</th>
                                            <td className="pb-2">{userInfoData.dateOfBirth}</td>
                                        </tr>
                                        <tr>
                                            <th className="pb-2 col-4">Số điện thoại:</th>
                                            <td className="pb-2">{userInfoData.phoneNumber}</td>
                                        </tr>
                                    </table>

                                    <button
                                        className="btn btn-outline-dark px-4 mt-2"
                                        data-bs-toggle="modal"
                                        data-bs-target="#updateUserModal"
                                    >
                                        Chỉnh sửa
                                    </button>
                                    <UpdateUserModal
                                        userInfo={userInfoData}
                                        onUpdateUserInfo={fetchUserInfo}
                                    />
                                </div>
                            </div>

                            <div className="col-lg-4 d-flex flex-column gap-3">
                                <div className="bg-white border rounded-4 px-3 py-4">
                                    <h3 className="title-profile">Thành tích học tập</h3>
                                    <div className="d-flex align-items-center">
                                        <img src={Medal} alt="diamond" className="object-fit-contain bg-light border rounded-circle p-1 medal-img"></img>
                                        <span className="ps-2">Xếp hạng 3</span>
                                    </div>
                                </div>
                                <div className="d-flex flex-column align-items-center justify-content-center bg-white border rounded-4 px-3 py-4">
                                    <img src={Diamond} alt="diamond" className="object-fit-contain bg-light border rounded-circle p-3 diamond-img"></img>
                                    <span className="pt-2">Bạn đã nhận được</span>
                                    <span className="fs-5 fw-bold">100</span>
                                    <span>Kim cương</span>
                                </div>

                            </div>
                        </div>

                        <div className="bg-white border rounded-4 px-3 py-4 mt-3">
                            <h3 className="title-profile">Các quà tặng đã được nhận</h3>
                            <div className="d-flex align-items-center justify-content-between flex-wrap">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="d-flex align-items-center p-1 reward-item">
                                        <img src={Reward} alt="reward" className="object-fit-contain bg-light border rounded-4 reward-img"></img>
                                        <span className="ps-2 text-reward ">Hoàn thành khóa học nhanh nhất Hoàn thành khóa học nhanh nhất</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white border rounded-4 px-3 py-4 mt-3">
                            <h3 className="title-profile">Các khóa học đang tham gia</h3>
                            <div className="d-flex flex-column gap-1 pt-3">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="d-flex align-items-center justify-content-between bg-white border border rounded-3 px-3 py-2 text-profile">
                                        <span>Khai giảng khóa lớp 1</span>
                                        <i className="fa-solid fa-angle-right m-0"></i>
                                    </div>
                                ))}
                            </div>
                            <div className="d-flex align-items-center justify-content-center pt-3">
                                <button
                                    className="btn btn-outline-dark px-4"
                                >
                                    <span>Hiển thị thêm</span>
                                    <i className="fa-solid fa-angles-down m-0 ps-2 small"></i>
                                </button>
                            </div>
                        </div>

                    </div>


                </div>
            </div>
        </div >
    );
}

export default Profile;