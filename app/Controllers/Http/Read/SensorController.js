'use strict'
const Sensor = use('App/Models/Read/Sensor')
const Database = use('Database')
class SensorController {
  async index ({ request, response, auth }) {
    const sensors = await Sensor.all()
    return response.ok(sensors)
  }

  async show ({ params, request, response, view }) {
    const sensor = await Sensor.findOrFail(params.id)
    return response.ok(sensor)
  }

  async store ({ request, response }) {
    const sensorData = request.only(Sensor.store)
    const sensor = await Sensor.create(sensorData)
    return response.created({
      status: 'Success',
      message: 'tournament created',
      data: sensor
    })
  }

  async update ({ params, request, response }) {
    const sensor = await Sensor.findOrFail(params.id)
    const sensorData = request.only(Sensor.update)
    await sensor.merge(sensorData)
    await sensor.save()
    return response.ok({
      status: 'success',
      message: 'sensor updated succesfully',
      data: sensor
    })
  }

  async destroy ({ params, request, response }) {
    const sensor = await Sensor.findOrFail(params.id)
    sensor.delete()
    return response.ok({
      status: 'success',
      message: 'sensor deleted'
    })
  }
}

module.exports = SensorController
