import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Ingredient, addRecipe, fetchIngredients } from '@/app/services/api';
import { withAdminAuth } from '@/app/services/AdminAuth';

const AddRecipePage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const getIngredients = async () => {
      const fetchedIngredients = await fetchIngredients();
      setIngredients(fetchedIngredients);
    };

    getIngredients();
  }, []);

  const handleAddRecipe = async (event: React.FormEvent) => {
    event.preventDefault();
    
    const newRecipe = {
      _id: "",
      name,
      description,
      ingredients: selectedIngredients,
    };

    await addRecipe({
      _id: "",
      name,
      description,
      ingredients: ingredients.filter((ingredient) => selectedIngredients.includes(ingredient._id)),
    });

    console.log('Adding recipe:', newRecipe);
    router.push('/');
  };

  return (
    <div>
      <h1>Add a New Recipe</h1>
      <form onSubmit={handleAddRecipe}>
        <div>
          <label htmlFor="name">Recipe Name:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="ingredients">Ingredients:</label>
          <select
            multiple
            value={selectedIngredients}
            onChange={(e) => 
              setSelectedIngredients(Array.from(e.target.selectedOptions, option => option.value))
            }>
            {ingredients.map((ingredient) => (
              <option key={ingredient._id} value={ingredient._id}>
                {ingredient.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
};

export default withAdminAuth(AddRecipePage);
