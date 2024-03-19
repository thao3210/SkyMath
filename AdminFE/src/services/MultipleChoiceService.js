import {
  getApi,
  putApi,
  postApi2,
  deleteApi,
  // getLocalStorage
} from './agent';

const MultipleChoiceService = {
  getQuiz: async () => {
    try {
      const result = await getApi('quizzes/multiple-choice', '');
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },
  getQuizContent: async (id) => {
    try {
      const result = await getApi(`quizzes/multiple-choice/quizId?quizId=${id}`, '');
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },

  addQuiz: async (payload) => {
    try {
      const result = await postApi2('quizzes/multiple-choice', payload);
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },
  editQuiz: async (id, payload) => {
    try {
      const result = await putApi(`quizzes/multiple-choice/${id}`, payload);
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },

  deleteQuiz: async (id) => {
    try {
      const result = await deleteApi(`quizzes/multiple-choice/${id}`);
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },
};

export default MultipleChoiceService;
