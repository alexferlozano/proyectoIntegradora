'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Imagen extends Model {
  static get table () {
    return 'images'
  }

  static get store () {
    return [
      'route',
      'date_photo',
      'user_id'
    ]
  }

  user () {
    return this.belongsToMany('App/Models/User')
  }

  camera () {
    return this.belongsTo('App/Models/Read/Camera')
  }
}

module.exports = Imagen
