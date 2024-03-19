import {
    getApi,
    // getApiV2,
    // postApi,
    putApi,
    postApi2,
    deleteApi
}
    from "./agent";

const CourseServices = {
    getListCourse: async (page) => {
        try {
            const result = await getApi(`courses?indexPage=${page}`, "");
            return result;
        } catch (error) {
            console.log(error);
        }
        return null;
    },

    getCourseById: async (id) => { 
        try {
            const result = await getApi(`courses/${id}`, "");
            return result;
        } catch (error) {
            console.log(error);
        }
        return null;
    },
    
    editCourse: async(id, payload)=>{
        try {
            const result = await putApi(`courses/${id}`, payload);
            return result;
        } catch (error) {
            console.log(error);
        }
        return null;
    },

    addCourse: async (payload) => {
        try {
            const result = await postApi2("courses", payload);
            return result;
        } catch (error) {
            console.log(error);
        }
        return null;
    },
    
    deleteCourse: async (id) => {
        try {
          const result = await deleteApi(`courses/${id}`);
          return result;
        } catch (error) {
          console.log(error);
        }
        return null;
    },
}

export default CourseServices;