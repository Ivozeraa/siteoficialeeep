import React from 'react';
import Header from '../Components/Header';
import "../Css/Home.css"

const Home = () => {
  return (
    <>
      <Header isLogged={false} />
      <div className="home">
        <h1>Bem-vindo ao Portal da Escola</h1>
        <p>Esta é a página inicial com as últimas atualizações e notícias da escola.</p>
        <button>Saiba mais</button>
      </div>
    </>
  );
};

export default Home;
