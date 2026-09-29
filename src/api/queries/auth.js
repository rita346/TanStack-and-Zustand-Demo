import { useQuery } from '@tanstack/react-query';
import { getMe } from '../auth';
import { useAuthStore } from '../../stores/useAuthStore';

export function useMe() {
    const token = useAuthStore((state) => state.token);

    return useQuery({
        queryKey: ['me'],
        queryFn: getMe,
        enabled: !!token,
    });
}