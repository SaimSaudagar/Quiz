const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    name: String,
    description: String,
    ingredients: [{ type: Schema.Types.ObjectId, ref: 'Ingredient' }]
});

module.exports = mongoose.model('Recipe', recipeSchema);
