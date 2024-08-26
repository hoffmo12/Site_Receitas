import React, { useState, useEffect } from 'react';
import './favoritos.css';

function Favoritos() {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [savedRecipes, setSavedRecipes] = useState(() => {
    // Carregar receitas salvas do localStorage
    const saved = localStorage.getItem('savedRecipes');
    return saved ? JSON.parse(saved) : [];
  });

  const handleNameChange = (event) => setName(event.target.value);
  const handleIngredientsChange = (event) => setIngredients(event.target.value);
  const handleInstructionsChange = (event) => setInstructions(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newRecipe = { name, ingredients, instructions };
    const updatedRecipes = [...savedRecipes, newRecipe];
    setSavedRecipes(updatedRecipes);
    localStorage.setItem('savedRecipes', JSON.stringify(updatedRecipes));
    setName('');
    setIngredients('');
    setInstructions('');
  };

  const handleNavigateHome = () => {
    localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
    window.location.href = '/'; // Navegar para a página inicial
  };

  const handleDelete = (index) => {
    const updatedRecipes = savedRecipes.filter((_, i) => i !== index);
    setSavedRecipes(updatedRecipes);
    localStorage.setItem('savedRecipes', JSON.stringify(updatedRecipes));
  };

  const handleEdit = (index) => {
    setName(savedRecipes[index].name);
    setIngredients(savedRecipes[index].ingredients);
    setInstructions(savedRecipes[index].instructions);
    setSavedRecipes(savedRecipes.filter((_, i) => i !== index));
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Adicionar Nova Receita</h1>
      </header>
      <main className="main-content">
        <form onSubmit={handleSubmit} className="recipe-form">
          <div className="form-group">
            <label htmlFor="name">Nome da Receita:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
              placeholder="Nome da receita"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="ingredients">Ingredientes:</label>
            <textarea
              id="ingredients"
              value={ingredients}
              onChange={handleIngredientsChange}
              placeholder="Liste os ingredientes"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="instructions">Modo de Preparo:</label>
            <textarea
              id="instructions"
              value={instructions}
              onChange={handleInstructionsChange}
              placeholder="Descreva o modo de preparo"
              required
            />
          </div>
          <button type="submit" className="submit-button">Salvar Receita</button>
        </form>
        
        {/* Renderizar receitas salvas */}
        <div className="saved-recipes">
          <h2>Receitas Salvas</h2>
          {savedRecipes.length > 0 ? (
            <ul>
              {savedRecipes.map((recipe, index) => (
                <li key={index} className="recipe-item">
                  <h3>{recipe.name}</h3>
                  <p><strong>Ingredientes:</strong> {recipe.ingredients}</p>
                  <p><strong>Modo de Preparo:</strong> {recipe.instructions}</p>
                  <button onClick={() => handleEdit(index)} className="edit-button">
                    Editar
                  </button>
                  <button onClick={() => handleDelete(index)} className="delete-button">
                    Apagar
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>Nenhuma receita salva.</p>
          )}
        </div>
      </main>
      <div className="btn btn-three center-button" onClick={handleNavigateHome}>
        <span>Voltar</span>
      </div>
    </div>
  );
}

export default Favoritos;