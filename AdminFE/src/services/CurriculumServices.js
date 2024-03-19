import {
    getApi,
    // getApiV2,
    postApi,
    // putApi,
    // postApi2,
    deleteApi
}
    from "./agent";

const CurriculumServices = {
    getListCurriculum: async () => {
        try {
            const result = await getApi("curriculums","");
            return result;
        } catch (error) {
            console.log(error);
        }
        return null;
    },

    addCurriculum: async (payload) => {
        try {
            const result = await postApi("curriculums", payload);
            return result;
        } catch (error) {
            console.log(error);
        }
        return null;
    },

    deleteCurriculum: async (id) => {
        try {
          const result = await deleteApi(`curriculums/${id}`);
          return result;
        } catch (error) {
          console.log(error);
        }
        return null;
    },
}

export default CurriculumServices;