import { getApi, getApiV2, postApi, putApi, postApi2 } from "./agent";

const HomepageServices = {
    getAllSlide: async () => {
        try {
            let result = await getApi('slides');
            return result;
        } catch (error) {
            console.log(error);
        }
    },
    getAllIntro: async () => {
        try {
            let result = await getApi('introduces');
            return result;
        } catch (error) {
            console.log(error);
        }
    },
}

export default HomepageServices