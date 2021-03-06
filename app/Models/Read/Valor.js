'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Valor extends Model {
  static get store () {
    return [
      'temperature',
      'humidity'
    ]
  }

  camera () {
    return this.belongsTo('App/Models/Read/Camera')
  }

  user () {
    return this.belongsToMany('App/Models/User')
  }
}

module.exports = Valor
