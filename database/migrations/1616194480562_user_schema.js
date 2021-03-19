'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.table('users', (table) => {
      table.integer('rol_id').unsigned().notNullable().references('id').inTable('rols').defaultTo(2)
    })
  }

  down () {
    this.table('users', (table) => {
      table.dropForeign('rol_id')
      table.dropColumn('rol_id')
    })
  }
}

module.exports = UserSchema
