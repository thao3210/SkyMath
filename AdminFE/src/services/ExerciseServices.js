import { getApi, postApi, deleteApi } from './agent';

const ExerciseServices = {
  getExerciseByLessonId: async (id) => {
    try {
      const result = await getApi(`exercises/lessonId/${id}`, '');
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },

  getExerciseById: async (id) => {
    try {
      const result = await getApi(`exercises/${id}`, '');
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },

  addExercise: async (payload) => {
    try {
      const result = await postApi('exercises', payload);
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },

  addQuizToExercise: async (exerciseId, quizIds) => {
    try {
      const result = await postApi(`exercises/add-quizz?exerciseId=${exerciseId}`, quizIds);
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },

  deleteExercise: async (id) => {
    try {
      const result = await deleteApi(`exercises/${id}`);
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },

  deleteQuizExercise: async (exerciseId, quizIds) => {
    try {
      const result = await postApi(`exercises/remove-quizz?exerciseId=${exerciseId}`, quizIds);
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },
};

export default ExerciseServices;
