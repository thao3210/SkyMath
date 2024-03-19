import React from "react";
import "react-tabs/style/react-tabs.css";
import userImg from "../../../assets/images/graduated.png";
import starImg from "../../../assets/images/star.png";
import diamondImg from "../../../assets/images/diamond.png";
import giftImg from "../../../assets/images/giftbox.png";

import "./user.css";

function UserAchievement() {
  return (
    <div className="row g-2 user-row px-5 mx-2 mt-4">
      <div class="col-lg-4 card-user-left shadow-lg p-3 mb-5 bg-body-tertiary rounded-4 border border-0">
        <div className="d-flex justify-content-center">
          <img className="img-user mt-5" src={userImg} alt="alternative" />
        </div>

        <div className="text-center card-body-user justify-content-center mt-3">
          <h5 className="mb-3">Nguyễn Minh Khôi</h5>
          <h5 className="card-title px-2">Trường tiểu học Lê Văn Tám</h5>
          <p className="card-text px-2">Lớp 5</p>
        </div>
        <ul>
          <li className="">
            Xếp thứ: <span>6</span>
          </li>
        </ul>
      </div>
      <div className="col-lg-8 px-4">
        <div className="d-flex flex-wrap align-items-center gap-3 g-4">
          <div className="col shadow-lg p-3 mb-3 bg-body-tertiary rounded-4 border border-0 px-1">
            <div className="d-flex justify-content-center mb-2">
              <img src={starImg} alt="" className="" width="48" />
            </div>
            <div className="text-center">
              <h4>108</h4>
              <h5>Ngôi sao</h5>
            </div>
          </div>
          <div className="col shadow-lg p-3 mb-3 bg-body-tertiary rounded-4 border border-0 px-1">
            <div className="d-flex justify-content-center mb-2">
              <img src={diamondImg} alt="" className="" width="48" />
            </div>
            <div className="text-center">
              <h4>108</h4>
              <h5>Kim cương</h5>
            </div>
          </div>
          <div className="col shadow-lg p-3 mb-3 bg-body-tertiary rounded-4 border border-0 px-1">
            <div className="d-flex justify-content-center mb-2">
              <img src={giftImg} alt="" className="" width="48" />
            </div>
            <div className="text-center">
              <h4>2</h4>
              <h5>Sách</h5>
            </div>
          </div>
          <div className="col shadow-lg p-3 mb-3 bg-body-tertiary rounded-4 border border-0 px-1">
            <div className="d-flex justify-content-center mb-2">
              <img src={starImg} alt="" className="" width="48" />
            </div>
            <div className="text-center">
              <h4>108</h4>
              <h5>Ngôi sao</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UserAchievement;
