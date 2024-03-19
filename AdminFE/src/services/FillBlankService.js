import {
  getApi,
  putApi2,
  postApi,
  deleteApi,
  // getLocalStorage
} from './agent';

const FillBlankService = {
  getQuiz: async () => {
    try {
      const result = await getApi('quizzes/fill-blank', '');
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },

  addQuiz: async (payload) => {
    try {
      const result = await postApi('quizzes/fill-blank', payload);
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },
  editQuiz: async (id, payload) => {
    try {
      const result = await putApi2(`quizzes/fill-blank/${id}`, payload);
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },

  deleteQuiz: async (id) => {
    try {
      const result = await deleteApi(`quizzes/fill-blank/${id}`);
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },
};

export default FillBlankService;
