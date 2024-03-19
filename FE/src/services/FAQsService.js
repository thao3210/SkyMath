import { getApi, postApi2, putApi } from "./agent";

const FAQsService = {
  getCourseFAQsByID: async (id, premium) => {
    try {
      let result = await getApi(`/faqs/courses/${id}?premium=${premium}`);
      return result;
    } catch (error) {
      console.log(error);
    }
  },
  addQuestion: async (payload) => {
    try {
      const result = await postApi2('faqs/questions', payload);
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },
  addAnswer: async (payload) => {
    try {
      const result = await postApi2('faqs/answers', payload);
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },
  editQuestion: async (id, payload) => {
    try {
      const result = await putApi(`faqs/questions/${id}`, payload);
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },
  editAnswer: async (id, payload) => {
    try {
      const result = await putApi(`faqs/answers/${id}`, payload);
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },
};

export default FAQsService;
