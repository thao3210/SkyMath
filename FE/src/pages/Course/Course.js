
import React, { useEffect, useState } from "react";
import './Course.css';
import { Link } from "react-router-dom";
import CourseServices from "../../services/CourseService";
const Course = () => {
    const [gradesData, setGradesData] = useState([]);
    const [selectedGrade, setSelectedGrade] = useState(1);
    const [coursesData, setCoursesData] = useState([]);
    const [curriculumData, setCurriculumData] = useState([]);
    const [selectedCurriculum, setSelectedCurriculum] = useState(null);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [totalLessons, setTotalLessons] = useState({});

    const fetchGrades = async () => {
        try {
            const response = await CourseServices.getListGrades();
            if (response.status === 200) {
                setGradesData(response.data);
            } else {
                console.error("Error grades response status", response.status)
            }
        } catch (err) {
            console.error(err.message);
        }
    }

    const fetchCourses = async () => {
        try {
            const response = await CourseServices.getAllCourse();
            if (response.status === 200) {
                setCoursesData(response.data);
            } else {
                console.error("Error courses response status", response.status)
            }
        } catch (err) {
            console.error(err.message);
        }
    }

    const fetchCurriculums = async () => {
        try {
            const response = await CourseServices.getListCurriculums();
            if (response.status === 200) {
                setCurriculumData(response.data);
            } else {
                console.error("Error curriculum response status", response.status)
            }
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        fetchGrades();
    }, []);


    useEffect(() => {
        fetchCurriculums();
    }, []);

    useEffect(() => {
        fetchCourses();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const filtered = coursesData.filter(course => {
                const gradeMatch = !selectedGrade || course.gradeId === selectedGrade;
                const curriculumMatch = !selectedCurriculum || course.curriculumId === selectedCurriculum;

                return gradeMatch && curriculumMatch;
            });

            setFilteredCourses(filtered);

            const coursePromises = filtered.map(async (course) => {
                const response = await CourseServices.getCourseDetailsByID(course.id);
                const thematicDtos = response.data?.thematicApplicationDTOs || [];

                const totalLessonsCount = thematicDtos.reduce((acc, thematic) => {
                    const lessonsCount = thematic.lessonPreviewDTOs.length;
                    return acc + lessonsCount;
                }, 0);

                setTotalLessons(prevState => ({ ...prevState, [course.id]: totalLessonsCount }));
            });

            // Wait for all promises to resolve
            await Promise.all(coursePromises);
        };

        fetchData();
    }, [coursesData, selectedGrade, selectedCurriculum]);


    return (
        <div className="bg-white d-flex">
            <div className={`d-lg-block d-md-none d-sm-none d-none col-2 h-100 bg-light overflow-auto d-lg-block z-2 p-2 scrollbar sidebar-course`}>
                {gradesData.map((grade) => (
                    <button
                        key={grade.id}
                        className={`btn btn-outline-dark d-flex align-items-center justify-content-start px-2 py-3 my-1 w-100 ${selectedGrade === grade.id ? 'active' : ''}`}
                        onClick={() => {
                            setSelectedGrade(grade.id);
                        }}
                    >
                        <i className="fa-solid fa-brain m-0 pe-3 small"></i>
                        <span>{grade.name}</span>
                    </button>
                ))}

            </div>

            <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasGrade" aria-labelledby="offcanvasGradeLabel" style={{ maxWidth: '320px' }}>
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasGradeLabel">Các khối lớp</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    {gradesData.map((grade) => (
                        <button
                            key={grade.id}
                            className={`btn btn-outline-dark d-flex align-items-center justify-content-start px-2 py-3 my-1 w-100 ${selectedGrade === grade.id ? 'active' : ''}`}
                            onClick={() => {
                                setSelectedGrade(grade.id);
                            }}
                        >
                            <i className="fa-solid fa-brain m-0 pe-3 small"></i>
                            <span>{grade.name}</span>
                        </button>
                    ))}

                </div>
            </div>
            <div className="p-2 ">
                <div className="d-flex gap-1 align-items-center px-4 pt-3">
                    <button className="d-lg-none d-md-block d-sm-block d-block btn btn-dark" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasGrade" aria-controls="offcanvasGrade">
                        <i className="fa-solid fa-bars"></i>
                    </button>
                    <div className="">
                        <select
                            className="form-select"
                            value={selectedCurriculum || ''}
                            onChange={(e) => {
                                setSelectedCurriculum(e.target.value === '' ? null : e.target.value);
                            }}
                        >
                            <option value="">Tất cả giáo trình</option>
                            {curriculumData.map((curriculum) => (
                                <option key={curriculum.id} value={curriculum.id}>
                                    {curriculum.name}
                                </option>
                            ))}
                        </select>
                    </div>

                </div>

                <h3 className="fw-bold px-4 pt-3">Các khóa học</h3>

                {filteredCourses.length === 0 && <p className="ms-5 mt-3">Chưa có dữ liệu</p>}
                <div className='d-flex flex-wrap align-items-center gap-3 ms-3'>
                    {filteredCourses.map((course) => (
                        <div key={course.id} className="card rounded-0 card-course">
                            <img src={course.imageLink} alt={course.name} className="grade-course-img" />
                            <div className="card-body">
                                <Link to={`/Course/${course.id}`} className="fw-bold lh-sm text-decoration-none course-name">{course.name}</Link>
                                <div className="pt-lg-2 pt-1 num-lesson-text">{totalLessons[course.id]} bài học</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Course;