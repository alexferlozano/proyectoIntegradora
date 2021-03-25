'use strict'
const Camera = use('App/Models/Read/Camera')
const Image = use('App/Models/Read/Imagen')
const Database = use('Database')
const dayjs = use('dayjs')

class ImageController {
  async index ({ request, response, auth }) {
    const images = await Image.query().with('camera').fetch()
    return response.ok(images)
  }

  async show ({ params, request, response, view }) {
    const image = await Image.findOrFail(params.id)
    return response.ok(image)
  }

  async store ({ request, response, auth, params }) {
    const camera = await Camera.findOrFail(params.id)
    const trx = await Database.beginTransaction()
    const user = await auth.getUser()
    try {
      const image = await user.images().create({
        camera_id: camera.id,
        route: request.input('route'),
        date_photo: dayjs().format()
      }, trx)
      await trx.commit()
      return response.created({
        status: 'Success',
        message: 'image created',
        data: image
      })
    } catch (error) {
      await trx.rollback()
      return response.internalServerError({
        message: 'something was wrong!',
        error: error
      })
    }
  }
}

module.exports = ImageController
