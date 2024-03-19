import {
  getApi,
  putApi,
  postApi2,
  deleteApi,
  // getLocalStorage
} from './agent';

const QuizThematicService = {
  getQuizThematic: async () => {
    try {
      const result = await getApi('quizzes/quiz-thematic', '');
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },

  addQuizThematic: async (payload) => {
    try {
      const result = await postApi2('quizzes/quiz-thematic', payload);
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },
  editQuizThematic: async (id, payload) => {
    try {
      const result = await putApi(`quizzes/quiz-thematic/${id}`, payload);
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },

  deleteQuizThematic: async (id) => {
    try {
      const result = await deleteApi(`quizzes/quiz-thematic/${id}`);
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },
};

export default QuizThematicService;
