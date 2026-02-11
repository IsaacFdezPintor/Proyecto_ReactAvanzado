import axios from "axios"; //TODO Consumo de la API REST mediante Axios (es una librería de JavaScript que sirve para hacer peticiones HTTP desde tu aplicación (el cliente) hacia un servidor (la API) )
import { authStorage } from "../auth/authStorage";
import type { AuthSession } from "../types/Auth";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string | undefined;

export const http = axios.create( {baseURL: API_BASE_URL});

http.interceptors.request.use ((config) => {
    const session: AuthSession | null = authStorage.get();
    if (session?.token) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${session.token}`;
    }
    return config;
})

http.interceptors.response.use( (response) => response, (error) => {
    if (error.response.status === 401) {
        authStorage.clear();
        window.location.assign("/login")
    }
    return Promise.reject(error);
});