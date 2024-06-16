import axios from 'axios';
import {useAuth} from "./AuthProvider";
import {useMemo} from "react";

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
        return instance;
    }, [token]);
    return axiosInstance;
};
export default useAxios;

