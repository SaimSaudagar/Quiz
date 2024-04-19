const express = require('express');
const multer = require('multer');
const csv = require('csv-parse');
const { Recipe } = require('../models/Recipe');
const fs = require('fs');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const recipes = [];

  fs.createReadStream(req.file.path)
    .pipe(csv.parse({ delimiter: ',', from_line: 2 }))
    .on('data', (data) => {
      try {
        const newRecipe = new Recipe({ name: data[0],description: data[1], ingredients: data[2].split(';')});
        newRecipe.save();
        res.send('Recipes added successfully');
      } catch (error) {
        console.log(error);
        res.status(500).send('Error adding recipes');
      }
    });
});

module.exports = router;
