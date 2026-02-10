import axios, { isAxiosError } from "axios";
import type { AuthResponse } from "../types/Auth";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string | undefined;

export const AuthService = {
    login(email:string, password:string) {
        return axios.post<AuthResponse>(`${API_BASE_URL}/auth/login`, {email, password} ).then( (r) => r.data);
    },

    me(token: string) {
        return axios.get(`${API_BASE_URL}/auth/me`, { headers: {Authorization: `Bearer ${token}`} } ).then((r) => r.data)
    },
    register(email:string, password:string, name: string) {
        return axios.post<AuthResponse>(`${API_BASE_URL}/auth/register`, {email, password, name} ).then( (r) => r.data);
    },

    isAuthError: isAxiosError

}