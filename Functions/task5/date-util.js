module.exports = {
  changeToMidnight: (date, isTomorrow) => {
    const newDate = new Date(date.getTime());

    newDate.setDate(newDate.getDate() + (isTomorrow ? 1 : -1));
    newDate.setHours(0, 0, 0, 0);

    return newDate;
  }
};
