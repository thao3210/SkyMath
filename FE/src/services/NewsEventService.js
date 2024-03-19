import { getApi, getApiV2, postApi, putApi, postApi2 } from "./agent";

const NewsEventServices = {
    getListNewsAndEvent: async () => {
        try {
            let result = await getApi('news-and-event');
            return result;
        } catch (error) {
            console.log(error);
        }
    },
}

export default NewsEventServices