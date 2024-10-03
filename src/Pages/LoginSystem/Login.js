import React, { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from './firebase';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Ícones de olho
import './LoginRegister.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Estado para alternar visualização de senha
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Login bem-sucedido!');
    } catch (error) {
      setError('Erro ao fazer login. Verifique suas credenciais.');
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      alert('Login com Google bem-sucedido!');
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
            type={showPassword ? 'text' : 'password'} // Alterna entre password e text
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)} // Alterna o estado de visualização da senha
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Ícone que alterna */}
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
