'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')
const Env = use('Env')

class ImagenSchema extends Schema {
  up () {
    const db = Env.get('DB_CONNECTION')
    console.log(db)
    if (db === 'mysql') {
      this.create('images', (table) => {
        table.increments()
        table.integer('camera_id').unsigned().notNullable().references('id').inTable('cameras')
        table.string('obj_type', 100)
        table.text('route')
        table.date('date_photo')
        table.decimal('distance')
        table.timestamps()
      })
    } else {
      this.create('images', (collection) => {
        collection.index('images_index', { route: 1 }, { unique: true })
      })
    }
  }

  down () {
    this.drop('images')
  }
}

module.exports = ImagenSchema
