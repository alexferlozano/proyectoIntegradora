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
    return {
      email: 'required|email|unique:users|max:254'
    }
  }

  async fails (errorMessages) {
    return this.ctx.response.badRequest(errorMessages)
  }
}

module.exports = UpdateUser
