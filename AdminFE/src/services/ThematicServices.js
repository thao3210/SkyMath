import {
    // getApi,
    // putApi,
    // getApiV2,
    postApi,
    putApi2,
    // postApi2,
    deleteApi
}
    from "./agent";

const ThematicServices = {
    addThematic: async (payload) => {
        try {
            const result = await postApi("thematics", payload);
            return result;
        } catch (error) {
            console.log(error);
        }
        return null;
    },

    editThematic: async(id, payload)=>{
        try {
            const result = await putApi2(`thematics/${id}`, payload);
            return result;
        } catch (error) {
            console.log(error);
        }
        return null;
    },

    deleteThematic: async (id) => {
        try {
          const result = await deleteApi(`thematics/${id}`);
          return result;
        } catch (error) {
          console.log(error);
        }
        return null;
    },
}

export default ThematicServices;