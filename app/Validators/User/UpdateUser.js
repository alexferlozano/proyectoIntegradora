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
      email: 'required_without_any:username|email|unique:users|max:254',
      username: 'required_without_any:email|unique:users|max:80'
    }
  }

  async fails (errorMessages) {
    return this.ctx.response.badRequest(errorMessages)
  }
}

module.exports = UpdateUser
