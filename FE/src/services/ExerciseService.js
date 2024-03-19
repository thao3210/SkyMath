import { getApi, getApiV2, postApi, putApi, postApi2 } from "./agent";

const ExerciseService = {
    getExerciseById: async (exerciseId, lessonId) => {
        try {
            let result = await getApi(`exercises/${exerciseId}/quizzes?lessonId=${lessonId}`);
            return result;
        } catch (error) {
            console.log(error);
        }
    }
}

export default ExerciseService