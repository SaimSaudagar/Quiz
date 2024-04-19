const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getAllUsers
} = require('../controllers/userController');

router.post('/', authMiddleware.authenticateAdmin, createUser);
router.get('/:id', authMiddleware.authenticateAdmin, getUser);
router.put('/:id', authMiddleware.authenticateAdmin, updateUser);
router.delete('/:id', authMiddleware.authenticateAdmin, deleteUser);
router.get('/', authMiddleware.authenticateAdmin, getAllUsers);

module.exports = router;
