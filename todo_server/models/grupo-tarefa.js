var Model = require('./model');

class GrupoTarefa extends Model {
  constructor() {
    super();
    this.table = 'grupo';
    this.primaryKey = 'id';
  }
}

module.exports = new  GrupoTarefa();