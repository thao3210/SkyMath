import {
  getApi,
  putApi,
  postApi2,
  deleteApi,
  // getLocalStorage
} from './agent';

const TrueFalseService = {
  getTrueFalseQuiz: async () => {
    try {
      const result = await getApi('quizzes/true-false', '');
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },

  addTrueFalse: async (payload) => {
    try {
      const result = await postApi2('quizzes/true-false', payload);
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },
  editQuiz: async (id, payload) => {
    try {
      const result = await putApi(`quizzes/true-false/${id}`, payload);
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },

  deleteQuiz: async (id) => {
    try {
      const result = await deleteApi(`quizzes/true-false/${id}`);
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },
};

export default TrueFalseService;
