import { useQuery } from '@tanstack/react-query';
import { getNotes } from '../notes';

export function useNotes() {
    return useQuery({
        queryKey: ['notes'],
        queryFn: getNotes,
    });
}