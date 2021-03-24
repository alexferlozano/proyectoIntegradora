'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Camera extends Model {
  user () {
    return this.belongsToMany('App/Models/User')
  }

  image () {
    return this.hasMany('App/Models/Read/Imagen')
  }
}

module.exports = Camera
