import { getApi, getApiV2, postApi, putApi, postApi2 } from "./agent";

const UserService = {
    Register: async (registrationData) => {
        try {
            let result = await postApi('users/register', registrationData);
            return result;
        } catch (error) {
            console.log(error);
        }
    },
    Login: async (loginData) => {
        try {
            let result = await postApi('users/login-via-form', loginData);
            return result;
        } catch (error) {
            console.log(error);
        }
    },
    getUserInformation: async () => {
        try {
            let result = await getApi(`users/get-user-information-detail`);
            return result;
        } catch (error) {
            console.log(error);
        }
    },

    LoginViaGoogle: async (data) => {
        try {
            let result = await postApi('users/login-via-google', data);
            return result;
        } catch (error) {
            console.log(error);
        }
    },

    updateUserAvatar: async (payload) => {
        try {
            const result = await putApi(`users/update-user-avatar`, payload);
            return result;
        } catch (error) {
            console.log(error);
        }
        return null;
    },

    updateUserInfo: async (payload) => {
        try {
            const result = await putApi(`users/update-user-information`, payload);
            return result;
        } catch (error) {
            console.log(error);
        }
        return null;
    },
}

export default UserService