import { useMutation } from '@tanstack/react-query';
import { login } from '../auth';

export function useLogin() {
    return useMutation({
        mutationFn: ({ email, password }) => login(email, password),
    });
}