import {
    getApi,
    // getApiV2,
    // postApi,
    // putApi,
    postApi2,
    deleteApi
}
    from "./agent";

const NewsServices = {
    getListNews: async () => {
        try {
            const result = await getApi("newsandevent", "");
            return result;
        } catch (error) {
            console.log(error);
        }
        return null;
    },

    getNewsById: async (id) => { 
        try {
            const result = await getApi(`newsandevent/${id}`, "");
            return result;
        } catch (error) {
            console.log(error);
        }
        return null;
    },
    
    // editNews: async(id, payload)=>{
    //     try {
    //         const result = await putApi(`newsandevent/${id}`, payload);
    //         return result;
    //     } catch (error) {
    //         console.log(error);
    //     }
    //     return null;
    // },

    addNews: async (payload) => {
        try {
            const result = await postApi2("newsandevent", payload);
            return result;
        } catch (error) {
            console.log(error);
        }
        return null;
    },
    
    deleteNews: async (id) => {
        try {
          const result = await deleteApi(`newsandevent/${id}`);
          return result;
        } catch (error) {
          console.log(error);
        }
        return null;
    },
}

export default NewsServices;