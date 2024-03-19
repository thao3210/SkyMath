import axios from 'axios';

const isDevelopment = true;
let instance = null;

// INTERCEPTORS CONFIG START
if (isDevelopment === false) {
    instance = axios.create({
        baseURL: 'http://192.168.1.92:2002/api/',
    });
} else {

    instance = axios.create({
        baseURL: 'http://209.145.62.69:2002/api/',
    });
}

function responseOnSuccessMiddleware(res) {
    return res;
}

function responseOnErrorMiddleware(error) {
    const { status } = error.response;
    if (status === 401) {
        localStorage.clear();
    }
    return error;
}

// INTERCEPTORS CONFIG END

const setLocalStorage = (key, value) => {
    localStorage.setItem(key, value);
};
const getLocalStorage = (key) => {
    return localStorage.getItem(key);
};

const removeTokenFromLocalStorage = (key) => {
    return localStorage.removeItem(key);
}

const clearLocalStorage = () => {
    localStorage.clear();
};


//getAPI Area ==========================
async function getApi(url, searchModel) {
    const token = getLocalStorage('accessToken');

    try {
        let fullUrl = url;
        const queryParams = [];

        for (const key in searchModel) {
            if (searchModel.hasOwnProperty(key)) {
                const value = searchModel[key];
                if (value !== undefined && value !== null) {
                    queryParams.push(`${key}=${encodeURIComponent(value)}`);
                }
            }
        }

        if (queryParams.length > 0) {
            fullUrl += `?${queryParams.join('&')}`;
        }

        const res = await instance.get(fullUrl, {
            headers: {
                Authorization: token ? `Bearer ${token}` : 'no auth',
            },
        });

        return res;
    } catch (err) {
        return err;
    }
}



async function getApiV2(url, searchModel, type) {
    const token = getLocalStorage('accessToken');

    try {
        let fullUrl = url;
        const queryParams = [];

        for (const key in searchModel) {
            if (searchModel.hasOwnProperty(key)) {
                const value = searchModel[key];
                if (value !== undefined && value !== null) {
                    queryParams.push(`${key}=${encodeURIComponent(value)}`);
                }
            }
        }

        if (queryParams.length > 0) {
            fullUrl += `?${queryParams.join('&')}`;
        }

        const res = await instance.get(fullUrl, {
            responseType: type,
            headers: {
                Authorization: token ? `Bearer ${token}` : 'no auth',
            },
        }
        );

        return res;
    } catch (err) {
        return err;
    }
}

// POST API AREA ============================>
async function postApi(url, payload, file) {
    try {
        const res = await instance.post(url, payload, {
            headers: {
                Authorization: getLocalStorage('accessToken') ? `Bearer ${getLocalStorage('accessToken')}` : 'no-author',
                'Content-Type': file ? 'multipart/form-data' : 'application/json; charset=utf-8',
                'Access-Control-Allow-Headers':
                    'Content-Type, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version, X-File-Name',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Origin': '*',
            },
        });
        return res;
    } catch (err) {
        return err;
    }
}

async function postApi2(url, payload, file) {
    try {
        const res = await instance.post(url, payload, {
            headers: {
                Authorization: getLocalStorage('accessToken') ? `Bearer ${getLocalStorage('accessToken')}` : 'no-author',
                'Access-Control-Allow-Headers':
                    'Content-Type, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version, X-File-Name',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Origin': '*',
            },
        });
        return res;
    } catch (err) {
        return err;
    }
}

// Delete
async function deleteApi(url) {
    try {
        const res = await instance.delete(`/${url}`, {
            headers: {
                Authorization: getLocalStorage('accessToken') ? `Bearer ${getLocalStorage('accessToken')}` : 'no-author',
            },
        });
        return res;
    } catch (err) {
        return err;
    }
}

// PUT API AREA ============================>
async function putApi(url, payload) {
    try {
        const res = await instance.put(`/${url}`, payload, {
            headers: {
                Authorization: getLocalStorage('accessToken') ? `Bearer ${getLocalStorage('accessToken')}` : 'no-author',
            },
        });
        return res;
    } catch (err) {
        return err;
    }
}
function addParameter(url, params) {
    if (url) {
        Object.keys(params).forEach(function (key, index) {
            if (params[key]) {
                url = url.concat(`params[key]`);
            }
        });
    }
}

const ClientId = '747079402923-cb2bpqoaq9uahjk5vu91vtuhpv10n70a.apps.googleusercontent.com';

export {
    postApi,
    getApi,
    getApiV2,
    postApi2,
    putApi,
    deleteApi,
    setLocalStorage,
    getLocalStorage,
    clearLocalStorage,
    removeTokenFromLocalStorage,
    ClientId
};