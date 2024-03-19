import { getApi, putApi2, postApi, deleteApi } from './agent';

const SubjectServices = {
  getListSubject: async () => {
    try {
      const result = await getApi('subjects', '');
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },
  editSubject: async (id, payload) => {
    try {
      const result = await putApi2(`subjects/${id}`, payload);
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },

  addSubject: async (payload) => {
    try {
      const result = await postApi('subjects', payload);
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },

  deleteSubject: async (id) => {
    try {
      const result = await deleteApi(`subjects/${id}`);
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },
};

export default SubjectServices;
