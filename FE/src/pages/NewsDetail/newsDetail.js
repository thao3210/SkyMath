import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import TestImg from "../../assets/images/Jung-Kyung-Ho.jpg";

import "./newsDetail.css";

const NewsDetail = () => {
  // const [isSticky, setIsSticky] = useState(false);

  // useEffect(() => {
  //   const offset = -50; // Adjust the offset as needed
  //   const columnRight = document.getElementById("column-right");
  //   const articleElement = document.getElementById("article");
  //   const stopPosition =
  //     articleElement.offsetTop +
  //     articleElement.offsetHeight -
  //     columnRight.offsetHeight +
  //     offset;

  //   const handleScroll = () => {
  //     const scrollTop =
  //       window.pageYOffset || document.documentElement.scrollTop;

  //     // Check if the user has scrolled within the bounds of the article
  //     setIsSticky(
  //       scrollTop >= columnRight.offsetTop && scrollTop <= stopPosition
  //     );
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   // Remove the scroll event listener when the component unmounts
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);
  return (
    <article id="article" className="container ">
      <div class="td-crumb-container">
        <div class="entry-crumbs">
          <span>
            <Link to="/" title="" class="entry-crumb">
              Trang chủ
            </Link>
          </span>
          <i class="fa-solid fa-chevron-right"></i>
          <span>
            <Link
              to="/"
              title="Xem tất cả bài viết trong Tin Nổi Bật"
              class="entry-crumb"
            >
              Tin Nổi Bật
            </Link>
          </span>
          <i class="fa-solid fa-chevron-right"></i>
          <span class="td-bred-no-url-last">
            Thể lệ Đấu trường VioEdu toàn quốc năm học 2023-2024
          </span>
        </div>
      </div>
      <div className="row d-flex td-main-content">
        <div className="col-xl-8 td-content-left">
          <div className="td-post-header">
            <ul className="td-category">
              <li className="entry-category">Tin nổi bật</li>
              <li className="entry-category">Tin SkyMath</li>
            </ul>
            <header className=" td-post-title">
              <h1 className="entry-title">
                Thể lệ thi đấu toàn quốc môn Toán tại SkyMath
              </h1>
              <div className="td-module-meta-info d-flex">
                <div className="td-post-date">
                  <time>11 Tháng 12, 2023</time>
                </div>
                <div className="td-post-comments">
                  <i class="fa-solid fa-eye"></i>403923
                </div>
                <div className="td-post-views">
                  <i class="fa-solid fa-comments"></i>2
                </div>
              </div>
            </header>
          </div>
          <div className="td-post-content">
            <ol type="I">
              <li>
                <strong>Thông tin</strong>
              </li>
              <ol>
                <li>
                  <strong>Tên sân chơi</strong>
                  "Đấu trường quốc tế toàn quốc SkyMath
                </li>
                <li>
                  <strong>Đơn vị tổ chức</strong>
                  "Đấu trường quốc tế toàn quốc SkyMath
                </li>
                <li>
                  <strong>Mục đích</strong>
                  "Đấu trường quốc tế toàn quốc SkyMath
                </li>
              </ol>
              <li>
                <strong>Phần thưởng</strong>
                <table class="table">
                  <tbody>
                    <tr>
                      <td>Tham gia thi</td>
                      <td>+10 sao</td>
                    </tr>
                    <tr>
                      <td>Đạt 15 điểm trở lên</td>
                      <td>+1 sao</td>
                    </tr>
                    <tr>
                      <td>Top 10</td>
                      <td>+20 sao</td>
                    </tr>
                    <tr>
                      <td>Top 100</td>
                      <td>+5 sao</td>
                    </tr>
                  </tbody>
                </table>
              </li>
              <li>
                <strong>Lịch thi</strong>
              </li>
              <figure className="wp-block-image figure">
                <img
                  src={TestImg}
                  alt=""
                  className="figure-img  img-newsEvent-detail"
                />
              </figure>
            </ol>
          </div>
          <footer>
            <div className="row d-flex td-block-row td-post-next-post my-5">
              <div className="col-xl-6 td-block-span6 td-post-left">
                <div className="td-post-next-prev-content text-content-card">
                  <span className="pev-post">Bài trước: </span>
                  <span className="link-post">
                    <Link to="/" className="">
                      Thông báo nâng cao hệ thống SkyMath
                    </Link>
                  </span>
                </div>
              </div>
              <div className="col-xl-6 td-block-span6 td-post-right">
                <div className="td-post-next-prev-content text-content-card">
                  <span className="pev-post">Bài sau: </span>
                  <span className="link-post">
                    <Link to="/">
                      Sở giáo dục tỉnh phát triển dự án học online - Nâng cao
                      tinh thần tự học
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          </footer>
        </div>
        <div className="col-xl-3 list-card-right ">
          <div
            id="column-right"
            className="row d-flex td-main-content"
          >
          </div>
        </div>
      </div>
    </article>
  );
};

export default NewsDetail;
