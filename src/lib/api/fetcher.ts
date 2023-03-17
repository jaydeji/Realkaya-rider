import axios from 'axios';
import { handleError } from 'lib/handleError';
import { useAppStore } from 'store';

// axios.defaults.baseURL = 'http://172.20.10.3:4001';
// axios.defaults.baseURL = 'http://192.168.100.19:4001';

//application/xml

const _fetch = axios.create({
  // baseURL: 'https://realkaya-be-development.up.railway.app',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

_fetch.interceptors.request.use(
  function (config) {
    const token = useAppStore.getState().user?.token;
    if (token) {
      (config.headers as any).Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

_fetch.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    handleError(error);
    return Promise.reject(error);
  }
);

const _fetchImage = axios.create({
  headers: {
    // Accept: 'application/xml',
    'Content-Type': 'multipart/form-data',
  },
});

export { _fetch, _fetchImage };
