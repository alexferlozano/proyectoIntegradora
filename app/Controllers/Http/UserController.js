const User = use('App/Models/User')

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

  async getProfile ({ request, auth, response }) {
    const user = await auth.getUser()
    return response.ok(user)
  }
}
module.exports = UserController
