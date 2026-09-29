import { apiClient } from './client';

export async function login(email, password) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
        token: 'fake-token-123',
        user: {
            id: 1,
            email,
        },
    };
}

export async function getMe() {
    const response = await apiClient.get('/users/1');

    return response.data;
}