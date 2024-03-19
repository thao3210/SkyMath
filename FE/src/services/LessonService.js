import { getApi, getApiV2, postApi, putApi, postApi2 } from "./agent";

const LessonService = {
    getLessonById: async (lessonId) => {
        try {
            let result = await getApi(`lessons/${lessonId}`);
            return result;
        } catch (error) {
            console.log(error);
        }
    },
    getQuizByQuizId: async (quizId) => {
        try {
            let result = await getApi(`quizzes?quizId=${quizId}`);
            return result;
        } catch (error) {
            console.log(error);
        }
    }
}

export default LessonService