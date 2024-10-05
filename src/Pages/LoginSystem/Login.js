import React, { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, db } from '../../Services/firebase'; // Adicionando db
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore'; // Para buscar o nome do usuário no Firestore
import './LoginRegister.css';
import Header from '../../Components/Header';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook para redirecionar

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Buscando nome do usuário no Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      const userName = userDoc.data().name;
      
      // Salvando no localStorage
      localStorage.setItem('userName', userName);

      alert('Login bem-sucedido!');
      navigate('/Home'); // Redireciona para HomeLogado
    } catch (error) {
      setError('Erro ao fazer login. Verifique suas credenciais.');
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      
      // Buscando nome do usuário no Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      const userName = userDoc.exists() ? userDoc.data().name : user.displayName;

      // Salvando no localStorage
      localStorage.setItem('userName', userName);

      alert('Login com Google bem-sucedido!');
      navigate('/Home'); // Redireciona para HomeLogado
    } catch (error) {
      setError('Erro ao fazer login com Google.');
    }
  };

  return (
    <>
      <Header />
      <div className="login-container">
        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          <div className="password-container">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          
          <button type="submit">Entrar</button>
        </form>
        <button className="google-login" onClick={handleGoogleLogin}>
          Entrar com Google
        </button>
        <div className="register-link">
          <span>Não tem conta? <a href="/registro">Registre-se</a></span>
        </div>
      </div>
    </>
  );
};

export default Login;
