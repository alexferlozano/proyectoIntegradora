'use strict'
const Valor = use('App/Models/Read/Valor')
const Sensor = use('App/Models/Read/Sensor')
class ValorController {
  async index ({ request, response, auth }) {
    const values = await Valor.query().with('sensors').fetch()
    return response.ok(values)
  }

  async show ({ params, request, response, view }) {
    const value = await Valor.findOrFail(params.id)
    return response.ok(value)
  }

  async store ({ request, response, auth, params }) {
    const sensor = await Sensor.findOrFail(params.id)
    const user = await auth.getUser()
    const value = await user.sensors().create({
      sensor_id: sensor.id,
      int_value: request.input('int_value'),
      double_value: request.input('double_value')
    })
    return response.created({
      status: 'Success',
      message: 'value created',
      data: value
    })
  }
}

module.exports = ValorController
