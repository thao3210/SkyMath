import React from "react";
import { Link } from "react-router-dom";
import DetailContent from "./DetailContent/DetailContent";
import NoteworthyBlogs from "../NewsAndEvent/NoteworthyBlogs/NoteworthyBlogs";
import OtherBlogs from "../NewsAndEvent/OtherBlogs/OtherBlogs";

const NewsDetails = () => {
    return (
        <section className="container py-5">
            <div className="d-flex gap-3">
                <div className="col-9">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Trang chủ</Link></li>
                            <li className="breadcrumb-item"><Link to="/NewsAndEvent">Tin tức</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Ngành GD được trao quyền bổ nhiệm nhân sự theo ngành dọc sẽ có nhiều thuận lợi</li>
                        </ol>
                    </nav>
                    <DetailContent />
                    <OtherBlogs />
                </div>
                <div>
                    <NoteworthyBlogs />
                </div>
            </div>
        </section>
    );
}

export default NewsDetails;