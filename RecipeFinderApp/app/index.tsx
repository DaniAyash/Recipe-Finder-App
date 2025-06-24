import { useRouter } from "expo-router";
import React from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Simple Navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => router.push("/login")}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>

      {/* Welcome Text */}
      <Text style={styles.title}>Welcome to Recipe Finder</Text>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <Button title="Browse Recipes" onPress={() => router.push("/browse-recipes")} />
        <View style={{ marginVertical: 10 }} />
        <Button title="Add Recipe" onPress={() => router.push("/add-recipes")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 30,
  },
  loginText: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
  },
  buttonContainer: {
    alignItems: "center",
  },
});
