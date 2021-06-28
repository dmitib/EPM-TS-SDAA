class WarningException extends Error {
  constructor(message) {
    super(`WARNING: ${message}`);
    this.type = "WARNING";
  }
}

class ErrorException extends Error {
  constructor(message) {
    super(`ERROR: ${message}`);
    this.type = "ERROR";
  }
}

class TechnicalException extends Error {
  constructor() {
    super("technicalError");
    this.type = "TECHNICAL_ERROR";
  }
}

module.exports = class UserReportBuilder {
  constructor() {
    this.userDao = null;
  }

  getOrderTotal(order) {
    if (order.isSubmitted()) {
      const total = order.total();

      if (total < 0) {
        throw new ErrorException("Wrong order amount.")
      }

      return total;
    }

    return 0;
  }

  getOrdersSum(orders) {
    let sum = 0;

    for (let order of orders) {
      sum += this.getOrderTotal(order);
    }

    return sum;
  }

  getUserTotalOrderAmount(userId) {
    if (this.userDao === null) throw new TechnicalException();

    const user = this.userDao.getUser(userId);

    if (user === null) throw new WarningException("User ID doesn't exist.");

    const orders = user.getAllOrders();
    if (!orders.length) throw new WarningException("User have no submitted orders.");

    return this.getOrdersSum(orders);
  }

  getUserDao() {
    return this.userDao;
  }

  setUserDao(userDao) {
    this.userDao = userDao;
  }
}
