// src/Services/ProtectedRoute.js
import React, { useEffect, useState } from 'react';
import { auth, db } from './firebase'; // FirebaseConfig.js é o arquivo de configuração do Firebase
import { doc, getDoc } from 'firebase/firestore';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserRole = async () => {
      const user = auth.currentUser; // Verifica o usuário autenticado
      if (user) {
        try {
          const docRef = doc(db, "users", user.uid); // Busca o documento do usuário no Firestore
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setUserRole(docSnap.data().role); // Obtém o papel (role) do usuário do documento Firestore
          } else {
            console.log("Documento do usuário não encontrado.");
          }
        } catch (error) {
          console.error("Erro ao buscar o documento do usuário:", error);
        }
      }
      setLoading(false);
    };

    checkUserRole();
  }, []);

  if (loading) {
    return <p>Carregando...</p>; // Mostra uma mensagem de carregamento enquanto verifica o papel
  }

  // Verifica se o usuário está logado e se o papel corresponde ao necessário
  if (!auth.currentUser || userRole !== requiredRole) {
    return <Navigate to="/login" />; // Redireciona para o login se o papel não for válido
  }

  return children; // Renderiza o conteúdo protegido se o usuário tiver o papel correto
};

export default ProtectedRoute;
