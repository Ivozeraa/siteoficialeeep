// src/Pages/Blog.js
import React, { useState, useEffect } from 'react';
import { db } from '../Services/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import '../Css/Blog.css'; // Importando o CSS

function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const postsCollection = collection(db, "posts");
      const postsSnapshot = await getDocs(postsCollection);
      const postsList = postsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPosts(postsList);
    } catch (error) {
      console.error("Erro ao buscar as postagens:", error);
    } finally {
      setLoading(false); // Move para o bloco finally
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return <p>Carregando postagens...</p>;
  }

  return (
    <div className="blog-container">
      <h2 className="blog-title">Blog</h2>
      <ul className="post-list">
        {posts.map((post) => (
          <li key={post.id} className="post-preview">
            {post.imageURL ? (
              <img src={post.imageURL} alt={post.title} className="post-image" />
            ) : (
              <div className="placeholder-image">Imagem não disponível</div>
            )}
            <div className="post-info">
              <h3><Link to={`/post/${post.id}`} className="post-title">{post.title}</Link></h3>
              <p className="post-author">Autor: {post.author}</p>
              <p className="post-date">Publicado em: {new Date(post.date.seconds * 1000).toLocaleDateString()}</p>
              <p className="post-content">{post.content.substring(0, 100)}...{/* Exibe um resumo do conteúdo */}</p>
              <Link to={`/post/${post.id}`} className="read-more-btn">Leia mais</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Blog;
