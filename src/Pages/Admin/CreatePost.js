import React, { useState } from 'react';
import { db, auth } from '../../Services/firebase';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';

const CreatePost = ({ postId }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const post = {
      title,
      content,
      imageUrl,
      author: auth.currentUser.displayName,
      date: new Date(),
    };

    if (postId) {
      const postRef = doc(db, 'posts', postId);
      await updateDoc(postRef, post);
    } else {
      await addDoc(collection(db, 'posts'), post);
    }

    setTitle('');
    setContent('');
    setImageUrl('');
  };

  return (
    <div>
      <h1>{postId ? 'Editar Postagem' : 'Criar Nova Postagem'}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Conteúdo"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="URL da Imagem"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <button type="submit">{postId ? 'Salvar Alterações' : 'Criar Postagem'}</button>
      </form>
    </div>
  );
};

export default CreatePost;
