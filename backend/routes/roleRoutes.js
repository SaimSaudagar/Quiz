const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  createRole,
  getRole,
  updateRole,
  deleteRole,
} = require('../controllers/roleController');

router.post('/', authMiddleware.authenticateAdmin, createRole);
router.get('/:id', authMiddleware.authenticateAdmin, getRole);
router.put('/:id', authMiddleware.authenticateAdmin, updateRole);
router.delete('/:id', authMiddleware.authenticateAdmin, deleteRole);

module.exports = router;
