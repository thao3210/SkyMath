import { getApi, getApiV2, postApi, putApi, postApi2 } from "./agent";

const TestService = {
    getTests: async (indexPage, year, subjectId, gradeId, provinceId) => {
        try {
            let result = await getApi(`tests?IndexPage=${indexPage}&Year=${year}&SubjectId=${subjectId}&GradeId=${gradeId}&ProvinceId=${provinceId}`);
            return result;
        } catch (error) {
            console.log(error);
        }
    },

    getTestDetailByID: async (id) => {
        try {
            let result = await getApi(`/tests/${id}`);
            return result;
        } catch (error) {
            console.log(error);
        }
    },

    getAllGrades: async () => {
        try {
            let result = await getApi("grades");
            return result;
        } catch (error) {
            console.log(error);
        }
    },

    getAllSubjects: async () => {
        try {
            let result = await getApi("subjects");
            return result;
        } catch (error) {
            console.log(error);
        }
    },

    getAllProvinces: async () => {
        try {
            let result = await getApi("fixeds/provinces");
            return result;
        } catch (error) {
            console.log(error);
        }
    },
}

export default TestService