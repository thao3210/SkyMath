import React from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import Trophy from "../../../assets/images/Trophy.png";
import studentimg from "../../../assets/images/StudentMale.png";

import "./search.css";

function SearchAchievement() {
  const options = ["1", "2", "3"];
  const defaultOption = "Khối";
  const options2 = ["Tp.Hà Nội", "Đà Nẵng", "Hải Phòng"];
  const defaultOption2 = "Thành phố";

  const _onSelect = (selectedOption) => {
    console.log(selectedOption);
  };

  return (
    <div className="form-search mb-4">
      <div className="row px-5 mx-2">
        <div className="text-center">
          <h3 className="text-uppercase text-point my-1">Tra cứu điểm</h3>
        </div>
        <div className="container card-top shadow-lg card-medal ">
          <div className="col-xl-12 mx-1">
            <div className="row my-1">
              <div className="col-6 d-flex">
                <div className="img-top mx-3">
                  <img className="" src={Trophy} alt="alternative" />
                </div>
                <h4 className="my-5 mx-3">Điểm cao nhất địa phương</h4>
              </div>
              <div className="col-6 d-flex my-5 ">
                <div className="dropdown-course mr-1">
                  <Dropdown
                    className="custom-dropdown"
                    options={options}
                    onChange={_onSelect}
                    value={defaultOption}
                    placeholder="Select an option"
                  />
                  <Dropdown
                    className="custom-dropdown"
                    options={options2}
                    onChange={_onSelect}
                    value={defaultOption2}
                    placeholder="Select an option"
                  />
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-lg-6 card-on-top my-5">
                <div className="img-avatar">
                  <div className="d-flex justify-content-center">
                    <img
                      className="mx-auto"
                      src={studentimg}
                      alt="alternative"
                    />
                    <img
                      className="mx-auto trophy"
                      src={Trophy}
                      alt="alternative"
                    />
                  </div>
                </div>
                <div className="text-top1">
                  <h4 className="card-text text-center my-1">
                    Nguyễn Trần Minh Quân
                  </h4>
                  <div className="my-3">
                    <h4 className="card-text text-center">
                      Trường tiểu học Lê Văn Tám, Hà Nội
                    </h4>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="card-top-medal mb-5">
                  <div className="row card-body text-bottom-medal mt-1">
                    <div className="card-images">
                      <img
                        className="images-student mt-1"
                        src={studentimg}
                        alt="alternative"
                      />{" "}
                    </div>
                    <div className="col-9">
                      <h5 className="card-title py-2">Nguyễn Minh Khôi</h5>
                      <p className="card-text">
                        Trường tiểu học Đoàn Thị Điểm, Hà Nội
                      </p>
                    </div>
                    <div className="col-3">
                      <h3 className="text-medal">
                        <i class="fa-solid fa-medal top1"></i>2
                      </h3>
                    </div>
                  </div>
                  <div className="row card-body text-bottom-medal mt-1">
                    <div className="card-images">
                      <img
                        className="images-student mt-1"
                        src={studentimg}
                        alt="alternative"
                      />{" "}
                    </div>
                    <div className="col-9">
                      <h5 className="card-title py-1">Nguyễn Minh Khôi</h5>
                      <p className="card-text">
                        Trường tiểu học Đoàn Thị Điểm, Hà Nội
                      </p>
                    </div>
                    <div className="col-3">
                      <h3 className="text-medal">
                        <i class="fa-solid fa-medal top1"></i>3
                      </h3>
                    </div>
                  </div>
                  <div className="row card-body text-bottom-medal mt-1">
                    <div className="card-images">
                      <img
                        className="images-student mt-1"
                        src={studentimg}
                        alt="alternative"
                      />
                    </div>
                    <div className="col-9">
                      <h5 className="card-title py-1">Nguyễn Minh Khôi</h5>
                      <p className="card-text">
                        Trường tiểu học Đoàn Thị Điểm, Hà Nội
                      </p>
                    </div>
                    <div className="col-3">
                      <h3 className="text-medal">
                        <i class="fa-solid fa-medal top3"></i>4
                      </h3>
                    </div>
                  </div>
                  <div className="row card-body text-bottom-medal mt-1">
                    <div className="card-images">
                      <img
                        className="images-student mt-1"
                        src={studentimg}
                        alt="alternative"
                      />
                    </div>
                    <div className="col-9">
                      <h5 className="card-title py-1">Nguyễn Minh Khôi</h5>
                      <p className="card-text">
                        Trường tiểu học Đoàn Thị Điểm, Hà Nội
                      </p>
                    </div>
                    <div className="col-3">
                      <h3 className="text-medal">
                        <i class="fa-solid fa-medal top3"></i>5
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchAchievement;
