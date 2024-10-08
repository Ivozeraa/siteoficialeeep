// src/Pages/Admin/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import { db } from '../../Services/firebase';
import { collection, getDocs, deleteDoc, doc, addDoc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Importa Firebase Storage
import '../../Css/AdminDashboard.css';

function AdminDashboard() {
  const [posts, setPosts] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostAuthor, setNewPostAuthor] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostImage, setNewPostImage] = useState(null);
  const [editingPostId, setEditingPostId] = useState(null);
  const [users, setUsers] = useState([]);
  const [newUserName, setNewUserName] = useState('');
  const [newUserRole, setNewUserRole] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsCollection = collection(db, "posts");
        const postsSnapshot = await getDocs(postsCollection);
        const postsList = postsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPosts(postsList);
      } catch (error) {
        console.error("Erro ao buscar postagens:", error);
      }
    };

    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, "users");
        const usersSnapshot = await getDocs(usersCollection);
        const usersList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsers(usersList);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };

    fetchPosts();
    fetchUsers();
  }, []);

  const handleDeletePost = async (id) => {
    try {
      await deleteDoc(doc(db, "posts", id));
      setPosts(posts.filter(post => post.id !== id));
    } catch (error) {
      console.error("Erro ao excluir postagem:", error);
    }
  };

  const handleAddPost = async () => {
    try {
      let imageUrl = '';
      
      if (newPostImage) {
        const storage = getStorage();
        const imageRef = ref(storage, `images/${newPostImage.name}`);
        await uploadBytes(imageRef, newPostImage);
        imageUrl = await getDownloadURL(imageRef);
      }

      const newPost = {
        title: newPostTitle,
        author: newPostAuthor,
        content: newPostContent,
        date: new Date(),
        image: imageUrl,
      };

      if (editingPostId) {
        await updateDoc(doc(db, "posts", editingPostId), newPost);
        setPosts(posts.map(post => (post.id === editingPostId ? { ...post, ...newPost } : post)));
        setEditingPostId(null);
      } else {
        await addDoc(collection(db, "posts"), newPost);
        setPosts([...posts, newPost]);
      }

      setNewPostTitle('');
      setNewPostAuthor('');
      setNewPostContent('');
      setNewPostImage(null);
      setSelectedOption('');
    } catch (error) {
      console.error("Erro ao adicionar ou editar postagem:", error);
    }
  };

  const handleEditPost = (post) => {
    setNewPostTitle(post.title);
    setNewPostAuthor(post.author);
    setNewPostContent(post.content);
    setNewPostImage(null);
    setEditingPostId(post.id);
    setSelectedOption('adicionarPostagem');
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteDoc(doc(db, "users", id));
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
    }
  };

  const handleAddUser = async () => {
    try {
      const newUser = {
        name: newUserName,
        role: newUserRole,
      };
      await addDoc(collection(db, "users"), newUser);
      setUsers([...users, newUser]);
      setNewUserName('');
      setNewUserRole('');
    } catch (error) {
      console.error("Erro ao adicionar usuário:", error);
    }
  };

  const renderOptionContent = () => {
    switch (selectedOption) {
      case 'adicionarPostagem':
        return (
          <div>
            <h2>{editingPostId ? "Editar Postagem" : "Adicionar Nova Postagem"}</h2>
            <input
              type="text"
              placeholder="Título"
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Autor"
              value={newPostAuthor}
              onChange={(e) => setNewPostAuthor(e.target.value)}
            />
            <textarea
              placeholder="Conteúdo"
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setNewPostImage(e.target.files[0])}
            />
            <button onClick={handleAddPost}>{editingPostId ? "Atualizar Postagem" : "Adicionar Postagem"}</button>
          </div>
        );
      case 'verUsuarios':
        return (
          <div>
            <h2>Lista de Usuários</h2>
            <ul>
              {users.map(user => (
                <li key={user.id}>
                  {user.name} - {user.role}
                  <button onClick={() => handleDeleteUser(user.id)}>Excluir</button>
                </li>
              ))}
            </ul>
            <h3>Adicionar Novo Usuário</h3>
            <input
              type="text"
              placeholder="Nome do Usuário"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Cargo do Usuário"
              value={newUserRole}
              onChange={(e) => setNewUserRole(e.target.value)}
            />
            <button onClick={handleAddUser}>Adicionar Usuário</button>
          </div>
        );
      case 'verConfiguracoes':
        return (
          <div>
            <h2>Configurações do Sistema</h2>
            <p>Aqui você pode ajustar as configurações do sistema.</p>
            {/* Adicione opções de configuração aqui */}
          </div>
        );
      default:
        return (
          <div className="post-list">
            <h2>Lista de Postagens</h2>
            <table>
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Autor</th>
                  <th>Data</th>
                  <th>Imagem</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id}>
                    <td>{post.title}</td>
                    <td>{post.author}</td>
                    <td>{post.date ? new Date(post.date.seconds * 1000).toLocaleDateString() : "Data indisponível"}</td>
                    <td>
                      {post.image && <img src={post.image} alt={post.title} style={{ width: '50px', height: 'auto' }} />}
                    </td>
                    <td>
                      <button onClick={() => handleEditPost(post)}>Editar</button>
                      <button onClick={() => handleDeletePost(post.id)}>Excluir</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Admin Dashboard</h1>
        <button className="logout-btn">Sair</button>
      </div>

      <div className="dashboard-content">
        <div className="card" onClick={() => setSelectedOption('adicionarPostagem')}>
          <h3>Postagens</h3>
          <p>Gerencie as postagens do blog.</p>
          <button>Adicionar Nova Postagem</button>
        </div>
        <div className="card" onClick={() => setSelectedOption('verUsuarios')}>
          <h3>Usuários</h3>
          <p>Gerencie os usuários do sistema.</p>
          <button>Ver Usuários</button>
        </div>
        <div className="card" onClick={() => setSelectedOption('verConfiguracoes')}>
          <h3>Configurações</h3>
          <p>Ajuste as configurações do sistema.</p>
          <button>Ver Configurações</button>
        </div>
      </div>
      
      <div className="option-content">
        {renderOptionContent()}
      </div>
    </div>
  );
}

export default AdminDashboard;
