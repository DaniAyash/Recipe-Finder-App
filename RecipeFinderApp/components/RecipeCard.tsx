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

      <Text style={styles.sectionTitle}>Ingredients</Text>
      <Text style={styles.content}>{ingredients}</Text>

      <Text style={styles.sectionTitle}>Preparation</Text>
      <Text style={styles.content}>{preparation}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    maxWidth: "48%", // so at most 2 per row
    margin: 6,
    padding: 14,
    borderRadius: 12,
    backgroundColor: "#fff8f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,

    // let height grow based on text (no stretch)
    flexGrow: 0,
    flexShrink: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4e342e",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: "#6d4c41",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#3e2723",
    marginTop: 8,
    marginBottom: 4,
  },
  content: {
    fontSize: 14,
    color: "#4e342e",
    lineHeight: 20,
  },
});
