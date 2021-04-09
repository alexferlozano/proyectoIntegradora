const User = use('App/Models/User')
const Database = use('Database')
const Logger = use('Logger')

class UserController {
  async editProfile ({ request, auth, response }) {
    const user = await auth.getUser()
    const userData = request.only(User.update)
    await user.merge(userData)
    await user.save()
    return response.ok({
      status: 'success',
      message: 'User updated succesfully'
    })
  }

  async editUsername ({ request, auth, response }) {
    const user = await auth.getUser()
    const userData = request.input('username')
    await user.merge(userData)
    await user.save()
    return response.ok({
      status: 'success',
      message: 'User username updated succesfully'
    })
  }

  async editEmail ({ request, auth, response }) {
    const user = await auth.getUser()
    const userData = request.input('email')
    await user.merge(userData)
    await user.save()
    return response.ok({
      status: 'success',
      message: 'User email updated succesfully'
    })
  }

  async getProfile ({ request, auth, response }) {
    const user = await auth.getUser()
    return response.ok(user)
  }
}
module.exports = UserController
