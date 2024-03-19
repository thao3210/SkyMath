import {
  getApi,
  putApi,
  // putApi2,
  // getApiV2,
  postApi,
  postApi2,
  deleteApi,
} from './agent';

const ResourceServices = {
  getResourceById: async (id) => {
    try {
      const result = await getApi(`resources/${id}`, '');
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },

  getResourceByLessonId: async (id) => {
    try {
      const result = await getApi(`resources/lessonId/${id}`, '');
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },

  getVideoInter: async (resourceId) => {
    try {
      const result = await getApi(`video-interact?resourceId=${resourceId}`, '');
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },

  addResource: async (payload) => {
    try {
      const result = await postApi2('resources', payload);
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },

  addQuizResource: async (payload) => {
    try {
      const result = await postApi('video-interact', payload);
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },

  editResource: async (id, payload) => {
    try {
      const result = await putApi(`resources/${id}`, payload);
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },

  deleteResource: async (id) => {
    try {
      const result = await deleteApi(`resources/${id}`);
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },
};

export default ResourceServices;
