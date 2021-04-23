'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')
const Env = use('Env')

class RolSchema extends Schema {
  up () {
    const db = Env.get('DB_CONNECTION')
    console.log(db)
    if (db === 'mysql') {
      this.create('rols', (table) => {
        table.increments()
        table.string('name', 100).notNullable().unique()
        table.timestamps()
      })
    } else {
      this.create('rols', (collection) => {
        collection.index('rols_index', { name: 1 }, { unique: true })
      })
    }
  }

  down () {
    this.drop('rols')
  }
}

module.exports = RolSchema
