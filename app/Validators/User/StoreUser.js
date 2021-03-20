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
      first_name: 'required|max:100',
      last_name: 'required|max:100',
      second_last_name: 'required|max:100',
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
