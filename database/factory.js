'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

Factory.blueprint('App/Models/Rol', (faker, i, data) => {
  return {
    name: data.name
  }
})

Factory.blueprint('App/Models/User', (faker, i, data) => {
  return {
    username: data.username,
    email: data.email,
    password: data.password,
    rol_id: data.rol_id
  }
})
