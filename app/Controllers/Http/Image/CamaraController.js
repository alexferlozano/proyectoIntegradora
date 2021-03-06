'use strict'

const User = require("../../../Models/User")

const Camera = use('App/Models/Read/Camera')
const Database = use('Database')

class CamaraController {
  async index ({ request, response, auth }) {
    const cameras = await Camera.all()
    return response.ok(cameras)
  }

  async show ({ params, request, response, view }) {
    const camera = await Camera.query().with('images').with('values').where('code', params.code).first()
    return response.ok(camera)
  }

  async store ({ request, response, auth }) {
    const cam = await Camera.findByOrFail('code', request.input('code'))
    const camUser = await User.find(cam.user_id)
    if (!camUser) {
      const user = await auth.getUser()
      try {
        cam.name = request.input('name')
        const camera = await user.cameras().save(cam)
        console.log(camera)
        return response.created({
          status: 'Success',
          message: 'camera created',
          data: camera
        })
      } catch (error) {
        return response.internalServerError({
          message: 'something was wrong!',
          error: error
        })
      }
    } else {
      return response.unprocessableEntity({
        message: 'Cámara ya asociada'
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
    return response.ok({ cameras })
  }
}

module.exports = CamaraController
