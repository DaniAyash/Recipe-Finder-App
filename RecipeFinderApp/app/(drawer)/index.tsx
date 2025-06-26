import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/browse-recipes")}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Browse Recipes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/add-recipes")}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Add Recipe</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: "#f5f0e6", // light brown
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 30,
  },
  loginText: {
    color: "#8b5e3c", // dark brown text
    fontSize: 16,
    fontWeight: "bold",
  },
  title: {
    fontSize: 32, // larger
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
    color: "#5c3a00", // darker brown title color
  },
  buttonContainer: {
    alignItems: "center",
    gap: 20, // spacing between buttons (if supported, else use margin)
  },
  button: {
    backgroundColor: "#8b5e3c", // dark brown
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginVertical: 10,
    minWidth: 200,
  },
  buttonText: {
    color: "#fff", // white text on buttons
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});
