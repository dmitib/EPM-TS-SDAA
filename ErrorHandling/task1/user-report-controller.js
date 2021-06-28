module.exports = class UserReportController {
  constructor() {
    this.userReportBuilder = null;
  }

  getUserTotalOrderAmountView(userId, model) {
    let totalMessage;

    try {
      totalMessage = this.getUserTotalMessage(userId);
    } catch (error) {
      if (error.type === "TECHNICAL_ERROR") {
        return error.message;
      }

      totalMessage = error.message;
    }

    model.addAttribute("userTotalMessage", totalMessage);
    return "userTotal";
  }

  getUserTotalMessage(userId) {
    const amount = this.userReportBuilder.getUserTotalOrderAmount(userId);

    return `User Total: ${amount}$`;
  }

  getUserReportBuilder() {
    return this.userReportBuilder;
  }

  setUserReportBuilder(userReportBuilder) {
    this.userReportBuilder = userReportBuilder;
  }
}
