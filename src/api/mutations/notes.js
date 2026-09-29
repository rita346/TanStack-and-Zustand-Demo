import { useMutation, useQueryClient } from '@tanstack/react-query';
import {createNote, deleteNote, updateNote} from '../notes';

export function useCreateNote() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createNote,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['notes'],
            });
        },
    });
}

export function useDeleteNote() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteNote,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['notes'],
            });
        },
    });
}

export function useUpdateNote() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, note }) => updateNote(id, note),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['notes'],
            });
        },
    });
}