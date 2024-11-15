import axios from 'axios';

import { API_URL } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = API_URL;
axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;
