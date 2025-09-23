import { useRouter } from "expo-router";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { registerUser } from "../../services/auth";

export default function RegisterScreen() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [age, setAge] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleRegister = async () => {
        try {
            const user = await registerUser({
                email,
                username,
                password,
                confirmPassword,
                age: age ? parseInt(age) : undefined,
            });
            setSuccessMessage("Registration successful! You can now log in.");
            setError(""); // clear error if success
        } catch (err: any) {
            setError(err.message || "Registration failed.");
            setSuccessMessage(""); // clear success if error
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
            {successMessage ? <Text style={styles.successText}>{successMessage}</Text> : null}

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
