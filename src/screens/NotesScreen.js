import { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

import { useMe } from '../api/queries/auth';
import { useNotes } from '../api/queries/notes';
import {useCreateNote, useDeleteNote, useUpdateNote} from '../api/mutations/notes';
import { useAuthStore } from '../stores/useAuthStore';

export default function NotesScreen() {
    const [title, setTitle] = useState('');
    const [editingNotes, setEditingNotes] = useState({});

    const logout = useAuthStore((state) => state.logout);

    const {
        data: user,
        isPending: isUserLoading,
        isError: isUserError,
    } = useMe();

    const {
        data: notes,
        isPending: isNotesLoading,
    } = useNotes();

    const createNoteMutation = useCreateNote();
    const deleteNoteMutation = useDeleteNote();
    const updateNoteMutation = useUpdateNote();

    function handleAddNote() {
        if (!title.trim()) {
            return;
        }

        createNoteMutation.mutate({
            title,
            body: '',
        });

        setTitle('');
    }

    function handleUpdateNote(id, title) {
        if (!title.trim()) {
            return;
        }

        updateNoteMutation.mutate({
            id,
            note: {
                title: title.trim(),
                body: '',
            },
        });
    }

    function handleEditNote(id, text) {
        setEditingNotes((current) => ({
            ...current,
            [id]: text,
        }));
    }

    if (isUserLoading || isNotesLoading) {
        return <Text>Loading...</Text>;
    }

    if (isUserError) {
        logout();

        return <Text>Session expired...</Text>;
    }

    return (
        <View>
            <Text>My Notes</Text>

            <Text style={{padding:10}}>Logged in as: {user.email}</Text>

            <TextInput
                placeholder="Write a note..."
                value={title}
                onChangeText={setTitle}
            />

            <Button
                title={
                    createNoteMutation.isPending
                        ? 'Adding...'
                        : 'Add Note'
                }
                onPress={handleAddNote}
                disabled={createNoteMutation.isPending}
            />

            {notes.map((note) => (
                <View key={note.id}>
                    <TextInput
                        value={
                            editingNotes[note.id] !== undefined
                                ? editingNotes[note.id]
                                : note.title
                        }
                        onChangeText={(text) =>
                            handleEditNote(note.id, text)
                        }
                    />

                    <Button
                        title="Update"
                        onPress={() =>
                            handleUpdateNote(
                                note.id,
                                editingNotes[note.id] ?? note.title
                            )
                        }
                        disabled={updateNoteMutation.isPending}
                    />

                    <Button
                        title="Delete"
                        onPress={() =>
                            deleteNoteMutation.mutate(note.id)
                        }
                        disabled={deleteNoteMutation.isPending}
                    />
                </View>
            ))}


            <Button
                title="Logout"
                onPress={logout}
            />
        </View>
    );
}