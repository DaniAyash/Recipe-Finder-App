import React from "react";
import { StyleSheet, Text, View } from "react-native";

type RecipeCardProps = {
  name: string;
  description: string;
  ingredients: string;
  preparation: string;
};

export default function RecipeCard({
  name,
  description,
  ingredients,
  preparation,
}: RecipeCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.subtitle}>{description}</Text>

      <Text style={styles.sectionTitle}>Ingredients:</Text>
      <Text style={styles.content}>{ingredients}</Text>

      <Text style={styles.sectionTitle}>Preparation:</Text>
      <Text style={styles.content}>{preparation}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 2,
  },
  content: {
    fontSize: 14,
    color: "#333",
  },
});
