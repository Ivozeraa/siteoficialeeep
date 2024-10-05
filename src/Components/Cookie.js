// Components/CookieConsent.js
import React, { useState, useEffect } from 'react';
import '../Css/Cookie.css'; // Crie o estilo do popup de cookies

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Verifica se o usuário já aceitou os cookies
    const acceptedCookies = localStorage.getItem('cookiesAccepted');
    if (!acceptedCookies) {
      setIsVisible(true); // Mostra o popup se ainda não foi aceito
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookiesAccepted', true); // Salva no localStorage que o usuário aceitou
    setIsVisible(false); // Esconde o popup
  };

  return (
    isVisible && (
      <div className="cookie-consent">
        <p>Este site utiliza cookies para garantir que você tenha a melhor experiência.</p>
        <button onClick={handleAccept}>Aceitar</button>
      </div>
    )
  );
};

export default CookieConsent;
