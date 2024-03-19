import {
    getApi,
    // getApiV2,
    postApi2,
    deleteApi,
    // getLocalStorage
}
    from "./agent";

const SlideServices = {
    getListSlide: async () => {
        try {
            const result = await getApi("slides", "");
            return result;
        } catch (error) {
            console.log(error);
        }
        return null;
    },
      
    
    createSlide: async (payload) => {
        try {
            const result = await postApi2("slides", payload);
            return result;
        } catch (error) {
            console.log(error);
        }
        return null;
    },

    

    deleteSlide: async (id) => {
        try {
          const result = await deleteApi(`slides/${id}`);
          return result;
        } catch (error) {
          console.log(error);
        }
        return null;
    },
}

export default SlideServices;