import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from './firebase';
import './LoginRegister.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Aluno');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if (role !== 'Aluno' && role !== 'Convidado') {
        setError('Somente alunos e convidados podem se registrar.');
        return;
      }
      await createUserWithEmailAndPassword(auth, email, password);
      alert(`Registrado como ${role}`);
    } catch (error) {
      setError('Erro ao registrar. Tente novamente.');
    }
  };

  const handleGoogleRegister = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      alert('Registrado com Google!');
    } catch (error) {
      setError('Erro ao registrar com Google.');
    }
  };

  return (
    <div className="login-container">
      <h2>Registrar</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

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
  );
};

export default Register;
