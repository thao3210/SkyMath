import { getApi, getApiV2, postApi, putApi, postApi2 } from "./agent";

const PlanServices = {
    getListPlan: async () => {
        try {
            let result = await getApi('plans');
            return result;
        } catch (error) {
            console.log(error);
        }
    },
}

export default PlanServices