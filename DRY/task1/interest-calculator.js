const SENIOR_CITIZEN_AGE = 60;
const INTEREST_PERCENT = 4.5;
const SENIOR_PERCENT = 5.5;
const BONUS_AGE = 13;

module.exports = {
  getInterest
};

function getInterest(accountDetails) {
  let interest = 0;

  if (isAccountStartedAfterBonusAge(accountDetails)) {
    interest = calculateInterestByAge(accountDetails);
  }
  
  return interest;
}

function isAccountStartedAfterBonusAge(accountDetails) {
  return getYearsBetweenDates(accountDetails.getBirth(), accountDetails.getStartDate()) > BONUS_AGE;
}

function calculateInterestByAge(accountDetails) {
  if (SENIOR_CITIZEN_AGE <= getYearsBetweenDates(accountDetails.getBirth())) {
    return calculateInterest(accountDetails.getBalance(), SENIOR_PERCENT);
  } else {
    return calculateInterest(accountDetails.getBalance(), INTEREST_PERCENT);
  }
}

function calculateInterest(balance, percent) {
  return balance * getYearsBetweenDates(accountDetails.getStartDate()) * percent / 100;
}

function getYearsBetweenDates(startDateString = Date.now(), endDateString = Date.now()) {
  const start = new Date(startDateString);
  const end = new Date(endDateString);
  const diffYear = end.getFullYear() - start.getFullYear();

  if (isDateGapLessThanYear(end, start)) {
    return diffYear - 1;
  }

  return diffYear;
}

function isDateGapLessThanYear(end, start) {
  return end.getMonth() < start.getMonth() || end.getMonth() === start.getMonth() && end.getDate() < start.getDate();
}
