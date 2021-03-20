'use strict'
const User = use('App/Models/User')
const Database = use('Database')
const Logger = use('Logger')

class AuthController {
  async signUp ({ request, response }) {
    const trx = await Database.beginTransaction()
    try {
      const userData = request.only(User.store)
      const user = await User.create(userData, trx)
      await trx.commit()
      return response.created({
        status: 'success',
        message: 'User created succesfully',
        user
      })
    } catch (error) {
      console.log(error)
      Logger.error('error details %j', {
        url: request.url(),
        error: error.message
      })
      await trx.rollback()
      return response.internalServerError({
        status: false,
        message: 'Something went wrong!',
        error: error
      })
    }
  }

  async logIn ({ request, auth, response }) {
    const { email, password } = request.only(User.login)
    try {
      const token = await auth.attempt(email, password)
      const user = await User.query().where('email', email).first()
      return response.ok({ token: token, user: user })
    } catch {
      return response.forbidden({ message: 'Incorrect email or password' })
    }
  }
}

module.exports = AuthController
