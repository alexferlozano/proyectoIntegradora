'use strict'

const { findByOrFail } = require("@adonisjs/lucid/src/Lucid/Model")

const Camera = use('App/Models/Read/Camera')
const Image = use('App/Models/Read/Imagen')
const Database = use('Database')
const Helpers = use('Helpers')
const Drive = use('Drive')
const Ws = use('Ws')
const User = use('App/Models/User')

class RepoController {
  async storeCamera ({ request, response }) {
    const camera = await Camera.findBy('code', request.input('code'))
    if (camera) {
      return response.unprocessableEntity({
        message: 'Camera already registered'
      })
    }
    try {
      const cam = await Camera.findOrCreate({
        code: request.input('code'),
        name: request.input('name'),
        ip: request.input('ip')
      })
      await cam.save()
      return response.created({
        status: 'Success',
        message: 'Camera created',
        data: cam
      })
    } catch (error) {
      return response.internalServerError({
        message: 'Something was wrong!',
        error: error
      })
    }
  }

  async updateCameraIp ({ request, response }) {
    const camera = await Camera.findBy('code', request.input('code'))
    if (!camera) {
      return response.notFound({
        message: 'Camera not found'
      })
    }
    try {
      camera.merge({ip: request.input('ip')})
      await camera.save()
      return response.ok({
        status: 'Success',
        message: 'Camera IP field updated',
        data: camera
      })
    } catch (error) {
      return response.internalServerError({
        message: 'Something was wrong!',
        error: error
      })
    }
  }

  async showImage ({ params, response }) {
    try {
      const filePath = `uploads/${params.fileName}`;
      const exists = Drive.get(filePath)
      if (exists) {
        return response.download(Helpers.tmpPath(filePath))
      }
    } catch (error) {
      return response.internalServerError({
        message: 'Something was wrong!',
        error: error
      })
    }
  }

  async storeImage ({ request, response }) {
    const camera = await Camera.findBy('code', request.input('code'))
    if (!camera) {
      return response.notFound({
        message: 'Camera not found'
      })
    }
    try {
      const imageFile = request.file('image')
      await imageFile.move(Helpers.tmpPath('uploads'), {
        name: request.input('route'),
        overwrite: true
      })
      if (!imageFile.moved()) {
        return imageFile.error()
      }
      var obj_type
      switch (request.input('obj_type')) {
        case 1, '1':
          obj_type = 'Persona detectada'
          break;
        case 2, '2':
          obj_type = 'Presencia detectada'
          break;
        default:
          obj_type = 'Desconocido'
          break;
      }
      const image = await camera.images().create({
        route: request.input('route'),
        obj_type: obj_type,
        distance: request.input('distance'),
        date_photo: request.input('date_photo')? request.input('date_photo') : new Date(),
      })
      await image.save()
      const user = await User.find(camera.user_id)
      const topic = Ws.getChannel('images:*').topic('images:' + user.username)
      console.log(topic)
      if (topic && user) {
        console.log('Enviado')
        topic.broadcast('message', obj_type + ', se ha guardado una nueva imagen')
      }
      return response.created({
        status: 'Success',
        message: 'Image stored',
        data: image
      })
    } catch (error) {
      return response.internalServerError({
        message: 'Something was wrong!',
        error: error
      })
    }
  }

  async storeValue ({ request, response }) {
    const camera = await Camera.findBy('code', request.input('code'))
    if (!camera) {
      return response.notFound({
        message: 'Camara not found'
      })
    }
    try {
      const value = await camera.values().create({
        temperature: request.input('temperature'),
        humidity: request.input('humidity'),
        date_value: request.input('date_value')? request.input('date_value') : new Date(),
      })
      await value.save()
      const user = await User.find(camera.user_id)
      const topic = Ws.getChannel('values:*').topic('values:' + user.username)
      console.log(topic)
      if (topic && user) {
        console.log('Enviado')
        topic.broadcast('message', 'Nuevos valores guardados')
      }
      return response.created({
        status: 'Success',
        message: 'Value stored',
        data: value
      })
    } catch (error) {
      return response.internalServerError({
        message: 'Something was wrong!',
        error: error
      })
    }
  }

  async videoFeed ({ request, response }) {
    const camera = await Camera.findBy('code', request.input('code'))
    if (!camera) {
      return response.notFound({
        message: 'Camara not found'
      })
    }
    try {
      const user = await User.find(camera.user_id)
      const topic = Ws.getChannel('video:*').topic('video:' + user.username)
      console.log(topic)
      if (topic && user) {
        console.log('Enviado')
        topic.broadcast('message', 'Cámara conectada, el vídeo en vivo iniciado ha iniciado')
      }
      return response.ok({
        status: 'Success',
        message: 'Video started'
      })
    } catch (error) {
      return response.internalServerError({
        message: 'Something was wrong!',
        error: error
      })
    }
  }
}

module.exports = RepoController
