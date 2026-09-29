import AsyncStorage from '@react-native-async-storage/async-storage';

const NOTES_KEY = 'notes';

export async function getNotes() {
    const storedNotes = await AsyncStorage.getItem(NOTES_KEY);

    if (!storedNotes) {
        return [];
    }

    return JSON.parse(storedNotes);
}

export async function createNote(note) {
    const existingNotes = await getNotes();

    const newNote = {
        id: Date.now(),
        ...note,
    };

    const updatedNotes = [newNote, ...existingNotes];

    await AsyncStorage.setItem(
        NOTES_KEY,
        JSON.stringify(updatedNotes)
    );

    return newNote;
}

export async function deleteNote(id) {
    const existingNotes = await getNotes();

    const updatedNotes = existingNotes.filter(
        (note) => note.id !== id
    );

    await AsyncStorage.setItem(
        NOTES_KEY,
        JSON.stringify(updatedNotes)
    );
}

export async function updateNote(id,note) {
    const existingNotes = await getNotes();

    const updatedNotes = existingNotes.map((existingNote) => {
        if (existingNote.id === id) {
            return {
                ...existingNote,
                ...note,
            };
        }

        return existingNote;
    });

    await AsyncStorage.setItem(
        NOTES_KEY,
        JSON.stringify(updatedNotes)
    );
}