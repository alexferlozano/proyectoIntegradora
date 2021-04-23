'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')
const Env = use('Env')

class TokensSchema extends Schema {
  up () {
    const db = Env.get('DB_CONNECTION')
    console.log(db)
    if (db === 'mysql') {
      this.create('tokens', (table) => {
        table.increments()
        table.integer('user_id').unsigned().references('id').inTable('users')
        table.string('token', 255).notNullable().unique().index()
        table.string('type', 80).notNullable()
        table.boolean('is_revoked').defaultTo(false)
        table.timestamps()
      })
    } else {
      this.create('tokens', (collection) => {
        collection.index('token_index', { token: 1 }, { unique: true })
      })
    }
  }

  down () {
    this.drop('tokens')
  }
}

module.exports = TokensSchema
