import React from "react";
import './DetailContent.css';
import BlogImg from "../../../../src/assets/images/register-2.jpg";

const DetailContent = () => {
    return (
        <div className="pt-3">
            <h2 className="fw-bold">Ngành GD được trao quyền bổ nhiệm nhân sự theo ngành dọc sẽ có nhiều thuận lợi</h2>
            <div className="d-flex align-items-center gap-3 py-2 border-bottom extra-content-blog">
                <div className="d-flex gap-2 align-items-center">
                    <i className="fa-regular fa-clock text-secondary"></i>
                    <span>07/03/2024 06:38</span>
                </div>
                <span>|</span>
                <div className="d-flex gap-2 align-items-center">
                    <i className="fa-regular fa-user text-secondary"></i>
                    <span>SkyMath team</span>
                </div>
            </div>
            <div className="py-3 pe-3 border-bottom">
                <h5 className="fw-bold">GDVN - Nếu ngành giáo dục được trao quyền quản lý theo ngành dọc thì có thể tạo ra một số đột phá trong việc giải quyết một số bất cập đang tồn tại hiện nay.</h5>
                <p>Sau khi Tạp chí điện tử Giáo dục Việt Nam đăng bài viết về một số vấn đề bất cập khi Bộ Giáo dục và Đào tạo không được tổ chức, quản lý thống nhất theo ngành dọc và đề xuất trao thêm quyền cho Bộ. Nhiều ý kiến chuyên gia, người trong cuộc đã có thêm ý kiến đóng góp về vấn đề liên quan.</p>
                <h5 className="fw-bold">Trách nhiệm ngành giáo dục nặng nề nhưng quyền "tự quyết" lại hạn chế</h5>
                <p>Trao đổi với Tạp chí điện tử Giáo dục Việt Nam, một lãnh đạo của Sở Giáo dục và Đào tạo tỉnh Bà Rịa – Vũng Tàu cho rằng, xét về tổng thể với cơ chế hiện tại, vẫn sẽ có một số bất cập khi ngành giáo dục không được quản lý theo ngành dọc. Trong đó, các hạn chế đến từ quá trình vận hành, ngành này bị hạn chế quyền “tự quyết” đối với cả lĩnh vực tài chính lẫn con người.</p>
                <img src={BlogImg} alt="blog-img" className="w-100"></img>
                <p className="text-center fst-italic">Ngành GD được trao quyền bổ nhiệm nhân sự theo ngành dọc sẽ có nhiều thuận lợi</p>
            </div>
        </div>
    );
}

export default DetailContent;