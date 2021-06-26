const WrongAccountNameException = require('./thirdparty/wrong-account-name-exception');
const WrongPasswordException = require('./thirdparty/wrong-password-exception');

module.exports = class RegisterAccountAction {
    constructor() {
        this.passwordChecker = null;
        this.accountManager = null;
    }

    register(account) {
        if (account.name.length <= 5) {
            throw new WrongAccountNameException(account.name);
        }
        const password = account.password;
        if (password.length <= 8) {
            if (this.passwordChecker.validate(password) !== this.passwordChecker.result.OK) {
                throw new WrongPasswordException();
            }
        }

        account.setCreatedDate(new Date());
        const addresses = new Set();
        addresses.add(account.getHomeAddress());
        addresses.add(account.getWorkAddress());
        addresses.add(account.getAdditionalAddress());
        account.setAddresses(addresses);
        this.accountManager.createNewAccount(account);
    }

    setAccountManager(accountManager) {
        this.accountManager = accountManager;
    }

    setPasswordChecker(passwordChecker) {
        this.passwordChecker = passwordChecker;
    }
};
