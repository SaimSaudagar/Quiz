const express = require('express');
const router = express.Router();
const { addRecipe, getAllRecipes } = require('../controllers/recipeController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware.authenticateAdmin, addRecipe);
router.get('/', getAllRecipes);
module.exports = router;