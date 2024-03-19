import React from "react";

import "./Alert.css";
import { Link } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";

function AlertCourseDetail() {
  const authors = [
    "Cô Tuyet Ngoc",
    "Thầy Tuyet Ngoc",
    "Cô Tuyet Ngoc",
    "Cô Tuyet Ngoc",
  ];
  const contents = [
    "Quy phu huynh va cac em hoc sinh than men, nham ho tro sat nhat qua trinh hoc tap cua hoc sinh, moi tuan khoa hoc Lop 1 deu co",
    "Cac em hoc sinh than men, nham ho tro sat nhat qua trinh hoc tap cua hoc sinh, moi tuan khoa hoc Lop 1 deu co",
    "Cac em hoc sinh than men, nham ho tro sat nhat qua trinh hoc tap cua hoc sinh, moi tuan khoa hoc Lop 1 deu co",
    "Cac em hoc sinh than men, nham ho tro sat nhat qua trinh hoc tap cua hoc sinh, moi tuan khoa hoc Lop 1 deu co",
  ];

  const renderAnnouncements = () => {
    return authors.map((author, index) => (
      <div
        key={index}
        className="list-group-item list-group-item-action flex-column align-items-start"
      >
        <div className="d-flex w-100 justify-content-between">
          <h5 className="mb-1">{author}</h5>
        </div>
        <p className="mb-1">{contents[index]}</p>
      </div>
    ));
  };
  return (
    <div className="col-sm-12 col-md-12 col-lg-12">
      <h4>Thông báo</h4>
      <div className="list-group scroll-bar" style={{ maxHeight: "300px" }}>
        {renderAnnouncements()}
      </div>
      <Link to="/" className="olm-text-link not-hover not-focus font-xss">
        Tải thêm thông báo
      </Link>
      <div className="sticky-top z-2">
        <div className="ratings-star-container">
          <div className="bg-white parent-ratings parent-ratings-pos-re border">
            <div className="action-filter p-2 text-light bg-dark">
              <div className="w-100 text-center font-weight-bold py-1 mb-2 border-bottom">
                <i className="fas fa-flower-tulip ml-2 olm-text-three"></i>
                XẾP HẠNG KHÓA HỌC
                <i className="fas fa-flower-tulip ml-2 olm-text-three"></i>
              </div>
              <div className="d-flex justify-content-between">
                <div className="dropdown">
                  <button
                    className="btn dropdown-toggle text-light"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Tuần hiện tại
                  </button>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <Link className="dropdown-item" to="/">
                      Tuần hiện tại
                    </Link>
                    <Link className="dropdown-item" to="/">
                      Tháng hiện tại
                    </Link>
                    <Link className="dropdown-item" to="/">
                      Học kỳ hiện tại
                    </Link>
                    <Link className="dropdown-item" to="/">
                      Năm hiện tại
                    </Link>
                    <Link className="dropdown-item" to="/">
                      Tất cả các năm
                    </Link>
                  </div>
                </div>
                <div className="mt-2">
                  <Link to="/" className="text-light">
                    <i className="fas fa-eye mx-1"></i>
                    Xem chi tiết
                  </Link>
                </div>
              </div>
            </div>
            <div className="content-top-stars height-content-top-stars-82 px-2">
              <div className="row align-items-center border-bottom mt-1 w-100">
                <div className="col-7">
                  <div className="d-flex font-weight-bold">
                    <div>
                      <span className="text-white rounded-circle py-1 px-2 mr-2 bg-warning">
                        1
                      </span>
                    </div>
                    <Link to="">
                      <span className="text-limit-line-1">Lưu Minh Thư</span>
                    </Link>
                  </div>
                </div>
                <div className="col-5">
                  <div className="d-flex flex-column justify-content-center align-items-center">
                    <div
                      className="wh-thong-thai "
                      style={{ width: "3em", height: "3.5em" }}
                      data-toggle="tooltip"
                      data-placement="top"
                      title=""
                      data-original-title="Thông thái"
                    >
                      <div className="medal-container">
                        <StarIcon />
                      </div>
                      <span>
                        610
                        <i className="fas fa-star-shooting text-warning ml-2"></i>
                      </span>
                    </div>
                    <div></div>
                  </div>
                </div>
              </div>
              <div className="row align-items-center border-bottom mt-1 w-100">
                <div className="col-7">
                  <div className="d-flex font-weight-bold">
                    <div>
                      <span className="text-white rounded-circle py-1 px-2 mr-2 bg-danger">
                        2
                      </span>
                    </div>
                    <Link to="">
                      <span className="text-limit-line-1">Lưu Minh Thư</span>
                    </Link>
                  </div>
                </div>
                <div className="col-5">
                  <div className="d-flex flex-column justify-content-center align-items-center">
                    <div
                      className="wh-thong-thai "
                      style={{ width: "3em", height: "3.5em" }}
                      data-toggle="tooltip"
                      data-placement="top"
                      title=""
                      data-original-title="Thông thái"
                    >
                      <div className="medal-container">
                        <StarIcon />
                      </div>
                      <span>
                        610
                        <i className="fas fa-star-shooting text-warning ml-2"></i>
                      </span>
                    </div>
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="rating-user olm-bg-five pl-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlertCourseDetail;
