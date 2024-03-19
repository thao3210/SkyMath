import { getApi, putApi, postApi, deleteApi } from './agent';

const TestDocumentService = {
  getListTestDocument: async (indexPage, year, subjectId, gradeId, provinceId) => {
    try {
      const result = await getApi(
        `test-documents?IndexPage=${indexPage}&Year=${year}&SubjectId=${subjectId}&GradeId=${gradeId}&ProvinceId=${provinceId}`,
        ''
      );
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },
  editTestDocument: async (id, payload) => {
    try {
      const result = await putApi(`test-documents/${id}`, payload);
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },

  addTestDocument: async (payload) => {
    try {
      const result = await postApi('test-documents', payload);
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },

  deleteTestDocument: async (id) => {
    try {
      const result = await deleteApi(`test-documents/${id}`);
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },
};

export default TestDocumentService;
