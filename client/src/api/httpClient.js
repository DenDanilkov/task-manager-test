import axios from 'axios';

let authHeader;
export function setToken(token, userId) {
  authHeader = {
    Authorization: `Bearer ${token}`,
    UserName: userId,
  };
  return authHeader;
}

const httpClient = (baseURL) => {
  return {
    get: async (path, params) => {
      const res = await axios.get(`${baseURL}${path}`, {
        params,
        headers: authHeader,
      });
      return res.data;
    },

    post: async (path, params = {}) => {
      const res = await axios.post(`${baseURL}${path}`, params, {
        headers: authHeader,
      });
      return res;
    },
    postImage: async (path, params = {}) => {
      const res = await axios.post(`${baseURL}${path}`, params, {
        headers: {
          ...authHeader,
          'Content-Type': 'multipart/form-data; boundary=something',
        },
      });
      return res;
    },

    put: async (path, params = {}) => {
      const res = await axios.put(`${baseURL}${path}`, params, {
        headers: authHeader,
      });
      return res.data;
    },
    delete: async (path, params = {}) => {
      const res = await axios.delete(`${baseURL}${path}`, {
        headers: authHeader,
        data: params,
      });
      return res.data;
    },
  };
};

export default httpClient;
