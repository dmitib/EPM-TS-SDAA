module.exports = class User {
    constructor(sName, dBirth, subordinateArray = [], bAdmin = false) {
        this.sName = sName;
        this.dBirth = dBirth;
        this.bAdmin = bAdmin;
        this.subordinateArray = subordinateArray;
        this.iR = 0;
    }

    toString() {
        return 'User [dateOfBirth=' + this.dBirth + ', name=' + this.sName + ', isAdmin=' + this.bAdmin + ', subordinates=['
            + this.subordinateArray.map(s => s.toString()).join(', ') + '], rating=' + this.iR + ']';
    }

    setRating(iR) {
        this.iR = iR;
    }
}
