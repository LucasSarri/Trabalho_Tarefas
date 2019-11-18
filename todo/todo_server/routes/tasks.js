var express = require('express');
var router = express.Router();

const tasks = [
  {
    desc: 'Comprar Leite',
    id: 1,
    isDone: false,
    date: Date.now()
  },
  {
    desc: 'Comprar Pão',
    id: 2,
    isDone: false,
    date: Date.now()
  },
  {
    desc: 'Comprar Açucar',
    id: 3,
    isDone: false,
    date: Date.now()
  },
  {
    desc: 'Comprar Cerveja',
    id: 4,
    isDone: false,
    date: Date.now()
  },
  {
    desc: 'Comprar FOX',
    id: 5,
    isDone: false,
    date: Date.now()
  },
  {
    desc: 'Comprar Del Rey',
    id: 6,
    isDone: false,
    date: Date.now()
  },
  {
    desc: 'Comprar Del Rey 2',
    id: 7,
    isDone: false,
    date: Date.now()
  },
];

router.get('/', function(req, res, next){
  res.send(tasks);
});

module.exports = router;