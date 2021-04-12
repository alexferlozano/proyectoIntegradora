'use strict'

class NotiController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }

  onMessage(data){
    console.log(this.socket.id)
    console.log(data)
  }

  onJoin(data){

  }
}

module.exports = NotiController
