const data = require('./data/usersData')

class UsersManager {
  loginUser (res, login) {
    let currentUser = data.users.filter(item => item.login === login)[0]
    if(currentUser) {
      res.send({data: currentUser.token})
    }
    else {
      res.status(404).json({})
    }
  }

  getUserCards (res, login) {
    let currentUserCards = data.usersData.filter(item => item.login === login)[0].items
    res.send({data: currentUserCards})
  }
}

module.exports = UsersManager
