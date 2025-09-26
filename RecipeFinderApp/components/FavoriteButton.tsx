import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type FavoriteButtonProps = {
  username?: string;
};

export default function FavoriteButton({ username }: FavoriteButtonProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push("/favorite-recipes"); // navigate to favorite recipes screen
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress} activeOpacity={0.8}>
      <Text style={styles.buttonText}>{username}'s Favorite Recipes</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#8b5e3c",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginVertical: 10,
    minWidth: 200,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});
