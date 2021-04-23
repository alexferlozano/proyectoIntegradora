'use strict'
const { formatters } = use('Validator')
class UpdateUser {
  get formatter () {
    return formatters.JsonApi
  }

  get validateAll () {
    return true
  }

  get rules () {
    const userId = this.ctx.params.id
    return {
      email: `requiredWithoutAll:username|email|max:254|unique:users,email,id,${userId}`,
      username: `requiredWithoutAll:email|max:254|unique:users,username,id,${userId}`
    }
  }

  async fails (errorMessages) {
    return this.ctx.response.badRequest(errorMessages)
  }
}

module.exports = UpdateUser
