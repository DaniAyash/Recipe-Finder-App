import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import RecipeCard from "../../../components/RecipeCard";
import { fetchRecipes } from "../../../services/recipes";

export default function BrowseRecipes() {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const data = await fetchRecipes();
        console.log("Fetched recipes in BrowseRecipes:", data);
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
        <RecipeCard
          key={recipe.id}
          name={recipe.name}
          description={recipe.description}
          ingredients={recipe.ingredients}
          preparation={recipe.preparation}
        />
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
});
