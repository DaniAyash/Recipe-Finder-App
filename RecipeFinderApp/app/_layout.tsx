import { Stack } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function RootLayout() {
  return (
    <View style={styles.container}>
      <Stack />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f0e6", // your light brown background
    paddingTop: 20,
    paddingHorizontal: 30,
  },
});
