const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
    name: String,
    description: String,
});

module.exports = mongoose.model('Ingredient', ingredientSchema);
