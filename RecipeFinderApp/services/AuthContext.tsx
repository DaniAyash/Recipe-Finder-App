import { useRouter } from "expo-router";
import { doc, updateDoc } from "firebase/firestore";
import React, { createContext, ReactNode, useContext, useState } from "react";
import { db } from "./firebase";

type User = {
  id: string;
  email: string;
  username?: string;
  age?: number;
  connected?: boolean;
  // add any other fields you get from backend
};

type AuthContextType = {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const router = useRouter();

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    setUser(userData);
    // optionally save to AsyncStorage if you want persistence
  };

  const logout = () => {
    if (user && user.id) {
      const userDocRef = doc(db, "users", user.id);
      updateDoc(userDocRef, { connected: false });
    }
    setUser(null);
    router.replace("/");
    // optionally remove from AsyncStorage
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
