
import axios from 'axios';
export const axiosClient = axios.create({
	baseURL: import.meta.env.VITE_SERVER_ADDRESS,
	withCredentials: true,
});
export default axiosClient;
