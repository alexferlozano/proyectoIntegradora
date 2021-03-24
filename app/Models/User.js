'use strict'

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class User extends Model {
  static get hidden () {
    return ['password']
  }

  static boot () {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  static get store () {
    return [
      'first_name',
      'last_name',
      'second_last_name',
      'username',
      'email',
      'password'
    ]
  }

  static get update () {
    return [
      'first_name',
      'last_name',
      'second_last_name',
      'username',
      'email'
    ]
  }

  static get login () {
    return [
      'email',
      'password'
    ]
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens () {
    return this.hasMany('App/Models/Token')
  }

  sensors () {
    return this.hasMany('App/Models/Read/Valor')
  }

  cameras () {
    return this.hasMany('App/Models/Read/Camera')
  }

  images () {
    return this.hasMany('App/Models/Read/Imagen')
  }

  rol () {
    return this.hasOne('App/Models/Rol')
  }
}

module.exports = User
