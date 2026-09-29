import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import { queryClient } from '../api/queryClient';

export const useAuthStore = create((set) => ({
    token: null,
    isLoading: true,

    setToken: async (token) => {
        await SecureStore.setItemAsync('auth_token', token);

        set({
            token,
            isLoading: false,
        });
    },

    loadToken: async () => {
        const token = await SecureStore.getItemAsync('auth_token');

        set({
            token,
            isLoading: false,
        });
    },

    logout: async () => {
        await SecureStore.deleteItemAsync('auth_token');

        queryClient.clear();

        set({
            token: null,
            isLoading: false,
        });
    },
}));