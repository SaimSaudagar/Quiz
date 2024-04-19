import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { withAdminAuth } from '@/app/services/AdminAuth';
import { addIngredient } from '@/app/services/api';

const AddIngredientsPage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();

  const handleAddIngredient = async (event: React.FormEvent) => {
    event.preventDefault();
    await addIngredient({ _id:"", name });

    console.log('Adding ingredient:', { name, description });
    router.push('/'); 
  };

  return (
    <div>
      <h1>Add a New Ingredient</h1>
      <form onSubmit={handleAddIngredient}>
        <div>
          <label htmlFor="name">Ingredient Name:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">Add Ingredient</button>
      </form>
    </div>
  );
};

export default withAdminAuth(AddIngredientsPage);
