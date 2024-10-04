import React, { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../Services/firebase';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './LoginRegister.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook para redirecionar

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Login bem-sucedido!');
      navigate('/Home'); // Redireciona para HomeLogado
    } catch (error) {
      setError('Erro ao fazer login. Verifique suas credenciais.');
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      alert('Login com Google bem-sucedido!');
      navigate('./Logado/Pages/Home'); // Redireciona para HomeLogado
    } catch (error) {
      setError('Erro ao fazer login com Google.');
    }
  };

  return (
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
  );
};

export default Login;
