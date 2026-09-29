import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import {useAuthStore} from "../stores/useAuthStore";

export const apiClient = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(async (config) => {
    const token = await SecureStore.getItemAsync('auth_token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (error.response?.status === 401) {
            await useAuthStore.getState().logout();
        }

        return Promise.reject(error);
    });