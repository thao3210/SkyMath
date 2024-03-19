import React from 'react';
import BlogImg from "../../../../src/assets/images/register-2.jpg";
import { Link } from 'react-router-dom';
import OtherBlogs from '../../NewsAndEvent/OtherBlogs/OtherBlogs';
import './DetailCompetition.css';

const DetailCompetition = () => {
    return (
        <section className="container py-5">
            <div className="d-flex gap-3">
                <div className="">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Trang chủ</Link></li>
                            <li className="breadcrumb-item"><Link to="/NewsAndEvent">Tin tức</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Ngành GD được trao quyền bổ nhiệm nhân sự theo ngành dọc sẽ có nhiều thuận lợi</li>
                        </ol>
                    </nav>
                    <div className="pt-3">
                        <h2 className="fw-bold">Ngành GD được trao quyền bổ nhiệm nhân sự theo ngành dọc sẽ có nhiều thuận lợi</h2>
                        <div className='d-flex justify-content-between align-items-center border-bottom extra-content-blog'>
                            <div className="d-flex align-items-center gap-3 py-2">
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
                            <div className='d-flex align-items-center gap-3'>
                                <i className='fa-solid fa-eye text-secondary'></i>
                                <span>12123456</span>
                            </div>
                        </div>
                        <div className="py-3 pe-3 border-bottom">
                            <ol className='list-upper-roman fw-bold h5 lh-lg'>
                                <li>
                                    <span>Thông tin</span>
                                    <ol className='h6 fw-bold lh-base'>
                                        <li>Tên sân chơi: <span className='fw-normal'>Đấu trường quốc tế toàn quốc SkyMath</span></li>
                                        <li>Đơn vị tổ chức: <span className='fw-normal'>Đấu trường quốc tế toàn quốc SkyMath</span></li>
                                        <li>Mục đích: <span className='fw-normal'>Đấu trường quốc tế toàn quốc SkyMath</span></li>
                                    </ol>
                                </li>
                                <li>
                                    <span>Phần thưởng</span>
                                    <table className='fw-normal table table-news-gift'>
                                        <tr className='border-bottom'>
                                            <td>Tham gia thi</td>
                                            <td>+10 sao</td>
                                        </tr>
                                        <tr className='border-bottom'>
                                            <td>Tham gia thi</td>
                                            <td>+10 sao</td>
                                        </tr>
                                        <tr className='border-bottom'>
                                            <td>Tham gia thi</td>
                                            <td>+10 sao</td>
                                        </tr>
                                        <tr className='border-bottom'>
                                            <td>Tham gia thi</td>
                                            <td>+10 sao</td>
                                        </tr>
                                    </table>
                                </li>
                                <li>Lịch thi</li>
                                <li>
                                    <span>Nội dung</span>
                                    <div className='news-competition-content fw-normal lh-base'>
                                        <p className="fw-bold">GDVN - Nếu ngành giáo dục được trao quyền quản lý theo ngành dọc thì có thể tạo ra một số đột phá trong việc giải quyết một số bất cập đang tồn tại hiện nay.</p>
                                        <p>Sau khi Tạp chí điện tử Giáo dục Việt Nam đăng bài viết về một số vấn đề bất cập khi Bộ Giáo dục và Đào tạo không được tổ chức, quản lý thống nhất theo ngành dọc và đề xuất trao thêm quyền cho Bộ. Nhiều ý kiến chuyên gia, người trong cuộc đã có thêm ý kiến đóng góp về vấn đề liên quan.</p>
                                        <p className="fw-bold">Trách nhiệm ngành giáo dục nặng nề nhưng quyền "tự quyết" lại hạn chế</p>
                                        <p>Trao đổi với Tạp chí điện tử Giáo dục Việt Nam, một lãnh đạo của Sở Giáo dục và Đào tạo tỉnh Bà Rịa – Vũng Tàu cho rằng, xét về tổng thể với cơ chế hiện tại, vẫn sẽ có một số bất cập khi ngành giáo dục không được quản lý theo ngành dọc. Trong đó, các hạn chế đến từ quá trình vận hành, ngành này bị hạn chế quyền “tự quyết” đối với cả lĩnh vực tài chính lẫn con người.</p>
                                        <img src={BlogImg} alt="blog-img" className="w-100"></img>
                                        <p className="text-center fst-italic">Ngành GD được trao quyền bổ nhiệm nhân sự theo ngành dọc sẽ có nhiều thuận lợi</p>
                                    </div>
                                </li>
                            </ol>

                        </div>
                    </div>
                    <OtherBlogs />
                </div>
                {/* <div>
                    <NoteworthyBlogs />
                </div> */}
            </div>
        </section>
    );
}

export default DetailCompetition;