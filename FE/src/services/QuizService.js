import { getApi, getApiV2, postApi, putApi, postApi2 } from "./agent";

const QuizService = {
    reportQuiz: async (payload) => {
        try {
            const result = await postApi2('reports', payload);
            return result;
        } catch (error) {
            console.log(error);
        }
        return null;
    },
}

export default QuizService