const path = require('path');
const fs = require('fs');

const PropertyUtil = require('./thirdparty/property-util');
const InvalidFileTypeError = require('./thirdparty/invalid-file-type-error');
const InvalidDirectoryException = require('./thirdparty/invalid-directory-exception');
const FileExtPred = require('./file-ext-pred');

const TYPES = ['jpg', 'png'];
const TYPES2 = ['pdf', 'doc'];

module.exports = class FileManager {
    constructor() {
        this.bp = PropertyUtil.loadProperty('basePath');
    }

    retrieveFile(fileName) {
        this.validateFileType(fileName);
        const dirPath = this.bp + path.sep;
        return path.resolve(dirPath, fileName);
    }

    listAllImages() {
        return this.files(this.bp, TYPES);
    }

    listAllDocumentFiles() {
        return this.files(this.bp, TYPES2);
    }

    validateFileType(fileName) {
        if (this.isInvalidFileType(fileName)) {
            throw new InvalidFileTypeError('File type not Supported: ' + fileName);
        }
    }

    isInvalidFileType(fileName) {
        return this.isInvalidImage(fileName) && this.isInvalidDocument(fileName);
    }

    isInvalidImage(fileName) {
        const imageExtensionsPredicate = new FileExtPred(TYPES);
        return !imageExtensionsPredicate.test(fileName);
    }

    isInvalidDocument(fileName) {
        const documentExtensionsPredicate = new FileExtPred(TYPES2);
        return !documentExtensionsPredicate.test(fileName);
    }

    files(directoryPath, allowedExtensions) {
        const pred = new FileExtPred(allowedExtensions);
        return this.directory(directoryPath).filter((str) => {
            return pred.test(str);
        });
    }

    directory(directoryPath) {
        const dirSt = fs.statSync(directoryPath);
        this.validateDirectory(dirSt, directoryPath);
        return fs.readdirSync(directoryPath);
    }

    validateDirectory(stats, directoryPath) {
        if (this.isNotDirectory(stats)) {
            throw new InvalidDirectoryException('Invalid directory found: ' + directoryPath);
        }
    }

    isNotDirectory(stats) {
        return !stats.isDirectory();
    }
};
