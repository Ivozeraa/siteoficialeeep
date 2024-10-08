import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { auth, db } from '../Services/firebase'; // Importa a autenticação e o banco de dados do Firebase
import { doc, getDoc } from "firebase/firestore"; 
import '../Css/Header.css';

const Header = () => {
  const [user, setUser] = useState(null); // Estado para o usuário logado
  const [isAdmin, setIsAdmin] = useState(false); // Estado para verificar se o usuário é admin
  const [sobreDropdownVisible, setSobreDropdownVisible] = useState(false); // Estado para o dropdown de "Sobre"
  const [settingsDropdownVisible, setSettingsDropdownVisible] = useState(false); // Estado para o dropdown de configurações
  const [menuOpen, setMenuOpen] = useState(false); // Estado para o menu mobile
  const navigate = useNavigate();

  const toggleSobreDropdown = () => {
    setSobreDropdownVisible(!sobreDropdownVisible);
    setSettingsDropdownVisible(false); // Fecha o outro dropdown se estiver aberto
  };

  const toggleSettingsDropdown = () => {
    setSettingsDropdownVisible(!settingsDropdownVisible);
    setSobreDropdownVisible(false); // Fecha o outro dropdown se estiver aberto
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Alterna o estado do menu mobile
  };

  const handleLogout = () => {
    auth.signOut();
    setUser(null); // Limpa o usuário ao deslogar
    navigate('/'); // Redireciona para a página inicial
  };

  // Verifica o estado de autenticação e se o usuário é admin
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user); // Define o usuário logado
        
        // Verifica se o usuário é admin no Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setIsAdmin(userDoc.data().role === 'admin'); // Verifica a role do usuário
        }
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

      <nav className={`navbar ${menuOpen ? 'show' : ''}`}>
        <ul>
          <li><Link to="/">Inicío</Link></li>
          <li><Link to="/cursos">Cursos</Link></li>
          <li><Link to="/blog">Notícias</Link></li>
          <li className="dropdown">
            <Link to="#" onClick={toggleSobreDropdown}>Sobre</Link>
            {sobreDropdownVisible && (
              <div className="dropdown-content">
                <Link to="/sobre/historia">História</Link>
                <Link to="/sobre/gestao">Gestão</Link>
                <Link to="/contato">Contato</Link>
              </div>
            )}
          </li>
          {user ? (
            <li className="user-settings">
              <FaUserCircle size={40} className="user-icon" onClick={toggleSettingsDropdown} />
              {settingsDropdownVisible && (
                <ul className="settings-dropdown">
                  <li><Link to="/configuracoes">Configurações</Link></li>
                  {isAdmin && <li><Link to="/admin-dashboard">Admin Dashboard</Link></li>} {/* Link visível apenas para admins */}
                  <li><button onClick={handleLogout}>Deslogar</button></li>
                </ul>
              )}
            </li>
          ) : (
            <li><Link to="/login">Logar</Link></li>
          )}
        </ul>
      </nav>

      {/* Menu toggle (hambúrguer) */}
      <div className={`menu-toggle ${menuOpen ? 'change' : ''}`} onClick={toggleMenu}>
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
      </div>
    </header>
  );
};

export default Header;
