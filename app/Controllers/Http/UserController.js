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
}
module.exports = UserController
