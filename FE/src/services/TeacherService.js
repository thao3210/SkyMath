import { getApi, getApiV2, postApi, putApi, postApi2 } from "./agent";

const TeacherServices = {
    getListTeacher: async () => {
        try {
            let result = await getApi('teachers');
            return result;
        } catch (error) {
            console.log(error);
        }
    },
    getTeacherById: async id => {
        try {
            let result = await getApi('teachers/' + id);
            return result;
        } catch (error) {
            console.log(error);
        }
    },
}

export default TeacherServices