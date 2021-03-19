'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ImagenSchema extends Schema {
  up () {
    this.create('images', (table) => {
      table.increments()
      table.integer('camera_id').unsigned().notNullable().references('id').inTable('cameras')
      table.text('route')
      table.date('date_photo')
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('images')
  }
}

module.exports = ImagenSchema
