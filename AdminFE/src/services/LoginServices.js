import {
    // getApi,
    // getApiV2,
    postApi,
    // putApi,
    // postApi2
}
    from "./agent";

const LoginServices = {
    Login: async (payload) => {
        try {
            const result = await postApi("users/LoginViaForm", payload);
            return result;
        } catch (error) {
            console.log(error);
        }
        return null;
    },
}

export default LoginServices;