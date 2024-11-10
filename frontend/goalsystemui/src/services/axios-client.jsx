import axios from 'axios';
import authService from './auth';

const token = authService.getToken();

const instance = axios.create({
  // baseURL: 'https://siatynaigoalsystem.azurewebsites.net/',
  baseURL: 'https://localhost:7088/api/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
});

instance.interceptors.request.use(
  async (config) => {
    const token = await authService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {

    console.log("ar mes cia ateinam?")
    if (error.response && error.response.status === 401) {
      await handleSessionExpired(error.response);
      console.log("handle session ex?")
    }
    return Promise.reject(error);
  }
);

const handleSessionExpired = async (response) => {
  authService.renewToken();
};

export default instance;