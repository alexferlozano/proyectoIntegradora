'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')
const Env = use('Env')

class ValorSchema extends Schema {
  up () {
    const db = Env.get('DB_CONNECTION')
    console.log(db)
    if (db === 'mysql') {
      this.create('valors', (table) => {
        table.increments()
        table.decimal('temperature')
        table.decimal('humidity')
        table.date('date_value')
        table.timestamps()
      })
    } else {
      this.create('valors', (collection) => {
        collection.index('valors_index', { valor: 1 })
      })
    }
  }

  down () {
    this.drop('valors')
  }
}

module.exports = ValorSchema
