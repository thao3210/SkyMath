import React, { useEffect, useState } from "react";
import BlogImg from "../../../../src/assets/images/register-2.jpg";
import { Link } from "react-router-dom";
import NewsEventService from "../../../services/NewsEventService";

const OtherBlogs = () => {
    const [blogsData, setBlogsData] = useState([]);

    const fetchBLogsData = async () => {
        try {
            const response = await NewsEventService.getListNewsAndEvent();
            if (response.status === 200) {
                setBlogsData(response.data);
            } else {
                console.error("Error news response status", response.status)
            }
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        fetchBLogsData();
    }, []);

    return (
        <div className="py-3">
            <h4 className="fw-bold border-bottom border-2 pb-3">Các tin khác</h4>
            <div className="d-flex gap-3 flex-wrap">
                {blogsData.map((blog, index) => (
                    <div key={index} className="card card-blog rounded-0 border-0">
                        <img src={blog.imageLink} className="card-img-top border rounded-0" alt={blog.title} />
                        <div className="py-lg-2">
                            <span className="card-blog-date pb-1">
                                {new Date(blog.createdDate).toLocaleDateString('vi-VI', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                })}
                            </span>
                            <Link to={`/CompetitionDetails`} className="card-title fw-bold short-content-blog card-blog-title">{blog.title}</Link>
                        </div>
                    </div>
                ))}
            </div>
            <div className="d-flex justify-content-center mt-4">
                <button className="btn btn-outline-dark">Hiển thị thêm <i className="fa-solid fa-angles-right small"></i></button>
            </div>
        </div>
    );
}

export default OtherBlogs;