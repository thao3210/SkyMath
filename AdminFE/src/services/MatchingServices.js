import {
    getApi,
    putApi,
    putApi2,
    postApi,
    postApi2,
    deleteApi,
    // getLocalStorage
  } from './agent';
  
  const MatchingService = {
    getQuiz: async () => {
      try {
        const result = await getApi('quizzes/matching', '');
        return result;
      } catch (error) {
        console.log(error);
      }
      return null;
    },
    getQuizContent: async (id) => {
      try {
        const result = await getApi(`quizzes/matching/quizId?quizId=${id}`, '');
        return result;
      } catch (error) {
        console.log(error);
      }
      return null;
    },
  
    addQuiz: async (payload) => {
      try {
        const result = await postApi('quizzes/matching', payload);
        return result;
      } catch (error) {
        console.log(error);
      }
      return null;
    },
    addQuizContent: async (payload) => {
      try {
        const result = await postApi2('quizzes/matching/matching-content', payload);
        return result;
      } catch (error) {
        console.log(error);
      }
      return null;
    },
    editQuiz: async (id, payload) => {
      try {
        const result = await putApi2(`quizzes/matching/${id}`, payload);
        return result;
      } catch (error) {
        console.log(error);
      }
      return null;
    },
    editContent: async (id, payload) => {
      try {
        const result = await putApi(`quizzes/matching/matching-content/${id}`, payload);
        return result;
      } catch (error) {
        console.log(error);
      }
      return null;
    },
  
    deleteQuiz: async (id) => {
      try {
        const result = await deleteApi(`quizzes/matching/${id}`);
        return result;
      } catch (error) {
        console.log(error);
      }
      return null;
    },
    deleteQuizContent: async (id) => {
      try {
        const result = await deleteApi(`quizzes/matching/matching-content/${id}`);
        return result;
      } catch (error) {
        console.log(error);
      }
      return null;
    },
  };
  
  export default MatchingService;
  