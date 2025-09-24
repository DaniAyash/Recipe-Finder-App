import { addDoc, collection, getDocs, query, updateDoc, where } from "firebase/firestore";
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

        if (user.connected) {
          return {
            success: false,
            message: "This user is already connected!",
          };
        }

        if (user.password === password) {
          
          const userDocRef = querySnapshot.docs[0].ref;
          await updateDoc(userDocRef, { connected: true });

            return {
                success: true,
                message: "Login successful.",
                data: { id: querySnapshot.docs[0].id, email: user.email, username: user.username, age: user.age, connected: true }
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
    return { success: false, message: "Please fill in all required fields." };
  }
  if (password !== confirmPassword) {
    return { success: false, message: "Passwords do not match." };
  }
  if (age !== undefined && (age < 13 || age > 120)) {
    return { success: false, message: "Please enter a valid age between 13 and 120." };
  }

  try {
    const usersRef = collection(db, "users");

    // check username
    const usernameSnapshot = await getDocs(query(usersRef, where("username", "==", username)));
    if (!usernameSnapshot.empty) {
      return { success: false, message: "Username already taken." };
    }

    // check email
    const emailSnapshot = await getDocs(query(usersRef, where("email", "==", email)));
    if (!emailSnapshot.empty) {
      return { success: false, message: "Email already registered." };
    }

    // add user
    const newUser = await addDoc(usersRef, {
      email,
      username,
      password,
      age: age || null,
      createdAt: new Date(),
      connected: false,
    });

    return {
      success: true,
      data: { id: newUser.id, email, username, age: age || null },
    };
  } catch (err: any) {
    console.error("Register error:", err);
    return { success: false, message: "An error occurred during registration." };
  }
};

