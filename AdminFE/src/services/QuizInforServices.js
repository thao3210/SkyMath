import {
    getApi,
    // putApi,
    // postApi2,
    // deleteApi,
    // getLocalStorage
  } from './agent';
  
  const QuizInforService = {
    getQuizInfor: async (quizThematicId) => {
      try {
        const result = await getApi(`quizzes/quiz-info?quizThematicId=${quizThematicId}`, '');
        return result;
      } catch (error) {
        console.log(error);
      }
      return null;
    },
  };
  
  export default QuizInforService;
  