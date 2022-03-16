const { Router } = require('express');
const Cat = require('../models/Cat');

module.exports = Router().post('/', async (req, res) => {
  const cat = await Cat.insert(req.body);

  res.send(cat);
});
