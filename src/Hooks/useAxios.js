import axios from 'axios';
import {useAuth} from "./AuthProvider";
import {useEffect, useMemo} from "react";

const useAxios = () => {
    const { token } = useAuth();
    const serverAddress = process.env.REACT_APP_SERVER_ADDRESS;

    const axiosInstance = useMemo(() => {
        const instance = axios.create({
            baseURL: serverAddress + '/api',
        });

        instance.interceptors.request.use(
            (config) => {
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        /*instance.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;

                // If the error status is 401 and there is no originalRequest._retry flag,
                // it means the token has expired, and we need to refresh it
                if (error.response && error.response.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;

                    try {
                        const refreshToken = localStorage.getItem('refreshToken');
                        const response = await axios.post('/api/refresh-token', { refreshToken });
                        token.updateToken(response.data);

                        // Retry the original request with the new token
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return axios(originalRequest);
                    } catch (error) {
                        // Handle refresh token error or redirect to login
                    }
                }

                return Promise.reject(error);
            }
        );*/

        return instance;
    }, [token]);

    return axiosInstance;
};

export default useAxios;