'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Sensor extends Model {
  static get store () {
    return [
      'code',
      'name'
    ]
  }

  static get update () {
    return this.store
  }

  value () {
    return this.hasMany('App/Models/Read/Valor')
  }
}

module.exports = Sensor
