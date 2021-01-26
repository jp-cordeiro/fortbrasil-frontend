import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.request.use(
  async (config) => {
    const token = sessionStorage.getItem('token');

    config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.request.use(
  (reponse) => reponse,
  (error) => {
    if (
      error.reponse.status === 401 &&
      error.reponse.config.url !== '/sessions'
    ) {
      const requestConfig = error.config;
      window.location = '/';
      return axios(requestConfig);
    }
    return Promise.reject(error);
  }
);

export default api;
