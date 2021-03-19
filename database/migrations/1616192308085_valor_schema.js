'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ValorSchema extends Schema {
  up () {
    this.create('valors', (table) => {
      table.increments()
      table.integer('sensor_id').unsigned().notNullable().references('id').inTable('sensors')
      table.integer('int_value')
      table.float('double_value')
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('valors')
  }
}

module.exports = ValorSchema
