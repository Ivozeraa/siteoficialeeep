import React, { useState, useEffect } from 'react';
import { auth, db } from '../../Services/firebase';
import { doc, getDoc } from "firebase/firestore"; 
import Header from '../../Components/Header';
import CookieConsent from '../../Components/Cookie'; 
import "../../Css/Header.css";

const HomeLogado = () => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      // Busca o nome do usuário do Firestore
      const getUserData = async () => {
        const docRef = doc(db, "users", user.uid); // Acessa o documento do usuário
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserName(docSnap.data().name); // Define o nome do usuário no estado
        } else {
          console.log("Nenhum documento encontrado para este usuário!");
        }
      };
      getUserData();
    }
  }, []);

  return (
    <>
      <Header />
      <div className="home">
        <h1>Bem-vindo ao Portal da Escola, {userName}!</h1> {/* Exibe o nome do usuário */}
        <p>Esta é a página inicial para usuários logados com as últimas atualizações e notícias da escola.</p>
        <button>Saiba mais</button>
      </div>
      <CookieConsent />
    </>
  );
};

export default HomeLogado;
