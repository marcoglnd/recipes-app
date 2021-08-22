import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import copytoclipboard from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../styles/ReceitasFavoritas.css';

export default function FavRecipeCard(props) {
  const [isTypeFood, setIsTypeFood] = useState(false);
  const [clipboard, setClipboard] = useState(false);

  useEffect(() => {
    if (props.recipe.alcoholicOrNot === '') {
      setIsTypeFood(true);
    }
  }, []);

  function copyToClipboard() {
    let url = '';
    if (isTypeFood) {
      url = 'comidas';
    } else {
      url = 'bebidas';
    }
    copytoclipboard(`http://localhost:3000/${url}/${props.recipe.id}`);
    setClipboard(true);
  }

  const { recipe, index, removeFavorite } = props;
  return (
    <div className="fav-recipe-card">
      <Link to={ isTypeFood ? `/comidas/${recipe.id}` : `/bebidas/${recipe.id}` }>
        <img
          data-testid={ `${index}-horizontal-image` }
          src={ recipe.image }
          alt="recipe"
          className="img-fluid"
        />
      </Link>
      <div>
        { isTypeFood ? (
          <p
            data-testid={ `${index}-horizontal-top-text` }
          >
            { `${recipe.area} - ${recipe.category}` }
          </p>
        ) : (
          <p data-testid={ `${index}-horizontal-top-text` }>{ recipe.alcoholicOrNot }</p>
        ) }
        <Link to={ isTypeFood ? `/comidas/${recipe.id}` : `/bebidas/${recipe.id}` }>
          <h2
            data-testid={ `${index}-horizontal-name` }
            style={ { color: 'black' } }
          >
            { recipe.name }
          </h2>
        </Link>
        <p data-testid={ `${index}-horizontal-top-text` }>{ recipe.category }</p>
        <div className="fav-recipes">
          <button
            type="button"
            onClick={ () => removeFavorite(recipe.id) }
            style={ { border: 'none', background: 'transparent' } }
          >
            <img
              src={ blackHeartIcon }
              data-testid={ `${index}-horizontal-favorite-btn` }
              alt="favorite icon"
            />
          </button>
          <input
            type="image"
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            alt="share icon"
            onClick={ copyToClipboard }
          />
          { clipboard && <p>Link copiado!</p> }
        </div>
      </div>
    </div>
  );
}

FavRecipeCard.propTypes = {
  recipe: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    category: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
    area: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  removeFavorite: PropTypes.func.isRequired,
};
