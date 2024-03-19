import React from "react";
import './Schedule.css';

const Schedule = () => {


    return (
        <div className="container py-5">
            <div className="d-lg-flex d-md-flex align-items-center gap-3">
                <span>Lựa chọn ngày thi</span>
                <div className="input-group search-date">
                    <input type="date" className="form-control m-0" />
                    <button className="btn btn-dark" type="button" >Tìm kiếm</button>
                </div>
            </div>
            <div className="d-flex flex-column align-items-center justify-content-center pt-4">
                <h2>Lịch thi</h2>
                <h3>Thứ 3 - Ngày 1/5/2024</h3>
                <table className="table table-striped mt-3 text-center">
                    <thead>
                        <tr>
                            <th className="fs-5" scope="col">Giờ thi</th>
                            <th className="fs-5" scope="col">Tên bài thi</th>
                            <th className="fs-5" scope="col">Môn thi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th className="fs-3">9:30 - 10:30</th>
                            <td className="">Kiểm tra kiến thức đầu vào</td>
                            <td><span className="fw-bold rounded py-1 px-3 color-math">Toán</span></td>
                        </tr>
                        <tr>
                            <th className="fs-3">9:30 - 10:30</th>
                            <td className="">Kiểm tra kiến thức đầu vào</td>
                            <td><span className="fw-bold rounded py-1 px-3 color-physical">Lý</span></td>
                        </tr>
                        <tr>
                            <th className="fs-3">9:30 - 10:30</th>
                            <td className="">Kiểm tra kiến thức đầu vào</td>
                            <td><span className="fw-bold rounded py-1 px-3 color-chemistry">Hóa</span></td>
                        </tr>
                        <tr>
                            <th className="fs-3">9:30 - 10:30</th>
                            <td className="">Kiểm tra kiến thức đầu vào</td>
                            <td><span className="fw-bold rounded py-1 px-3 color-biology">Sinh</span></td>
                        </tr>

                    </tbody>
                </table>
            </div>
            <div className="d-flex flex-column align-items-center justify-content-center pt-5">
                <h2 className="text-center">Quy định thi</h2>
                <ol style={{ 'listStyleType': 'upper-roman' }}>
                    {[...Array(3)].map((_, i) => (
                        <li key={i} className="h3 lh-base">
                            Điều Kiện {i + 1}
                            <ol>
                                {[...Array(3)].map((_, i) => (
                                    <li key={i} className="h4 lh-base">
                                        Điều Kiện {i + 1}
                                        <ul style={{ 'listStyleType': 'disc' }}>
                                            {[...Array(3)].map((_, i) => (
                                                <li key={i} className="fs-6 lh-base">Nội dụng điều kiện {i + 1}: Người tham gia phải có thiết bị điện tử (máy tính, laptop, hoặc thiết bị di động) có kết nối internet ổn định.</li>
                                            ))}
                                        </ul>
                                    </li>
                                ))}
                            </ol>
                        </li>

                    ))}
                </ol>
            </div>
        </div >
    );
}

export default Schedule;