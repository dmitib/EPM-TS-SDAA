const userService = require('./thirdparty/user-service');
const sessionManager = require('./thirdparty/session-manager');

const authenticator = {
  login: (userName, password) => {
    const userByName = userService.getUserByName(userName);
    
    return authenticator.loginUser(userByName, password);
  },

  loginUser: (user, password) => {
    if (userService.isPasswordCorrect(user, password)) {
      sessionManager.setCurrentUser(user);
      return user;
    }

    return null;
  }
};

module.exports = authenticator;
