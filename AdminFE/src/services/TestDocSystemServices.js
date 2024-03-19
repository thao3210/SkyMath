import { getApi, postApi, deleteApi } from './agent';

const TestDocSystemService = {
  getListTestDocument: async (indexPage, year, subjectId, gradeId, provinceId) => {
    try {
      let apiUrl = `tests?IndexPage=${indexPage}`;

      if (year) {
        apiUrl += `&Year=${year}`;
      }
      if (subjectId) {
        apiUrl += `&SubjectId=${subjectId}`;
      }
      if (gradeId) {
        apiUrl += `&GradeId=${gradeId}`;
      }
      if (provinceId) {
        apiUrl += `&ProvinceId=${provinceId}`;
      }

      const result = await getApi(apiUrl, '');
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },

  addTestDocument: async (payload) => {
    try {
      const result = await postApi('tests', payload);
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },

  deleteTestDocument: async (id) => {
    try {
      const result = await deleteApi(`tests/${id}`);
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },
};

export default TestDocSystemService;
