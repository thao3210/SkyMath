import {
  getApi,
  putApi2,
  postApi,
  deleteApi,
  // getLocalStorage
} from './agent';

const CourseTestService = {
  getCourse: async (id) => {
    try {
      const result = await getApi(`course-test/courseId/${id}`, '');
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },
  getQuizCourse: async (id) => {
    try {
      const result = await getApi(`course-test/${id}`, '');
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },

  addCourseTest: async (payload) => {
    try {
      const result = await postApi('course-test', payload);
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },
  
  addQuizCourseTest: async (courseTestId, quizIds) => {
    try {
      const result = await postApi(`course-test/add-quizz?courseTestId=${courseTestId}`, quizIds);
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },

  editCourseTest: async (id, payload) => {
    try {
      const result = await putApi2(`course-test/${id}`, payload);
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },

  deleteCourseTest: async (id) => {
    try {
      const result = await deleteApi(`course-test/${id}`);
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },
  
  deleteQuizCourseTest: async (courseTestId, quizIds) => {
    try {
      const result = await postApi(`course-test/remove-quizz?courseTestId=${courseTestId}`, quizIds);
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },
};

export default CourseTestService;
