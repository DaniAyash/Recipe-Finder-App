import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Button, Platform, StyleSheet, Text, TextInput, View } from "react-native";
import { registerUser } from "../../services/auth";

export default function RegisterScreen() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [age, setAge] = useState("");
    const [error, setError] = useState("");

    const showAlert = (title: string, message: string, onOk?: () => void) => {
        if (Platform.OS === "web") {
        window.alert(`${title}\n\n${message}`);
        if (onOk) onOk();
        } else {
        Alert.alert(title, message, [{ text: "OK", onPress: onOk }]);
        }
    };

    const handleRegister = async () => {
        const result = await registerUser({
            email,
            username,
            password,
            confirmPassword,
            age: age ? parseInt(age) : undefined,
        });

        if (result.success) {
            showAlert("Success", result.message || "Registration successful.", () => {
                router.replace("/login");
            });
        } else {
            setError(result.message || "Registration failed.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register for Recipe Finder</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="Age (optional)"
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
            />

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <Button title="Register" onPress={handleRegister} color="#8d6e63" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20 },
    title: { fontSize: 20, fontWeight: "bold", marginBottom: 16 },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        marginVertical: 8,
        borderRadius: 5,
    },
    errorText: { color: "red", marginTop: 8 },
    successText: { color: "green", marginTop: 8 },
});
