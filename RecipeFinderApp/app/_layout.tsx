import { Slot, useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AuthProvider, useAuth } from "../services/AuthContext";

function LayoutContent() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace("/"); // go back to login or welcome
  };

  return (
    <View style={styles.container}>
      {/* Top bar with logout button (only if logged in) */}
      {user?.connected && (
        <View style={styles.topBar}>
          <Text>Hello, {user.username} </Text>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Current screen */}
      <Slot />
    </View>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <LayoutContent />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f0e6",
    paddingTop: 20,
    paddingHorizontal: 30,
  },
  topBar: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 10,
  },
  logoutButton: {
    backgroundColor: "#8d6e63",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
