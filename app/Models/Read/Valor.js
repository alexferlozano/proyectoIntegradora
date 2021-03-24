'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Valor extends Model {
  sensors () {
    return this.belongsToMany('App/Models/Read/Sensor')
  }

  user () {
    return this.belongsToMany('App/Models/User')
  }
}

module.exports = Valor
