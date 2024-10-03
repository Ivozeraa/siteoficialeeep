import React from 'react';
import { Link } from 'react-router-dom';
import '../Css/Header.css';

const Header = () => {
  return (
    <header className="main-header">
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
        </ul>
        <div className="user-settings">
        </div>
      </nav>
    </header>
  );
};

export default Header;
