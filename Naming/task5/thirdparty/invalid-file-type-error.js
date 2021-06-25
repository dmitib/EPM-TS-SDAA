module.exports = class InvalidFileTypeError extends Error {
    constructor(s) {
        super(s);
        this.message = s;
    }
};
