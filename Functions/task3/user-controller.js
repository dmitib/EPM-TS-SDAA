const userAuthenticator = require('./user-authenticator');
const controller = require('./thirdparty/controller');

module.exports = {
  authenticateUser: (userName, password) => {
    const user = userAuthenticator.login(userName, password);

    if (user) {
      controller.generateSuccessLoginResponse(userName);
    } else {
      controller.generateFailLoginResponse();
    }
  }
};
