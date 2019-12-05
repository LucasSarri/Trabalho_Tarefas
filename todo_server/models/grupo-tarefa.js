var Model = require('./model');
var db = require('./database');

class GrupoTarefa extends Model {
  constructor() {
    super();
    this.table = 'grupo';
    this.primaryKey = 'id';
  }
}

module.exports = new  GrupoTarefa();