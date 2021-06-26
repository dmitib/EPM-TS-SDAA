module.exports = class User {
    constructor(name, dateOfBirth, subordinates, isAdmin) {
        this.name = name;
        this.dateOfBirth = dateOfBirth;
        this.subordinates = subordinates || [];
        this.isAdmin = isAdmin || false;
        this.rating = 0;
    }

    toString() {
        return 'User [dateOfBirth=' + this.dateOfBirth + ', name=' + this.name + ', isAdmin=' + this.isAdmin + ', subordinates=['
            + this.subordinates.map(s => s.toString()).join(', ') + '], rating=' + this.rating + ']';
    }

    setRating(rating) {
        this.rating = rating;
    }
}
