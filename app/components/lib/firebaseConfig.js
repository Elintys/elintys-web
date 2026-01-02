import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAR8Pl-eRAxg1CJ2svjPdF40idltJ-W66I",
  authDomain: "elintys-60cf8.firebaseapp.com",
  projectId: "elintys-60cf8",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
