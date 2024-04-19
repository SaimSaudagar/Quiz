const baseUrl = 'http://localhost:3001/api';

export interface UserData {
  email: string;
  password: string;
  name?: string;
  admin?: boolean;
}

export interface Recipe {
  _id: string;
  name: string;
  description: string;
  ingredients: { _id: string; name: string }[];
}

export interface Ingredient {
  _id: string;
  name: string;
}

export const registerUser = async (userData: UserData): Promise<any> => {
  try {
    const response = await fetch(`${baseUrl}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return await response.json();
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
};

export const loginUser = async (userData: UserData): Promise<any> => {
  try {
    const response = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    const token = data.token;
    localStorage.setItem('token', token);
    return await response;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const addIngredient = async (ingredient: Ingredient): Promise<Ingredient> => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    throw new Error('No token found');
  }
  
  try {
    const response = await fetch(`${baseUrl}/ingredients/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'jwt_token': token,
      },
      body: JSON.stringify(ingredient),
    });
    return await response.json();
  } catch (error) {
    console.error('Adding ingredient failed:', error);
    throw error;
  }
}

export const fetchIngredients = async (): Promise<Ingredient[]> => {
  try {
    const response = await fetch(`${baseUrl}/ingredients/`, {
      method: 'GET',
    });
    return await response.json();
  } catch (error) {
    console.error('Fetching ingredients failed:', error);
    throw error;
  }
};

export const fetchRecipes = async (): Promise<Recipe[]> => {
  try {
    const response = await fetch(`${baseUrl}/recipes/`, {
      method: 'GET',
    });
    return await response.json();
  } catch (error) {
    console.error('Fetching recipes failed:', error);
    throw error;
  }
};

export const addRecipe = async (recipe: Recipe): Promise<any> => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('No token found');
  }

  try {
    const response = await fetch(`${baseUrl}/recipes/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'jwt_token': token,
      },
      body: JSON.stringify(recipe),
    });
    return await response.json();
  } catch (error) {
    console.error('Adding recipe failed:', error);
    throw error;
  }
};

export const authenticateAdmin = async (): Promise<any> => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('No token found');
  }

  try {
    const response = await fetch(`${baseUrl}/auth/authAdmin`, {
      method: 'GET',
      headers: {
        'jwt_token': token,
      },
    });
    return await response.json();
  } catch (error) {
    console.error('Authentication failed:', error);
    throw error;
  }
}