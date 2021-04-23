'use strict'
const { formatters } = use('Validator')
class UpdateUsername {
  get formatter () {
    return formatters.JsonApi
  }

  get validateAll () {
    return true
  }

  get rules () {
    const userId = this.ctx.params.id
    return {
      username: `required|email|max:254|unique:users,username,id,${userId}`
    }
  }

  async fails (errorMessages) {
    return this.ctx.response.badRequest(errorMessages)
  }
}

module.exports = UpdateUsername
