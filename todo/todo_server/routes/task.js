var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
  console.log(req.body);
  res.status(201).send({task: req.body, message: 'Tarefa salva com sucesso 2'});
});

module.exports = router;