import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import HomePage from "./pages/Homepage/HomePage";
import Header from "./layout/header/Header";
import Course from "./pages/Course/Course";
import Lesson from "./pages/Lesson/Lesson";
import LessonList from "./pages/LessonList/LessonList";
import Footer from "./layout/footer/Footer";
import CourseDetail from "./pages/CourseDetail/courseDetail";
import NewsAndEvent from "./pages/NewsAndEvent";
import NewsDetail from "./pages/NewsDetail/newsDetail";
import AchievementPage from "./pages/Achievement";
import DetailTeacher from "./pages/DetailTeacher/DetailTeacher";
import ContactUs from "./pages/ContactUs/contact";
import AboutUs from "./pages/AboutUs/about";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import AdmissionsComponent from "./pages/Admissions";
import Profile from "./pages/Profile/Profile";
import Schedule from "./pages/Schedule/Schedule";
import Quiz from "./pages/Quiz";
import MultipleChoice from "./pages/Quiz/MultipleChoice/MultipleChoice";
import Exams from "./pages/DocumentStorage/Exams/Exams";
import Books from "./pages/DocumentStorage/Books/Books";
import BookDetails from "./pages/DocumentStorage/BookDetails/BookDetails";
import CourseCheckoutModal from "./components/Modal/CourseCheckoutModal/CourseCheckoutModal";
import CourseRegisterForm from "./components/Modal/CourseRegistrationForm/CourseRegistrationForm";
import Exercise from "./pages/Exercise/Exercise";
import OnlineExam from "./pages/OnlineExam/OnlineExam";
import OnlineExamDetail from "./pages/OnlineExamDetail/OnlineExamDetail";
import ExamDetails from "./pages/DocumentStorage/ExamDetails/ExamDetails";
import CourseTestDetail from "./pages/CourseTestDetail/CourseTestDetail";
import Documents from "./pages/DocumentStorage/Documents/Documents";
import DocumentDetail from "./pages/DocumentStorage/DocumentDetail/DocumentDetail";
import Contact from "./layout/contact/Contact";
import NewsDetails from "./pages/NewsDetail/Index";
import DetailCompetition from "./pages/NewsDetail/DetailCompetition/DetailCompetition";
import Reward from "./pages/OnlineExam/Reward/Reward";
import LeaderboardPage from "./pages/OnlineExam/LeaderboardPage/LeaderboardPage";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          {/* Define a layout with header and footer */}
          <Route
            path="/SkyMath"
            element={
              <>
                <Header />
                <Outlet />
                <Footer />
                <Contact />
              </>
            }
          >
            <Route index element={<HomePage />} />
            <Route path="/SkyMath/About" element={<AboutUs />} />
            <Route path="/SkyMath/Contact" element={<ContactUs />} />
            <Route path="/SkyMath/Course" element={<Course />} />
            <Route path="/SkyMath/Course/:id" element={<CourseDetail />} />
            <Route path="/SkyMath/Course/Test/:id" element={<CourseTestDetail />} />
            <Route path="/SkyMath/Exams" element={<Exams />} />
            <Route path="/SkyMath/Exams/ExamDetails/:id" element={<ExamDetails />} />
            <Route path="/SkyMath/LessonList" element={<LessonList />} />
            <Route path="/SkyMath/NewsAndEvent" element={<NewsAndEvent />} />
            <Route path="/SkyMath/NewsAndEventDetail" element={<NewsDetail />} />
            <Route path="/SkyMath/NewsDetails" element={<NewsDetails />} />
            <Route path="/SkyMath/CompetitionDetails" element={<DetailCompetition />} />
            <Route path="/SkyMath/Documents" element={<Documents />} />
            <Route path="/SkyMath/Documents/:id" element={<DocumentDetail />} />
            <Route path="/SkyMath/Achievement" element={<AchievementPage />} />
            <Route path="/SkyMath/Admissions" element={<AdmissionsComponent />} />
            <Route path="/SkyMath/DetailTeacher/:id" element={<DetailTeacher />} />
            <Route path="/SkyMath/Books" element={<Books />} />
            <Route path="/SkyMath/Profile" element={<Profile />} />
            <Route path="/SkyMath/Schedule" element={<Schedule />} />
            <Route path="/SkyMath/Quiz" element={<Quiz />} />
            <Route path="/SkyMath/TestQuiz" element={<MultipleChoice />} />
            {/* <Route path="/BookDetails" element={<BookDetails />} /> */}
          </Route>

          {/* Define a layout without header and footer for the Lesson page */}
          <Route path="/Lesson/:id/:resourceId" element={<Lesson />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/ResetPassword" element={<ResetPassword />} />
          <Route path="/Exercise/:id/:lessonId" element={<Exercise />} />
          <Route path="/BookDetails" element={<BookDetails />} />
          <Route path="/OnlineExamDetail" element={<OnlineExamDetail />} />
          <Route path="/OnlineExam" element={<OnlineExam />} />
          <Route path="/OnlineExam/Reward" element={<Reward />} />
          <Route path="/OnlineExam/Leaderboard" element={<LeaderboardPage />} />

        </Routes>
        <CourseCheckoutModal />
        <CourseRegisterForm />
      </Router>
    </>
  );
};

export default App;
