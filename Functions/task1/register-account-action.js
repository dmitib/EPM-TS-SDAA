const WrongAccountNameException = require('./thirdparty/wrong-account-name-exception');
const WrongPasswordException = require('./thirdparty/wrong-password-exception');

module.exports = class RegisterAccountAction {
  constructor() {
    this.passwordChecker = null;
    this.accountManager = null;
    this.account = null;
  }

  register(account) {
    this.checkName(account.name);
    this.checkPassword(account.password);
    this.setAccount(account);
    this.createNewAccount();
  }

  getAccount() {
    return this.account;
  }

  setAccount(account) {
    const addresses = new Set();
    addresses.add(account.getHomeAddress());
    addresses.add(account.getWorkAddress());
    addresses.add(account.getAdditionalAddress());
    account.setAddresses(addresses);
    this.account = account;
  }

  setAccountManager(accountManager) {
    this.accountManager = accountManager;
  }

  setPasswordChecker(passwordChecker) {
    this.passwordChecker = passwordChecker;
  }

  checkName(name) {
    if (name.length <= 5) {
      throw new WrongAccountNameException(name);
    }
  }

  checkPassword(password) {
    if (!this.isPasswordValid(password)) {
      throw new WrongPasswordException()
    }
  }

  isPasswordValid(password) {
    return (password.length <= 8) && (this.passwordChecker.validate(password) !== this.passwordChecker.result.OK);
  }

  createNewAccount() {
    this.accountManager.createNewAccount(this.account);
  }
};
