import {
    // getApi,
    putApi2,
    // getApiV2,
    postApi,
    // postApi2,
    deleteApi
}
    from "./agent";

const LessonServices = {
    addLesson: async (payload) => {
        try {
            const result = await postApi("lessons", payload);
            return result;
        } catch (error) {
            console.log(error);
        }
        return null;
    },

    editLesson: async(id, payload)=>{
        try {
            const result = await putApi2(`lessons/${id}`, payload);
            return result;
        } catch (error) {
            console.log(error);
        }
        return null;
    },

    deleteLesson: async (id) => {
        try {
          const result = await deleteApi(`lessons/${id}`);
          return result;
        } catch (error) {
          console.log(error);
        }
        return null;
    },
}

export default LessonServices;