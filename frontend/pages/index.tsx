import React, { useEffect, useState } from 'react';
import { fetchRecipes, authenticateAdmin } from '../app/services/api';
import { Recipe } from '../app/services/api';
import { useRouter } from 'next/router';

export default function MainPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const getRecipesAndAuthStatus = async () => {
      try {
        const allRecipes = await fetchRecipes();
        setRecipes(allRecipes);
        const adminStatus = await authenticateAdmin();
        setIsAdmin(adminStatus.msg);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getRecipesAndAuthStatus();
  }, []);

  return (
    <div>
      <h1>Recipes</h1>
      {isAdmin && (
        <div>
          <button onClick={() => { router.push('/addRecipe/add'); }}>Add Recipe</button>
          <button onClick={() => { router.push('/addIngredients/add'); }}>Add Ingredients</button>
        </div>
      )}
      {recipes.map((recipe) => (
        <div key={recipe._id}>
          <h2>{recipe.name}</h2>
          <p>{recipe.description}</p>
          <ul>
            {recipe.ingredients.map((ingredient) => (
              <li key={ingredient._id}>{ingredient.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
