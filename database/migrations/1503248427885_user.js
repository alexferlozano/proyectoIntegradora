'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')
const Env = use('Env')
class UserSchema extends Schema {
  up () {
    const db = Env.get('DB_CONNECTION')
    console.log(db)
    if (db === 'mysql') {
      this.create('users', (table) => {
        table.increments()
        table.string('username', 80).notNullable().unique()
        table.string('email', 254).notNullable().unique()
        table.string('password', 255).notNullable()
        table.timestamps()
      })
    } else {
      this.create('users', (collection) => {
        collection.index('email_index', { email: 1 }, { unique: true })
        collection.index('username_index', { username: 1 }, { unique: true })
      })
    }
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
