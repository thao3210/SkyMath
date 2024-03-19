import {
    getApi,
    // getApiV2,
    // postApi,
    putApi,
    getLocalStorage
}
    from "./agent";

const FAQServices = {
    getListFAQ: async () => {
        try {
            const result = await getApi("faq", "");
            return result;
        } catch (error) {
            console.log(error);
        }
        return null;
    },
    getListFAQUnApprove: async () => {
        try {
            const result = await getApi("faq/unapprove-faq", "");
            return result;
        } catch (error) {
            console.log(error);
        }
        return null;
    },

    acceptFAQs: async(faqType,id, payload)=>{
        try {
            const res = await putApi(`faq/approve/${faqType}/${id}`, payload, {
                headers: {
                    Authorization: getLocalStorage('accessToken') ? `Bearer ${getLocalStorage('accessToken')}` : 'no-author',
                    // 'Content-Type': 'multipart/form-data',
                },
            });
            return res;
        } catch (error) {
            console.log(error);
        }
        return null;
    },
}

export default FAQServices;