 import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";

 type LoginParams = {
  email: string;
  password: string;
};

 export const loginUser = async ({ email, password }: LoginParams) => {
    if (!email || !password) {
        return {
            success: false,
            message: "Please enter email and password.",
        };
    }
    try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", email));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            return {
                success: false,
                message: "User not found.",
            };
        }
        const user = querySnapshot.docs[0].data();

        if (user.password === password) {
            return {
                success: true,
                message: "Login successful.",
            }
        }
        else {
            return {
                success: false,
                message: "Incorrect password.",
            };
        }
    }
    catch (error) {
        console.error("Login error:", error);
        return {
            success: false,
            message: "An error occurred during login.",
        };
    }
};