const InvalidInputException = require('./thirdparty/invalid-input-exception');

exports.calculateMonthlyPayment = function (principalAmount, mortgageTermInYears, interestRate) {
  validateParams(principalAmount, mortgageTermInYears, interestRate);

  return getPayment(principalAmount, mortgageTermInYears, interestRate);
}

function validateParams(principalAmount, mortgageTermInYears, interestRate) {
  if (principalAmount < 0 || mortgageTermInYears <= 0 || interestRate < 0) {
    throw new InvalidInputException('Negative values are not allowed');
  }
}

function getPayment(principalAmount, mortgageTermInYears, interestRate) {
  const decimalInterestRate = interestRate / 100;
  const mortgageTermInMonths = mortgageTermInYears * 12;

  if (decimalInterestRate === 0) {
    return getPaymentWithoutInterest(principalAmount, mortgageTermInMonths);
  }

  return getPaymentWithInterest(decimalInterestRate, principalAmount, mortgageTermInMonths);
}

function getPaymentWithoutInterest(principalAmount, mortgageTermInMonths) {
  return principalAmount / mortgageTermInMonths;
}

function getPaymentWithInterest(decimalInterestRate, principalAmount, mortgageTermInMonths) {
  const monthlyInterestRate = decimalInterestRate / 12;

  return (principalAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -mortgageTermInMonths));
}
