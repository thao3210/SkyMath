import {
    getApi,
    // getApiV2,
    postApi,
    // putApi,
    // postApi2,
    deleteApi
}
    from "./agent";

const GradeServices = {
    getListGrade: async () => {
        try {
            const result = await getApi("grades","");
            return result;
        } catch (error) {
            console.log(error);
        }
        return null;
    },

    addGrade: async (payload) => {
        try {
            const result = await postApi("grades", payload);
            return result;
        } catch (error) {
            console.log(error);
        }
        return null;
    },

    deleteGrade: async (id) => {
        try {
          const result = await deleteApi(`grades/${id}`);
          return result;
        } catch (error) {
          console.log(error);
        }
        return null;
    },
}

export default GradeServices;