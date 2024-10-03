import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa'; // Ícone para o perfil
import '../Css/Header.css';

const Header = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = () => {
    // Função para deslogar o usuário
    console.log('Deslogar');
  };

  return (
    <header className="main-header">
      <div className="logo-container">
        <img src="https://eeep-irma-ana-zelia.netlify.app/img/logo-da-empresa.png" alt="Logo" className="logo" />
        <h1 className="school-name">EEEP</h1>
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
          <li className="user-settings">
            <FaUserCircle size={40} className="user-icon" onClick={toggleDropdown} />
            {dropdownVisible && (
              <ul className="settings-dropdown">
                <li><Link to="/configuracoes">Configurações</Link></li>
                <li><button onClick={handleLogout}>Deslogar</button></li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
