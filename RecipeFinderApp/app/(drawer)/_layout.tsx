import { Drawer } from "expo-router/drawer";

export default function DrawerLayout() {
  return (
    <Drawer>
      <Drawer.Screen name="index" options={{ title: "Home" }} />
      <Drawer.Screen name="login" options={{ title: "Login" }} />
      <Drawer.Screen name="browse-recipes" options={{ title: "Browse Recipes" }} />
    </Drawer>
  );
}