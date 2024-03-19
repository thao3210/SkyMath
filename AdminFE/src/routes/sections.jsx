import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

export const LoadingPage = lazy(() => import('../pages/loading_page'));
export const IndexPage = lazy(() => import('../pages/app'));
export const UserPage = lazy(() => import('../pages/user'));
export const LoginPage = lazy(() => import('../pages/login'));
export const Page404 = lazy(() => import('../pages/page-not-found'));
export const ListGradePage = lazy(() => import('../pages/grade/listGrade'));
export const DashboardLayout = lazy(() => import('../layouts/dashboard'));
export const ListCurriculumPage = lazy(() => import('../pages/curriculum/ListCurriculum'));
export const AddCoursePage = lazy(() => import('../pages/course/AddCourse'));
export const EditCoursePage = lazy(() => import('../pages/course/EditCourse'));
export const ListCoursePage = lazy(() => import('../pages/course/ListCourse'));
export const DetailsCoursePage = lazy(() => import('../pages/course/DetailsCourse'));
export const ExerciseListQuiz = lazy(() => import('../pages/exercise/ExerciseListQuiz'));
export const AddNewsPage = lazy(() => import('../pages/news/addNews'));
export const EditNewsPage = lazy(() => import('../pages/news/editNews'));
export const ListNewsPage = lazy(() => import('../pages/news/listNews'));
export const ListIntroducePage = lazy(() => import('../pages/introduce/listIntroduce'));
export const ListFAQsUnApprovePage = lazy(() => import('../pages/faq/unapproveFAQS'));
export const ListFAQsPage = lazy(() => import('../pages/faq/listFAQs'));
export const ListSlidePage = lazy(() => import('../pages/slide/listSlide'));
export const ListSubject = lazy(() => import('../pages/subject/listSubject'));
export const ListQuiz = lazy(() => import('../pages/quizAll/ListQuiz'));
export const ListTrueFalseQuiz = lazy(() => import('../pages/trueFalseQuiz/listTrueFalseQuiz'));
export const ListFillBlankQuiz = lazy(() => import('../pages/fillBlankQuiz/listFillBlankQuiz'));
export const ListMultipleChoiceQuiz = lazy(() =>
  import('../pages/multipleChoice/listMultipleChoice')
);
export const ListMatchingQuiz = lazy(() => import('../pages/matchingQuiz/listMatching'));
export const ListCourseTest = lazy(() => import('../pages/courseTest/listCourseTest'));
export const ListTestDocument = lazy(() => import('../pages/testDocument/listTestDocument'));
export const ListTestDocSystem = lazy(() => import('../pages/TestDocSystem/ListTestDocSystem'));
export const AddQuizPage = lazy(() => import('../pages/quizAll/AddQuizView'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense fallback={<LoadingPage />}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'user', element: <UserPage /> },
        { path: 'course', element: <ListCoursePage /> },
        { path: 'course/addCourse', element: <AddCoursePage /> },
        { path: 'course/editCourse/:id', element: <EditCoursePage /> },
        { path: 'course/showDetails/:courseId', element: <DetailsCoursePage /> },
        {
          path: 'course/showDetails/:courseId/lesson/:lessonId/exerciseListQuiz/:exerciseId',
          element: <ExerciseListQuiz />,
        },
        { path: 'news', element: <ListNewsPage /> },
        { path: 'news/addNews', element: <AddNewsPage /> },
        { path: 'news/editNews/:id', element: <EditNewsPage /> },
        { path: 'grade', element: <ListGradePage /> },
        { path: 'introduce', element: <ListIntroducePage /> },
        { path: 'curriculum', element: <ListCurriculumPage /> },
        { path: 'faq', element: <ListFAQsPage /> },
        { path: 'faq/faqUnApprove', element: <ListFAQsUnApprovePage /> },
        { path: 'banner', element: <ListSlidePage /> },
        { path: 'subject', element: <ListSubject /> },
        { path: 'quiz', element: <ListQuiz /> },
        { path: 'addQuiz', element: <AddQuizPage /> },
        { path: 'quiz/trueFalse', element: <ListTrueFalseQuiz /> },
        { path: 'quiz/fillBlank', element: <ListFillBlankQuiz /> },
        { path: 'quiz/multipleChoice', element: <ListMultipleChoiceQuiz /> },
        { path: 'quiz/matching', element: <ListMatchingQuiz /> },
        { path: 'courseTest', element: <ListCourseTest /> },
        { path: 'testDocument', element: <ListTestDocument /> },
        { path: 'testDocSystem', element: <ListTestDocSystem /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
