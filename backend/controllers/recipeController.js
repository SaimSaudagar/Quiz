const Recipe = require('../models/Recipe');

exports.addRecipe = async (req, res) => {
    const { name, description, ingredients } = req.body;
    try {
        const newRecipe = new Recipe({ name, description, ingredients });
        await newRecipe.save();
        res.status(201).send('Recipe added');
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find().populate('ingredients');
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json(error);
    }
}