const Ingredient = require('../models/Ingredient');

exports.addIngredient = async (req, res) => {
    const { name, description } = req.body;
    try {
        const newIngredient = new Ingredient({ name, description });
        await newIngredient.save();
        res.status(201).send('Ingredient added');
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.getAllIngredients = async (req, res) => {
    try {
        const ingredients = await Ingredient.find();
        res.status(200).json(ingredients);
    } catch (error) {
        res.status(500).json(error);
    }
}