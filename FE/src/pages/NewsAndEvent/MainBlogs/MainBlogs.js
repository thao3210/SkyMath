import React, { useEffect, useState } from "react";
import NewsEventService from "../../../services/NewsEventService";
import BlogImg from "../../../../src/assets/images/register-2.jpg";

import "./MainBlogs.css";
import { Link } from "react-router-dom";

function MainBlogs() {

  return (
    <div className="border-bottom border-2 pb-3">
      <h2 className="fw-bold border-bottom border-2 pb-3">Bài viết nổi bật</h2>
      <div className="d-flex flex-lg-row flex-column gap-3">
        <div className="col-lg-8 d-flex flex-column">
          <img src={BlogImg} alt='main-blog' className="main-blog-img w-100 object-fit-cover"></img>
          <span className="text-secondary">March 21, 2024</span>
          <Link to={`/NewsDetails`} className="fw-bold h4">Ngành GD được trao quyền bổ nhiệm nhân sự theo ngành dọc sẽ có nhiều thuận lợi</Link>
          <p className="short-content-blog mb-0">Trao đổi với Tạp chí điện tử Giáo dục Việt Nam, một lãnh đạo của Sở Giáo dục và Đào tạo tỉnh Bà Rịa – Vũng Tàu cho rằng, xét về tổng thể với cơ chế hiện tại, vẫn sẽ có một số bất cập khi ngành giáo dục không được quản lý theo ngành dọc. Trong đó, các hạn chế đến từ quá trình vận hành, ngành này bị hạn chế quyền “tự quyết” đối với cả lĩnh vực tài chính lẫn con người.</p>
        </div>
        <div className="d-flex flex-lg-column flex-row gap-3">
          <div className="d-flex flex-column">
            <img src={BlogImg} alt='secondary-blog' className="secondary-blog-img w-100 object-fit-cover"></img>
            <span className="text-secondary small">March 21, 2024</span>
            <Link to={`/NewsDetails`} className="fw-bold h5 short-content-blog">Ngành GD được trao quyền bổ nhiệm nhân sự theo ngành dọc sẽ có nhiều thuận lợi</Link>
          </div>
          <div className="d-flex flex-column">
            <img src={BlogImg} alt='secondary-blog' className="secondary-blog-img w-100 object-fit-cover"></img>
            <span className="text-secondary small">March 21, 2024</span>
            <Link to={`/NewsDetails`} className="fw-bold h5 short-content-blog">Ngành GD được trao quyền bổ nhiệm nhân sự theo ngành dọc sẽ có nhiều thuận lợi</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainBlogs;
