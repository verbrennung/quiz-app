import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";

type CreateUserType = {
  email: string;
  password: string;
  name: string;
  avatar?: string;
};

export const createUser = async (data: CreateUserType) => {
  try {
    const { email, password, name } = data;
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const userDB = doc(db, "users", user.uid);
    await setDoc(userDB, {
      name,
      email,
      point: 0,
      createtAt: serverTimestamp(),
    });

    return Promise.resolve(user);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getMe = async (uid: string) => {
  try {
    const docRef = doc(db, "users", uid);
    const user = await getDoc(docRef);
    return Promise.resolve(user.data());
  } catch (error) {
    return Promise.reject(error);
  }
};
