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
    return {
      username: 'required|email|unique:users|max:254'
    }
  }

  async fails (errorMessages) {
    return this.ctx.response.badRequest(errorMessages)
  }
}

module.exports = UpdateUsername
