// src/Pages/Post.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../Services/firebase';
import { doc, getDoc } from 'firebase/firestore';
import '../Css/Post.css'; // Importando o CSS

function Post() {
  const { id } = useParams(); // Obtém o ID da postagem da URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postDoc = doc(db, "posts", id);
        const postSnapshot = await getDoc(postDoc);
        if (postSnapshot.exists()) {
          setPost(postSnapshot.data());
          console.log("Post carregado:", postSnapshot.data()); // Para depuração
        } else {
          console.log("Postagem não encontrada.");
        }
      } catch (error) {
        console.error("Erro ao buscar a postagem:", error);
      } finally {
        setLoading(false); // Move para o bloco finally
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return <p>Carregando postagem...</p>;
  }

  if (!post) {
    return <p>Postagem não encontrada.</p>;
  }

  const imageURL = post.imageURL ? post.imageURL.trim() : '';
  console.log("URL da imagem:", imageURL); // Log da URL

  return (
    <div className="post-container">
      <h2 className="post-title">{post.title}</h2>
      {imageURL ? (
        <img
          src={imageURL}
          alt={post.title}
          className="post-image"
          onError={(e) => {
            e.target.onerror = null; // Previne loops
            e.target.src = 'caminho/para/imagem/placeholder.png'; // Coloque o caminho para uma imagem placeholder
          }}
        />
      ) : (
        <div className="placeholder-image">Imagem não disponível.</div>
      )}
      <p className="post-author">Autor: {post.author}</p>
      <p className="post-date">Publicado em: {new Date(post.date.seconds * 1000).toLocaleDateString()}</p>
      <p className="post-content">{post.content}</p>
    </div>
  );
}

export default Post;
