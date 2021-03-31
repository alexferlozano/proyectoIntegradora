'use strict'
const { formatters } = use('Validator')
class StoreUser {
  get formatter () {
    return formatters.JsonApi
  }

  get validateAll () {
    return true
  }

  get rules () {
    return {
      email: 'required|email|unique:users|max:254',
      password: 'required|max:60',
      username: 'required|max:80'
    }
  }

  async fails (errorMessages) {
    return this.ctx.response.badRequest(errorMessages)
  }
}

module.exports = StoreUser
