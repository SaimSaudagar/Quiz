const express = require('express');
const router = express.Router();
const { addIngredient, getAllIngredients } = require('../controllers/ingredientController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware.authenticateAdmin, addIngredient);
router.get('/', getAllIngredients);

module.exports = router;