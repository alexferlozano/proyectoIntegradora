'use strict'
const Camera = use('App/Models/Read/Camera')
const Database = use('Database')

class CamaraController {
  async index ({ request, response, auth }) {
    const cameras = await Camera.all()
    return response.ok(cameras)
  }

  async show ({ params, request, response, view }) {
    const camera = await Camera.findOrFail(params.id)
    return response.ok(camera)
  }

  async store ({ request, response, auth }) {
    const trx = await Database.beginTransaction()
    const user = await auth.getUser()
    try {
      const cameraData = request.only(Camera.store)
      const camera = await user.cameras().create(cameraData, trx)
      await trx.commit()
      return response.created({
        status: 'Success',
        message: 'camera created',
        data: camera
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
    const camera = await Camera.findOrFail(params.id)
    const cameraData = request.only(Camera.update)
    await camera.merge(cameraData)
    await camera.save()
    return response.ok({
      status: 'success',
      message: 'camera updated succesfully',
      data: camera
    })
  }

  async destroy ({ params, request, response }) {
    const camera = await Camera.findOrFail(params.id)
    camera.delete()
    return response.ok({
      status: 'success',
      message: 'camera deleted'
    })
  }

  async mycamera ({ params, auth, response }) {
    const user = await auth.getUser()
    const cameras = await user.cameras().fetch()
    return response.ok({
      data: cameras
    })
  }
}

module.exports = CamaraController
