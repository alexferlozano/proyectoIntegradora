'use strict'

/*
|--------------------------------------------------------------------------
| RolSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const { roles } = use('./data.json')
class RolSeeder {
  async run () {
    for (const role of roles) {
      await Factory.model('App/Models/Rol')
        .create(role)
    }
  }

  static async runSeed () {
    for (const role of roles) {
      await Factory.model('App/Models/Rol')
        .create(role)
    }
  }
}

module.exports = RolSeeder
