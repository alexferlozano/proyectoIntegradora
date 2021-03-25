'use strict'
const Valor = use('App/Models/Read/Valor')
const Sensor = use('App/Models/Read/Sensor')
const Database = use('Database')
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
    const trx = await Database.beginTransaction()
    const user = await auth.getUser()
    try {
      const value = await user.sensors().create({
        sensor_id: sensor.id,
        int_value: request.input('int_value'),
        double_value: request.input('double_value')
      }, trx)
      await trx.commit()
      return response.created({
        status: 'Success',
        message: 'value created',
        data: value
      })
    } catch (error) {
      await trx.rollback()
      return response.internalServerError({
        message: 'something was wrong!',
        error: error
      })
    }
  }

  async update ({ params, request, response }) {
    const value = await Valor.findOrFail(params.id)
    const valueData = request.only(Valor.update)
    await value.merge(valueData)
    await value.save()
    return response.ok({
      status: 'success',
      message: 'value updated succesfully',
      data: value
    })
  }

  async destroy ({ params, request, response }) {
    const value = await Valor.findOrFail(params.id)
    value.delete()
    return response.ok({
      status: 'success',
      message: 'value deleted'
    })
  }
}

module.exports = ValorController
