import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { fetchRecipes } from "../../services/recipes";

export default function BrowseRecipes() {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const data = await fetchRecipes();
        console.log("Fetched recipes in BrowseRecipes:", data); // debug log
        setRecipes(data);
      } catch (err) {
        console.error("Error fetching recipes:", err);
        setError("Failed to load recipes.");
      }
    };

    loadRecipes();
  }, []);

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "red", textAlign: "center" }}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {recipes.map((recipe) => (
        <View key={recipe.id} style={styles.recipeCard}>
          <Text style={styles.title}>{recipe.name}</Text>
          <Text style={styles.subtitle}>{recipe.description}</Text>

          <Text style={styles.sectionTitle}>Ingredients:</Text>
          <Text style={styles.content}>{recipe.ingredients}</Text>

          <Text style={styles.sectionTitle}>Preparation:</Text>
          <Text style={styles.content}>{recipe.preparation}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    flex: 1,
  },
  recipeCard: {
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
