const express = require('express');
const helmet = require('helmet');

const db = require('./data/db-config.js');

const server = express();

server.use(helmet());
server.use(express.json());

server.get('/api/recipes', (req, res) => {
  // get all species from the database
  db('recipes')
  .then(recipes => {
    res.status(200).json(recipes);
  })
  .catch(error => {
    res.status(500).json(error);
  });
});

server.get('/api/instructions', (req, res) => {
  db('recipe_instructions')
  .then(instructions => {
    res.status(200).json(instructions);
  })
  .catch(error => {
    res.status(500).json(error);
  });
});

server.get('/api/shoppinglist', (req, res) => {
  db('shoppinglist')
  .then(instructions => {
    res.status(200).json(instructions);
  })
  .catch(error => {
    res.status(500).json(error);
  });
});

// create animal
server.post('/api/recipes', (req, res) => {
  db('recipe').insert(req.body)
  .then(ids => {
    const id = ids[0];

    db('recipe')
      .where({ id })
      .first()
    .then(recipe => {
      res.status(201).json(recipe);
    });
  })
  .catch(error => {
    res.status(500).json(error);
  });
});

// remove species
server.delete('/api/recipe/:id', (req, res) => {
  db('recipe')
    .where({ id: req.params.id })
    .del()
  .then(count => {
    if (count > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Record not found' });
    }
  })
  .catch(error => {
    res.status(500).json(error);
  });
});

module.exports = server;
