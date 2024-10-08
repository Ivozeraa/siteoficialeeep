// src/Services/AuthService.js
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

export const getCurrentUserRole = async () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // Supondo que o campo `role` esteja definido no Firestore
        const userRole = user.role; // Precisamos obter esse papel do Firestore
        resolve(userRole);
      } else {
        reject("No user logged in");
      }
    });
  });
};
