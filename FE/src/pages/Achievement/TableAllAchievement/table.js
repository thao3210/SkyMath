import React from "react";
import "./table.css";


function TableAchievement() {
  const tableStyle = {
    borderRadius: "10px",
    overflow: "hidden",
  };
  return (
    <div class="row px-5 table-element">
      <div class="col-md-4">
        <div class="position-sticky">
          <div class="py-4 mb-3 bg-body-tertiary rounded invisible"></div>
          <div>
            <ul class="list-unstyled">
              <li className="card-classify shadow-lg p-3 mb-5 bg-body-tertiary rounded-4">
                <h4>
                  <i class="fa-solid fa-trophy cup"></i>Điểm cao nhất khối lớp
                </h4>
                <div className=" d-flex ">
                  {/* <div className="col-xxl-2"> */}
                  <div class="dropdown">
                    <button
                      class="btn btn-classify dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton"
                      data-mdb-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Khối lớp
                    </button>
                    <ul
                      class="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <li>
                        <a className="dropdown-item" href="{}">
                          Khối 1
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="{}">
                          Khối 2
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="{}">
                          Khối 3
                        </a>
                      </li>
                    </ul>
                  </div>
                  {/* </div> */}
                  {/* <div className="col-xxl-2"> */}
                  <div class="dropdown">
                    <button
                      class="btn btn-classify dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton"
                      data-mdb-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Thành phố
                    </button>
                    <ul
                      class="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <li>
                        <a class="dropdown-item" href="{}">
                          Hà Nội
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="{}">
                          TP Hồ Chí Minh
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="{}">
                          An Giang
                        </a>
                      </li>
                    </ul>
                  </div>
                  {/* </div> */}
                </div>
              </li>
              <li className="card-classify shadow-lg p-3 mb-5 bg-body-tertiary rounded-4">
                <h4>
                  <i class="fa-solid fa-trophy cup"></i>Điểm cao môn học
                </h4>
                <div class="dropdown">
                  <button
                    class="btn btn-classify dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-mdb-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Môn học
                  </button>
                  <ul
                    class="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <li>
                      <a className="dropdown-item" href="{}">
                        Khối 1
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="{}">
                        Khối 2
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="{}">
                        Khối 3
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-8 col-md-8">
        <h1 class="text-table">Xếp hạng</h1>
        <article class="blog-post">
          <table class="table table-list text-table" style={tableStyle}>
            <thead>
              <tr class="table-dark">
                <th>Họ Tên</th>
                <th>Khối lớp</th>
                <th>Khối học</th>
                <th>Điểm</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Alice</td>
                <td>10</td>
                <td>10</td>
                <td>10</td>
              </tr>
              <tr class="table-light">
                <td>Bob</td>
                <td>4</td>
                <td>4</td>
                <td>3</td>
              </tr>
              <tr>
                <td>Charlie</td>
                <td>7</td>
                <td>7</td>
                <td>9</td>
              </tr>
              <tr class="table-light">
                <td>Alice</td>
                <td>7</td>
                <td>7</td>
                <td>9</td>
              </tr>
            </tbody>
          </table>
        </article>
      </div>
    </div>
  );
}

export default TableAchievement;
