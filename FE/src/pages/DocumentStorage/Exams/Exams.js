import React, { useEffect, useState } from 'react';

import './Exams.css';
import { Link } from 'react-router-dom';
import TestService from '../../../services/TestService';

const Exams = () => {
    const [tests, setTests] = useState([]);
    const [grades, setGrades] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState(0);
    const [selectedGrade, setSelectedGrade] = useState(0);
    const [selectedProvince, setSelectedProvince] = useState(0);
    const [selectedMonth, setSelectedMonth] = useState('');


    useEffect(() => {
        fetchTestsData();
        fetchAllGradesData();
        fetchAllSubjectsData();
        fetchAllProvincesData();
    }, []);

    const fetchTestsData = async () => {
        try {
            const indexPage = 1;
            const year = selectedMonth ? parseInt(selectedMonth.split('-')[0]) : 0; // Extract year from the selected month
            const response = await TestService.getTests(indexPage, year, selectedSubject, selectedGrade, selectedProvince);
            setTests(response.data);

            console.log('test list', response.data)
        } catch (error) {
            console.error(error);
        }
    };


    const fetchAllGradesData = async () => {
        try {
            const response = await TestService.getAllGrades();
            console.log("Grades data: ", response.data);
            if (response.status === 200) {
                setGrades(response.data);
            } else {
                console.error("Error grades response status", response.status)
            }
        } catch (err) {
            console.error(err.message);
        }
    }

    const fetchAllSubjectsData = async () => {
        try {
            const response = await TestService.getAllSubjects();
            console.log("Subjects data: ", response.data);
            if (response.status === 200) {
                setSubjects(response.data);
            } else {
                console.error("Error subjects response status", response.status)
            }
        } catch (err) {
            console.error(err.message);
        }
    }

    const fetchAllProvincesData = async () => {
        try {
            const response = await TestService.getAllProvinces();
            console.log("Provinces data: ", response.data);
            if (response.status === 200) {
                setProvinces(response.data);
            } else {
                console.error("Error provinces response status", response.status)
            }
        } catch (err) {
            console.error(err.message);
        }
    }


    return (
        <div className="bg-dark">
            <div className="container py-3">

                <div className='d-flex align-items-center my-2 input-group'>
                    <div className='d-flex align-items-center bg-white px-2 rounded-3'>
                        <i className="fa-solid fa-magnifying-glass fs-5 m-0"></i>
                        <input className='border border-0 p-2 rounded input-search' type='text' placeholder='Tìm kiếm đề thi'></input>
                    </div>
                    <button className='py-2 px-lg-4 px-md-2 px-sm-2 rounded-3 mx-1 btn btn-primary fw-bold'>Tìm kiếm</button>
                </div>
                <div className='bg-white rounded-3 my-2 p-3'>
                    <h3 className='fw-bold'>Tổng hợp đề thi, đề kiểm tra và đáp án</h3>
                    <h5>Tổng hợp đề thi, đề kiểm tra có đáp án nhanh và chính xác nhất, cập nhật liên tục</h5>
                </div>
                <div className="bg-white rounded-3 px-3 my-2">
                    <div className="d-lg-flex d-md-grid d-sm-grid d-grid   p-3" >

                        <div className="d-flex flex-lg-row flex-md-row flex-sm-column flex-column gap-lg-3 gap-sm-2 gap-1">
                            <select className="form-select filter-exam-box" onChange={(e) => setSelectedSubject(e.target.value)}>
                                <option defaultValue value={0}>Tất cả các môn</option>
                                {subjects.map((subject, index) => (
                                    <option key={`subject_${index}`} value={subject.id}>{subject.name}</option>
                                ))}
                            </select>

                            <select className="form-select filter-exam-box" onChange={(e) => setSelectedGrade(e.target.value)}>
                                <option defaultValue value={0}>Tất cả các khối</option>
                                {grades.map((grade, index) => (
                                    <option key={`grade_${index}`} value={grade.id}>{grade.name}</option>
                                ))}
                            </select>

                            <select className="form-select filter-exam-box" onChange={(e) => setSelectedProvince(e.target.value)}>
                                <option defaultValue value={0}>Tất cả các tỉnh</option>
                                {provinces.map((province, index) => (
                                    <option key={`province_${index}`} value={province.id}>{province.name}</option>
                                ))}
                            </select>

                            <input
                                type='month'
                                className='form-control'
                                onChange={(e) => setSelectedMonth(e.target.value)}
                            />


                        </div>
                        <button
                            onClick={() => {
                                console.log('refetch test list');
                                fetchTestsData();
                            }}
                            className='btn btn-primary ms-lg-3 ms-md-0 ms-sm-3 mt-lg-0 mt-md-2 mt-sm-0 mt-2 px-4 fw-bold'>
                            Lọc
                        </button>
                    </div>

                    <div className="container my-2 ">
                        <ul className='list-unstyled ps-0 pb-3'>
                            <li className='mb-3'>
                                <h3 className='text-uppercase fw-bold'>Tất cả đề thi </h3>
                                <ul className="list-unstyled ps-0">
                                    <li className=" border-bottom mb-1">
                                        <div >
                                            <ul className="btn-toggle-nav list-unstyled py-1">
                                                {tests.map((test, index) => (
                                                    <li
                                                        key={`test_${index}`}
                                                        className='py-2 d-block border-bottom mx-4 mb-3'
                                                    >
                                                        <div className='fw-bold fs-5 mb-2'>
                                                            <Link to={`/Exams/ExamDetails/${test.id}`} className='mb-2'>
                                                                <i className="fa-solid fa-caret-right pe-2 text-primary m-0"></i> {test.name}
                                                            </Link>
                                                        </div>
                                                        <div className='d-flex flex-wrap align-items-center justify-content-start mt-2 sub-detail' >
                                                            <div className='small pe-4'>
                                                                <i className="small pe-2 fa-solid fa-book-open-reader m-0"></i>
                                                                <span>{test.subject}</span>
                                                            </div>
                                                            <div className='small pe-4'>
                                                                <i className="small pe-2 fa-solid fa-graduation-cap m-0"></i>
                                                                <span>{test.grade}</span>
                                                            </div>
                                                            <div className='small pe-4'>
                                                                <i className="small pe-2 fa-solid fa-calendar-check m-0"></i>
                                                                <span>{test.year}</span>
                                                            </div>
                                                            <div className='small pe-4'>
                                                                <i className="small pe-2 fa-solid fa-location-dot m-0"></i>
                                                                <span>{test.province}</span>
                                                            </div>
                                                            <div className='small pe-4'>
                                                                <i className="small pe-2 fa-solid fa-clock m-0"></i>
                                                                <span>{test.timeLimit} phút</span>
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Exams;
