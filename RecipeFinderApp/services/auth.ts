import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";

type LoginParams = {
  email: string;
  password: string;
};

type RegisterParams = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  age?: number;
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


export const registerUser = async ({ email, username, password, confirmPassword, age }: RegisterParams) => {
    if (!email || !username || !password || !confirmPassword) {
        throw new Error("Please fill in all required fields.");
    }
    if(password !== confirmPassword) {
        throw new Error("Passwords do not match."); 
    }
    if(age !== undefined && (age < 13 || age > 120)) {
        throw new Error("Please enter a valid age between 13 and 120.");
    }

    const usersRef = collection(db, "users");
    const usernameQuery = query(usersRef, where("username", "==", username));
    const emailQuery = query(usersRef, where("email", "==", email));

    const usernameSnapshot = await getDocs(usernameQuery);
    if (!usernameSnapshot.empty) {
        throw new Error("Username already taken.");
    }

    const emailSnapshot = await getDocs(emailQuery);
    if (!emailSnapshot.empty) {
        throw new Error("Email already registered.");
    }

    const newUser = await addDoc(usersRef, {
        email,
        username,
        password,
        age: age || null,
        createdAt: new Date(),
    });

    return { id: newUser.id, email, username, age: age || null};
};
