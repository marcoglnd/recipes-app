import React, { useState, useEffect } from 'react';
import HeaderWithoutSearch from '../components/HeaderWithoutSearch';
import DoneRecipeCard from '../components/DoneRecipeCard';

export default function ReceitasFeitas() {
  const [doneRecipes, setDoneRecipes] = useState([]);

  function getDoneRecipes() {
    const recipes = JSON.parse(localStorage.getItem('doneRecipes'));
    setDoneRecipes(recipes);
  }

  function filterByFood() {
    const recipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const doneFood = recipes.filter((recipe) => recipe.type === 'comida');
    setDoneRecipes(doneFood);
  }

  function filterByDrink() {
    const recipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const doneDrink = recipes.filter((recipe) => recipe.type === 'bebida');
    setDoneRecipes(doneDrink);
  }

  useEffect(() => {
    getDoneRecipes();
  }, []);

  return (
    <div>
      <HeaderWithoutSearch title="" />
      <div className="done-recipes">
        <h2>Receitas feitas</h2>
        <button
          className="btn-comidas"
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ getDoneRecipes }
        >
          All
        </button>
        <button
          className="btn-comidas"
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ filterByFood }
        >
          Food
        </button>
        <button
          className="explore-bebidas"
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ filterByDrink }
        >
          Drink
        </button>
        { doneRecipes && doneRecipes.length > 0 && doneRecipes.map((recipe, index) => (
          <DoneRecipeCard
            key={ index }
            index={ index }
            recipe={ recipe }
          />
        )) }
      </div>
    </div>
  );
}
