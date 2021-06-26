module.exports = {
    changeToMidnight: function (date, up) {
        const newDate = new Date(date.getTime());
        newDate.setDate(newDate.getDate() + (up ? 1 : -1));
        newDate.setHours(0, 0, 0, 0);
        return newDate;
    },
};
