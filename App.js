import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from './src/api/queryClient';
import { useAuthStore } from './src/stores/useAuthStore';

import LoginScreen from './src/screens/LoginScreen';
import NotesScreen from './src/screens/NotesScreen';

export default function App() {
    const token = useAuthStore((state) => state.token);
    const isLoading = useAuthStore((state) => state.isLoading);
    const loadToken = useAuthStore((state) => state.loadToken);

    useEffect(() => {
        loadToken();
    }, []);

    if (isLoading) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <QueryClientProvider client={queryClient}>
            <View style={styles.container}>
                {token ? <NotesScreen /> : <LoginScreen />}
            </View>
        </QueryClientProvider>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})