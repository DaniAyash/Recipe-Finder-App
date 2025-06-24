import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase"; // adjust path if needed

export const fetchRecipes = async () => {
  const snapshot = await getDocs(collection(db, "recipes"));
  const recipes = snapshot.docs.map((doc) => ({
    id: doc.id,
    name: doc.data().Name,
    description: doc.data().Description,
    ingredients: doc.data().Ingredients,
    preparation: doc.data().Preparation,
  }));

  console.log("Fetched recipes from Firestore:", recipes); // <--- debug print here

  return recipes;
};
