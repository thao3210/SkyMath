import {
    getApi,
    // getApiV2,
    postApi,
    // putApi,
    // postApi2,
    deleteApi
}
    from "./agent";

const IntroduceServices = {
    getListIntroduce: async () => {
        try {
            const result = await getApi("introduces","");
            return result;
        } catch (error) {
            console.log(error);
        }
        return null;
    },

    addIntroduce: async (payload) => {
        try {
            const result = await postApi("introduces", payload);
            return result;
        } catch (error) {
            console.log(error);
        }
        return null;
    },

    deleteIntroduce: async (id) => {
        try {
          const result = await deleteApi(`introduces/${id}`);
          return result;
        } catch (error) {
          console.log(error);
        }
        return null;
    },
}

export default IntroduceServices;