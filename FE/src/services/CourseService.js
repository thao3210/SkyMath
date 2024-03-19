import { getApi, getApiV2, postApi, putApi, postApi2 } from "./agent";

const CourseServices = {
  getAllCourse: async () => {
    try {
      let result = await getApi("courses");
      return result;
    } catch (error) {
      console.log(error);
    }
  },

  getCourseProminent: async () => {
    try {
      let result = await getApi("courses/prominent");
      return result;
    } catch (error) {
      console.log(error);
    }
  },

  getListGrades: async () => {
    try {
      let result = await getApi("grades");
      return result;
    } catch (error) {
      console.log(error);
    }
  },

  getListCurriculums: async () => {
    try {
      let result = await getApi("curriculums");
      return result;
    } catch (error) {
      console.log(error);
    }
  },

  // getCoursesByGrade: async (gradeId) => {
  //   try {
  //     let result = await getApi(`grades/${gradeId}/courses`);
  //     return result;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },

  getCourseDetailsByID: async (id) => {
    try {
      let result = await getApi(`/courses/${id}/thematics/lessons`);
      return result;
    } catch (error) {
      console.log(error);
    }
  },

  getListCourseTestByCourseId: async (courseId) => {
    try {
      let result = await getApi(`/course-test/courseId/${courseId}`);
      return result;
    } catch (error) {
      console.log(error);
    }
  },

  getTestDetailById: async (testId) => {
    try {
      let result = await getApi(`/course-test/${testId}`);
      return result;
    } catch (error) {
      console.log(error);
    }
  },

  postUserProcess: async (processData) => {
    try {
      let result = await postApi('process', processData);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  // getCoursesByGradeAndCurriculum: async (gradeId, curriculumId) => {
  //     try {
  //         let result = await getApi(`grades/${gradeId}/courses?curriculumId=${curriculumId}`);
  //         return result;
  //     } catch (error) {
  //         console.log(error);
  //     }
  // },

  // getCoursesByGradeAndCurriculum: async (gradeId, curriculumId) => {
  //     try {
  //         let result = await getApi(`grades/${gradeId}/courses?curriculum=${curriculumId}`);
  //         return result;
  //     } catch (error) {
  //         console.log(error);
  //     }
  // },
};

export default CourseServices;
