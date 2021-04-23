'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')
const Env = use('Env')

class CameraSchema extends Schema {
  up () {
    const db = Env.get('DB_CONNECTION')
    console.log(db)
    if (db === 'mysql') {
      this.create('cameras', (table) => {
        table.increments()
        table.string('code', 100).notNullable().unique()
        table.string('name', 100).notNullable()
        table.string('ip', 100).notNullable()
        table.integer('user_id').unsigned().references('id').inTable('users')
        table.timestamps()
      })
    } else {
      this.create('cameras', (collection) => {
        collection.index('cameras_index', { code: 1 }, { unique: true })
      })
    }
  }

  down () {
    this.drop('cameras')
  }
}

module.exports = CameraSchema
