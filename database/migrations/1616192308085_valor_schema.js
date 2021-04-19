'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ValorSchema extends Schema {
  up () {
    this.create('valors', (table) => {
      table.increments()
      table.decimal('temperature')
      table.decimal('humidity')
      table.date('date_value')
      table.timestamps()
    })
  }

  down () {
    this.drop('valors')
  }
}

module.exports = ValorSchema
