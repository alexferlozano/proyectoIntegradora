'use strict'
const User = use('App/Models/User')

class AuthController {
  async signUp ({ request, response }) {
    const userData = request.only(User.store)
    const user = await User.create(userData)
    return response.created({
      status: 'success',
      message: 'User created succesfully',
      user
    })
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
