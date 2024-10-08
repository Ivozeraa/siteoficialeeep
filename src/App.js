// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import HomeLogado from './Pages/LoginSystem/Home';
import Login from './Pages/LoginSystem/Login';
import Registro from './Pages/LoginSystem/Register';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import ProtectedRoute from './Services/ProtectedRoute';
import Blog from './Components/Blog';
import Post from './Pages/Post'; // Importe o componente Post

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<HomeLogado />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route 
          path="/admin-dashboard" 
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        <Route path="/blog" element={<Blog />} />
        <Route path="/post/:id" element={<Post />} /> {/* Rota para postagens individuais */}
      </Routes>
    </Router>
  );
}

export default App;
