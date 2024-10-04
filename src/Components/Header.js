import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { auth } from '../Services/firebase'; // Importa a autenticação do Firebase
import '../Css/Header.css';

const Header = () => {
  const [user, setUser] = useState(null); // Estado para o usuário logado
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = () => {
    auth.signOut();
    setUser(null); // Limpa o usuário ao deslogar
    navigate('/'); // Redireciona para a página inicial
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user); // Define o usuário se estiver logado
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <header className="main-header">
      <div className="logo-container">
        <img src="https://eeep-irma-ana-zelia.netlify.app/img/logo-da-empresa.png" alt="Logo" className="logo" />
        <h1 className="school-name">EEEP Irmã Ana Zélia</h1>
      </div>

      <nav className="navbar">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/cursos">Cursos</Link></li>
          <li><Link to="/noticias">Notícias</Link></li>
          <li className="dropdown">
            <span>Sobre</span>
            <div className="dropdown-content">
              <Link to="/sobre/historia">História</Link>
              <Link to="/sobre/gestao">Gestão</Link>
              <Link to="/contato">Contato</Link>
            </div>
          </li>
          {user ? (
            <li className="user-settings">
              <FaUserCircle size={40} className="user-icon" onClick={toggleDropdown} />
              {dropdownVisible && (
                <ul className="settings-dropdown">
                  <li><Link to="/configuracoes">Configurações</Link></li>
                  <li><button onClick={handleLogout}>Deslogar</button></li>
                </ul>
              )}
            </li>
          ) : (
            <li><Link to="/login">Logar</Link></li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
