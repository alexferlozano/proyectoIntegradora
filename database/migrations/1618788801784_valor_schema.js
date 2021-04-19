'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ValorSchema extends Schema {
  up () {
    this.table('valors', (table) => {
      table.integer('camera_id').unsigned().references('id').inTable('cameras')
    })
  }

  down () {
    this.table('valors', (table) => {
      table.dropForeign('camera_id')
      table.dropColumn('camera_id')
    })
  }
}

module.exports = ValorSchema
