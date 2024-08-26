// src/Home.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [comida, setComida] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();  // Para navegação

  const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=chicken';

  useEffect(() => {
    const fetchComidaData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Não está respondendo'); 
        }
        //^^ puxa as infos da api

        //vv converte as infos da api pra js, ai assim da pra mostrar no site.
        const data = await response.json();
        setComida(data.meals);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchComidaData();
  }, [url]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="receitas">
      <div className='cabeca'>
        <h1>Receitas</h1>
        <div className="box-3">
          <div className="btn btn-three" onClick={() => navigate('/favoritos')}>
            <span>ADICIONAR NOVAS RECEITAS</span>
          </div>
        </div>
      </div>
      <ul>
        {comida && comida.map((item) => (
          <li key={item.idMeal}>
            <h2>{item.strMeal}</h2>
            <img src={item.strMealThumb} alt={item.strMeal} />
            <p>{item.strInstructions}</p>
            <div className='link'>
              <a href={item.strSource} target="_blank" rel="noopener noreferrer">Ver Receita Completa</a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
