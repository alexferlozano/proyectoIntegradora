'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CameraSchema extends Schema {
  up () {
    this.create('cameras', (table) => {
      table.increments()
      table.string('code', 100).notNullable()
      table.string('name', 100).notNullable()
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('cameras')
  }
}

module.exports = CameraSchema
