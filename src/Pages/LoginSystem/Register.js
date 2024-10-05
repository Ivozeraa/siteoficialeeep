import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, db } from '../../Services/firebase';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import './LoginRegister.css';
import Header from '../../Components/Header';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('Aluno');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if (role !== 'Aluno' && role !== 'Convidado') {
        setError('Somente alunos e convidados podem se registrar.');
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email,
        role: role,
      });

      // Salvando no localStorage
      localStorage.setItem('userName', name);

      alert(`Registrado como ${role}`);
      navigate('/login'); // Redireciona para a página de login após registro bem-sucedido
    } catch (error) {
      console.error("Erro ao registrar:", error.message);
      setError('Erro ao registrar. Tente novamente.');
    }
  };

  const handleGoogleRegister = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name: user.displayName || "Usuário Google",
        email: user.email,
        role: 'Aluno',
      });

      // Salvando no localStorage
      localStorage.setItem('userName', user.displayName || "Usuário Google");

      alert('Registrado com Google!');
      navigate('/login'); // Redireciona para a página de login após registro bem-sucedido
    } catch (error) {
      setError('Erro ao registrar com Google.');
    }
  };

  return (
    <>
      <Header />
      <div className="login-container">
        <h2>Registrar</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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

          <div className="role-select">
            <label>
              <input
                type="radio"
                value="Aluno"
                checked={role === 'Aluno'}
                onChange={() => setRole('Aluno')}
              />
              Aluno
            </label>
            <label>
              <input
                type="radio"
                value="Convidado"
                checked={role === 'Convidado'}
                onChange={() => setRole('Convidado')}
              />
              Convidado
            </label>
          </div>

          <button type="submit">Registrar</button>
        </form>
        <button className="google-login" onClick={handleGoogleRegister}>
          Registrar com Google
        </button>
      </div>
    </>
  );
};

export default Register;
