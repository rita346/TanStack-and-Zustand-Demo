import { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

import { useLogin } from '../api/mutations/auth';
import { useAuthStore } from '../stores/useAuthStore';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const setToken = useAuthStore((state) => state.setToken);
    const loginMutation = useLogin();

    function handleLogin() {
        loginMutation.mutate(
            {
                email,
                password,
            },
            {
                onSuccess: async (response) => {
                    await setToken(response.token);

                    console.log('Logged in:', response);
                },
            }
        );
    }

    return (
        <View>
            <Text>Login</Text>

            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <Button
                title={loginMutation.isPending ? 'Logging in...' : 'Login'}
                onPress={handleLogin}
                disabled={loginMutation.isPending}
            />
        </View>
    );
}